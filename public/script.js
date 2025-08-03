let titleToGuess = document
  .getElementById("titleToGuess")
  .getAttribute("value");
let titles = document.getElementsByClassName("animeBtn");
let score = document.getElementById("score").getAttribute("value")
for (let i = 0; i < titles.length; i++) {
  titles[i].addEventListener("click", function () {
    if (titles[i].innerText.toLowerCase() === titleToGuess.toLowerCase()) {
      score++;
      document.getElementById("score").setAttribute("value", score);
    } else {
      // do nothing
    }
  });
}
