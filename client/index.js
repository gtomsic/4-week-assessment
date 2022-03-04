const text = document.querySelector('textarea');
const form = document.querySelector('form');
const ul = document.querySelector('ul');

let activeIndex;

document.getElementById('complimentButton').onclick = function () {
  axios.get('http://localhost:4000/api/compliment/').then(function (response) {
    const data = response.data;
    alert(data);
  });
};

window.addEventListener('load', async () => {
  console.log('Window loaded');
  const { data } = await axios.get('http://localhost:4000/api/compliments');
  renderContent(data);
});

const deleteCompliment = async (e, index) => {
  e.preventDefault();
  console.log(index, 'Delete Item');
  const { data } = await axios.delete(
    `http://localhost:4000/api/compliment/${index}`
  );
  renderContent(data);
};

const addCompliment = async (e) => {
  e.preventDefault();
  const compliment = text.value;
  const { data } = await axios.post('http://localhost:4000/api/compliment', {
    compliment,
  });
  renderContent(data);
  text.value = '';
};

const renderContent = (data) => {
  ul.innerHTML = '';
  if (data.length > 0) {
    data.forEach((item, index) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      const btnEdit = document.createElement('button');
      const div = document.createElement('div');
      btn.textContent = 'Delete';
      btn.classList = 'btn-delete';
      btnEdit.textContent = 'Edit';
      btnEdit.classList = 'btn-edit';
      li.innerHTML = `<span>${item}</span>`;
      div.appendChild(btnEdit);
      div.appendChild(btn);
      li.appendChild(div);
      ul.appendChild(li);
      btn.addEventListener('click', (e) => deleteCompliment(e, index));
      btnEdit.addEventListener('click', (e) => editCompliment(e, index));
    });
  }
};

const activeModal = document.querySelector('.modal');
activeModal.addEventListener('click', (e) => {
  e.stopPropagation();
});

const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', (e) => {
  activeModal.classList.toggle('active');
  activeModal.classList.add('hide');
});

form.addEventListener('submit', addCompliment);

// Edit Compliment
const formEdit = document.querySelector('#edit-form');
const input = document.querySelector('input');

const editCompliment = async (e, index) => {
  e.stopPropagation();
  e.preventDefault();
  activeModal.classList.toggle('active');
  activeModal.classList.toggle('hide');
  console.log(index, 'Edit this');
  const { data } = await axios.get(
    `http://localhost:4000/api/compliment/${index}`
  );
  console.log(data);
  input.value = data.compliment;
  activeIndex = data.index;
};

formEdit.addEventListener('submit', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Edited');
  const { data } = await axios.put(`http://localhost:4000/api/compliment`, {
    index: activeIndex,
    compliment: input.value,
  });
  renderContent(data);
  activeModal.classList.remove('active');
  activeModal.classList.add('hide');
});
