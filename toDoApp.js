var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

//Transforma os dados que estão salvos em forma de JSON na forma de Array novamente.

//Caso não consiga retornar um valor viável da primera operação, ele retorna um array vazio.

var toDoList = JSON.parse(localStorage.getItem('listToDos') || [])

function renderToDoList() {
  //Percorre cada item do array(toDoList), e retorna dentro de uma variável(toDoItem)

  listElement.innerHTML = '';

  for (toDoItem of toDoList) {
    var toDoItemElement = document.createElement('li');
    var toDoItemText = document.createTextNode(toDoItem);

    var toDoLink = document.createElement('a');
    toDoLink.setAttribute('href', '#');

    var toDoEdit = document.createElement('a');
    toDoEdit.setAttribute('href', '#');

    var toDoEditText = document.createTextNode(' Editar');
    toDoEdit.appendChild(toDoEditText);

    var toDoLinkText = document.createTextNode(' Exluir');
    toDoLink.appendChild(toDoLinkText);

    toDoItemElement.appendChild(toDoItemText);
    toDoItemElement.appendChild(toDoLink);
    toDoItemElement.appendChild(toDoEdit);

    listElement.appendChild(toDoItemElement);

    var pos = toDoList.indexOf(toDoItem);
    console.log(pos);

    toDoLink.setAttribute('onclick', 'excludeToDo(' + pos + ')');
    toDoEdit.setAttribute('onclick', 'editToDo(' + pos + ')');
  }
}

function addToDo() {

  var toDoText = inputElement.value;
  toDoList.push(toDoText);

  inputElement.value = '';

  renderToDoList();
  saveToStorage();
}

function excludeToDo(pos) {
  //Remove uma quantidade de itens do array baseado na posição que nós passarmos
  //A partir da posição 'pos' remove 1 elemento do array.


  toDoList.splice(pos, 1);
  renderToDoList();
  saveToStorage();
}

function editToDo(pos) {
  containerElement = document.querySelector('#app form');

  containerElement.innerHTML = ''

  var newInput = document.createElement('input');
  newInput.setAttribute('type', 'Text');
  newInput.setAttribute('value', toDoList[pos]);
  //newInput.setAttribute('placeholder', toDoList[pos]);

  var EditBtn = document.createElement('button');
  EditBtn.setAttribute('onclick', '');
  var EditBtnText = document.createTextNode('Editar');

  EditBtn.appendChild(EditBtnText);

  containerElement = document.querySelector('#app form');

  containerElement.appendChild(newInput)
  containerElement.appendChild(EditBtn)

  //alert(newInput.value);

  var newInputValue = newInput.value;

  EditBtn.onclick = function () {
    var input = newInput.value
    toDoList[pos] = input;
    containerElement.innerHTML = ''

    saveToStorage();
    renderToDoList()

  }



}




function saveToStorage() {
  //Converte o array em uma STRING para poder armazenar no Local Storage.
  var json = JSON.stringify(toDoList);

  localStorage.setItem('listToDos', json);
}

buttonElement.onclick = addToDo;

renderToDoList();