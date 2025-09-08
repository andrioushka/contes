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
    const viewport = page.getViewport({ scale: 1 }); // échelle initiale 1
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Calcul automatique de l'échelle pour que le PDF remplisse la largeur
    const scale = (window.innerWidth * 0.9) / viewport.width; // 90% de la largeur de l'écran
    const scaledViewport = page.getViewport({ scale });

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    container.appendChild(canvas);

    page.render({ canvasContext: ctx, viewport: scaledViewport });
  });

  pageInfo.textContent = `Page ${pageNum} / ${pdfDoc.numPages}`;
}

document.getElementById('prev').addEventListener('click', () => {
  if (pageNum > 1) {
    pageNum--;
    renderPage();
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (pageNum < pdfDoc.numPages) {
    pageNum++;
    renderPage();
  }
});

// Recalculer l'échelle si l'utilisateur redimensionne la fenêtre
window.addEventListener('resize', () => {
  if (pdfDoc) renderPage();
});
