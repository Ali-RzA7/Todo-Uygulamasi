const form = document.querySelector("#todoAddForm");  
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstcardBody = document.querySelectorAll(".card-body")[0];
const secondcardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];
runEvents();

function runEvents(){
  form.addEventListener("submit",addTodo);
  document.addEventListener("DOMContentLoaded",pageLoaded);
  secondcardBody.addEventListener("click",removeTodoUI);
  secondcardBody.addEventListener("click",setTodoUI);
  secondcardBody.addEventListener("click",completedTodo);
  clearButton.addEventListener("click",allTodoRemoved);
  filterInput.addEventListener("keyup",filter);
}


function filter(e){

  const filterValue = e.target.value.toLowerCase().trim();
  let todoList = document.querySelectorAll(".list-group-item");

  if (todoList.length > 0 ){
    todoList.forEach(function(todo){
      if (todo.textContent.toLowerCase().trim().includes(filterValue)){


        todo.setAttribute("style", "display : block");
 
      }else{
        todo.setAttribute("style", "display : none !important");
      }
    });
  }else{
    showAlert("warning","Todo giriniz")
  }
}




function allTodoRemoved(){

  const todoList = document.querySelectorAll(".list-group-item");
  
  if (todoList.length > 0){
    todoList.forEach(function(todo){
      todo.remove();
    });
  
    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
  
    showAlert("success","Başarılı bir şekilde silindi...");
  
  }else{
    showAlert("warning","Silinecek todo yok!!!");
  }
}





function pageLoaded(){
  checkTodosFromStorage();
  todos.forEach(function(todo){

    addTodoToUI(todo);

  })
}

function removeTodoUI(e){
  if (e.target.className==="delete-item btn btn-danger mr-2"){
    // Arayüzden silme
    const todo = e.target.parentNode.parentNode;
    todo.remove();
    showAlert("success","Todo başarıyla silindi...");
    // Storage'dan Silme
    removeTodoToStorage(todo.textContent.slice(0,-10));
  
  }

}


function removeTodoToStorage(removeTodo){
  checkTodosFromStorage();
  todos.forEach(function(todo, index){

    if (removeTodo === todo){
      todos.splice(index,1);
    }

  });

  localStorage.setItem("todos",JSON.stringify(todos));
}

function completedTodo(e){
  if (e.target.className != "set-item btn btn-primary mr-3" || e.target.className != "delete-item btn btn-danger mr-2"){
    if (window.getComputedStyle(e.target).textDecoration === "line-through") {
      e.target.style.textDecoration = "";
    }   else {
      e.target.style.textDecoration = "line-through";
    }
  }
}



function setTodoUI(e){
    checkTodosFromStorage();
    if (e.target.className === "set-item btn btn-primary mr-3"){
      let newTodo = prompt("-------------Yeni Todo-------------");
      if (newTodo.length > 0){
      let setTodo = e.target.parentNode.parentNode.textContent.slice(0,-10);
      const todo = e.target.parentNode.parentNode;
      todo.remove();
      removeTodoToStorage(setTodo);
      addTodoToUI(newTodo);
      addTodoToStorage(newTodo);
      }else{
        showAlert("warning","Todo boş olamaz...")
      };
    }
  }


function addTodo(e){
  const inputText= addInput.value.trim();
  if (inputText == null || inputText==""){
    showAlert("warning","Değer Giriniz...")
  }else{
    // Arayüze ekleme  
    addTodoToUI(inputText);

    addTodoToStorage(inputText);

    showAlert("success","Todo eklendi...");

  }
  
  // Local Storage ekleme


  e.preventDefault();
}


function addTodoToUI(newtodo){
  const li = document.createElement("li");
  li.className="list-group-item d-flex justify-content-between";
  li.textContent = newtodo;
  
  const div = document.createElement("div");
  
  
  const a = document.createElement("a");
  a.className="delete-item btn btn-danger mr-2";
  a.textContent = "Sil";
  a.href = "#";
  
  const b = document.createElement("a");
  b.className="set-item btn btn-primary mr-3";
  b.textContent = "Düzenle";
  b.href = "#";
  
  div.appendChild(a);
  div.appendChild(b);
  li.appendChild(div);
  todoList.appendChild(li);
  
  addInput.value = "";
  }


function addTodoToStorage(newtodo){
  checkTodosFromStorage();
  todos.push(newtodo);
  localStorage.setItem("todos",JSON.stringify(todos));

}

function checkTodosFromStorage(){
  if (localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

}



function showAlert(type, message){
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;

  firstcardBody.appendChild(div);

  setTimeout(function(){
    div.remove();
  },2500);
}
