const API = 'https://gatos-46yy.onrender.com/dogs';

const form = document.getElementById('form');
const list = document.getElementById('list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('image', document.getElementById('image').files[0]);

  await fetch(API, {
    method: 'POST',
    body: formData
  });

  form.reset();
  loadDogs();
});

async function loadDogs() {
  const res = await fetch(API);
  const dogs = await res.json();

  list.innerHTML = '';

  dogs.forEach(dog => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h3>${dog.name}</h3>
      <img src="https://gatos-46yy.onrender.com/uploads/${dog.image}" />
      <br>
      <button onclick="deleteDog('${dog._id}')">Excluir</button>
    `;

    list.appendChild(div);
  });
}

async function deleteDog(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadDogs();
}

loadDogs();