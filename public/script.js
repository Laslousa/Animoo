document.addEventListener("DOMContentLoaded", function () {
  const titleToGuess = document.getElementById("titleToGuess").value.trim().toLowerCase();
  const titles = document.getElementsByClassName("animeBtn");
  const form = document.getElementById("quizForm");
  let score = parseInt(document.getElementById("score").value) || 0;

  for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener("click", function () {
      const selectedTitle = titles[i].innerText.trim().toLowerCase();
      // Désactive tous les boutons
      for (let j = 0; j < titles.length; j++) {
        titles[j].disabled = true;
      }

      if (selectedTitle === titleToGuess) {
        titles[i].classList.add("correct");
        score ++ ;
        document.getElementById("score").setAttribute("value", score);
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
        form.submit();
      }, 1000);
    });
  }
});
