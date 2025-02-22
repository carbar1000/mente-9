async function enviarRespostas(dados) {
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
}

function startSurvey() {
    const intro = document.getElementById('intro');
    const form = document.getElementById('myForm');
    
    if (intro && form) {

        intro.classList.add('hidden');
        form.classList.remove('hidden');
    }
}

function autoNext() {
    const currentContainer = document.querySelector('.form-container.active');
    if (currentContainer) {
        const nextButton = currentContainer.querySelector('button[onclick="navigate(1)"]');
        if (nextButton) {
            setTimeout(() => {
                nextButton.click();
            }, 500);
        }
    }
}

// Make functions available globally
window.startSurvey = startSurvey;
window.autoNext = autoNext;
