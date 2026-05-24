$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.glass-nav').addClass('scrolled');
        } else {
            $('.glass-nav').removeClass('scrolled');
        }
    });

    $('#mobile-menu-btn').click(function() {
        $('#mobile-menu').toggleClass('hidden');
        $(this).find('i').toggleClass('fa-bars-staggered fa-xmark');
    });

    $('.mobile-link').click(function() {
        $('#mobile-menu').addClass('hidden');
        $('#mobile-menu-btn').find('i').addClass('fa-bars-staggered').removeClass('fa-xmark');
    });

    $(".portfolio-carousel").owlCarousel({
        loop: true,
        margin: 24,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            640: { items: 2 },
            1024: { items: 3 }
        }
    });

    const ctxMain = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctxMain, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
                {
                    label: 'Crescimento de Impressões (%)',
                    data: [15, 38, 65, 82, 110, 145],
                    borderColor: '#dcb6ff',
                    backgroundColor: 'rgba(220, 182, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Conversões em Leads Direct',
                    data: [5, 18, 29, 48, 62, 98],
                    borderColor: '#8a4cb8',
                    backgroundColor: 'rgba(138, 76, 184, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#f3ebfa', font: { size: 12 } }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(220, 182, 255, 0.05)' },
                    ticks: { color: '#f3ebfa' }
                },
                y: {
                    grid: { color: 'rgba(220, 182, 255, 0.05)' },
                    ticks: { color: '#f3ebfa' }
                }
            }
        }
    });

    const ctxMini = document.getElementById('heroMiniChart').getContext('2d');
    new Chart(ctxMini, {
        type: 'bar',
        data: {
            labels: ['S1', 'S2', 'S3', 'S4'],
            datasets: [{
                label: 'Retenção de Vídeo',
                data: [42, 68, 85, 93],
                backgroundColor: '#b37de6',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#b37de6', font: { size: 10 } } },
                y: { grid: { display: false }, ticks: { display: false } }
            }
        }
    });

    $('#contactForm').submit(function(e) {
        e.preventDefault();
        alert('Solicitação enviada com sucesso ao Altivare Group! Nossa equipe entrará em contato em breve.');
        this.reset();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("animated-footer");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o footer entrou na viewport do usuário
            if (entry.isIntersecting) {
                // Remove o estado invisível/deslocado e aciona a transição do Tailwind
                footer.classList.remove("opacity-0", "translate-y-10");
                footer.classList.add("opacity-100", "translate-y-0");
                
                // Opcional: para a animação rodar apenas uma vez, desative o observer abaixo
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Dispara quando 10% do footer estiver visível na tela
    });

    if (footer) {
        observer.observe(footer);
    }
});