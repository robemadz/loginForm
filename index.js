const d = document,
  $form = d.querySelector(".loginForm"),
  $mail = d.getElementById("email--field"),
  $password = d.getElementById("password--field"),
  $submit = d.querySelector(".loginForm__submit"),
  $inputs = d.querySelectorAll(".inputs"),
  $loader = d.querySelector(".loader"),
  $success = d.querySelector(".successMsg");
//console.log($inputs);

$inputs.forEach((input) => {
  const $span = d.createElement("span"); //creo span dinamicamente para reflejar el error, que será el title del input asociado
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add("loginForm--error", "none");
  input.insertAdjacentElement("afterend", $span);
});

d.addEventListener("keyup", (e) => {
  if (e.target.matches(".inputs")) {
    let $input = e.target,
      pattern = $input.pattern;
    //console.log($input, pattern);
    if (pattern && $input.value !== "") {
      let regEx = new RegExp(pattern);
      return !regEx.exec($input.value)
        ? d.getElementById($input.name).classList.add("isActive")
        : d.getElementById($input.name).classList.remove("isActive");
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".loginForm__submit")) {
    e.preventDefault();

    if ($mail.value == "" && $password.value == "") {
      $mail.classList.add("shake");
      $password.classList.add("shake");
      d.getElementById("email").classList.add("isActive");
      d.getElementById("password").classList.add("isActive");
    } else if ($mail.value == "" && !$password.value == "") {
      $mail.classList.add("shake");
      d.getElementById("email").classList.add("isActive");
    } else if (!$mail.value == "" && $password.value == "") {
      $password.classList.add("shake");
      d.getElementById("password").classList.add("isActive");
    }

    setTimeout(() => {
      //$loader.classList.add("none");
      $mail.classList.remove("shake");
      $password.classList.remove("shake");
    }, 500);

    setTimeout(() => {
      d.getElementById("email").classList.remove("isActive");
      d.getElementById("password").classList.remove("isActive");
    }, 2500);

    if (
      !d.getElementById("email").classList.contains("isActive") &&
      !d.getElementById("password").classList.contains("isActive")
    ) {
      $loader.classList.remove("none");

      $inputs.forEach((input) => {
        input.value = "";
      });

      setTimeout(() => {
        $loader.classList.add("none");
        $success.classList.remove("none");

        //window.location.href = "/index.html";
      }, 1000);

      setTimeout(() => {
        $success.classList.add("none");
      }, 3000);
    }
  }
});
