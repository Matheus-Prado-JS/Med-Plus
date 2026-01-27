document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CARROSSEL DO BANNER
    ===================================================== */
    const slides = document.querySelectorAll(".carousel-item");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 4000);
    }

    /* =====================================================
       REDIRECIONAMENTO LOGIN
    ===================================================== */
    const btnConsultas = document.getElementById("btn-minhas-consultas");
    if (btnConsultas) {
        btnConsultas.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
    /* =====================================================
       Modelo de Primeiro Acesso LOGIN/REGISTRO
    ===================================================== */
    const btnPrimeiroAcesso = document.getElementById("btnPrimeiroAcesso");
const btnVoltarLogin = document.getElementById("btnVoltarLogin");

const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");

if (btnPrimeiroAcesso) {
    btnPrimeiroAcesso.addEventListener("click", e => {
        e.preventDefault();

        loginView.classList.add("hidden");
        registerView.classList.remove("hidden");
    });
}


if (btnVoltarLogin) {
    btnVoltarLogin.addEventListener("click", e => {
        e.preventDefault();
        registerView.classList.add("hidden");
        loginView.classList.remove("hidden");
    });
}


    /* =====================================================
       SISTEMA DE TEMA
    ===================================================== */
    const themeButtons = document.querySelectorAll(".theme-btn");
    const body = document.body;
    const THEMES = ["theme-clean", "theme-dark", "theme-colorful"];

    function applyTheme(theme) {
        body.classList.remove(...THEMES);
        body.classList.add(`theme-${theme}`);
        localStorage.setItem("medplus-theme", theme);

        themeButtons.forEach(btn =>
            btn.classList.toggle("active", btn.dataset.theme === theme)
        );
    }

    themeButtons.forEach(btn =>
        btn.addEventListener("click", () => applyTheme(btn.dataset.theme))
    );

    applyTheme(localStorage.getItem("medplus-theme") || "clean");

    /* =====================================================
       MODAL DE NOTÍCIAS
    ===================================================== */
    const modal = document.getElementById("modalNoticia");
    const closeBtn = document.getElementById("closeModal");

    if (modal && closeBtn) {
        const modalImg = modal.querySelector(".modal-img");
        const modalTitle = modal.querySelector(".modal-title");
        const modalBody = modal.querySelector(".modal-body");

        document.querySelectorAll(".noticia-card").forEach(card => {
            card.addEventListener("click", () => {
                modalImg.src = card.dataset.img;
                modalTitle.textContent = card.dataset.title;
                modalBody.textContent = card.dataset.text;
                modal.classList.add("active");
            });
        });

        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
        modal.addEventListener("click", e => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }
/* =====================================================
       USUÁRIO FALSO PARA TESTE
    ===================================================== */
    const FAKE_USERS = [
    {
        cpf: "111.111.111-11",
        senha: "11111111",
        nome: "Matheus Prado",
        consultas: [
            { especialidade: "Dermatologia", medico: "Dra. Ana Ribeiro", data: "22/03/2026", hora: "14:30", status: "agendada" },
            { especialidade: "Cardiologia", medico: "Dr. Marcos Silva", data: "02/04/2026", hora: "09:00", status: "agendada" },
            { especialidade: "Oftalmologia", medico: "Dr. Paulo Nunes", data: "10/01/2026", hora: "11:00", status: "concluida" },
            { especialidade: "Clínico Geral", medico: "Dr. André Lima", data: "15/01/2026", hora: "09:30", status: "concluida" },
            { especialidade: "Nutricionista", medico: "Dr. José Fonseca", data: "12/01/2026", hora: "15:00", status: "perdida" }
        ]
    },
    {
        cpf: "222.222.222-22",
        senha: "22222222",
        nome: "Letícia Alves",
        consultas: [
            { especialidade: "Ortopedia", medico: "Dr. Rafael Costa", data: "25/03/2026", hora: "10:00", status: "agendada" },
            { especialidade: "Endocrinologia", medico: "Dra. Paula Mendes", data: "05/04/2026", hora: "16:00", status: "agendada" },
            { especialidade: "Clínico Geral", medico: "Dr. André Lima", data: "15/01/2026", hora: "09:30", status: "concluida" },
            { especialidade: "Psicologia", medico: "Dra. Renata Alves", data: "18/01/2026", hora: "14:00", status: "perdida" },
            { especialidade: "Psicologia", medico: "Dra. Renata Alves", data: "21/01/2026", hora: "13:00", status: "perdida" }
            
        ]
    },
    {
        cpf: "333.333.333-33",
        senha: "33333333",
        nome: "Alberto Moreno",
        consultas: [
            { especialidade: "Neurologia", medico: "Dr. Eduardo Ramos", data: "28/03/2026", hora: "08:30", status: "agendada" },
            { especialidade: "Urologia", medico: "Dr. Sérgio Farias", data: "09/04/2026", hora: "13:00", status: "agendada" },
            { especialidade: "Cardiologia", medico: "Dr. Marcos Silva", data: "20/01/2026", hora: "10:30", status: "concluida" },
            { especialidade: "Dermatologia", medico: "Dra. Ana Ribeiro", data: "22/01/2026", hora: "15:30", status: "perdida" }
        ]
    },
        {
        cpf: "444.444.444-44",
        senha: "44444444",
        nome: "Camila Souza",
        consultas: [
        ]
    }
];
/* =====================================================
   JUNÇÃO DE USUÁRIOS (FAKE + REGISTRADOS)
===================================================== */

function getAllUsers() {
    const storedUsers = JSON.parse(localStorage.getItem("medplus-users")) || [];
    return [...FAKE_USERS, ...storedUsers];
}
/* ================= Máscara do CPF ================= */
function aplicarMascaraCPF(input) {
    if (!input) return;

    input.addEventListener("input", () => {
        let v = input.value.replace(/\D/g, "").slice(0, 11);

        v = v.replace(/^(\d{3})(\d)/, "$1.$2");
        v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

        input.value = v;
    });
}

    /* =====================================================
       LOGIN — CPF, SENHA, LOADER, SESSÃO
    ===================================================== */
    const loginForm = document.getElementById("loginForm");
    const loginCpfInput = document.getElementById("cpf");
    const senhaInput = document.getElementById("senha");
    const toggleSenha = document.getElementById("toggleSenha");
    const btnLogin = document.getElementById("btnLogin");
    const erroMsg = document.getElementById("erroMsg");

    if (loginForm) {

        aplicarMascaraCPF(loginCpfInput);

        // LIMITE SENHA
        senhaInput.addEventListener("input", () => {
            senhaInput.value = senhaInput.value.slice(0, 8);
        });

        // MOSTRAR SENHA
        toggleSenha.addEventListener("mousedown", () => senhaInput.type = "text");
        toggleSenha.addEventListener("mouseup", () => senhaInput.type = "password");
        toggleSenha.addEventListener("mouseleave", () => senhaInput.type = "password");

        // SUBMIT LOGIN
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            erroMsg.classList.remove("active");
            erroMsg.textContent = "";

            if (loginCpfInput.value.length < 14 || senhaInput.value.length < 4) {
                erroMsg.textContent = "CPF ou senha inválidos";
                erroMsg.classList.add("active");
                return;
            }

            btnLogin.classList.add("loading");
            btnLogin.textContent = "Entrando...";

            setTimeout(() => {

            const allUsers = getAllUsers();

            const userFound = allUsers.find(user =>
                user.cpf === loginCpfInput.value &&
                user.senha === senhaInput.value
            );


            if (userFound) {
                localStorage.setItem("medplus-auth", "true");
                localStorage.setItem("medplus-user-cpf", userFound.cpf);
                window.location.href = "consultas.html";
            } else {
                btnLogin.classList.remove("loading");
                btnLogin.textContent = "Entrar";
                erroMsg.textContent = "CPF ou senha incorretos";
                erroMsg.classList.add("active");
            }

        }, 1500);


        });
    }

    /* =====================================================
       PROTEÇÃO CONSULTAS.HTML
    ===================================================== */
    if (window.location.pathname.includes("consultas.html")) {
        if (localStorage.getItem("medplus-auth") !== "true") {
            window.location.href = "login.html";
        }
    }
    /* =====================================================
   PRIMEIRO ACESSO — REGISTRO FUNCIONAL
===================================================== */

const registerForm = document.getElementById("registerForm");
const regErro = document.getElementById("registerErro");

if (registerForm) {

    const nomeInput = document.getElementById("regNome");
    const idadeInput = document.getElementById("regIdade");
    const cepInput = document.getElementById("regCep");
    const regCpfInput = document.getElementById("regCpf");
    const senhaInput = document.getElementById("regSenha");
    const telInput = document.getElementById("regTelefone");

    // LIMITE SENHA
    senhaInput.addEventListener("input", () => {
        senhaInput.value = senhaInput.value.slice(0, 8);
    });

    registerForm.addEventListener("submit", e => {
        e.preventDefault();
        regErro.textContent = "";

        // VALIDAÇÕES
        if (
            !nomeInput.value ||
            !idadeInput.value ||
            !cepInput.value ||
            !regCpfInput.value ||
            !senhaInput.value ||
            !telInput.value
        ) {
            regErro.textContent = "Preencha todos os campos";
            return;
        }

        if (regCpfInput.value.length !== 14) {
            regErro.textContent = "CPF inválido";
            return;
        }

        if (senhaInput.value.length < 4 || senhaInput.value.length > 8) {
            regErro.textContent = "Senha deve ter entre 4 e 8 caracteres";
            return;
        }

        // VERIFICA SE CPF JÁ EXISTE
        const users = JSON.parse(localStorage.getItem("medplus-users")) || [];

        if (users.find(u => u.cpf === regCpfInput.value)) {
            regErro.textContent = "CPF já cadastrado";
            return;
        }

        // CRIA USUÁRIO
        const newUser = {
            cpf: regCpfInput.value,
            senha: senhaInput.value,
            nome: nomeInput.value,
            consultas: []
        };

        users.push(newUser);
        localStorage.setItem("medplus-users", JSON.stringify(users));

        // LOGA AUTOMATICAMENTE
        localStorage.setItem("medplus-auth", "true");
        localStorage.setItem("medplus-user-cpf", newUser.cpf);

        window.location.href = "consultas.html";
    });
}

/* =====================================================
   RENDER CONSULTAS POR USUÁRIO
===================================================== */

if (window.location.pathname.includes("consultas.html")) {

    const userCpf = localStorage.getItem("medplus-user-cpf");
if (!userCpf) return;

const allUsers = getAllUsers();
const userData = allUsers.find(u => u.cpf === userCpf);
if (!userData) return;

const userNameEl = document.getElementById("userName");
    if (userNameEl) userNameEl.textContent = userData.nome;


    const agendadasEl = document.getElementById("consultasAgendadas");
    const historicoEl = document.getElementById("consultasHistorico");

    userData.consultas.forEach(c => {

        const card = document.createElement("div");
        card.className = `consulta-card ${c.status !== "agendada" ? "past" : ""}`;

        card.innerHTML = `
            <h3>${c.especialidade}</h3>
            <p><strong>Médico:</strong> ${c.medico}</p>
            <p><strong>Data:</strong> ${c.data}</p>
            <p><strong>Horário:</strong> ${c.hora}</p>
            <span class="consulta-status ${c.status}">
                ${c.status === "agendada" ? "Agendada" :
                  c.status === "concluida" ? "Concluída" : "Perdida"}
            </span>
        `;

        if (c.status === "agendada") {
            agendadasEl.appendChild(card);
        } else {
            historicoEl.appendChild(card);
        }
    });
}

});

