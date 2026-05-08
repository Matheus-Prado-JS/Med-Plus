const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("loginModal");

const BASE_PATH =
  window.location.hostname.includes("github.io")
    ? "/Med-Plus"
    : "";

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
userArea.innerHTML = `
  <div id="avatarContainer">
    ${generateAvatarHTML(user)}
  </div>
`;

    // nome na sidebar
    userNameDisplay.textContent = user.username;

// avatar na sidebar
if (sidebarAvatar) {


  sidebarAvatar.innerHTML = "";

  const avatarHTML =
    generateAvatarHTML(user);

  sidebarAvatar.outerHTML =
    avatarHTML.replace(
      'class="avatar"',
      'id="sidebarAvatar" class="avatar"'
    );
}

    // abrir sidebar
const avatarContainer =
  document.getElementById("avatarContainer");

if (avatarContainer) {

  avatarContainer.addEventListener("click", () => {

    sidebar.classList.toggle("active");

  });
}

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
  const isAvatar =
  e.target.closest("#avatarContainer");

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

const goAgendas = document.getElementById("goAgendas");

if (goAgendas) {
  goAgendas.addEventListener("click", () => {
    window.location.href =
  `${BASE_PATH}/HTMLS/marcadas.html`;
  });
}

function generateAvatarHTML(user, className = "avatar") {

  const avatarType =
    user.avatarType || "initial";

  const avatarColor =
    user.avatarColor || "#2a7fff";

  const initial =
    user.username.charAt(0).toUpperCase();

  // AVATAR COM INICIAL
  if (avatarType === "initial") {

    return `
      <div
        class="${className}"
        style="background:${avatarColor}"
      >
        ${initial}
      </div>
    `;
  }

  // AVATAR MASCULINO
  if (avatarType === "male") {

    return `
      <div
        class="${className}"
        style="background:${avatarColor}"
      >
        <img
          src="../assets/Perfil-B.png"
          class="avatar-image"
        >
      </div>
    `;
  }

  // AVATAR FEMININO
  if (avatarType === "female") {

    return `
      <div
        class="${className}"
        style="background:${avatarColor}"
      >
        <img
          src="../assets/Perfil-A.png"
          class="avatar-image"
        >
      </div>
    `;
  }
}

renderUser();



const openNotifications = document.getElementById("openNotifications");
const notificationsPanel = document.getElementById("notificationsPanel");
const sidebarMenu = document.getElementById("sidebarMenu");
const backSidebar = document.getElementById("backSidebar");
const notificationsList = document.getElementById("notificationsList");
const notificationBadge = document.getElementById("notificationBadge");
const clearNotifications = document.getElementById("clearNotifications");

function renderNotifications() {

  const notifications =
    JSON.parse(localStorage.getItem("medplus_notifications")) || [];

  notificationsList.innerHTML = "";

  if (notifications.length === 0) {

    notificationsList.innerHTML =
      "<p>Nenhuma notificação.</p>";
  }

  notifications.forEach(not => {

    const div = document.createElement("div");

    div.classList.add("notification-item");

    div.innerHTML = `
      <p>${not.message}</p>
    `;

    notificationsList.appendChild(div);
  });

  // contar não lidas
  const unreadCount =
    notifications.filter(not => !not.read).length;

  // 🔥 se não tiver notificações
  if (unreadCount <= 0) {

    notificationBadge.style.display = "none";
    notificationBadge.textContent = "";

  } else {

    notificationBadge.style.display = "inline-flex";
    notificationBadge.textContent = unreadCount;
  }
}

openNotifications.addEventListener("click", () => {

  sidebarMenu.style.display = "none";

  notificationsPanel.classList.add("active");

  // 🔥 pegar notificações
  let notifications =
    JSON.parse(localStorage.getItem("medplus_notifications")) || [];

  // 🔥 marcar todas como lidas
  notifications = notifications.map(not => ({
    ...not,
    read: true
  }));

  // 🔥 salvar novamente
  localStorage.setItem(
    "medplus_notifications",
    JSON.stringify(notifications)
  );

  renderNotifications();
});

backSidebar.addEventListener("click", () => {

  notificationsPanel.classList.remove("active");

  sidebarMenu.style.display = "block";
});

clearNotifications.addEventListener("click", () => {

  const confirmar = confirm(
    "Deseja limpar todas as notificações?"
  );

  if (!confirmar) return;

  localStorage.removeItem("medplus_notifications");

  renderNotifications();
});