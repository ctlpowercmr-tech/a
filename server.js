require('dotenv').config();
const express = require('express');
const path = require('path');
const emailjs = require('@emailjs/nodejs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Route pour l'envoi d'email
app.post('/send-email', async (req, res) => {
    const { from_name, reply_to, message } = req.body;

    try {
        await emailjs.send(
            'service_4ab2q68', // Votre Service ID
            'YOUR_TEMPLATE_ID', // À REMPLACER par votre Template ID
            {
                from_name: from_name,
                reply_to: reply_to,
                message: message,
                to_email: 'ctlpowerr@gmail.com' // Votre email
            },
            {
                publicKey: '4gEzT9DkXPjvp2WxD', // Votre clé publique
                privateKey: process.env.EMAILJS_PRIVATE_KEY // Clé privée sécurisée
            }
        );

        res.json({ success: true, message: 'Email envoyé avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur lors de l\'envoi de l\'email' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
