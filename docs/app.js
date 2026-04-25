
document.addEventListener('DOMContentLoaded', () => {
  const API = 'https://gatos-46yy.onrender.com/dogs';
  
  // TESTE 1: API responde?
  fetch(API).then(res => res.json()).then(console.log).catch(console.error);
  
  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('📝 Salvando...', {
      age: document.getElementById('age').value,
      name: document.getElementById('name').value
    });
    //ERA A PORRA DO AMBIENTE
    
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: document.getElementById('age').value,
          name: document.getElementById('name').value
        })
      });
      console.log('✅ Resposta:', await res.json());
      location.reload(); // Recarrega página
    } catch (err) {
      console.error('❌ ERRO:', err);
      alert('Erro: ' + err.message);
    }
  });
});