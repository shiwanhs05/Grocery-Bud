// Select Items
// function print(e){
//   const obj = {e};
//   console.log(obj);
// }
// print(5);

const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const sumbitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit Option
let editElement;
let editFlag = false;
let editID = '';

// event listeners
form.addEventListener('submit', addItem);
// functions

// clear items event
clearBtn.addEventListener('click', clearItems);
// load items
window.addEventListener('DOMContentLoaded', setupItems);
// window.addEventListener('DOMContentLoaded', ()=>{
//   document.body.style.background = 'red';
// })

// Functions
// add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);
    // display alert
    displayAlert('item added to the list', 'success');
    // show container
    container.classList.add('show-container');
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.textContent = value;
    displayAlert('value changed', 'success');
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert('Empty Value', 'danger');
  }
}
// localStorage.clear();
// delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  console.log(list.children);
  list.removeChild(element);
  displayAlert('item removed', 'danger');
  // remove from local storage
  console.log(list.children);
  if (list.children.length === 0){
    localStorage.clear();
    container.classList.remove('show-container');
  } 
  console.log(list.children);
  removeFromLocalStorage(id);
  setBackToDefault();
}
// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editElement);
  // set form value
  grocery.value = editElement.textContent;
  editFlag = true;
  editID = element.dataset.id;
  sumbitBtn.textContent = 'edit';
}
// clear items
function clearItems() 
{
  const items = document.querySelectorAll('.grocery-item');
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  setBackToDefault();
  localStorage.removeItem('list');
}

// display alert
function displayAlert(text, action) {
  alert.classList.add(`alert-${action}`);
  alert.textContent = text;
  // remove alert
  setTimeout(function () {
    alert.classList.remove(`alert-${action}`);
    alert.textContent = ``;
  }, 1000);
}

// set back to default
function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = '';
  sumbitBtn.textContent = 'Submit';
}

// local storage
// api by browser = local storage
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem('orange', JSON.stringify(['item', 'item2']));
// let oranges = JSON.parse(localStorage.getItem('orange'));
// localStorage.removeItem('orange');

function addToLocalStorage(id, value) {
  // Es6
  // const grocery = {id, value}, when name of  value and id is same
  const grocery = { id: id, value: value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem('list', JSON.stringify(items));
  // console.log(items);
}
// localStorage.clear();
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    return item.id !== id;
  });
  localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}
// Setup Items
function setupItems() {
  console.log('hello');
  let items = getLocalStorage();
  console.log('hero');
  console.log(items.length);
  if (items.length > 0) {
    console.log('hi');
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add('show-container');
  }
}
function createListItem(id, value) {
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  // shortcut
  // element.dataset.id = id;
  // alternative :-
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
          <div class="btn-container">
            <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
            <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
          </div>`;
  // Here,we have access to the edit and delete btns , so we will select it here
  const editBtn = element.querySelector('.edit-btn');
  const deleteBtn = element.querySelector('.delete-btn');
  editBtn.addEventListener('click', editItem);
  deleteBtn.addEventListener('click', deleteItem);
  // appendChild
  list.appendChild(element);
}
