document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const nomeInput = document.getElementById('nome');
    const nomeWarning = document.getElementById('nome-warning');

    if (form) {
        // Remove event listeners existentes para evitar duplicação
        form.removeEventListener('submit', handleSubmit);
        form.addEventListener('submit', handleSubmit);
        
        // Adiciona evento de input para ocultar a mensagem de aviso
        nomeInput.addEventListener('input', function() {
            nomeWarning.classList.add('hidden');
        });
    }
});

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = {};
    formData.forEach((value, key) => {
        dados[key] = value;
    });

    const nomeInput = document.getElementById('nome');
    const nomeWarning = document.getElementById('nome-warning');

    if (!nomeInput.checkValidity()) {
        nomeWarning.classList.remove('hidden');
        return;
    } else {
        nomeWarning.classList.add('hidden');
    }

    enviarRespostas(dados);
}

async function enviarRespostas(dados) {
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (response.ok) {
            window.location.href = 'obrigado.html';
        } else {
            console.error('Erro ao enviar as respostas:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao enviar as respostas:', error);
    }
}
