window.addEventListener("load", function () {
  const loginForm = document.querySelector(".login-form");
  const btnLogin = document.querySelector("button");
  const showPasswordIcon = loginForm && loginForm.querySelector(".show-password");
  const inputPassword = loginForm && loginForm.querySelector('input[type="password"');
  const inputEmail = loginForm && loginForm.querySelector("input[type='email']");

  function checkLengthInput(e) {
    if (e.target.value.length <= 0) {
      btnLogin.classList.add(`disable__${e.target.name}`);
    } else btnLogin.classList.remove(`disable__${e.target.name}`);
  }

  inputEmail.addEventListener("keyup", function (e) {
    const regex = /@.+\..+/;
    if (regex.test(e.target.value)) {
      btnLogin.classList.remove(`disable__${e.target.name}`);
    } else btnLogin.classList.add(`disable__${e.target.name}`);
  });

  inputPassword.addEventListener("keyup", checkLengthInput);

  showPasswordIcon.addEventListener("click", function () {
    const inputPasswordType = inputPassword.getAttribute("type");
    inputPasswordType === "password" ? inputPassword.setAttribute("type", "text") : inputPassword.setAttribute("type", "password");
  });
});