const nodemailer = require('nodemailer') // vcl quả bug ảo diệu
import mailTemplate from './../helper/mail'
import { OAuth2Client } from 'google-auth-library'



export async function sendMail(email: string, url: string){
    const oAuth2Client = new OAuth2Client(process.env.googleClientID_mail, process.env.googleClientSecret_mail)
    oAuth2Client.setCredentials({ refresh_token: process.env.refreshToken_mail })

    let accessToken = await oAuth2Client.getAccessToken();
    
    let token = accessToken.token;


    const transporter: any = nodemailer.createTransport({
        service: 'gmail', // bug nếu dùng import
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.mail,
            clientId: process.env.googleClientID_mail,
            clientSecret: process.env.googleClientSecret_mail,
            refreshToken: process.env.refreshToken_mail,
            accessToken: token
        }
    })

    const mailOptions = {
        to: email,
        subject: 'Forgot password',
        html: mailTemplate.replace('URL_RESET_PASSWORD', url)
    }
    return transporter.sendMail(mailOptions)
}