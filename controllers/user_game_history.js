const { user_game_history, user_game } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const userGameHistories = await user_game_history.findAll({raw: true});
            return res.status(200).json({
                status: true,
                message: 'get all user game history success',
                data: userGameHistories
            })
        } catch (err) {
            next(err);
        }
    },
    show: async (req, res, next) => {
        try {
            const {historyId} = req.params;
            const userGameHistory = await user_game_history.findOne({where: {id: historyId}});
            if(!userGameHistory) {
                return res.status(400).json({
                    status: false,
                    message: 'user game history not found',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'get user game history success',
                data: userGameHistory.get()
            });
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const {user_id, spend_time, result, score} = req.body;

            const user = await user_game.findOne({where: {id: user_id}});
            if(!user) {
                return res.status(400).json({
                    status: false,
                    message: 'user game doesnt exist',
                    data: null
                });
            }

            const userGameHistory = await user_game_history.create({
                user_id,
                spend_time,
                result,
                score
            });

            return res.status(201).json({
                status: true,
                message: 'create new user game history success',
                data: userGameHistory
            });
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const {historyId} = req.params;
            let {user_id, spend_time, result, score} = req.body;

            const userGameHistory = await user_game_history.findOne({where: {id: historyId}});
            if(!userGameHistory) {
                return res.status(400).json({
                    status: false,
                    message: 'user game history not found',
                    data: null
                });
            }

            if(!user_id) user_id = userGameHistory.user_id;
            if(!spend_time) spend_time = userGameHistory.spend_time;
            if(!result) result = userGameHistory.result;
            if(!score) score = userGameHistory.score;
            
            const isUpdated = await user_game_history.update({
                user_id,
                spend_time,
                result,
                score
            }, {
                where: {id: historyId}
            });

            return res.status(200).json({
                status: true,
                message: 'update user game history success',
                data: isUpdated
            });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const {historyId} = req.params;

            const userGameHistory = await user_game_history.findOne({where: {id: historyId}});
            if(!userGameHistory) {
                return res.status(400).json({
                    status: false,
                    message: 'user game history not found',
                    data: null
                });
            }

            const isDeleted = await user_game_history.destroy({
                where: {id: historyId}
            });

            return res.status(201).json({
                status: true,
                message: 'delete user game history success',
                data: isDeleted
            });
        } catch (err) {
            next(err);
        }
    }
}