const link = 'http://localhost:8080/todo';
const content_type = 'application/json; charset=utf-8';

async function todo_create(todo_data) {
    const response =  await fetch(link, {
        method: 'POST',
        body: JSON.stringify(todo_data),
        headers: {'Content-Type': content_type},
    });
    if (response.ok) {
        const resp = await response.json();
        todo_view_create(resp.id, resp.title, resp.body, resp.completed);
        document.getElementById("form").reset();
    }
}

 async function todo_remove(todo_id) {
    const response = await fetch(link + '/' + todo_id, {
        method: 'DELETE',
        headers: {'Content-Type': content_type},
    });
    if (response.ok) {
        document.querySelector(`[data-id="${todo_id}"]`).remove();
    }
}

async function todo_update(todo_id) {
    const todo_data = {
        completed: document.querySelector(`[data-id="${todo_id}"]` + ' input[type="checkbox"]').checked
    }
    const response = await fetch(link + '/' + todo_id, {
        method: 'PATCH',
        body: JSON.stringify(todo_data),
        headers: {'Content-Type': content_type},
    });
}

const submit = document.getElementById("submit");
submit.onclick = () => {return false};
submit.addEventListener("click", () => {
    const todo_data = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value,
        completed: document.getElementById("completed").checked,
    };
    if (todo_data.title == '' || todo_data.body == '') {
        return alert("All fields (title & body) must be filled") 
        }
    else {
        todo_create(todo_data);
        }
});

function todo_view_create(todo_id, title, body, completed) {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.dataset.id = todo_id;

    const content = document.getElementById("content");
    content.appendChild(todo);
    
    const title_todo = document.createElement("h2");
    title_todo.innerText = title;
    title_todo.classList.add("title");
    todo.appendChild(title_todo);
   
    const body_todo = document.createElement("div");
    body_todo.innerText = body;
    body_todo.classList.add("body");
    todo.appendChild(body_todo);
        
    const completed_todo = document.createElement("div");
    completed_todo.classList.add("completed");
    todo.appendChild(completed_todo);

    const label_todo = document.createElement("label");
    label_todo.innerText = "Is completed";
    completed_todo.appendChild(label_todo);

    const checkbox_todo = document.createElement("input");
    checkbox_todo.type = "checkbox";
    checkbox_todo.checked = completed;
    checkbox_todo.addEventListener("click", () => {todo_update(todo_id)}); 
    label_todo.appendChild(checkbox_todo);    

    const delete_todo = document.createElement("button");
    delete_todo.classList.add("delete");
    delete_todo.innerText = "X";
    delete_todo.addEventListener("click", () => {todo_remove(todo_id)});
    todo.appendChild(delete_todo);
}
