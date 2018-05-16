let done_list = [];

//setting up default items
let render_list = [{name: 'helmet', quantity: 1},
               {name: 'chainmail', quantity: 1},
               {name: 'boots', quantity: 1},
               {name: 'shield', quantity: 1},
               {name: 'sword', quantity: 1}];
render_shopping_list();

// rendering the shopping list from our array
function render_shopping_list() {
  const shopping_list_DOM = document.getElementById('shopping-list');
  shopping_list_DOM.innerHTML = "";
  render_list.forEach((defaultItem,index) => {
    let item = document.createElement('li');
    item.classList.add('item');

    let checkBox = document.createElement('span');
    checkBox.classList.add('fakeBox');
    checkBox.addEventListener('click', function(){
      moveItem(index, render_list, done_list);
    });

    let itemName = document.createElement('div');
    itemName.innerText = defaultItem.name;
    let itemQuantity = document.createElement('div');
    itemQuantity.innerText = defaultItem.quantity;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', function(){
      moveItem(index, render_list);
    });

    item.appendChild(checkBox);
    item.appendChild(itemName);
    item.appendChild(itemQuantity);
    item.appendChild(deleteBtn);
    shopping_list_DOM.prepend(item);
  });
}

// Adding new item
document.getElementById('add').addEventListener('click', function(){
  let newName = document.getElementById('new-name').value;
  let newQuantity = document.getElementById('new-quantity').value;
  if (newName && newQuantity) {
    addItem(newName, newQuantity);
  }
})
function addItem(name, quantity) {
  render_list.push({name:name, quantity:quantity});
  render_shopping_list();
  console.log(done_list);
}

// moving item around the shopping list / done list or
// remove it completely
function moveItem(index, origin_list, target_list) {
  let movedItems = origin_list.splice(index,1);
  if (target_list) {
  target_list.push(movedItems[0]);
  }
  render_shopping_list();
  render_done_list();
}

// rendering done list ---------------
function render_done_list() {
  const done_list_DOM = document.getElementById('done_list');
  done_list_DOM.innerHTML = "";
  done_list.forEach((defaultItem,index) => {
    let item = document.createElement('li');
    item.classList.add('item');

    let checkBox = document.createElement('span');
    checkBox.classList.add('fakeBox');
    checkBox.addEventListener('click', function(){
      moveItem(index, done_list, render_list);
    });

    let itemName = document.createElement('div');
    itemName.innerText = defaultItem.name;
    let itemQuantity = document.createElement('div');
    itemQuantity.innerText = defaultItem.quantity;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', function(){
      moveItem(index, done_list );
    });

    item.appendChild(checkBox);
    item.appendChild(itemName);
    item.appendChild(itemQuantity);
    item.appendChild(deleteBtn);
    done_list_DOM.prepend(item);
  });
}

// toggle button ---------------
document.querySelector('.done-list-header').addEventListener('click', function(){
  document.getElementById('done_list').classList.toggle('hidden');
  document.querySelector('.toggle-icon').classList.toggle('rotate');
});
