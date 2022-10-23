const { user_game } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    JWT_SIGNATURE_KEY
} = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const {username, password} = req.body;
            
            const isExist = await user_game.findOne({where: {username: username}});
            if(isExist) {
                return res.status(409).json({
                    status: false,
                    message: 'username already used',
                    data: null
                });
            }

            const user_gameData = await user_game.create({
                username,
                password: await bcrypt.hash(password, 10),
            });

            return res.status(201).json({
                status: true,
                message: 'create new user game success',
                data: user_gameData
            });

        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const user = await user_game.findOne({where: {username: username}});
            if(!user) {
                return res.status(400).json({
                    status: false,
                    message: 'username doesnt exist',
                    data: null,
                });
            }

            const correct = await bcrypt.compare(password, user.password);
            if(!correct) {
                return res.status(400).json({
                    status: false,
                    message: 'wrong username or password',
                    data: null
                });
            }

            // generate payload
            payload = {
                id: user.id,
                username: user.username
            };

            const token = jwt.sign(payload, JWT_SIGNATURE_KEY);

            return res.status(201).json({
                status: true,
                message: 'login success',
                data: {
                    username: user.username,
                    token: token
                }
            });

        } catch (err) {
            next(err);
        }
    },
    whoami: (req, res, next) => {
        try {
            const user = req.user;
            return res.status(200).json({
                status: true,
                message: 'whoami success',
                data: user
            });
        } catch (err) {
            next(err);
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const { old_password, new_password, confirm_new_password } = req.body;

            if(new_password !== confirm_new_password) {
                return res.status(422).json({
                    status: false,
                    message: 'new password and confirm new password doesnt match'
                });
            }

            const user = await user_game.findOne({where: {id: req.user.id}});
            if(!user) {
                return res.status(404).json({
                    status: false,
                    message: 'user not found',
                    data: null
                });
            }

            const isMatch = await bcrypt.compare(old_password, user.password);
            if(!isMatch) {
                return res.status(404).json({
                    status: false,
                    message: 'wrong current password',
                    data: null
                });
            }

            const hashedNewPassword = await bcrypt.hash(new_password, 10);
            const isChanged = await user.update({password: hashedNewPassword});

            return res.status(200).json({
                status: true,
                message: 'change password success',
                data: isChanged
            });
        } catch (err) {
            next(err);
        }
    }
};