const images = [];
for (let i = 1; i <= 108; i++) {
    images.push(`page_${i}.png`);
}
let currentPage = 0;
const totalPages = images.length - 1; // Adicione esta linha

function updateImage() {
    const pageImage = document.getElementById('page-image');
    pageImage.src = images[currentPage];
    pageImage.alt = `Página ${currentPage + 1}`;
    updateButtons();
    updateActiveLink();
}

function updateButtons() {
    document.getElementById("prev-overlay").disabled = (currentPage <= 0); // Corrigido para <= 0
    document.getElementById("next-overlay").disabled = (currentPage >= totalPages);
    
    // Mantém a aparência dos botões mesmo quando desabilitados
    document.getElementById("prev-overlay").style.opacity = 
        (currentPage <= 0) ? "0.5" : "1";
    document.getElementById("next-overlay").style.opacity = 
        (currentPage >= totalPages) ? "0.5" : "1";
}

function updateActiveLink() {
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
        
        // Adiciona efeito glow permanente para o link ativo
        if ((currentPage === 0 && link.id === 'link-capa') ||
            (currentPage === totalPages && link.id === 'link-ultima') ||
            (parseInt(link.dataset.page) === currentPage + 1)) {
            link.classList.add('active');
        }
    });
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateImage();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updateImage();
    }
}

function toggleZoom() {
    const pageImage = document.getElementById('page-image');
    pageImage.classList.toggle('zoomed');
}

// Navegação pelos links do menu
document.querySelectorAll('.menu a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageIndex = parseInt(link.getAttribute('data-page'), 10) - 1;
        if (pageIndex >= 0 && pageIndex <= totalPages) {
            currentPage = pageIndex;
            updateImage();
        }
    });
});

document.getElementById('link-capa').addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = 0;
    updateImage();
});

document.getElementById('link-ultima').addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = totalPages;
    updateImage();
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    updateImage();
});
