document.addEventListener('DOMContentLoaded', function() {
    const verificateButton = document.getElementById('verificateButton');
    
    // Asignamos la función al evento onclick del botón
    verificateButton.onclick = function() {
        // Obtenemos el valor de la URL dentro del evento
        const urlInput = document.getElementById('urlInt').value;
        verifyUrl(urlInput);
    };
});

async function verifyUrl(url) {
    const resultSection = document.getElementById('resultSection');
    const resultMessage = document.getElementById('resultMessage');
    const linkContainer = document.getElementById('linkContainer');

    // Limpiamos resultados anteriores
    resultMessage.textContent = 'Verificando...';
    linkContainer.innerHTML = ''; // Limpia el contenedor del enlace
    resultSection.style.display = 'block';

    // Primero, verificamos que el input no esté vacío
    if (!url) {
        resultMessage.textContent = 'Por favor, ingresa una URL.';
        return;
    }

    // Añadimos https:// si el usuario no lo puso
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        fullUrl = 'https://' + url;
    }

    try {
        // Usamos fetch para verificar si la URL es accesible.
        // 'no-cors' nos permite hacer la petición sin problemas de CORS,
        // aunque no podemos leer la respuesta, es suficiente para validar.
        await fetch(fullUrl, { mode: 'no-cors' });
        
        // Si fetch tiene éxito (no lanza error), consideramos la URL válida.
        resultMessage.textContent = '✅ ¡La URL parece ser válida y está activa!';
        
        // Creamos el enlace para ir a la página
        const link = document.createElement('a');
        link.href = fullUrl;
        link.textContent = 'Ir a la URL en una nueva pestaña';
        link.target = '_blank'; // Para abrir en una nueva pestaña
        
        // Aplicamos estilos de botón al enlace
        link.style.display = 'inline-block';
        link.style.marginTop = '15px';
        link.style.padding = '10px 20px';
        link.style.backgroundColor = '#684c6e';
        link.style.color = 'white';
        link.style.textDecoration = 'none';
        link.style.borderRadius = '5px';
        
        linkContainer.appendChild(link);

    } catch (error) {
        // Si fetch falla (ej. la URL no existe, no hay conexión), atrapamos el error.
        resultMessage.textContent = '❌ No se pudo acceder a la URL. Puede que no exista o esté mal escrita.';
    }
}