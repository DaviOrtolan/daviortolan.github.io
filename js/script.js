const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('ion-icon');
const themeLabel = themeToggle?.querySelector('span');
const emailLink = document.getElementById('email-copy');
const feedback = document.getElementById('copy-feedback');

const savedTheme = localStorage.getItem('portfolio-theme');
const initialTheme = savedTheme || 'dark';

function applyTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');

    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    }

    if (themeIcon) {
        themeIcon.setAttribute('name', theme === 'light' ? 'moon-outline' : 'sunny-outline');
    }

    if (themeLabel) {
        themeLabel.textContent = theme === 'light' ? 'Modo escuro' : 'Modo claro';
    }
}

function showFeedback(message) {
    if (!feedback) return;

    feedback.textContent = message;
    feedback.classList.add('show');

    clearTimeout(showFeedback.timeout);
    showFeedback.timeout = setTimeout(() => {
        feedback.textContent = '';
        feedback.classList.remove('show');
    }, 1600);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        const nextTheme = isLight ? 'dark' : 'light';

        applyTheme(nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
    });
}

if (emailLink) {
    emailLink.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = emailLink.getAttribute('data-email') || 'davimortolan@gmail.com';

        try {
            await navigator.clipboard.writeText(email);
            showFeedback('E-mail copiado!');
        } catch (error) {
            showFeedback('E-mail pronto para copiar');
        }
    });
}

applyTheme(initialTheme);
