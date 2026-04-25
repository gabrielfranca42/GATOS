document.addEventListener('DOMContentLoaded', () => {
  const API = 'https://gatos-46yy.onrender.com/dogs';

  const form = document.getElementById('form');
  const list = document.getElementById('list');
  const nameInput = document.getElementById('name');
  const imageInput = document.getElementById('image');

  let editId = null;

  // ===== CREATE / UPDATE =====
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', nameInput.value);

    if (imageInput.files[0]) {
      formData.append('image', imageInput.files[0]);
    }

    try {
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: 'PUT',
          body: formData
        });
        editId = null;
      } else {
        await fetch(API, {
          method: 'POST',
          body: formData
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
          <img src="https://gatos-46yy.onrender.com/uploads/${dog.image}" />
          <button class="delete" data-id="${dog._id}">Excluir</button>
          <button class="edit" data-id="${dog._id}" data-name="${dog.name}">Editar</button>
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
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadDogs();
    }

    // EDIT
    if (e.target.classList.contains('edit')) {
      nameInput.value = e.target.dataset.name;
      editId = id;
    }
  });

  loadDogs();
});