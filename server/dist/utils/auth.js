"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.createAccessToken = (user) => jsonwebtoken_1.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
});
exports.createRefreshToken = (user) => jsonwebtoken_1.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
});
exports.sendRefreshToken = (res, token) => {
    res.cookie('jid', token, {
        httpOnly: true,
        path: '/refresh_token',
    });
};
//# sourceMappingURL=auth.js.map