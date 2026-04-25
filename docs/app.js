document.addEventListener('DOMContentLoaded', () => {
  const API = 'https://gatos-46yy.onrender.com/dogs';

  const form = document.getElementById('form');
  const list = document.getElementById('list');

  let editId = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("clicou cadastrar"); // teste

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);

    const image = document.getElementById('image').files[0];
    if (image) formData.append('image', image);

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
  });

  async function loadDogs() {
    const res = await fetch(API);
    const dogs = await res.json();

    list.innerHTML = '';

    dogs.forEach(dog => {
      const div = document.createElement('div');

      div.innerHTML = `
        <h3>${dog.name}</h3>
        <img src="https://gatos-46yy.onrender.com/uploads/${dog.image}" width="200"/>

        <button onclick="deleteDog('${dog._id}')">Excluir</button>
        <button onclick="editDog('${dog._id}', '${dog.name}')">Editar</button>
      `;

      list.appendChild(div);
    });
  }

  async function deleteDog(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadDogs();
  }

  function editDog(id, name) {
    document.getElementById('name').value = name;
    editId = id;
  }

  loadDogs();
});