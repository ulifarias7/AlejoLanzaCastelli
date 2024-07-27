document.addEventListener('DOMContentLoaded', function () {
    // Toggle de tema claro y oscuro
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            theme = 'dark';
        } else {
            theme = 'light';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });



    // Validación del formulario de contacto
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.querySelector('input[name="nombre"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const mensaje = document.querySelector('textarea[name="mensaje"]').value;

        if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        alert('Mensaje enviado con éxito!');
        this.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Efectos de animación al desplazarse por la página
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-items a');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // Control del botón de menú para móviles
    const navBar = document.querySelector('.nav-bar');
    const navToggle = document.querySelector('.theme-toggle-btn');

    navToggle.addEventListener('click', () => {
        navBar.classList.toggle('open');
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('stiky', window.scrollY > 0);
    });
});



