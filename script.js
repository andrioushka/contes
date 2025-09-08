


const url = 'mon-document.pdf'; // ton PDF
let pdfDoc = null;
let pageNum = 1;

const container = document.getElementById('pdf-container');
const pageInfo = document.getElementById('page-info');

pdfjsLib.getDocument(url).promise.then(doc => {
  pdfDoc = doc;
  renderPages();
});

function renderPages() {
  container.innerHTML = '';
  
  const renderPage = (num) => {
    pdfDoc.getPage(num).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      container.appendChild(canvas);
      page.render({ canvasContext: context, viewport: viewport });
    });
  }

  renderPage(pageNum);
  if (pageNum + 1 <= pdfDoc.numPages) renderPage(pageNum + 1);

  pageInfo.textContent = `Pages ${pageNum} - ${Math.min(pageNum + 1, pdfDoc.numPages)} / ${pdfDoc.numPages}`;
}

document.getElementById('prev').addEventListener('click', () => {
  if (pageNum > 2) {
    pageNum -= 2;
    renderPages();
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (pageNum + 2 <= pdfDoc.numPages + 1) {
    pageNum += 2;
    renderPages();
  }
});
