let pdfDoc = null;
let currentPage = 1;
const scale = 1.2;
const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");
const pageInfo = document.getElementById("page-info");

// Charger un PDF
async function loadPDF(url) {
  pdfDoc = await pdfjsLib.getDocument(url).promise;
  currentPage = 1;
  renderPage(currentPage);
}

// Afficher une page
async function renderPage(num) {
  const page = await pdfDoc.getPage(num);
  const viewport = page.getViewport({ scale });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({ canvasContext: ctx, viewport }).promise;

  pageInfo.textContent = `Page ${num} / ${pdfDoc.numPages}`;
}

// Boutons navigation
document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < pdfDoc.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

// Flèches clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  } else if (e.key === "ArrowRight" && currentPage < pdfDoc.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

// Charger le PDF par défaut
loadPDF("document1.pdf");
