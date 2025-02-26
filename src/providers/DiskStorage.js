const fs = require("fs");
const path = require("path");
const uploadConfig = require("../config/uploadConfig");

class DiskStorage {
  async saveFile(file) {
    // Move o arquivo da pasta tmp para a pasta uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath); // Verifica se o arquivo existe
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); // Deleta o arquivo
  }
}

module.exports = DiskStorage;
