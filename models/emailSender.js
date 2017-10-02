const mailer = require('nodemailer');

export class emailSender {
  static createEmail(email, link, name) {
    // Use Smtp Protocol to send Email
    const smtpTransport = mailer.createTransport({
      service: 'gmail',
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'no.reply.cair@gmail.com',
        pass: 'yourpassword'
      }
    });

    const mail = {
      from: 'no.reply.cair@gmail.com',
      to: email,
      subject: 'Confirmation of your account',
      text: `Hello, ${name}!, please clink on the link to verify your account ${link}`
    };

    smtpTransport.sendMail(mail, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.message);
      }
      smtpTransport.close();
    });
  }
}
