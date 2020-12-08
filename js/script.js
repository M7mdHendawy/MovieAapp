/*toogle the Dark mode functions*/
const darkModeToggleBtn = document.getElementById("dark-mode-toggle");
let theme = localStorage.getItem("theme");

if (theme === "dark") enableDarkMode();

darkModeToggleBtn.addEventListener("click", () => {
  theme = localStorage.getItem("theme");
  if (theme === "dark") {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

function enableDarkMode() {
  darkModeToggleBtn.innerHTML = "☀️";
  localStorage.setItem("theme", "dark");
  document.body.classList.add("dark-mode");
}

function disableDarkMode() {
  darkModeToggleBtn.innerHTML = "🌒";
  localStorage.setItem("theme", "light");
  document.body.classList.remove("dark-mode");
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener((e) => (e.matches ? enableDarkMode() : disableDarkMode()));


/*movies api */  
const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("search_form");
const search = document.getElementById("search");
/*showing movies */
showMovies(apiUrl);
function showMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results);
      data.results.forEach((element) => {
        const el = document.createElement("div");
        el.classList.add("movie_card");
        const image = document.createElement("img");
        const text = document.createElement("h3");

        text.innerHTML = `${element.title}`;
        image.src = IMGPATH + element.poster_path;
        el.appendChild(image);
        el.appendChild(text);
        main.appendChild(el);
      });
    });
}
/* search Form */

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchTerm = search.value;

  if (searchTerm) {
    showMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});


/* Form Validation */

function validate() {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var error_message = document.getElementById("error_message");

  error_message.style.padding = "10px";

  var text;
  if (name.length < 5) {
    text = "Please Enter valid Name";
    error_message.innerHTML = text;
    return false;
  }
  if (isNaN(phone) || phone.length != 10) {
    text = "Please Enter valid Phone Number";
    error_message.innerHTML = text;
    return false;
  }
  if (email.indexOf("@") == -1 || email.length < 6) {
    text = "Please Enter valid Email";
    error_message.innerHTML = text;
    return false;
  }
  if (message.length <= 40) {
    text = "Please Enter More Than 40 Characters";
    error_message.innerHTML = text;
    return false;
  }
  alert("Form Submitted Successfully!");
  return true;
}
