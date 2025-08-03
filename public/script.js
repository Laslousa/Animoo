document.addEventListener("DOMContentLoaded", function () {
  let titleToGuess = document.getElementById("titleToGuess").getAttribute("value");
  let titles = document.getElementsByClassName("animeBtn");
  let form = document.getElementById("quizForm");
  let score = document.getElementById("score").getAttribute("value");

  for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener("click", function () {
      // Désactive tous les boutons
      for (let j = 0; j < titles.length; j++) {
        titles[j].disabled = true;
      }

      if (titles[i].innerText.trim().toLowerCase() === titleToGuess.trim().toLowerCase()) {
        titles[i].classList.add("correct");
        score ++ ;
        document.getElementById("score").setAttribute("value", score);
      } else {
        titles[i].classList.add("incorrect");
        // Affiche aussi la bonne réponse en vert
        for (let j = 0; j < titles.length; j++) {
          if (titles[j].innerText.trim().toLowerCase() === titleToGuess.trim().toLowerCase()) {
            titles[j].classList.add("correct");
          }
        }
      }

      // Attend l'animation puis soumet le formulaire avec la réponse choisie
      setTimeout(() => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "answer";
        input.value = titles[i].innerText;
        form.appendChild(input);
        form.submit();
      }, 1000);
    });
  }
});
