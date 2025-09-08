const url = 'mon-document.pdf'; // Nom exact de ton PDF
let pdfDoc = null;
let pageNum = 1;

const container = document.getElementById('pdf-container');
const pageInfo = document.getElementById('page-info');

pdfjsLib.getDocument(url).promise.then(doc => {
  pdfDoc = doc;
  renderPage();
});

function renderPage() {
  container.innerHTML = '';

  pdfDoc.getPage(pageNum).then(page => {
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Largeur max pour simuler un livre de poche
    const maxWidth = 400; // ~ format livre de poche en px
    const scale = Math.min((window.innerWidth * 0.8) / viewport.width, maxWidth / viewport.width);

    const scaledViewport = page.getViewport({ scale });
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    container.appendChild(canvas);

    page.render({ canvasContext: ctx, viewport: scaledViewport });
  });

  pageInfo.textContent = `Page ${pageNum} / ${pdfDoc.numPages}`;
}

// Boutons navigation
document.getElementById('prev').addEventListener('click', () => {
  if (pageNum > 1) { pageNum--; renderPage(); }
});

document.getElementById('next').addEventListener('click', () => {
  if (pageNum < pdfDoc.numPages) { pageNum++; renderPage(); }
});

// Navigation clavier
window.addEventListener('keydown', (e) => {
  if (e.key === "ArrowLeft") {
    if (pageNum > 1) { pageNum--; renderPage(); }
  } else if (e.key === "ArrowRight") {
    if (pageNum < pdfDoc.numPages) { pageNum++; renderPage(); }
  }
});

// Redimensionnement dynamique
window.addEventListener('resize', () => {
  if (pdfDoc) renderPage();
});
