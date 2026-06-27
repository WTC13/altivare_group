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

    // ─────────────────────────────────────────────
    // CONFIGURAÇÃO EMAILJS
    // 1. Crie conta gratuita em: https://www.emailjs.com/
    // 2. Crie um Email Service conectado ao Gmail (altivaregroup@gmail.com)
    // 3. Crie um Email Template com as variáveis: {{nome}}, {{whatsapp}}, {{instagram}}, {{objetivo}}
    // 4. Substitua os 3 valores abaixo pelos seus IDs reais
    // ─────────────────────────────────────────────
    const EMAILJS_PUBLIC_KEY  = 'zSdvNmYne9naRgQjm';   // Account > API Keys
    const EMAILJS_SERVICE_ID  = 'service_o4kw1u9';   // Email Services > Service ID
    const EMAILJS_TEMPLATE_ID = 'template_n1psx9d';  // Email Templates > Template ID

    const WHATSAPP_NUMBER = '5511920514195'; // Número do responsável (com DDI 55)

    // Inicializa EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // ─────────────────────────────────────────────
    // SUBMIT DO FORMULÁRIO
    // ─────────────────────────────────────────────
    document.getElementById('contactForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form    = this;
        const btn     = document.getElementById('submitBtn');
        const nome    = form.nome.value.trim();
        const wpp     = form.whatsapp.value.trim();
        const insta   = form.instagram.value.trim();
        const obj     = form.objetivo.value;

        // Loading
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs"></i> Enviando...';

        Swal.fire({
            title: 'Enviando sua solicitação...',
            text: 'Aguarde um momento.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: '#31154c',
            color: '#e9d5ff',
            didOpen: () => Swal.showLoading(),
        });

        try {
            // ── 1. Envia e-mail via EmailJS ──
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                nome:      nome,
                whatsapp:  wpp,
                instagram: insta,
                objetivo:  obj,
            });

            // ── 2. Monta mensagem do WhatsApp ──
            const msgWpp = encodeURIComponent(
                `Olá, Altivare Group! \n\nMeu nome é *${nome}* e gostaria de solicitar uma *avaliação gratuita* para minha empresa.\n\n Instagram: ${insta}\n Meu WhatsApp: ${wpp}\n Objetivo: ${obj}\n\nAguardo o contato da equipe. Obrigado!`
            );
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${msgWpp}`;

            // ── 3. Sucesso — SweetAlert2 ──
            await Swal.fire({
                icon: 'success',
                title: 'Solicitação enviada! 🚀',
                html: `
                    <p style="color:#e9d5ff; font-size:0.9rem; margin-bottom:12px;">
                        <strong>${nome}</strong>, seu formulário chegou ao Altivare Group com sucesso!<br><br>
                        Agora você será redirecionado ao WhatsApp para confirmar sua avaliação gratuita. 😊
                    </p>
                `,
                confirmButtonText: 'Ir para o WhatsApp →',
                background: '#31154c',
                color: '#e9d5ff',
                confirmButtonColor: '#8a4cb8',
                iconColor: '#b37de6',
            });

            // ── 4. Redireciona para WhatsApp ──
            window.open(whatsappURL, '_blank');

            // ── 5. Reseta o formulário ──
            form.reset();

        } catch (error) {
            console.error('Erro ao enviar:', error);

            Swal.fire({
                icon: 'error',
                title: 'Ops! Algo deu errado.',
                html: `
                    <p style="color:#e9d5ff; font-size:0.9rem;">
                        Não foi possível enviar sua solicitação agora.<br>
                        Tente novamente ou entre em contato diretamente pelo WhatsApp. 🙏
                    </p>
                `,
                confirmButtonText: 'Fechar',
                background: '#31154c',
                color: '#e9d5ff',
                confirmButtonColor: '#8a4cb8',
                iconColor: '#f87171',
            });
        } finally {
            // Restaura botão
            btn.disabled = false;
            btn.innerHTML = 'Enviar Solicitação para Altivare Group <i class="fa-solid fa-paper-plane text-xs"></i>';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("main-navbar");

    setTimeout(() => {
        if (navbar) {
            navbar.classList.remove("opacity-0", "-translate-y-4");
            navbar.classList.add("opacity-100", "translate-y-0");
        }
    }, 100);

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

    const linksInternos = document.querySelectorAll('a[href^="#"]');

    linksInternos.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === "#" || targetId === "") return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault(); 
                const navbarHeight = navbar ? navbar.offsetHeight : 75;
                
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
                sobreCard.classList.remove("opacity-0", "-translate-x-12");
                sobreCard.classList.add("opacity-100", "translate-x-0");

                sobreTexto.classList.remove("opacity-0", "translate-x-12");
                sobreTexto.classList.add("opacity-100", "translate-y-0");

                sobreObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

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
                servicosHeader.classList.remove("opacity-0", "-translate-y-8");
                servicosHeader.classList.add("opacity-100", "translate-y-0");

                servicosCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.remove("opacity-0", "translate-y-12", "scale-95");
                        card.classList.add("opacity-100", "translate-y-0", "scale-100");
                    }, index * 200);
                });

                servicosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
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
                resTexto.classList.remove("opacity-0", "translate-y-12");
                resTexto.classList.add("opacity-100", "translate-y-0");

                resGrafico.classList.remove("opacity-0", "scale-95");
                resGrafico.classList.add("opacity-100", "scale-100");

                resultadosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
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
                portHeader.classList.remove("opacity-0", "-translate-y-6");
                portHeader.classList.add("opacity-100", "translate-y-0");

                portCarousel.classList.remove("opacity-0", "translate-y-6");
                portCarousel.classList.add("opacity-100", "translate-y-0");

                portfolioObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
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
                contatoCard.classList.remove("opacity-0", "scale-95");
                contatoCard.classList.add("opacity-100", "scale-100");

                contatoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
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