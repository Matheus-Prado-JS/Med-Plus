const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("loginModal");

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

const loginBtn = document.querySelector("#loginModal .btn-primary");

loginBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll("#loginModal input");
  const user = inputs[0].value;
  const pass = inputs[1].value;

  const saved = JSON.parse(localStorage.getItem("medplus_user"));

  if (!saved || saved.username !== user || saved.password !== pass) {
    alert("Usuário ou senha inválidos");
    return;
  }

  localStorage.setItem("medplus_logged", JSON.stringify(saved));
    modal.classList.remove("active");
    renderUser();
});

const registerBtn = document.getElementById("goRegister");

const registerModal = document.getElementById("registerModal");

registerBtn.addEventListener("click", () => {
  modal.classList.remove("active"); // fecha login
  registerModal.classList.add("active"); // abre registro
});

const closeRegister = document.getElementById("closeRegister");

closeRegister.addEventListener("click", () => {
  registerModal.classList.remove("active");
});

registerModal.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.classList.remove("active");
  }
});

const registerSubmit = document.getElementById("registerSubmit");

registerSubmit.addEventListener("click", () => {
  const user = document.getElementById("regUser").value;
  const pass = document.getElementById("regPass").value;
  const confirm = document.getElementById("regConfirm").value;

  // validação básica
  if (!user || !pass || !confirm) {
    alert("Preencha todos os campos!");
    return;
  }

  if (pass !== confirm) {
    alert("As senhas não coincidem!");
    return;
  }

  // salvar no localStorage
  const userData = {
    username: user,
    password: pass
  };

    localStorage.setItem("medplus_user", JSON.stringify(userData));
    localStorage.setItem("medplus_logged", JSON.stringify(userData)); // 🔥 loga automaticamente

  alert("Cadastro realizado com sucesso!");

  registerModal.classList.remove("active");

  renderUser();
});

const userArea = document.getElementById("userArea");
const sidebar = document.getElementById("userSidebar");
const userNameDisplay = document.getElementById("userName");

// função pra renderizar usuário logado
function renderUser() {
  const user = JSON.parse(localStorage.getItem("medplus_logged"));
  const sidebarAvatar = document.getElementById("sidebarAvatar");

  if (user) {
    const initial = user.username.charAt(0).toUpperCase();

    // avatar no header
    userArea.innerHTML = `
      <div id="avatar" class="avatar">
        ${initial}
      </div>
    `;

    // nome na sidebar
    userNameDisplay.textContent = user.username;

    // avatar na sidebar
    if (sidebarAvatar) {
      sidebarAvatar.textContent = initial;
    }

    // abrir sidebar
    document.getElementById("avatar").addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

  } else {
    // botão entrar
    userArea.innerHTML = `
      <button id="openModal" class="btn-primary">Entrar</button>
    `;

    // 🔥 RECRIAR EVENTO (ESSENCIAL)
    const newOpenBtn = document.getElementById("openModal");

    newOpenBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  }
}
document.addEventListener("click", (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isAvatar = e.target.id === "avatar";

  if (!isClickInsideSidebar && !isAvatar) {
    sidebar.classList.remove("active");
  }
});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("medplus_logged");
  sidebar.classList.remove("active");
  renderUser();
});
renderUser();