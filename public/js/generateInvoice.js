const pdfArea = document.getElementById('display-pdf');
const createBtn = document.getElementById('create-invoice');

pdfArea.style.display = 'none';

createBtn.addEventListener('click', () => {
    pdfArea.style.display = 'inherit';
});

