window.addEventListener("load", function () {
  const registerForm = document.querySelector(".register-form");
  const btnRegister = document.querySelector("button");
  const showPasswordIcon = registerForm && registerForm.querySelector(".show-password");
  const inputPassword = registerForm && registerForm.querySelector('input[type="password"');
  const inputPasswordConfirm = registerForm && registerForm.querySelector("input[type='confirmPassword'");
  const inputEmail = registerForm && registerForm.querySelector("input[type='email']");

  function checkLengthInput(e) {
    if (e.target.value.length <= 0) {
      btnRegister.classList.add(`disable__${e.target.name}`);
    } else btnRegister.classList.remove(`disable__${e.target.name}`);
  }

  inputEmail.addEventListener("keyup", function (e) {
    const regex = /@.+\..+/;
    if (regex.test(e.target.value)) {
      btnRegister.classList.remove(`disable__${e.target.name}`);
    } else btnRegister.classList.add(`disable__${e.target.name}`);
  });

  inputPassword.addEventListener("keyup", checkLengthInput);

  inputPasswordConfirm.addEventListener("keyup", checkLengthInput);

  showPasswordIcon.addEventListener("click", function () {
    const inputPasswordType = inputPassword.getAttribute("type");
    inputPasswordType === "password" ? inputPassword.setAttribute("type", "text") : inputPassword.setAttribute("type", "password");
  });
});