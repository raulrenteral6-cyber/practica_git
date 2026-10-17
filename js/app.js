/**
 * DevHub - Datos y Lógica del Proyecto
 * 
 * 💡 TIPS PARA PRACTICAR GIT:
 * - Puedes crear una rama: `git checkout -b feature/nuevo-elemento`
 * - Agrega un nuevo lenguaje o tecnología al array `items` debajo.
 * - Guarda los cambios y haz un commit con mensaje descriptivo.
 */

const items = [
  // --- LENGUAJES ---
  {
    id: "js",
    nombre: "JavaScript",
    tipo: "lenguaje",
    icono: "⚡",
    descripcion: "Lenguaje fundamental de la web. Permite interactividad en el cliente y backend con Node.js.",
    etiquetas: ["Web", "Frontend", "Backend"]
  },
  {
    id: "py",
    nombre: "Python",
    tipo: "lenguaje",
    icono: "🐍",
    descripcion: "Lenguaje versátil y legible, muy popular en ciencia de datos, inteligencia artificial y scripting.",
    etiquetas: ["Data Science", "AI", "Backend"]
  },
  {
    id: "ts",
    nombre: "TypeScript",
    tipo: "lenguaje",
    icono: "🔷",
    descripcion: "Superconjunto de JavaScript que añade tipado estático opcional para desarrollo robusto.",
    etiquetas: ["Tipado", "Web", "Escalabilidad"]
  },
  {
    id: "rust",
    nombre: "Rust",
    tipo: "lenguaje",
    icono: "🦀",
    descripcion: "Lenguaje enfocado en rendimiento y seguridad de memoria sin recolector de basura.",
    etiquetas: ["Sistemas", "Rendimiento", "Concurrencia"]
  },

  // --- TECNOLOGÍAS Y HERRAMIENTAS ---
  {
    id: "react",
    nombre: "React",
    tipo: "tecnologia",
    icono: "⚛️",
    descripcion: "Biblioteca declarativa y eficiente de JavaScript para construir interfaces de usuario interactivas.",
    etiquetas: ["UI", "Frontend", "Componentes"]
  },
  {
    id: "node",
    nombre: "Node.js",
    tipo: "tecnologia",
    icono: "🟢",
    descripcion: "Entorno de ejecución de JavaScript del lado del servidor basado en el motor V8 de Chrome.",
    etiquetas: ["Servidor", "Runtime", "APIs"]
  },
  {
    id: "docker",
    nombre: "Docker",
    tipo: "tecnologia",
    icono: "🐳",
    descripcion: "Plataforma de contenedores que empaqueta aplicaciones y dependencias para entornos reproducibles.",
    etiquetas: ["DevOps", "Contenedores", "Despliegue"]
  },
  {
    id: "git",
    nombre: "Git & GitHub",
    tipo: "tecnologia",
    icono: "🐙",
    descripcion: "Sistema de control de versiones distribuido para rastrear cambios en código y colaborar en equipo.",
    etiquetas: ["Control de Versiones", "Colaboración", "Flujo de Trabajo"]
  }
];

// Estado de la aplicación
let activeFilter = "all";
let searchTerm = "";

// Elementos del DOM
const cardsGrid = document.getElementById("cardsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".tab-btn");
const countAll = document.getElementById("count-all");
const countLenguajes = document.getElementById("count-lenguajes");
const countTecnologias = document.getElementById("count-tecnologias");

// Actualizar contadores
function updateCounters() {
  const lenguajes = items.filter(item => item.tipo === "lenguaje").length;
  const tecnologias = items.filter(item => item.tipo === "tecnologia").length;

  if (countAll) countAll.textContent = items.length;
  if (countLenguajes) countLenguajes.textContent = lenguajes;
  if (countTecnologias) countTecnologias.textContent = tecnologias;
}

// Renderizar tarjetas
function renderCards() {
  const filtered = items.filter(item => {
    const matchesFilter = (activeFilter === "all") || (item.tipo === activeFilter);
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch = !search || 
      item.nombre.toLowerCase().includes(search) ||
      item.descripcion.toLowerCase().includes(search) ||
      item.etiquetas.some(tag => tag.toLowerCase().includes(search));

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    cardsGrid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  cardsGrid.innerHTML = filtered.map(item => `
    <article class="card" data-tipo="${item.tipo}" id="card-${item.id}">
      <div class="card-top">
        <div class="card-icon" aria-hidden="true">${item.icono}</div>
        <span class="badge ${item.tipo}">${item.tipo === 'lenguaje' ? 'Lenguaje' : 'Tecnología'}</span>
      </div>
      <h3 class="card-title">${item.nombre}</h3>
      <p class="card-desc">${item.descripcion}</p>
      <div class="card-tags">
        ${item.etiquetas.map(tag => `<span class="tag">#${tag}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

// Configurar eventos
function setupEventListeners() {
  // Búsqueda en tiempo real
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderCards();
  });

  // Filtros por botón
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderCards();
    });
  });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  updateCounters();
  setupEventListeners();
  renderCards();
});
