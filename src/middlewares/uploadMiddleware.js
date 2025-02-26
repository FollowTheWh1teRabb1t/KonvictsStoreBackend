const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Definir o caminho do diretório de upload
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Verifique se o diretório 'uploads' existe e crie-o se necessário
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Diretório de destino ajustado
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
