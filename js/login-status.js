const loginPage = "../index.html";
const USERNAME_KEY = "username";
const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername == null) {
    location.replace(loginPage);
}
