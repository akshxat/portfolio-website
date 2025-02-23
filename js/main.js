/*
	Author: Akshat Bhatnagar
	Date: 2024-12-12
	Description: JavaScript for Akshat's E-Portfolio
*/

const pdf = 'resume-akshat.pdf';

pdfjsLib.getDocument(pdf).promise.then(pdf => {

	pdf.getPage(1).then(page => {
		const scale = 3;
		const viewport = page.getViewport({ scale });

		const canvas = document.getElementById('pdf-canvas');
		const context = canvas.getContext('2d');

		canvas.width = viewport.width;
		canvas.height = viewport.height;

		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		page.render(renderContext);
	});
}).catch(error => {
	console.error('Error loading PDF:', error);
});