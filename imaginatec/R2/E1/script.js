document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.getElementById('contactButton');
    contactButton.onclick = function() {
        alert('Correo: jhondoe@ejemplo.com\n Teléfono: (123) 456-7890');
    };
});