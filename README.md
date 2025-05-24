# 🎁 Plataforma de Conexão entre Doadores e Artesãs

Este projeto propõe uma solução para conectar doadores a artesãs e costureiras que produzem peças artesanais para doação, como roupas, mantas e brinquedos. A plataforma visa facilitar a distribuição de materiais e aumentar a visibilidade do trabalho voluntário dessas artesãs.

---

## 🌐 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **Tailwind CSS** – Framework utilitário para estilização rápida e responsiva.
- **JavaScript**
- **Font Awesome** – Ícones e elementos visuais.

### Head padrão utilizado nas páginas:
```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="../css/style.css">
<script src="../js/script.js" defer></script>

📁 Estrutura de Pastas

📦 projeto/
├── 📁 css/
├── 📁 html/
├── 📁 images/
└── 📁 js/

👥 Perfis de Usuário

🛠️ Administrador

** Funcionalidades: **

    - Painel de controle, gestão de artesãos, pedidos, feeds e eventos.

** Páginas HTML: **

    - admin-index.html

    - admin-dashboard.html

    - admin-artesaos.html

    - admin-pedidos.html, admin-pedidos-cadastrar.html

    - admin-feeds.html, admin-feeds-cadastrar.html, admin-feeds-editar.html, admin-feeds-visualizar.html

    - admin-eventos.html, admin-eventos-cadastrar.html, admin-eventos-editar.html, admin-eventos-visualizar.html

    - admin-usuarios.html, admin-usuarios-cadastrar.html, admin-usuarios-editar.html, admin-usuarios-visualizar.html

👩‍🎨 Usuário Artesão

** Funcionalidades: **

    - Cadastro e gerenciamento de pedidos, eventos e feeds.

** Páginas HTML: **

    - usuario-index.html

    - usuario-artesaos.html

    - usuario-pedidos.html, usuario-pedidos-cadastrar.html

    - usuario-feeds.html, usuario-feeds-cadastrar.html, usuario-feeds-editar.html, usuario-feeds-listar.html, usuario-feeds-visualizar.html

    - usuario-eventos.html, usuario-eventos-visualizar.html

    - usuario-cadastrar.html, usuario-editar.html, usuario-visualizar.html

👀 Usuário Não Cadastrado

** Funcionalidades: **

    - Acesso limitado à visualização de conteúdos.

** Páginas HTML: **

    - index.html

    - artesaos.html

    - pedidos.html

    - feeds.html, feeds-visualizar.html

    - eventos.html, eventos-visualizar.html

    - usuarios.html

🔐 Autenticação

** Páginas HTML: **

    - login.html

    - register.html

    - forgot-password.html

📱 Responsividade

    - O layout é mobile-first e totalmente responsivo, utilizando classes utilitárias do Tailwind CSS para garantir uma boa experiência em qualquer dispositivo.

🎯 Objetivos do Projeto

    - Facilitar a gestão de pedidos e materiais por parte das artesãs.

    - Conectar doadores a projetos voluntários de forma prática.

    - Aumentar a visibilidade do trabalho artesanal solidário.

    - Oferecer uma plataforma leve, funcional e acessível.