const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000; // You can use any available port

// Body parser middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve your static files (like your HTML page)
app.use(express.static('public'));

// // POST endpoint to handle form submissions
// app.post('/submit-form_main', async (req, res) => {
//     console.log(req)
//     try {
//         const { name, phone, massage } = req.body;

//         // Create a Nodemailer transporter
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'adham.shahwan94@gmail.com', // Your Gmail email address
//                 pass: 'qypb goij naqg cfiq', // Your Gmail password (use an app password for security)
//             },
//         });

//         // Email options
//         const mailOptions = {
//             from: 'adham.shahwan94@gmail.com',
//             to: 'adham@fit-x.app',
//             subject: `ליד חדש שמעוניין בשירות שלך`,
//             text: `שם הלקוח: ${name}\nמספר טלפון: ${phone}\nהתוכן: ${massage}`,
//         };

//         // Send the email
//         const info = await transporter.sendMail(mailOptions);

//         // Respond to the client
//         res.status(200).send('תודה רבה,הפרטים שלך נקלטו במערכת, נחזור אליך בהקדם!');
//     } catch (error) {
//         console.error('שגיאה בשליחת נתונים: ', error);
//         res.status(500).send('שגיאה בשליחת נתונים');
//     }
// });

app.post('/submit-form_index', async (req, res) => {
    console.log(req)
    try {
        const cs1Name = req.body.cs1Name;
        const cs1Email = req.body.cs1Email;
        const cs1PhoneNum = req.body.cs1PhoneNum

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adham.shahwan94@gmail.com', // Your Gmail email address
                pass: 'qypb goij naqg cfiq', // Your Gmail password (use an app password for security)
            },
        });

        // Email options
        const mailOptions = {
            from: 'adham.shahwan94@gmail.com',
            to: 'adham@fit-x.app',
            subject: 'ליד חדש מתעניין בשירות שלך',
            html: `
              <!DOCTYPE html>
              <html lang="he" dir="rtl">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body {
                      font-family: 'Arial', sans-serif;
                      line-height: 1.6;
                      margin: 0;
                      padding: 20px;
                      text-align: center;
                      background-color: #f4f4f4;
                    }
                    .email-container {
                      background-color: #fff;
                      padding: 20px;
                      border-radius: 10px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      text-align: right;
                      display: inline-block;
                    }
                    h2 {
                      color: #333;
                    }
                    p {
                      color: #555;
                      align-items:center;
                    }
                    strong {
                      color: #000;
                      display: block;
                    }
                    .footer {
                      margin-top: 20px;
                      color: #777;
                    }
                    .copyright {
                      display: inline-block;
                      margin-top: 10px;
                    }

                  </style>
                </head>
                <body>
                  <div class="email-container">
                    <h2>ליד חדש מתעניין בשירות שלך</h2>
                    <p><strong>שם:</strong>${cs1Name}</p>
                    <p><strong>מספר טלפון:</strong>${cs1PhoneNum}</p>
                    <p><strong>אימייל:</strong>${cs1Email}</p>
                    
                  </div>
                  <div class="footer">
                    <p>All rights reserved to Eye On Media</p>
                    <span class="copyright">&copy; ${new Date().getFullYear()}</span>
                  </div>
                </body>
              </html>
            `,
          };
          
          
          
          
          

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Respond to the client
        res.status(200).send('success');
    } catch (error) {
        console.error('שגיאה בשליחת נתונים: ', error);
        res.status(500).send('שגיאה בשליחת נתונים');
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
