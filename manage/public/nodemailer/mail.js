// main.js
var nodemailer = require('nodemailer');

const option = {
    service: 'gmail',
    auth: {
        user: 'mail.toidicode@gmail.com', // email hoặc username
        pass: '******' // password
    }
};
var transporter = nodemailer.createTransport(option);

transporter.verify(function(error, success) {
    // Nếu có lỗi.
    if (error) {
        console.log(error);
    } else { //Nếu thành công.
        console.log('Kết nối thành công!');
        var mail = {
            from: 'toidicode.com@gmail.com', // Địa chỉ email của người gửi
            to: 'thanhtai96nd@gmail.com, admin@toicode.com', // Địa chỉ email của người gửi
            subject: 'Thư được gửi bằng Node.js', // Tiêu đề mail
            text: 'Toidicode.com học lập trình online miễn phí', // Nội dung mail dạng text
        };
        //Tiến hành gửi email
        transporter.sendMail(mail, function(error, info) {
            if (error) { // nếu có lỗi
                console.log(error);
            } else { //nếu thành công
                console.log('Email sent: ' + info.response);
            }
        });
    }
});