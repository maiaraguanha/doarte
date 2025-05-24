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

// Dados simulados do usuário logado
const usuarioLogado = {
    id: 1,
    nome: "Maria Silva",
    email: "maria@exemplo.com"
};

// Array para armazenar os pedidos
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
let materiaisTemp = [];
let editingId = null;
let deleteId = null;

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    renderPedidos();
});

// Função para abrir o modal
function openModal(pedidoId = null) {
    const modal = document.getElementById('pedidoModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('pedidoForm');
    
    editingId = pedidoId;
    materiaisTemp = [];
    
    if (pedidoId) {
    const pedido = pedidos.find(p => p.id === pedidoId);
    modalTitle.textContent = 'Editar Pedido';
    
    // Preencher o formulário
    document.getElementById('pedidoId').value = pedido.id;
    document.getElementById('titulo').value = pedido.titulo;
    document.getElementById('descricao').value = pedido.descricao;
    document.getElementById('prioridade').value = pedido.prioridade;
    
    materiaisTemp = [...pedido.materiais];
    renderMateriaisTemp();
    } else {
    modalTitle.textContent = 'Novo Pedido';
    form.reset();
    document.getElementById('pedidoId').value = '';
    renderMateriaisTemp();
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('pedidoModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    materiaisTemp = [];
    editingId = null;
}

// Função para adicionar material
function addMaterial() {
    const nome = document.getElementById('materialNome').value.trim();
    const quantidade = document.getElementById('materialQuantidade').value.trim();
    
    if (nome && quantidade) {
    materiaisTemp.push({ nome, quantidade });
    document.getElementById('materialNome').value = '';
    document.getElementById('materialQuantidade').value = '';
    renderMateriaisTemp();
    }
}

// Função para remover material
function removeMaterial(index) {
    materiaisTemp.splice(index, 1);
    renderMateriaisTemp();
}

// Função para renderizar materiais temporários
function renderMateriaisTemp() {
    const container = document.getElementById('materiaisLista');
    
    if (materiaisTemp.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-sm">Nenhum material adicionado ainda</p>';
    return;
    }
    
    container.innerHTML = materiaisTemp.map((material, index) => `
    <span class="material-tag">
        ${material.nome} (${material.quantidade})
        <button type="button" onclick="removeMaterial(${index})">
        <i class="fas fa-times text-xs"></i>
        </button>
    </span>
    `).join('');
}

// Função para salvar pedido
document.getElementById('pedidoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const prioridade = document.getElementById('prioridade').value;
    
    if (materiaisTemp.length === 0) {
    alert('Adicione pelo menos um material ao pedido');
    return;
    }
    
    const pedido = {
    id: editingId || Date.now(),
    titulo,
    descricao,
    materiais: [...materiaisTemp],
    prioridade,
    status: 'pendente',
    usuarioId: usuarioLogado.id,
    usuarioNome: usuarioLogado.nome,
    dataCriacao: editingId ? pedidos.find(p => p.id === editingId).dataCriacao : new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
    };
    
    if (editingId) {
    const index = pedidos.findIndex(p => p.id === editingId);
    pedidos[index] = pedido;
    } else {
    pedidos.push(pedido);
    }
    
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    renderPedidos();
    closeModal();
    
    // Mostrar notificação de sucesso
    showNotification(editingId ? 'Pedido atualizado com sucesso!' : 'Pedido criado com sucesso!');
});

// Função para renderizar pedidos
function renderPedidos() {
    const container = document.getElementById('pedidosList');
    const noPedidos = document.getElementById('noPedidos');
    
    if (pedidos.length === 0) {
    container.innerHTML = '';
    noPedidos.classList.remove('hidden');
    return;
    }
    
    noPedidos.classList.add('hidden');
    
    container.innerHTML = pedidos.map(pedido => `
    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 fade-in">
        <div class="p-6">
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-800">${pedido.titulo}</h3>
            <span class="px-2 py-1 text-xs font-medium rounded-full ${getPrioridadeClass(pedido.prioridade)}">
            ${pedido.prioridade.charAt(0).toUpperCase() + pedido.prioridade.slice(1)}
            </span>
        </div>
        
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${pedido.descricao}</p>
        
        <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Materiais solicitados:</h4>
            <div class="flex flex-wrap gap-1">
            ${pedido.materiais.slice(0, 3).map(material => `
                <span class="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
                ${material.nome}
                </span>
            `).join('')}
            ${pedido.materiais.length > 3 ? `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+${pedido.materiais.length - 3} mais</span>` : ''}
            </div>
        </div>
        
        <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span><i class="fas fa-calendar mr-1"></i> ${formatDate(pedido.dataCriacao)}</span>
            <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Pendente</span>
        </div>
        
        <div class="flex gap-2">
            <button onclick="openModal(${pedido.id})" 
                    class="flex-1 px-3 py-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors text-sm font-medium">
            <i class="fas fa-edit mr-1"></i> Editar
            </button>
            <button onclick="openDeleteModal(${pedido.id})" 
                    class="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
            <i class="fas fa-trash mr-1"></i> Excluir
            </button>
        </div>
        </div>
    </div>
    `).join('');
}

// Função para abrir modal de exclusão
function openDeleteModal(pedidoId) {
    deleteId = pedidoId;
    document.getElementById('deleteModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal de exclusão
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('show');
    document.body.style.overflow = 'auto';
    deleteId = null;
}

// Função para confirmar exclusão
function confirmDelete() {
    if (deleteId) {
    pedidos = pedidos.filter(p => p.id !== deleteId);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    renderPedidos();
    closeDeleteModal();
    showNotification('Pedido excluído com sucesso!');
    }
}

// Funções auxiliares
function getPrioridadeClass(prioridade) {
    switch(prioridade) {
    case 'alta': return 'bg-red-100 text-red-700';
    case 'media': return 'bg-yellow-100 text-yellow-700';
    case 'baixa': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 slide-down';
    notification.innerHTML = `
    <div class="flex items-center">
        <i class="fas fa-check-circle mr-2"></i>
        ${message}
    </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
    notification.remove();
    }, 3000);
}

// Permitir adicionar material com Enter
document.getElementById('materialQuantidade').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
    e.preventDefault();
    addMaterial();
    }
});

// Fechar modal ao clicar fora
document.getElementById('pedidoModal').addEventListener('click', function(e) {
    if (e.target === this) {
    closeModal();
    }
});

document.getElementById('deleteModal').addEventListener('click', function(e) {
    if (e.target === this) {
    closeDeleteModal();
    }
});