
const tabs = document.querySelectorAll(".tab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

tabs.forEach(tab => {
  tab.onclick = () => {
    const isLogin = tab.dataset.tab === "login";

    loginForm.hidden = !isLogin;
    registerForm.hidden = isLogin;

    tabs.forEach(t => t.classList.toggle("active", t === tab));
    message.textContent = "";
  };
});

document.querySelectorAll(".show").forEach(button => {
  button.onclick = () => {
    const field = button.previousElementSibling;
    field.type = field.type === "password" ? "text" : "password";
    button.textContent = field.type === "password" ? "Show" : "Hide";
  };
});

loginForm.onsubmit = event => {
  event.preventDefault();
  message.textContent =
    "Demo login successful! Welcome, " +
    document.getElementById("username").value + ".";
};

registerForm.onsubmit = event => {
  event.preventDefault();
  message.textContent =
    "Registration demo successful! Welcome, " +
    document.getElementById("fullname").value + ".";
  registerForm.reset();
};
