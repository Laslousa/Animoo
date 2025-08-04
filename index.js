import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const URL = "https://api.jikan.moe/v4/";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Function to fetch anime data from Jikan API
// This function fetches the top 4 pages of anime ordered by popularity,
async function Animes() {
  try {
    let AllAnimes = [];
    for (let page = 1; page <= 4; page++) {
      const response = await axios.get(URL + "anime", {
        params: { order_by: "popularity", page: page },
      });
      const result = response.data.data;
      AllAnimes = AllAnimes.concat(result);
      await new Promise((r) => setTimeout(r, 1000)); // Respecte le rate limit
    }
    // Remove the first anime (popularity = 0)
    AllAnimes.shift();
    // Shuffle the array
    AllAnimes = AllAnimes.sort(() => Math.random() - 0.5);
    return AllAnimes;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return res.status(500).send("Error fetching anime data");
  }
}

async function Characters() {
  try {
    let AllCharacters = [];
    for (let page = 1; page <= 4; page++) {
      const response = await axios.get(URL + "characters", {
        params: { order_by: "favorites", page: page , sort: "desc" },
      });
      const result = response.data.data;
      AllCharacters = AllCharacters.concat(result);
      await new Promise((r) => setTimeout(r, 1000)); // Respecte le rate limit
    }
    // shuffle the array
    AllCharacters = AllCharacters.sort(() => Math.random() - 0.5);
    return AllCharacters;
  } catch (error) {
    console.error("Error fetching character data:", error);
    return res.status(500).send("Error fetching character data");
  }
}
let cachedAnimes = [];
let cachedCharacters = [];
cachedAnimes = await Animes();
cachedCharacters = await Characters();
let animeTracker = 0;
let characterTracker = 0;
let animeScore = 0;
let characterScore = 0;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/Home", (req, res) => {
  animeTracker = 0;
  animeScore = 0;
  characterTracker = 0;
  characterScore = 0;
  res.render("index.ejs");
});

app.post("/quiz", async (req, res) => {
  if (req.body.mode === "anime") {
    if (req.body.titleToGuess && req.body.chosenAnimeTitle && req.body.titleToGuess.trim().toLowerCase() === req.body.chosenAnimeTitle) {
      animeScore++;
    }
    animeTracker++;
    if (animeTracker <= 5) {
      const titles = [];
      const animeToGuess = { image: "", title_english: ""};
      for (let i = 0; i < 5; i++) {
        let ok = false;
        while (!ok) {
          let index = Math.floor(Math.random() * cachedAnimes.length);
          let anime = cachedAnimes[index];
          let title = anime.title_english || anime.title;
          if (!titles.includes(title)) {
            titles.push(title);
            ok = true;
            if (i === 0) {
              animeToGuess.image = anime.images.jpg.image_url;
              animeToGuess.title_english = title;
            }
          }
        }
      }
      titles.sort(() => Math.random() - 0.5); // Shuffle the titles
      res.render("Guess The Anime.ejs", {
        titles: titles,
        animeToGuess: animeToGuess,
      });
    } else {
      res.render("end.ejs", { score: animeScore });
    }
  } else if (req.body.mode === "character") {
    characterTracker++;
    if (req.body.nameToGuess && req.body.chosenCharacterName && req.body.nameToGuess.trim().toLowerCase() === req.body.chosenCharacterName) {
      characterScore++;
    }
    if (characterTracker <= 5){
      const characterNames = [];
      const characterToGuess = { image: "", name: "" };
      for (let i=0; i<5 ; i++) {
        let ok = false ;
        while (!ok) {
          let index = Math.floor(Math.random() * cachedCharacters.length);
          let character = cachedCharacters[index];
          let name = character.name;
          if (!characterNames.includes(name)) {
            characterNames.push(name);
            ok = true;
            if (i === 0) {
              characterToGuess.image = character.images.jpg.image_url;
              characterToGuess.name = name;
            }
          }
        }
      }
      characterNames.sort(() => Math.random() - 0.5); // Shuffle the names
      res.render("Guess The Character.ejs", {
        characterNames: characterNames,
        characterToGuess: characterToGuess,
      });

    } else {
      res.render("end.ejs", { score: characterScore });
    }
  } else if (req.body.mode === "facts") {

  }
});
