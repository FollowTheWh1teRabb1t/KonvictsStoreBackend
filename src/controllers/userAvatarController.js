const DiskStorage = require('../providers/DiskStorage');
const db = require('../database/knex/index');

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await db('users').where({id: user_id}).first();

        if (!user) {
            throw new AppError('Somente usuários autenticados podem mudar o avatar')
        }

        if(user.profileImage) {
            await diskStorage.deleteFile(user.profileImage);
        }

        const filename = await diskStorage.saveFile(avatarFilename);

        await db('users')
        .update({profileImage: filename})
        .where({id: user_id});

        return response.json({profileImage: filename})

    }
}

module.exports = UserAvatarController;