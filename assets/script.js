//Variáveis Globais

const buttonAdd = document.getElementById("add-button");
const inputPredios = document.getElementById("inputGroupSelect01");
const inputLocais = document.getElementById("input-locais");
const tbody = document.getElementById("table");

let selectedId = null;
let arrLocaisTrabalho = new Array();

//Função que pega os dados do LocalStograge

function getData() {
  if (localStorage.hasOwnProperty("key")) {
    arrLocaisTrabalho = JSON.parse(localStorage.getItem("key"));
  }
}

//Função que insere os dados no LocalStorage

function setData() {
  localStorage.setItem("key", JSON.stringify(arrLocaisTrabalho));
}

//Função que reseta os inputs após adicionar items.

function limpaForm() {
  inputPredios.value = "Selecione um prédio";
  inputLocais.value = "";
}

//Função de adicionar novo item

buttonAdd.addEventListener("click", addNewItem);

function addNewItem() {
  const id = +new Date();

  if (inputPredios.value == "Selecione um prédio") {
    alert("Selecione um prédio!");
    inputPredios.focus();
    return;
  }

  if (inputLocais.value == "") {
    alert("Informe um local!");
    inputLocais.focus();
    return;
  }

  getData();

  arrLocaisTrabalho.push({
    id,
    predio: inputPredios.value,
    local: inputLocais.value,
  });

  setData();

  tbody.insertAdjacentHTML(
    "beforeend",
    `
  <tr id="${id}">
  <td class="nomePredio">${inputPredios.value}</td>
  <td class="nomeLocal">${inputLocais.value}</td>
  <td>
    <span onclick="editForm(${id})" data-toggle="modal" data-target="#myModal" id="edit-button" href="#" class="button-edit material-icons">mode</span>
    <span onclick="removeForm(${id})" href="#" id="remove-button" class="button-remove material-icons">delete_forever</span>
  </td>
  </tr>
  `
  );

  limpaForm();
}

window.addEventListener("load", loadContent);

function loadContent() {
  if (localStorage.hasOwnProperty("key")) {
    JSON.parse(localStorage.getItem("key")).forEach((item) => {
      tbody.insertAdjacentHTML(
        "beforeend",
        `
      <tr id="${item.id}">
      <td class="nomePredio">${item.predio}</td>
      <td class="nomeLocal">${item.local}</td>
      <td>
        <span onclick="editForm(${item.id})" data-toggle="modal" data-target="#myModal" id="edit-button" href="#" class="button-edit material-icons">mode</span>
        <span onclick="removeForm(${item.id})" href="#" id="remove-button" class="button-remove material-icons">delete_forever</span>
      </td>
      </tr>
      `
      );
    });
  }
}

//Função de remover o item

function removeForm(id) {
  const getTr = document.getElementById(id);

  if (confirm("Esta ação é irreversível, deseja prosseguir?")) {
    getTr.remove();
  }

  getData();

  const filteredLocal = arrLocaisTrabalho.filter((local) => local.id !== id);
  localStorage.setItem("key", JSON.stringify(filteredLocal));
}

//Função de editar o item

function editForm(id) {
  selectedId = id;
}

function saveEdit() {
  const editPredios = document.getElementById("inputGroupSelect01-edit");
  const editLocais = document.getElementById("input-locais-edit");
  const tr = document.getElementById(selectedId);
  const tdNomePredio = tr.getElementsByClassName("nomePredio")[0];
  const tdNomeLocal = tr.getElementsByClassName("nomeLocal")[0];

  tdNomePredio.innerHTML = editPredios.value;
  tdNomeLocal.innerHTML = editLocais.value;

  getData();

  const index = arrLocaisTrabalho.findIndex((local) => local.id === selectedId);
  arrLocaisTrabalho[index].predio = editPredios.value;
  arrLocaisTrabalho[index].local = editLocais.value;

  setData();

  //Reseta os inputs de edição no Modal

  if (editPredios.value !== "...") {
    editPredios.value = "...";
    editLocais.value = "";
  }
}
