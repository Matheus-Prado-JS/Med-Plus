const avatarEditor =
  document.getElementById("avatarEditor");

const avatarOptions =
  document.querySelectorAll(".avatar-option");

const colorOptions =
  document.querySelectorAll(".color-option");

const openProfile =
  document.getElementById("openProfile");

const profileModal =
  document.getElementById("profileModal");

const cancelProfile =
  document.getElementById("cancelProfile");

const saveProfile =
  document.getElementById("saveProfile");

const profileName =
  document.getElementById("profileName");

const profileLastName =
  document.getElementById("profileLastName");

const profileAvatar =
  document.getElementById("profileAvatar");

  function renderProfileAvatar(user) {

  profileAvatar.innerHTML = "";

  const avatarType =
    user.avatarType || "initial";

  const avatarColor =
    user.avatarColor || "#2a7fff";

  profileAvatar.style.background =
    avatarColor;

  // avatar inicial
  if (avatarType === "initial") {

    profileAvatar.textContent =
      user.username.charAt(0).toUpperCase();

  } else {

    const img =
      document.createElement("img");

img.src =
  avatarType === "male"
    ? "../assets/Perfil-B.png"
    : "../assets/Perfil-A.png";

    profileAvatar.appendChild(img);
  }
}


// ABRIR PERFIL
openProfile.addEventListener("click", () => {

  const user =
    JSON.parse(localStorage.getItem("medplus_logged"));

  if (!user) return;

  // preencher inputs
  profileName.value = user.name || "";

  profileLastName.value =
    user.lastname || "";

  // avatar
    renderProfileAvatar(user);

  profileModal.classList.add("active");
});


// FECHAR
cancelProfile.addEventListener("click", () => {
  profileModal.classList.remove("active");
});


// FECHAR clicando fora
profileModal.addEventListener("click", (e) => {

  if (e.target === profileModal) {
    profileModal.classList.remove("active");
  }
});


// SALVAR
saveProfile.addEventListener("click", () => {

  const user =
    JSON.parse(localStorage.getItem("medplus_logged"));

  if (!user) return;

  user.name = profileName.value;

  user.lastname = profileLastName.value;

  // salvar usuário logado
  localStorage.setItem(
    "medplus_logged",
    JSON.stringify(user)
  );

  // salvar usuário principal
  localStorage.setItem(
    "medplus_user",
    JSON.stringify(user)
  );
  renderUser();
  alert("Perfil atualizado!");

  profileModal.classList.remove("active");
});

// TROCAR TIPO DE AVATAR
avatarOptions.forEach(option => {

  option.addEventListener("click", () => {

    const type =
      option.dataset.avatar;

    const user =
      JSON.parse(localStorage.getItem("medplus_logged"));

    user.avatarType = type;

    localStorage.setItem(
      "medplus_logged",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "medplus_user",
      JSON.stringify(user)
    );

renderProfileAvatar(user);
  });
});


// TROCAR COR
colorOptions.forEach(option => {

  option.addEventListener("click", () => {

    const color =
      option.dataset.color;

    const user =
      JSON.parse(localStorage.getItem("medplus_logged"));

    user.avatarColor = color;

    localStorage.setItem(
      "medplus_logged",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "medplus_user",
      JSON.stringify(user)
    );

    renderProfileAvatar(user);
  });
});