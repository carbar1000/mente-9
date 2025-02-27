document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const nomeInput = document.getElementById('nome');
    const nomeWarning = document.getElementById('nome-warning');

    if (form) {
        // Remove event listeners existentes para evitar duplicação e adiciona o novo
        form.removeEventListener('submit', handleSubmit);
        form.addEventListener('submit', handleSubmit);
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

// Supondo que você já tenha configurado o Supabase no seu projeto
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Escutando por novas respostas sendo inseridas na tabela 'respostas'
supabase
  .from('respostas')
  .on('INSERT', payload => {
    console.log('Nova resposta inserida:', payload.new);
    // Aqui, você pode atualizar o frontend, como adicionar a nova resposta na interface
  })
  .subscribe();
