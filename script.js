// ===================================
// ROBSON MENEZES ADVOGADOS
// Interactive Calculator & Utilities
// ===================================

// Scroll to simulator
function scrollToSimulator() {
    const simulator = document.getElementById('simulator');
    if (simulator) {
        simulator.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Scroll to contact/honorarios
function scrollToContact() {
    const honorarios = document.getElementById('honorarios');
    if (honorarios) {
        honorarios.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Format currency input
function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    input.value = value;
}

// Parse currency to number
function parseCurrency(value) {
    if (!value) return 0;
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}

// Format number to currency display
function formatToCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Add currency formatting to inputs
document.addEventListener('DOMContentLoaded', function() {
    const currencyInputs = document.querySelectorAll('#rendaTributavel, #valorAnualEscola');
    
    currencyInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatCurrency(this);
        });
        
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Add focus effects to all inputs
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Main calculator function
function calcularBeneficio() {
    // Get input values
    const rendaTributavel = parseCurrency(document.getElementById('rendaTributavel').value);
    const valorAnualEscola = parseCurrency(document.getElementById('valorAnualEscola').value);
    const aliquotaIR = parseFloat(document.getElementById('aliquotaIR').value);
    const idadeAtual = parseInt(document.getElementById('idadeAtual').value);
    const anosFaculdade = parseInt(document.getElementById('anosFaculdade').value);
    
    // Validate inputs
    if (!rendaTributavel || !valorAnualEscola || !aliquotaIR || !idadeAtual) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    if (idadeAtual < 0 || idadeAtual > 25) {
        alert('Por favor, insira uma idade válida (0-25 anos).');
        return;
    }
    
    // Education limit table (2024 values - adjust as needed)
    const limiteEducacao = 3561.50; // Annual limit for education deduction
    
    // Calculate additional deduction
    const deducaoAdicional = Math.max(0, valorAnualEscola - limiteEducacao);
    
    // Calculate annual savings
    const economiaAnual = deducaoAdicional * (aliquotaIR / 100);
    
    // Calculate 5-year savings (retroactive)
    const economia5anos = economiaAnual * 5;
    
    // Calculate remaining years until 18
    const anosRestantes = Math.max(0, 18 - idadeAtual);
    
    // Calculate total future horizon
    const horizonteTotal = anosRestantes + anosFaculdade;
    
    // Calculate future benefit
    const beneficioFuturo = economiaAnual * horizonteTotal;
    
    // Calculate total estimated benefit
    const beneficioTotalEstimado = economia5anos + beneficioFuturo;
    
    // Display results
    displayResults(economiaAnual, economia5anos, beneficioFuturo, beneficioTotalEstimado);
}

// Display results with animation
function displayResults(economiaAnual, economia5anos, beneficioFuturo, beneficioTotal) {
    const resultsSection = document.getElementById('results');
    
    // Update values
    document.getElementById('economiaAnual').textContent = formatToCurrency(economiaAnual);
    document.getElementById('economia5anos').textContent = formatToCurrency(economia5anos);
    document.getElementById('beneficioFuturo').textContent = formatToCurrency(beneficioFuturo);
    document.getElementById('beneficioTotal').textContent = formatToCurrency(beneficioTotal);
    
    // Show results with animation
    resultsSection.style.display = 'block';
    resultsSection.style.opacity = '0';
    resultsSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsSection.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        resultsSection.style.opacity = '1';
        resultsSection.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate result cards
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
    
    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav-glass');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 6, 64, 0.95)';
        nav.style.boxShadow = '0 4px 24px rgba(10, 6, 64, 0.5)';
    } else {
        nav.style.background = 'rgba(10, 6, 64, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-glass, .section-dark, .section-simulator');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
});

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Glass card tilt effect (subtle 3D effect on hover)
document.addEventListener('DOMContentLoaded', () => {
    const glassCards = document.querySelectorAll('.glass-card, .feature-card, .nucleo-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Console message
console.log('%c🏛️ Robson Menezes Advogados', 'color: #365780; font-size: 20px; font-weight: bold;');
console.log('%cLanding Page desenvolvida com Liquid Glass Design', 'color: #88b4e0; font-size: 12px;');
