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
       LOGIN — CPF, SENHA, LOADER, SESSÃO
    ===================================================== */
    const loginForm = document.getElementById("loginForm");
    const cpfInput = document.getElementById("cpf");
    const senhaInput = document.getElementById("senha");
    const toggleSenha = document.getElementById("toggleSenha");
    const btnLogin = document.getElementById("btnLogin");
    const erroMsg = document.getElementById("erroMsg");

    if (loginForm) {

        // CPF MASK
        cpfInput.addEventListener("input", () => {
            let v = cpfInput.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/^(\d{3})(\d)/, "$1.$2");
            v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
            v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
            cpfInput.value = v;
        });

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

            if (cpfInput.value.length < 14 || senhaInput.value.length < 4) {
                erroMsg.textContent = "CPF ou senha inválidos";
                erroMsg.classList.add("active");
                return;
            }

            btnLogin.classList.add("loading");
            btnLogin.textContent = "Entrando...";

            setTimeout(() => {
                localStorage.setItem("medplus-auth", "true");
                window.location.href = "consultas.html";
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

});
