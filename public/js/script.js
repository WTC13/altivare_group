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

        // 1. Captura os valores dos campos para usar na mensagem do WhatsApp
        const nome = $('input[name="name"]').val() || 'Cliente';
        const email = $('input[name="email"]').val() || 'Não informado';
        const mensagemCliente = $('textarea[name="message"]').val() || '';

        // Exibe o loader do SweetAlert avisando que está enviando
        Swal.fire({
            title: 'Enviando sua solicitação...',
            text: 'Por favor, aguarde um momento.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // 2. Prepara os dados para o Web3Forms
        // O FormData captura automaticamente todos os inputs dentro do form (incluindo a access_key)
        const formData = new FormData(this);

        // Envia a requisição via Fetch API (nativo e moderno)
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            
            if (response.status == 200) {
                // E-mail enviado com sucesso! Agora exibe o SweetAlert perguntando sobre o WhatsApp
                Swal.fire({
                    icon: 'success',
                    title: 'Solicitação Enviada!',
                    text: 'Sua mensagem foi recebida com sucesso pelo Altivare Group. Quer falar conosco imediatamente pelo WhatsApp?',
                    showCancelButton: true,
                    confirmButtonText: 'Ir para o WhatsApp',
                    cancelButtonText: 'Fechar',
                    confirmButtonColor: '#25D366',
                }).then((result) => {
                   
                    if (result.isConfirmed) {
                        const numeroWhats = '5511920514195';
                        
                        let textoWhats = `Olá! Acabei de enviar o formulário no site.\n\n`;
                        textoWhats += `*Nome:* ${nome}\n`;
                        textoWhats += `*E-mail:* ${email}\n`;
                        if(mensagemCliente) textoWhats += `*Mensagem:* ${mensagemCliente}`;

                        // Codifica o texto para formato de URL
                        const textoEncoded = encodeURIComponent(textoWhats);
                        const urlWhatsapp = `https://wa.me/${numeroWhats}?text=${textoEncoded}`;

                        // Abre o WhatsApp em uma nova aba
                        window.open(urlWhatsapp, '_blank');
                    }
                });

                // Reseta o formulário após o sucesso
                this.reset();
            } else {
                // Se o Web3Forms responder com algum erro interno (ex: chave inválida)
                console.log(json);
                throw new Error(json.message);
            }
        })
        .catch((error) => {
            console.error('Erro ao enviar:', error);
            
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Houve um problema ao enviar o e-mail, mas você pode nos chamar direto no WhatsApp!',
                confirmButtonText: 'Chamar no WhatsApp'
            }).then(() => {
                const numeroWhats = '5511920514195';
                window.open(`https://wa.me/${numeroWhats}?text=Olá, tentei enviar o formulário no site mas deu erro. Quero atendimento!`, '_blank');
            });
        });
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