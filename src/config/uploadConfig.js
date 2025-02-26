const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

// Definindo a pasta temporária para armazenar arquivos temporariamente
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

// Definindo a pasta de upload onde os arquivos finais serão armazenados
const uploadFolder = path.resolve(__dirname, "..", "..", "uploads"); // Altere o caminho conforme necessário

module.exports = {
  tmpFolder,
  uploadFolder,
  MULTER: {
    storage: multer.diskStorage({
      destination: tmpFolder, // Armazenando temporariamente
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const filename = `${fileHash}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  },
};
