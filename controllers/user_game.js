const { user_game } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    index: async (req, res, next) => {
        try {
            const usersGameData = await user_game.findAll({raw: true});
            return res.status(200).json({
                status: true,
                message: 'get all user game success',
                data: usersGameData
            })
        } catch (err) {
            next(err);
        }
    },
    show: async (req, res, next) => {
        try {
            const {userGameId} = req.params;
            const userGameData = await user_game.findOne({where: {id: userGameId}});
            if(!userGameData) {
                return res.status(400).json({
                    status: false,
                    message: 'user not found',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'get user game success',
                data: userGameData.get()
            });
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const {username, password} = req.body;
            
            const isExist = await user_game.findOne({where: {username: username}});
            if(isExist) {
                return res.status(409).json({
                    status: false,
                    message: 'username already used'
                });
            }

            const userGameData = await user_game.create({
                username,
                password: await bcrypt.hash(password, 10),
            });

            return res.status(201).json({
                status: true,
                message: 'create new user game success',
                data: userGameData
            });
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const {userGameId} = req.params;
            let {username, password} = req.body;

            const userGameData = await user_game.findOne({where: {id: userGameId}});
            if(!userGameData) {
                return res.status(400).json({
                    status: false,
                    message: 'user not found',
                    data: null
                });
            }

            if(!username) username = userGameData.username;
            if(!password) password = userGameData.password;

            const isUpdated = await user_game.update({
                username,
                password: await bcrypt.hash(password, 10)
            }, {
                where: {id: userGameId}
            });

            return res.status(200).json({
                status: true,
                message: 'update user game success',
                data: isUpdated
            });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const {userGameId} = req.params;

            const userGameData = await user_game.findOne({where: {id: userGameId}});
            if(!userGameData) {
                return res.status(400).json({
                    status: false,
                    message: 'user not found',
                    data: null
                });
            }

            const isDeleted = await user_game.destroy({
                where: {id: userGameId}
            });

            return res.status(201).json({
                status: true,
                message: 'delete user game success',
                data: isDeleted
            });
        } catch (err) {
            next(err);
        }
    }
}