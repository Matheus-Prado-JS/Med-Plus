document.addEventListener("DOMContentLoaded", () => {
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
    showSlide(currentSlide);

    // Troca automática
    setInterval(nextSlide, intervalTime);
});
