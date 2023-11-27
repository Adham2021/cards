const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000; // You can use any available port

// Body parser middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve your static files (like your HTML page)
app.use(express.static('public'));

// POST endpoint to handle form submissions
app.post('/submit-form_main', async (req, res) => {
    try {
        const { name, phone, massage } = req.body;

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
            subject: `ליד חדש שמעוניין בשירות שלך`,
            text: `שם הלקוח: ${name}\nמספר טלפון: ${phone}\nהתוכן: ${massage}`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Respond to the client
        res.status(200).send('תודה רבה,הפרטים שלך נקלטו במערכת, מחזור אליך בהקדם!');
    } catch (error) {
        console.error('שגיאה בשליחת נתונים: ', error);
        res.status(500).send('שגיאה בשליחת נתונים');
    }
});

app.post('/submit-form_index', async (req, res) => {
    try {
        const { cs1Name, cs1Email, cs1PhoneNum } = req.body;

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
            subject: `ליד חדש שמעוניין בשירות שלך`,
            text: `שם הלקוח: ${cs1Name}\nמספר טלפון: ${cs1PhoneNum}\nהתוכן: ${cs1Email}`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Respond to the client
        res.status(200).send('תודה רבה,הפרטים שלך נקלטו במערכת, מחזור אליך בהקדם!');
    } catch (error) {
        console.error('שגיאה בשליחת נתונים: ', error);
        res.status(500).send('שגיאה בשליחת נתונים');
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
