// Adicione no início do handler da API
if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ error: 'Content-Type deve ser application/json' });
}

// Verificação de duplicatas (adaptar à sua lógica)
const { data: existing } = await supabase
    .from('respostas')
    .select()
    .eq('email', req.body.email)
    .eq('created_at', new Date().toISOString().split('T')[0]);

if (existing.length > 0) {
    return res.status(409).json({ error: 'Resposta já registrada hoje' });
}