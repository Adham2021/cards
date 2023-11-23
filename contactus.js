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
app.post('/submit-form', async (req, res) => {
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
            subject: `New Contact from ${name}`,
            text: `Name: ${name}\nPhone: ${phone}\nMessage: ${massage}`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ', info);

        // Respond to the client
        res.status(200).send('Thank you! Your message has been sent.');
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send('Oops! Something went wrong.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
