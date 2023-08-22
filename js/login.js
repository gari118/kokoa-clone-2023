const loginForm = document.querySelector("#login-form");
const USERNAME_KEY = "username";
const friendsPage = "views/friends.html";

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername == null) {
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    location.replace(friendsPage);
}
