import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const URL = "https://api.jikan.moe/v4/";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let cachedAnimes = [];
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
    // Remove the first anime (the most popular one)
    AllAnimes.shift();
    // Shuffle the array
    AllAnimes = AllAnimes.sort(() => Math.random() - 0.5);
    return AllAnimes;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return res.status(500).send("Error fetching anime data");
  }
}
cachedAnimes = await Animes();
let animeTracker = 0;
let animeScore = 0;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/quiz", async (req, res) => {
  if (req.body.mode === "anime") {
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
      animeScore = parseInt(req.body.score) || 0;
      res.render("Guess The Anime.ejs", {
        titles: titles,
        animeToGuess: animeToGuess,
        animeScore: animeScore,
      });
    } else {
      animeScore = parseInt(req.body.score) || 0;
      res.render("end.ejs", { mode: "anime", animeScore: animeScore });
    }
  } else if (req.body.mode === "character") {
  }
});
