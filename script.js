// --- TOAST HELPER ---
function showToast(title, message) {
    const toast = document.getElementById('toastBox');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMsg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

// --- MOBILE MENU ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

const revealTargets = document.querySelectorAll(
    '.section-header, .services-grid > *, .process-grid > *, .about-wrapper, .stats-grid > *, .pricing-grid > *, .testimonials-grid > *, .faq-item, .contact-wrapper, .tools-strip-inner'
);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealTargets.forEach(target => target.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach(target => {
        target.classList.add('scroll-reveal');
        revealObserver.observe(target);
    });
}

document.getElementById('loginBtn').addEventListener('click', () => openAuthModal('login'));
document.getElementById('signupBtn').addEventListener('click', () => openAuthModal('signup'));
document.getElementById('logoutBtn').addEventListener('click', logoutUser);
document.getElementById('authModalCloseBtn').addEventListener('click', closeAuthModal);
document.getElementById('authSwitchBtn').addEventListener('click', toggleAuthMode);

document.querySelectorAll('.package-select-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectPackage(button.dataset.package);
    });
});

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- PACKAGE AUTO-SELECT ---
function selectPackage(packageName) {
    document.getElementById('serviceSelect').value = packageName;
}

// --- FAQ ACCORDION ---
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.classList.toggle('active');
    });
});

// --- CONTACT FORM SUBMISSION ---
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const service = document.getElementById('serviceSelect').value;
    const budget = document.getElementById('projectBudget').value;
    const timeline = document.getElementById('projectTimeline').value;
    const details = document.getElementById('projectDetails').value.trim();
    const subject = `Project inquiry: ${service}`;
    const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service}`,
        ...(budget ? [`Budget: ${budget}`] : []),
        ...(timeline ? [`Preferred timeline: ${timeline}`] : []),
        '',
        'Project brief:',
        details
    ].join('\n');

    window.location.href = `mailto:ffsafwan81@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Email Draft Ready', 'Your email app will open with the inquiry details. Please send the draft to complete your inquiry.');
});

document.getElementById('whatsappBtn').addEventListener('click', function() {
    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const service = document.getElementById('serviceSelect').value;
    const budget = document.getElementById('projectBudget').value;
    const timeline = document.getElementById('projectTimeline').value;
    const details = document.getElementById('projectDetails').value.trim();
    const greeting = name
        ? `Assalam-o-Alaikum Safwan, my name is ${name}.`
        : 'Assalam-o-Alaikum Safwan.';
    const emailLine = email ? ` My email is ${email}.` : '';
    const budgetLine = budget ? ` My estimated budget is ${budget}.` : '';
    const timelineLine = timeline ? ` My preferred timeline is ${timeline}.` : '';
    const briefLine = details ? ` Project brief: ${details}` : '';
    const message = `${greeting}${emailLine} I am interested in ${service}.${budgetLine}${timelineLine}${briefLine} Could you please share more details?`;

    this.href = `https://wa.me/923171022977?text=${encodeURIComponent(message)}`;
});

// --- COOKIE CONSENT LOGIC ---
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
const rejectCookiesBtn = document.getElementById('rejectCookiesBtn');

window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('safwan_cookie_consent')) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 800);
    }
    checkSavedUser();
});

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('safwan_cookie_consent', 'accepted');
    cookieBanner.style.display = 'none';
    showToast('Cookies Accepted', 'Your cookie preferences have been saved.');
});

rejectCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('safwan_cookie_consent', 'rejected');
    cookieBanner.style.display = 'none';
    showToast('Cookies Rejected', 'Only essential cookies are active.');
});

// --- EMAIL LOGIN & SIGN UP LOGIC ---
let currentAuthMode = 'login';
const authModal = document.getElementById('authModal');

function openAuthModal(mode) {
    currentAuthMode = mode;
    updateAuthUI();
    authModal.classList.add('show');
}

function closeAuthModal() {
    authModal.classList.remove('show');
}

function toggleAuthMode() {
    currentAuthMode = currentAuthMode === 'login' ? 'signup' : 'login';
    updateAuthUI();
}

function updateAuthUI() {
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const switchText = document.getElementById('authSwitchText');
    const switchBtn = document.getElementById('authSwitchBtn');
    const nameGroup = document.getElementById('nameFieldGroup');
    const nameInput = document.getElementById('authName');

    if (currentAuthMode === 'login') {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Login with your email address to access your account.';
        submitBtn.textContent = 'Login with Email';
        switchText.textContent = "Don't have an account?";
        switchBtn.textContent = 'Sign Up';
        nameGroup.style.display = 'none';
        nameInput.required = false;
    } else {
        title.textContent = 'Create an Account';
        subtitle.textContent = 'Sign up with your email to start collaborating with Safwan.';
        submitBtn.textContent = 'Create Account';
        switchText.textContent = 'Already have an account?';
        switchBtn.textContent = 'Login';
        nameGroup.style.display = 'block';
        nameInput.required = true;
    }
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    localStorage.setItem('safwan_user_email', email);
    
    closeAuthModal();
    checkSavedUser();
    this.reset();

    const msg = currentAuthMode === 'login' 
        ? `Welcome back, ${email}!` 
        : `Account created for ${email}!`;
    showToast('Authentication Successful', msg);
});

function checkSavedUser() {
    const savedEmail = localStorage.getItem('safwan_user_email');
    const guestActions = document.getElementById('guestActions');
    const userSession = document.getElementById('userSession');
    const loggedInEmail = document.getElementById('loggedInEmail');

    if (savedEmail) {
        guestActions.style.display = 'none';
        userSession.style.display = 'flex';
        loggedInEmail.textContent = savedEmail;
        // Auto-fill contact email if logged in
        const contactEmailInput = document.getElementById('clientEmail');
        if (contactEmailInput && !contactEmailInput.value) {
            contactEmailInput.value = savedEmail;
        }
    } else {
        guestActions.style.display = 'flex';
        userSession.style.display = 'none';
    }
}

function logoutUser() {
    localStorage.removeItem('safwan_user_email');
    checkSavedUser();
    showToast('Logged Out', 'You have been signed out safely.');
}

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
});
