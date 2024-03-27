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
        user: 'ionmedia.me@gmail.com', // Your Gmail email address
        pass: 'oeqr mieq wnxh wdba', // Your Gmail password (use an app password for security)
    },
});

// Define a route for sending emails
app.post('/send-email', (req, res) => {
  const { to, name, phone,message ,cc} = req.body;

  const mailOptions = {
    from: 'ionmedia.me@gmail.com', // Replace with your email address
    to: to,
    cc:cc,
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
                    <p>All rights reserved to Ionmedia</p>
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
  app.get('/thank', (req, res) => {
    res.sendFile(path.join(__dirname, 'thank.html'));
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

  app.use('/rest', express.static(path.join(__dirname, 'rest')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'rest', 'index.html'));
  });

  app.use('/bayan', express.static(path.join(__dirname, 'bayan')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bayan', 'index.html'));
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bayan', 'style.css'));
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

  app.use('/mohanad', express.static(path.join(__dirname, 'mohanad')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mohanad', 'index.html'));
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mohanad', 'style.css'));
  });

  app.use('/ns-saleh', express.static(path.join(__dirname, 'ns-saleh')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ns-saleh', 'index.html'));
  });

  app.use('/digitech', express.static(path.join(__dirname, 'digitech')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'digitech', 'index.html'));
  });
  app.use('/ameen', express.static(path.join(__dirname, 'ameen')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ameen', 'index.html'));
  });
  app.use('/jannah', express.static(path.join(__dirname, 'jannah')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'jannah', 'index.html'));
  });

  app.use('/break-zone', express.static(path.join(__dirname, 'break-zone')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'break-zone', 'index.html'));
  });

  app.use('/dr-m.matani', express.static(path.join(__dirname, 'dr-m.matani')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dr-m.matani', 'index.html'));
  });

  app.use('/menu', express.static(path.join(__dirname, 'menu')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu', 'index.html'));
  });

  app.use('/emissa', express.static(path.join(__dirname, 'emissa')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'emissa', 'index.html'));
  });

  app.use('/dr.nutella', express.static(path.join(__dirname, 'dr.nutella')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dr.nutella', 'index.html'));
  });

  app.use('/lubna', express.static(path.join(__dirname, 'lubna')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'lubna', 'index.html'));
  });

  app.use('/sky-of-jerusalem', express.static(path.join(__dirname, 'sky-of-jerusalem')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sky-of-jerusalem', 'index.html'));
  });

  app.use('/omaima', express.static(path.join(__dirname, 'omaima')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'omaima', 'index.html'));
  });

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
