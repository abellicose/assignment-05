const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error-message");
const btn = document.getElementById("form-submit");

function displayError() {
    error.hidden = false;
    btn.textContent = "Sign In";
    btn.disabled = false;
}

async function startDelay() {
    error.hidden = true;
    btn.textContent = "Signing in...";
    btn.disabled = true;
    await new Promise(resolve => setTimeout(resolve, 800));
}

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const user = username.value;
    const pass = password.value;
    await startDelay();

    if (user !== "admin" || pass !== "admin123") {
        console.log(user);
        console.log(pass);
        displayError();
        return;
    }

    window.location.href = "./main.html";
});

