const cameraFeed = document.getElementById('camera-feed');
const captureButton = document.getElementById('capture-button');
const canvas = document.getElementById('photo-canvas');
const context = canvas.getContext('2d');
let cameraStream = null;

async function startCamera() {
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraFeed.srcObject = cameraStream;
    } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
        alert('Não foi possível acessar a câmera. Verifique as permissões.');
    }
}

function capturePhoto() {
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'red';
    context.lineWidth = 50;
    context.strokeRect(0, 0, canvas.width, canvas.height);
    downloadPhoto();
}

function downloadPhoto() {
    const imageURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'cabine_de_fotos.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

startCamera();
captureButton.addEventListener('click', capturePhoto);