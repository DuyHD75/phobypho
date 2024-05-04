const headerEmailConfig = () => {
    return `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>PHOBYPHO Booking Confirmation</title>
       <style>
           /* Optional styling for a more professional look */
           body {
               font-family: sans-serif;
           }
           table {
               border-collapse: collapse;
           }
           td, th {
               padding: 5px;
               border: 1px solid #ddd;
           }
       </style>
   </head>`
}

const getCustomerEmailContent = (customerName, photoName, serviceName, location, photoSession, totalPrice, senderEmail) => {
    return `
   ${headerEmailConfig()}
   <html>
   <body>
     <h2>PHOBYPHO Xác Nhận Lịch Hẹn</h2>
     <p>Thân Gửi Quý Khách Hàng:  ${customerName},</p>
     <p>Cảm ơn bạn đã tin tưởng và lựa chon dịch vụ của chúng tôi. Chúng tôi sẽ liên hệ với bạn sớm để xác nhận thông tin lịch hẹn ❤️. </p>

     <h3>Chi tiết lịch hẹn</h3>
     <table>
         <tbody>
             <tr>
                 <th>Tên thợ chụp ảnh:</th>
                 <td>${photoName || 'N/A'}</td> </tr>
             <tr>
                 <th>Gói dịch vụ:</th>
                 <td>${serviceName || 'N/A'}</td> </tr>
             <tr>
                 <th>Địa điểm:</th>
                 <td>${location}</td>
             </tr>
             <tr>
                 <th>Ngày & giờ:</th>
                 <td>${photoSession || 'N/A'}</td> </tr>
             <tr>
                 <th>Thành Tiền:</th>
                 <td>${totalPrice}</td>
             </tr>
         </tbody>
     </table>
       <p> Chúng tôi sẽ liên lạc và xác nhận trong thông tin trong khoảng thời gian làm việc từ 7h - 21h!❤️ !</p>
       <p> Chúc bạn có một trải nghiệm chụp ảnh tuyệt vời và có những bước ảnh thật sự hài lòng nhé ❤️ !</p>
     <p>Trân Trọng Cảm Ơn !</p>
     <p>PHOBYPHO : ${senderEmail}</p>
 </body>
 </html>
       `;

}

const getPhotographerEmailContent = (customerName, photoName, serviceName, location, photoSession, totalPrice) => {
    return `
   ${headerEmailConfig()}
   <body>
   <h2>PHOBYPHO Xác Nhận Lịch Hẹn</h2>
   <p>Xin chào ${photoName || 'Photographer'},</p>
   <p>Bạn đã có một lịch hẹn mới từ PHOBYPHO. Vui lòng kiểm tra chi tiết bên dưới nhé 💖!</p>
   
   <h3>Chi tiết lịch hẹn</h3>
   <table>
        <tbody>
             <tr>
                  <th>Tên khách hàng:</th>
                  <td>${customerName || 'N/A'}</td>
             </tr>
             <tr>
                  <th>Dịch vụ đặt:</th>
                  <td>${serviceName || 'N/A'}</td>
             </tr>
             <tr>
                  <th>Địa điểm:</th>
                  <td>${location}</td>
             </tr>
             <tr>
                  <th>Ngày & giờ:</th>
                  <td>${photoSession || 'N/A'}</td>
             </tr>
             <tr>
                  <th>Thành tiền:</th>
                  <td>${totalPrice}</td>
             </tr>
        </tbody>
   </table>

   
   <p>Xin vui lòng xác nhận lại thông tin và sẵn sàng cho buổi chụp. 
   Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi ngay nhé ❤️.</p>
   
   <p>Trân trọng,</p>
   <p>PHOBYPHO</p>
   </body>
   </html>
`;
}

const getCancelBookingMessage = (customerName, photoName, serviceName, location, photoSession, totalPrice, cancelFee) => {
    return `
   ${headerEmailConfig()}
   <body>
   <h2>PHOBYPHO Thông Báo Hủy Lịch Hẹn</h2>
   <p>Xin chào quý khách hàng},</p>
   <p>Chúng tôi muốn thông báo rằng lịch hẹn sau đã được hủy.</p>
   
   <h3>Chi tiết đơn đặt hàng</h3>
   <table>
        <tbody>
             <tr>
                  <th>Tên khách hàng:</th>
                  <td>${customerName || 'N/A'}</td>
             </tr>
             <tr>
                  <th>Dịch vụ đặt:</th>
                  <td>${serviceName || 'N/A'}</td>
             </tr>
             <tr>
                  <th>Địa điểm:</th>
                  <td>${location}</td>
             </tr>
             <tr>
                  <th>Ngày & giờ:</th>
                  <td>${photoSession || 'N/A'}</td>
             </tr>
             <tr>
                  <th>Tổng giá:</th>
                  <td>${totalPrice}</td>
             </tr>

             <tr>
                <th>Phí hủy dịch vụ:</th>
                <td>${cancelFee}
             </td>
        </tbody>
   </table>
   
   <p>Nếu cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi.</p>
   
   <p>Trân trọng,</p>
   <p>PHOBYPHO</p>
   </body>
   </html>
`;
}





const mailOptions = (senderEmail, recipientEmail, htmlMessage, subject) => {
    return {
        from: {
            name: "PHOBYPHO",
            address: senderEmail,
        },
        to: recipientEmail,
        subject: subject,
        html: htmlMessage,
    };
}



const SUBJECT = {
    checkout: {
        CUSTOMER: 'PHOBYPHO Xác Nhận Đặt Lịch Hẹn',
        PHOTOGRAPHER: 'PHOBYPHO Thông Báo Đặt Lịch Hẹn'
    },
    cancel: 'PHOBYPHO Thông Báo Hủy Lịch Hẹn'
};

export default {
    getCustomerEmailContent,
    getPhotographerEmailContent,
    getCancelBookingMessage,
    mailOptions,
    SUBJECT
}