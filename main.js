const shopping_DOM = document.getElementById("shopping-list");
const done_DOM = document.getElementById("done_list");
//setting up default items
const render_list = [
  { done: false, name: "Crystalline watch", quantity: 1 },
  { done: false, name: "Gold bracelet", quantity: 4 },
  { done: false, name: "Violet pendant", quantity: 2 },
  { done: false, name: "Scorpio plating", quantity: 5 },
  { done: false, name: "Enchanted rose", quantity: 10 }
];
render();

function render() {
  let list_DOM;
  done_DOM.innerHTML = "";
  shopping_DOM.innerHTML = "";
  render_list.forEach((list_item, index) => {
    list_item["done"] ? (list_DOM = done_DOM) : (list_DOM = shopping_DOM);

    const item = document.createElement("li");
    item.classList.add("item");
    item.setAttribute("data-index", index);

    // CHECKBOX ----------
    const checkBox = document.createElement("span");
    checkBox.classList.add("fakeBox");
    checkBox.addEventListener("click", () => moveItem(index));

    // NAME ----------
    const itemName = document.createElement("div");
    itemName.innerText = list_item.name;
    itemName.classList.add("item-name");
    itemName.setAttribute("onfocusout", "focusoutHandle(event)");
    itemName.setAttribute("onkeypress", "onenterHandle(event)");
    itemName.setAttribute("contenteditable", "true");

    const itemQuantity = document.createElement("div");
    itemQuantity.innerText = list_item.quantity;
    itemQuantity.setAttribute("onfocusout", "focusoutHandle(event)");
    itemQuantity.setAttribute("onkeypress", "onenterHandle(event)");
    itemQuantity.setAttribute("contenteditable", "true");

    // BUTTON ----------
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => delItem(index));

    item.appendChild(checkBox);
    item.appendChild(itemName);
    item.appendChild(itemQuantity);
    item.appendChild(deleteBtn);
    // list_DOM.prepend(item);
    list_DOM.append(item);
    // console.log(render_list);
  });
}

// ---------- ADD ----------
const quantity_reg = /^[1-9]\d*$/;
const name_reg = /^[a-zA-Z0-9 _-]{3,30}$/;
// to keep the Label on top of input when there is anything in the input
function labelUp(e){
  const label = e.target.nextSibling.nextSibling;
  e.target.value ? label.classList.add('label-up') : label.classList.remove('label-up')
}

document.getElementById("add").addEventListener("click", () => {
  const new_name = document.getElementById("new-name").value.trim();
  const new_quantity = document.getElementById("new-quantity").value;
  const new_name_label = document.getElementById('new-name-label');
  const new_quantity_label = document.getElementById('new-quantity-label');

  if (name_reg.test(new_name) && quantity_reg.test(new_quantity)) {
    let is_duplicated = false; // to avoid adding new item while duplicated
    render_list.forEach((item, index) => {
      if (new_name === item.name) {
        is_duplicated = true;
        if(confirm("'" + new_name + "'" + " is already in the shoppping list. Do you want to use the new quantity?")){
          render_list[index].quantity = new_quantity;
          render();
        } else {
          return;
        }
      }
    });
    if(!is_duplicated) {
      addItem(new_name, new_quantity);
    }
  }
//styling the labels when the inputs are wrong
  if(!quantity_reg.test(new_quantity)) {
    new_quantity_label.classList.add('wrong-input');
    new_quantity_label.innerText = 'Positive integer only';
  } else {
    new_quantity_label.classList.remove('wrong-input');
    new_quantity_label.innerText = 'How many';
  }
  if(!name_reg.test(new_name)) {
    new_name_label.classList.add('wrong-input');
    new_name_label.innerText = 'Please insert a proper name';
  } else {
    new_name_label.classList.remove('wrong-input');
    new_name_label.innerText = 'Item name';
  }
});

function addItem(name, quantity) {
  render_list.push({ done: false, name: name, quantity: Number(quantity) });
  document.getElementById("new-name").value = "";
  document.getElementById("new-quantity").value = null;
  render();
}

// ---------- MOVE ----------
function moveItem(index) {
  render_list[index].done = !render_list[index].done;
  render();
}

// ---------- DELETE ----------
function delItem(index) {
  render_list.splice(index, 1);
  render();
}

// ---------- EDIT ----------
function focusoutHandle(e) {
  let index = e.target.parentNode.dataset.index;
  e.target.className === 'item-name'
  ? name_reg.test(e.target.innerHTML) ? render_list[index].name = e.target.innerHTML : render()
  : quantity_reg.test(e.target.innerHTML) ? render_list[index].quantity = Number(e.target.innerHTML) : render()
}
function onenterHandle(e) {
  let index = e.target.parentNode.dataset.index;
  if (e.target.className === 'item-name') {
    if(name_reg.test(e.target.innerHTML) && e.keyCode === 13){
      render_list[index].name = e.target.innerHTML;
      render();
    }
  } else {
    if(quantity_reg.test(e.target.innerHTML) && e.keyCode === 13){
      render_list[index].quantity = Number(e.target.innerHTML);
      render();
    }
  }
}

// toggle button ---------------
document.querySelector(".toggle").addEventListener("click", function() {
  document.getElementById("done_list").classList.toggle("hidden");
  document.querySelector(".toggle-icon").classList.toggle("rotate");
});
