document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    if (form) {
        // Variável de controle
        let isSubmitting = false;

        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            if (isSubmitting) return; // Bloqueia reenvios
            isSubmitting = true;

            // Desabilita o botão
            const submitBtn = form.querySelector('[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                const formData = new FormData(form);
                const dados = {};
                formData.forEach((value, key) => {
                    dados[key] = value;
                });

                await enviarRespostas(dados);
                
                // Remove o listener após sucesso
                form.removeEventListener('submit', arguments.callee);
                
            } catch (error) {
                console.error(error);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Tentar Novamente';
                isSubmitting = false;
            }
        });
    }
});