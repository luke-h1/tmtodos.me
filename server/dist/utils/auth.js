"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
const createAccessToken = (user) => jsonwebtoken_1.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
});
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => jsonwebtoken_1.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
});
exports.createRefreshToken = createRefreshToken;
const sendRefreshToken = (res, token) => {
    res.cookie('jid', token, {
        httpOnly: true,
        path: '/refresh_token',
    });
};
exports.sendRefreshToken = sendRefreshToken;
//# sourceMappingURL=auth.js.map