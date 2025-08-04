document.addEventListener("DOMContentLoaded", function () {
  const mode = document.getElementById("mode").value;
  if (mode === "anime") {
    const titleToGuess = document
      .getElementById("titleToGuess")
      .value.trim()
      .toLowerCase();

    const titles = document.getElementsByClassName("animeBtn");

    const animeForm = document.getElementById("animeForm");
    for (let i = 0; i < titles.length; i++) {
      titles[i].addEventListener("click", function () {
        const selectedTitle = titles[i].innerText.trim().toLowerCase();
        document.getElementById("chosenAnimeTitle").value = selectedTitle;
        // Désactive tous les boutons
        for (let j = 0; j < titles.length; j++) {
          titles[j].disabled = true;
        }

        if (selectedTitle === titleToGuess) {
          titles[i].classList.add("correct");
        } else {
          titles[i].classList.add("incorrect");
          // Affiche aussi la bonne réponse en vert
          for (let j = 0; j < titles.length; j++) {
            if (titles[j].innerText.trim().toLowerCase() === titleToGuess) {
              titles[j].classList.add("correct");
            }
          }
        }

        // Attend l'animation puis soumet le formulaire avec la réponse choisie
        setTimeout(() => {
          animeForm.submit();
        }, 1000);
      });
    }
  } else if (mode === "character") {
    const nameToGuess = document
      .getElementById("nameToGuess")
      .value.trim()
      .toLowerCase();
    const names = document.getElementsByClassName("characterBtn");
    const characterForm = document.getElementById("characterForm");

    for (let i = 0; i < names.length; i++) {
      names[i].addEventListener("click", function () {
        const selectedName = names[i].innerText.trim().toLowerCase();
        document.getElementById("chosenCharacterName").value = selectedName;
        // Désactive tous les boutons
        for (let j = 0; j < names.length; j++) {
          names[j].disabled = true;
        }
        if (selectedName === nameToGuess) {
          names[i].classList.add("correct");
        } else {
          names[i].classList.add("incorrect");
          // Affiche aussi la bonne réponse en vert
          for (let j = 0; j < names.length; j++) {
            if (names[j].innerText.trim().toLowerCase() === nameToGuess) {
              names[j].classList.add("correct");
            }
          }
        }
        // Attend l'animation puis soumet le formulaire avec la réponse choisie
        setTimeout(() => {
          characterForm.submit();
        }, 1000);
      });
    }
  }
});
