document.addEventListener('DOMContentLoaded', () => {
  const API = 'https://gatos-46yy.onrender.com/dogs';

  const form = document.getElementById('form');
  const list = document.getElementById('list');
  const ageInput = document.getElementById('age');
  const nameInput = document.getElementById('name');

  let editId = null;

  // ===== CREATE / UPDATE =====
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dogData = {
      age: ageInput.value,
      name: nameInput.value
    };

    try {
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dogData)
        });
        editId = null;
      } else {
        await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dogData)
        });
      }

      form.reset();
      loadDogs();
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  });

  // ===== READ =====
  async function loadDogs() {
    try {
      const res = await fetch(API);
      const dogs = await res.json();

      list.innerHTML = '';

      dogs.forEach(dog => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
          <h3>${dog.name}</h3>
          <p>🐕 Idade: ${dog.age} ano${dog.age > 1 ? 's' : ''}</p>
          <button class="delete" data-id="${dog._id}">🗑️ Deletar</button>
          <button class="edit" data-id="${dog._id}" data-age="${dog.age}" data-name="${dog.name}">✏️ Editar</button>
        `;

        list.appendChild(div);
      });

    } catch (err) {
      console.error("Erro ao carregar:", err);
    }
  }

  // ===== DELETE + EDIT (EVENT DELEGATION) =====
  list.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;

    // DELETE
    if (e.target.classList.contains('delete')) {
      if (confirm('Tem certeza que deseja deletar este cachorro?')) {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        loadDogs();
      }
    }

    // EDIT
    if (e.target.classList.contains('edit')) {
      ageInput.value = e.target.dataset.age;
      nameInput.value = e.target.dataset.name;
      editId = id;
    }
  });

  loadDogs();
});