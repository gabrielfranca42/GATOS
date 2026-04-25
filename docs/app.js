
const API = 'https://gatos-46yy.onrender.com/dogs';

const form = document.getElementById('form');
const list = document.getElementById('list');

let editId = null;

/* ================= CREATE + UPDATE ================= */
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);

  const image = document.getElementById('image').files[0];
  if (image) formData.append('image', image);

  if (editId) {
    // UPDATE
    await fetch(`${API}/${editId}`, {
      method: 'PUT',
      body: formData
    });

    editId = null;
  } else {
    // CREATE
    await fetch(API, {
      method: 'POST',
      body: formData
    });
  }

  form.reset();
  loadDogs();
});

/* ================= READ ================= */
async function loadDogs() {
  const res = await fetch(API);
  const dogs = await res.json();

  list.innerHTML = '';

  dogs.forEach(dog => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h3>${dog.name}</h3>

      <img src="https://gatos-46yy.onrender.com/uploads/${dog.image}" width="200"/>

      <br>

      <!-- BOTÃO EDITAR -->
      <button onclick="editDog('${dog._id}', '${dog.name}')">
        Editar
      </button>

      <!-- BOTÃO DELETAR -->
      <button onclick="deleteDog('${dog._id}')">
        Excluir
      </button>
    `;

    list.appendChild(div);
  });
}

/* ================= DELETE ================= */
async function deleteDog(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  loadDogs();
}

/* ================= EDIT (preenche form) ================= */
function editDog(id, name) {
  document.getElementById('name').value = name;
  editId = id;
}

/* iniciar */
loadDogs();