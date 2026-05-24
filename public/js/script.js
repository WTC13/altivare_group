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
    const navbar = document.getElementById("main-navbar");

    // 1. Animação de entrada da Navbar ao carregar a página
    setTimeout(() => {
        if (navbar) {
            navbar.classList.remove("opacity-0", "-translate-y-4");
            navbar.classList.add("opacity-100", "translate-y-0");
        }
    }, 100);

    // 2. Escurecer a Navbar ao rolar a página
    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.remove("bg-[#11061a]/80", "border-purple-950/20");
                navbar.classList.add("bg-[#11061a]/95", "border-purple-950/60", "shadow-xl");
            } else {
                navbar.classList.remove("bg-[#11061a]/95", "border-purple-950/60", "shadow-xl");
                navbar.classList.add("bg-[#11061a]/80", "border-purple-950/20");
            }
        }
    });

    // 3. ROLAGEM SUAVE (Versão Corrigida e Ampla)
    // Captura TODOS os links da página que apontam para um ID (ex: #sobre, #servicos)
    const linksInternos = document.querySelectorAll('a[href^="#"]');

    linksInternos.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignora links vazios como href="#" (ex: botões de redes sociais)
            if (targetId === "#" || targetId === "") return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault(); // Impede o salto seco original do navegador

                // Pega a altura da navbar dinamicamente (se não achar, usa 75px como padrão)
                const navbarHeight = navbar ? navbar.offsetHeight : 75;
                
                // Calcula a posição final descontando o topo fixo da barra
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const heroLeft = document.getElementById("hero-left-content");
    const heroRight = document.getElementById("hero-right-content");

    setTimeout(() => {
        if (heroLeft) {
            heroLeft.classList.remove("opacity-0", "-translate-x-8");
            heroLeft.classList.add("opacity-100", "translate-y-0");
        }
        if (heroRight) {
            heroRight.classList.remove("opacity-0", "scale-95");
            heroRight.classList.add("opacity-100", "scale-100");
        }
    }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
    const sobreCard = document.getElementById("sobre-card");
    const sobreTexto = document.getElementById("sobre-texto");

    const sobreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ativa o card vindo da esquerda
                sobreCard.classList.remove("opacity-0", "-translate-x-12");
                sobreCard.classList.add("opacity-100", "translate-x-0");

                // Ativa o texto vindo da direita
                sobreTexto.classList.remove("opacity-0", "translate-x-12");
                sobreTexto.classList.add("opacity-100", "translate-y-0");

                // Para de observar para a animação acontecer apenas uma vez
                sobreObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Dispara quando 20% da seção sobre aparecer na tela
    });

    // Como o container engloba ambos, observamos o elemento pai direto (a section)
    const sobreSection = document.getElementById("sobre");
    if (sobreSection) {
        sobreObserver.observe(sobreSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const servicosHeader = document.getElementById("servicos-header");
    const servicosCards = document.querySelectorAll(".servico-card");

    const servicosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Ativa o Cabeçalho da seção
                servicosHeader.classList.remove("opacity-0", "-translate-y-8");
                servicosHeader.classList.add("opacity-100", "translate-y-0");

                // 2. Ativa os cards em efeito cascata (um após o outro)
                servicosCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.remove("opacity-0", "translate-y-12", "scale-95");
                        card.classList.add("opacity-100", "translate-y-0", "scale-100");
                    }, index * 200); // 200ms de atraso entre cada card
                });

                // Para de observar para a animação ocorrer apenas uma vez
                servicosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Dispara quando 15% da seção estiver na tela
    });

    const servicosSection = document.getElementById("servicos");
    if (servicosSection) {
        servicosObserver.observe(servicosSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const resTexto = document.getElementById("resultados-texto");
    const resGrafico = document.getElementById("resultados-grafico");

    const resultadosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Faz os textos subirem de forma suave
                resTexto.classList.remove("opacity-0", "translate-y-12");
                resTexto.classList.add("opacity-100", "translate-y-0");

                // 2. Faz o bloco do gráfico expandir com zoom sutil
                resGrafico.classList.remove("opacity-0", "scale-95");
                resGrafico.classList.add("opacity-100", "scale-100");

                // Opcional: Se o seu gráfico de Chart.js tiver animação interna, 
                // você pode chamar a função de renderização do gráfico exatamente aqui dentro!

                // Para de observar para a animação rodar de forma limpa uma única vez
                resultadosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Dispara quando 15% da seção estiver visível
    });

    const resultadosSection = document.getElementById("resultados");
    if (resultadosSection) {
        resultadosObserver.observe(resultadosSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const portHeader = document.getElementById("portfolio-header");
    const portCarousel = document.getElementById("portfolio-carousel-container");

    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ativa o cabeçalho descendo
                portHeader.classList.remove("opacity-0", "-translate-y-6");
                portHeader.classList.add("opacity-100", "translate-y-0");

                // Ativa o carrossel inteiro subindo com suavidade
                portCarousel.classList.remove("opacity-0", "translate-y-6");
                portCarousel.classList.add("opacity-100", "translate-y-0");

                // Desativa o observer para manter a performance estável
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Inicia quando 15% da seção estiver na tela
    });

    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
        portfolioObserver.observe(portfolioSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const contatoCard = document.getElementById("contato-card");

    const contatoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove o estado encolhido e invisível, trazendo o card para frente
                contatoCard.classList.remove("opacity-0", "scale-95");
                contatoCard.classList.add("opacity-100", "scale-100");

                // Encerra a observação para otimizar o desempenho do navegador
                contatoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Dispara quando 15% da seção de contato estiver visível
    });

    const contatoSection = document.getElementById("contato");
    if (contatoSection) {
        contatoObserver.observe(contatoSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("animated-footer");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.remove("opacity-0", "translate-y-10");
                footer.classList.add("opacity-100", "translate-y-0");

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    if (footer) {
        observer.observe(footer);
    }
});