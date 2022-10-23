const { user_game_biodata, user_game } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const usersGameBiodata = await user_game_biodata.findAll({raw: true});
            return res.status(200).json({
                status: true,
                message: 'get all user game biodata success',
                data: usersGameBiodata
            })
        } catch (err) {
            next(err);
        }
    },
    show: async (req, res, next) => {
        try {
            const {userBiodataId} = req.params;
            const userGameBiodata = await user_game_biodata.findOne({where: {id: userBiodataId}});
            if(!userGameBiodata) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'get user game biodata success',
                data: userGameBiodata.get()
            });
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const {user_id, fullname, email, telp, age, city} = req.body;

            const user = await user_game.findOne({where: {id: user_id}});
            if(!user) {
                return res.status(400).json({
                    status: false,
                    message: 'user game doesnt exist',
                    data: null
                });
            }
            
            const isExist = await user_game_biodata.findOne({where: {user_id: user_id}});
            if(isExist) {
                return res.status(409).json({
                    status: false,
                    message: 'user game biodata already exist',
                    data: null
                });
            }

            const userGameBiodata = await user_game_biodata.create({
                user_id,
                fullname,
                email,
                telp,
                age,
                city
            });

            return res.status(201).json({
                status: true,
                message: 'create new user game biodata success',
                data: userGameBiodata
            });
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const {userBiodataId} = req.params;
            let {user_id, fullname, email, telp, age, city} = req.body;

            const userGameBiodata = await user_game_biodata.findOne({where: {id: userBiodataId}});
            if(!userGameBiodata) {
                return res.status(400).json({
                    status: false,
                    message: 'user game biodata not found',
                    data: null
                });
            }

            if(!user_id) user_id = userGameBiodata.user_id;
            if(!fullname) fullname = userGameBiodata.fullname;
            if(!email) email = userGameBiodata.email;
            if(!telp) telp = userGameBiodata.telp;
            if(!age) age = userGameBiodata.age;
            if(!city) city = userGameBiodata.city;

            const isUpdated = await user_game_biodata.update({
                user_id,
                fullname,
                email,
                telp,
                age,
                city
            }, {
                where: {id: userBiodataId}
            });

            return res.status(200).json({
                status: true,
                message: 'update user game biodata success',
                data: isUpdated
            });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const {userBiodataId} = req.params;

            const userGameBiodata = await user_game_biodata.findOne({where: {id: userBiodataId}});
            if(!userGameBiodata) {
                return res.status(400).json({
                    status: false,
                    message: 'user game biodata not found',
                    data: null
                });
            }

            const isDeleted = await user_game_biodata.destroy({
                where: {id: userBiodataId}
            });

            return res.status(201).json({
                status: true,
                message: 'delete user game biodata success',
                data: isDeleted
            });
        } catch (err) {
            next(err);
        }
    }
}