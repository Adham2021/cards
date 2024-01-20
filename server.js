const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to handle file paths

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configure Nodemailer with your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'adham.shahwan94@gmail.com', // Your Gmail email address
        pass: 'qypb goij naqg cfiq', // Your Gmail password (use an app password for security)
    },
});

// Define a route for sending emails
app.post('/send-email', (req, res) => {
  const { to, name, phone,message } = req.body;

  const mailOptions = {
    from: 'adham.shahwan94@gmail.com', // Replace with your email address
    to: to,
    subject: "ליד חדש מתעניין בשירות שלך",
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
                    <p><strong>שם:</strong>${name}</p>
                    <p><strong>מספר טלפון:</strong>${phone}</p>
                    <p><strong>תוכן:</strong>${message}</p>
                    
                  </div>
                  <div class="footer">
                    <p>All rights reserved to Eye On Media</p>
                    <span class="copyright">&copy; ${new Date().getFullYear()}</span>
                  </div>
                </body>
              </html>
            `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});


// Serve your HTML form when accessing the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // Serve static assets like CSS files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
  });
  
  app.use('/mk', express.static(path.join(__dirname, 'mk')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mk', 'index.html'));
  });

  app.use('/5rooms-kitchens', express.static(path.join(__dirname, '5rooms-kitchens')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '5rooms-kitchens', 'index.html'));
  });

  app.use('/am', express.static(path.join(__dirname, 'am')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'am', 'index.html'));
  });

  app.use('/bayan', express.static(path.join(__dirname, 'bayan')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bayan', 'index.html'));
  });

  app.use('/dr-sholy', express.static(path.join(__dirname, 'dr-sholy')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dr-sholy', 'index.html'));
});

  app.use('/elmajd', express.static(path.join(__dirname, 'elmajd')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'elmajd', 'index.html'));
  });

  app.use('/oranet', express.static(path.join(__dirname, 'oranet')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'oranet', 'index.html'));
  });

  app.use('/rest', express.static(path.join(__dirname, 'rest')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'rest', 'index.html'));
  });

  app.use('/selawi', express.static(path.join(__dirname, 'selawi')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'selawi', 'index.html'));
  });

  app.use('/rizik', express.static(path.join(__dirname, 'rizik')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'rizik', 'index.html'));
  });

  app.use('/chacour-rabeia', express.static(path.join(__dirname, 'chacour-rabeia')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chacour-rabeia', 'index.html'));
  });

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 3000; // You can use any available port
// const path = require('path');

// // Redirect middleware for www to non-www or vice versa
// app.use((req, res, next) => {
//   const host = req.headers.host;
//   if (host.startsWith('www.')) {
//     const newHost = host.substring(4); // Remove 'www.' from the beginning
//     return res.redirect(301, `http://${newHost}${req.url}`);
//   }
//   next();
// });

// // Body parser middleware to parse form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname))); // Serve static files

// // Serve your HTML form when accessing the root path
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Serve the root-level style.css file
// app.get('/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname, 'style.css'));
//   });
// // Serve static assets like CSS files
// app.use('/assets', express.static(path.join(__dirname, 'assets')));


// // Serve your HTML form when accessing the root path
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'mk', 'index.html'));
//   });
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, '404.html'));
// });


// app.post('/send-email', async (req, res) => {
//     console.log('Received POST request at /send-email');
//     try {
//         const cs1Name = req.body.cs1Name;
//         const cs1Email = req.body.cs1Email;
//         const cs1PhoneNum = req.body.cs1PhoneNum

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
//             subject: 'ליד חדש מתעניין בשירות שלך',
//             html: `
//               <!DOCTYPE html>
//               <html lang="he" dir="rtl">
//                 <head>
//                   <meta charset="UTF-8">
//                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                   <style>
//                     body {
//                       font-family: 'Arial', sans-serif;
//                       line-height: 1.6;
//                       margin: 0;
//                       padding: 20px;
//                       text-align: center;
//                       background-color: #f4f4f4;
//                     }
//                     .email-container {
//                       background-color: #fff;
//                       padding: 20px;
//                       border-radius: 10px;
//                       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                       text-align: right;
//                       display: inline-block;
//                     }
//                     h2 {
//                       color: #333;
//                     }
//                     p {
//                       color: #555;
//                       align-items:center;
//                     }
//                     strong {
//                       color: #000;
//                       display: block;
//                     }
//                     .footer {
//                       margin-top: 20px;
//                       color: #777;
//                     }
//                     .copyright {
//                       display: inline-block;
//                       margin-top: 10px;
//                     }

//                   </style>
//                 </head>
//                 <body>
//                   <div class="email-container">
//                     <h2>ליד חדש מתעניין בשירות שלך</h2>
//                     <p><strong>שם:</strong>${cs1Name}</p>
//                     <p><strong>מספר טלפון:</strong>${cs1PhoneNum}</p>
//                     <p><strong>אימייל:</strong>${cs1Email}</p>
                    
//                   </div>
//                   <div class="footer">
//                     <p>All rights reserved to Eye On Media</p>
//                     <span class="copyright">&copy; ${new Date().getFullYear()}</span>
//                   </div>
//                 </body>
//               </html>
//             `,
//           };
          
          
          
          
          

//         // Send the email
//         const info = await transporter.sendMail(mailOptions);

//         // Respond to the client
//         res.status(200).send('success');
//     } catch (error) {
//         console.error('שגיאה בשליחת נתונים: ', error);
//         res.status(500).send('שגיאה בשליחת נתונים');
//     }
// });
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
