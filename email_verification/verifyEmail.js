const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {
    HOST,
    PORT,
    JWT_EMAIL_SECRET,
    SENDER_EMAIL_HOST,
    SENDER_EMAIL_PORT,
    SENDER_EMAIL_ID,
    SENDER_EMAIL_PASSWORD
} = process.env;

const transporter = nodemailer.createTransport({
    host: SENDER_EMAIL_HOST,
    port: SENDER_EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: SENDER_EMAIL_ID, // sender email address
        pass: SENDER_EMAIL_PASSWORD // sender email password
    }
});

const getVerificationLink = (email) => {
    const verifyToken = jwt.sign(
        {
            email: email
        },
        JWT_EMAIL_SECRET,
        { expiresIn: '1h' }
    );
    return `http://${HOST}:${PORT}/user/email-verification?verifyToken=${verifyToken}`;
};

const sendVerificationMail = async (receiverEmail) => {
    const link = getVerificationLink(receiverEmail);
    // send mail with defined transport object
    try {
        const info = await transporter.sendMail({
            from: SENDER_EMAIL_ID, // sender address
            to: `${receiverEmail}`, // list of receivers
            subject: 'Verification: Email address', // Subject line
            html: `
		        <div>Please click in the following link to verify your email address.</div>
		        <a href=${link} target="_blank">${link}</a>
		        ` // html body
        });
        if (info && info.messageId) {
            // console.log('email already has been sent');
        } else {
            // console.log('email failed to send');
        }
    } catch (error) {
        throw new Error(`Verification mail sent failed. Reason: ${error}`);
    }
};

module.exports = sendVerificationMail;
