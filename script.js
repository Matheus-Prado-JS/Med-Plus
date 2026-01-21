document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CARROSSEL DO BANNER
       - Alterna automaticamente os banners
       - Usa classe .active para exibição
    ===================================================== */

    const slides = document.querySelectorAll(".carousel-item");
    let currentSlide = 0;
    const intervalTime = 4000; // 4 segundos

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Slide inicial
    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, intervalTime);
    }

    /* =====================================================
       SISTEMA DE TEMA (CLEAN / DARK / COLORFUL)
       - Troca tema ao clicar nos botões
       - Salva preferência no localStorage
       - Restaura ao recarregar a página
    ===================================================== */

    const themeButtons = document.querySelectorAll(".theme-btn");
    const body = document.body;

    const THEMES = ["theme-clean", "theme-dark", "theme-colorful"];

    function applyTheme(themeName) {
        // Remove qualquer tema anterior
        body.classList.remove(...THEMES);

        // Aplica o novo tema
        body.classList.add(`theme-${themeName}`);

        // Atualiza botão ativo
        themeButtons.forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.theme === themeName) {
                btn.classList.add("active");
            }
        });

        // Salva preferência
        localStorage.setItem("medplus-theme", themeName);
    }

    // Clique nos botões de tema
    themeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedTheme = button.dataset.theme;
            applyTheme(selectedTheme);
        });
    });

    // Carrega tema salvo ou define padrão
    const savedTheme = localStorage.getItem("medplus-theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme("clean"); // tema padrão
    }

});
