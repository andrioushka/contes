const url = 'mon-document.pdf'; // Nom exact du PDF
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
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    container.appendChild(canvas);
    page.render({ canvasContext: ctx, viewport: viewport });
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
