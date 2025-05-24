// Script para o menu do mobile abrir 
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.querySelector('.menu-icon');
    
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Scrip para marcar o item de menu ativo com base na URL atual
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
    if (currentPath.includes(link.getAttribute('href'))) {
        link.classList.add('active');
    }
    });
});