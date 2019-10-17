var listElement = document.querySelector('#app table');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

//Transforma os dados que estão salvos em forma de JSON na forma de Array novamente.

//Caso não consiga retornar um valor viável da primera operação, ele retorna um array vazio.

var toDoList = JSON.parse(localStorage.getItem('listToDos') || [])

function renderToDoList() {
  //Percorre cada item do array(toDoList), e retorna dentro de uma variável(toDoItem)

  listElement.innerHTML = '';

  for (toDoItem of toDoList) {
    var toDoItemElementContainer = document.createElement('tr')

    var toDoItemElement = document.createElement('td');
    var toDoItemElement2 = document.createElement('td');
    var toDoItemElement3 = document.createElement('td');

    var toDoItemText = document.createTextNode(toDoItem);

    var toDoLink = document.createElement('a');
    toDoLink.setAttribute('href', '#');
    var toDoLinkText = document.createTextNode(' CONCLUIR TAREFA');
    toDoLink.appendChild(toDoLinkText);

    var toDoEdit = document.createElement('a');
    toDoEdit.setAttribute('href', '#');
    var toDoEditText = document.createTextNode(' EDITAR');
    toDoEdit.appendChild(toDoEditText);


    toDoItemElementContainer.appendChild(toDoItemElement);
    toDoItemElementContainer.appendChild(toDoItemElement2);
    toDoItemElementContainer.appendChild(toDoItemElement3);

    toDoItemElement.appendChild(toDoItemText);
    toDoItemElement2.appendChild(toDoEdit);
    toDoItemElement3.appendChild(toDoLink);

    listElement.appendChild(toDoItemElementContainer);

    var pos = toDoList.indexOf(toDoItem);
    console.log(pos);

    toDoLink.setAttribute('onclick', 'excludeToDo(' + pos + ')');
    toDoEdit.setAttribute('onclick', 'editToDo(' + pos + ')');
  }
}

function addToDo() {

  var toDoText = inputElement.value;

  if (inputElement.value === '') {
    return
  }

  toDoList.push(toDoText);

  inputElement.value = '';

  inputElement.focus();
  renderToDoList();
  saveToStorage();
}

function clearToDo() {

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
  containerElement.setAttribute('style', "display: flex;justify-content: space-between;align-items: center")

  containerElement.innerHTML = ''

  var newInput = document.createElement('input');
  newInput.setAttribute('type', 'Text');
  newInput.setAttribute('value', toDoList[pos]);
  //newInput.setAttribute('placeholder', toDoList[pos]);
  newInput.setAttribute('style', "height: 30px; padding: 10px; margin: 50px; font-size: 20px; flex: 3;")

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