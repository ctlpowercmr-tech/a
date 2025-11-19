// Initialise EmailJS avec ta clé publique ONLY
emailjs.init("4gEzT9DkXPjvp2WxD");

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        from_name: formData.get('from_name'),
        reply_to: formData.get('reply_to'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Message envoyé avec succès!');
            this.reset();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert("Échec de l'envoi du message. Détails dans la console.");
    }
});
