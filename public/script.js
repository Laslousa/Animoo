let titleToGuess = document
  .getElementById("titleToGuess")
  .getAttribute("value");
let titles = document.getElementsByClassName("animeBtn");
let score = document.getElementById("score").getAttribute("value")
for (let i = 0; i < titles.length; i++) {
  titles[i].addEventListener("click", function () {
    if (titles[i].innerText === titleToGuess) {
      score++;
      document.getElementById("score").setAttribute("value", score);
    } else {
      alert("Wrong! The correct title was: " + titleToGuess);
    }
  });
}
