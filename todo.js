let Inputbx = document.getElementById("inputbox");
let newtask = document.getElementById("newtask");
let addbutton = document.getElementById("addbtn");
let modal = document.getElementById("modal");
let close_model_btn = document.getElementById("close-model");
let edit_value = document.getElementById("edit-value");
let save_btn = document.getElementById("save");



let modal_open = false;
let edit_data = {};

newtask.addEventListener("click", edittodo);

function edittodo(event) {
  console.log(event);
  if (event.target && event.target.matches("button")) {
    console.log(event.target.getAttribute("data-id"));
    let action = event.target.getAttribute("class");
    
    console.log(action);

    if (action === "Edit") {
      let dataID = event.target.getAttribute("data-id");
      edititem(dataID);
    }
    else if(action === 'delete' ){
         let dataID = event.target.getAttribute('data-id');
         deleteitem(dataID)
    }

 
}

}
function deleteitem(dataID){
if(!dataID){
  alert('please select a todo to delete ')
  return;
}
let remaining_todo = todos.filter((todo) => {
  if(todo.id !== parseInt(dataID))
      return todo;

      

}) 

console.log(remaining_todo)
todos = [...remaining_todo]
show_todos(todos);

console.log(todos)

}



function edititem(id) {
  // assume items is an array of objects with an id property
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === parseInt(id)) {
      // found the item with the matching id
      let todo = todos[i];
      // do something with the item, like update its properties
      console.log(todo);
      todo.completed = true;

      edit_data = { ...todo};
      console.log('edit_data',edit_data)
    }
  }

  if (!modal_open) {
    modal_open = true;
    modal.classList.add("show");
  }
  edit_value.value = edit_data.text;
}

let close_modal = ()=>{
        modal_open = false;
        modal.classList.remove('show')
        
}

 let save_edit_value = ()=>{
  
    console.log(edit_data)
    todos.map(todo=>{
        if(todo.id === edit_data.id){
             todo.text = edit_value.value
        }
    })
      close_modal()       
    show_todos(todos)


 }
 save_btn.addEventListener('click',save_edit_value)


 
addbutton.addEventListener("click", addlist);

let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

let show_todos = (todos) => {
 
  let html = "";
  todos.map((element, index) => {
    html += ` <div class="task">
              <span id="task-name">${element.text}</span>
                <button class="Edit" data-id="${element.id}">Edit</button>
                <button class="delete" data-id= "${element.id}">Delete</button> 
            </div>
            `;
  });

  newtask.innerHTML = html;
};
show_todos(todos);

function addlist(e) {
  let newItem = Inputbx.value;
  if (newItem == "") {
    alert("please Enetr Task");
  } else {
    // create a new todo object with a unique ID and the task text
    let todo = {
      id: Math.round(Math.random() * 1000000),
      text: newItem,
    };
    // add the new todo to the todos array
    todos.push(todo);

    Inputbx.value = "";
  }

  // store the updated todos array in local storage
  localStorage.setItem("todos", JSON.stringify(todos));
  show_todos(todos);
}
