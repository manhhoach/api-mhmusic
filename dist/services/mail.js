"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require('nodemailer'); // vcl quả bug ảo diệu
const mail_1 = __importDefault(require("./../helper/mail"));
const google_auth_library_1 = require("google-auth-library");
function sendMail(email, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.googleClientID_mail, process.env.googleClientSecret_mail);
        oAuth2Client.setCredentials({ refresh_token: process.env.refreshToken_mail });
        let accessToken = yield oAuth2Client.getAccessToken();
        let token = accessToken.token;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.mail,
                clientId: process.env.googleClientID_mail,
                clientSecret: process.env.googleClientSecret_mail,
                refreshToken: process.env.refreshToken_mail,
                accessToken: token
            }
        });
        const mailOptions = {
            to: email,
            subject: 'Forgot password',
            html: mail_1.default.replace('URL_RESET_PASSWORD', url)
        };
        return transporter.sendMail(mailOptions);
    });
}
exports.sendMail = sendMail;
