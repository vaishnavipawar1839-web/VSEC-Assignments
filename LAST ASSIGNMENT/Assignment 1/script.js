const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");
const eye = document.getElementById("eye");

// Show / Hide Password
eye.addEventListener("click", function(){

    if(password.type === "password"){

        password.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");

    }
    else{

        password.type = "password";
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");

    }

});

// Login Validation
loginBtn.addEventListener("click", function(){

    if(username.value.trim() === "" || password.value.trim() === ""){

        message.innerHTML = "Please fill all fields";
        message.style.color = "red";

    }

    else{

        message.innerHTML = "Login Successful";
        message.style.color = "green";

    }

});