require('dotenv').config();
const express = require('express');
const path = require('path');
const emailjs = require('@emailjs/nodejs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour l'envoi d'email
app.post('/send-email', async (req, res) => {
    const { from_name, reply_to, message } = req.body;

    try {
        const result = await emailjs.send(
            'service_4ab2q68', // Service ID
            'template_contact', // Template ID - vous devrez le créer dans EmailJS
            {
                from_name: from_name,
                reply_to: reply_to,
                message: message,
                to_email: 'ctlpowerr@gmail.com'
            },
            {
                publicKey: '4gEzT9DkXPjvp2WxD', // Clé publique
                privateKey: process.env.EMAILJS_PRIVATE_KEY // Clé privée sécurisée
            }
        );

        console.log('Email envoyé avec succès:', result);
        res.json({ success: true, message: 'Email envoyé avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de l\'envoi de l\'email: ' + error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
