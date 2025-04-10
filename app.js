const htmlEditor = document.getElementById("html-code");
const cssEditor = document.getElementById("css-code");
const jsEditor = document.getElementById("js-code");
const output = document.getElementById("output");
const themeSelector = document.getElementById("theme-selector");
const saveBtn = document.getElementById("save-btn");
const loadBtn = document.getElementById("load-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
let currentIndex = savedProjects.length - 1;

function updateOutput() {
  const source = `
    <html>
      <head><style>${cssEditor.value}</style></head>
      <body>
        ${htmlEditor.value}
        <script>
          try {
            ${jsEditor.value}
          } catch (e) {
            document.body.innerHTML += '<pre style="color:red;">' + e + '</pre>';
          }
        <\/script>
      </body>
    </html>`;
  output.srcdoc = source;
}

[htmlEditor, cssEditor, jsEditor].forEach(editor => {
  editor.addEventListener("input", updateOutput);
});

window.onload = () => {
  if (currentIndex >= 0) {
    loadProject(currentIndex);
  }
  updateOutput();
};

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function saveProject() {
  const project = {
    html: htmlEditor.value,
    css: cssEditor.value,
    js: jsEditor.value,
  };
  savedProjects.push(project);
  currentIndex = savedProjects.length - 1;
  localStorage.setItem("projects", JSON.stringify(savedProjects));
}

function loadProject(index) {
  if (index >= 0 && index < savedProjects.length) {
    const project = savedProjects[index];
    htmlEditor.value = project.html;
    cssEditor.value = project.css;
    jsEditor.value = project.js;
    currentIndex = index;
    updateOutput();
  }
}

function loadPrevProject() {
  if (currentIndex > 0) {
    loadProject(currentIndex - 1);
  }
}

function loadNextProject() {
  if (currentIndex < savedProjects.length - 1) {
    loadProject(currentIndex + 1);
  }
}

saveBtn.addEventListener("click", saveProject);
loadBtn.addEventListener("click", () => loadProject(currentIndex));
prevBtn.addEventListener("click", loadPrevProject);
nextBtn.addEventListener("click", loadNextProject);
themeSelector.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeSelector.value === "dark");
});
