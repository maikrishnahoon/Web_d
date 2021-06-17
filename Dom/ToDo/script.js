let input = document.querySelector(".task-input");
let ul =  document.querySelector(".task-list");

function taskdeleter(e){
    e.currentTarget.remove();
}

input.addEventListener("keypress",function(e){
    if(e.key == "Enter"){
        let task = input.value;
        if(task == ""){
            alert("Adding empty task");
            return;
        }
        input.value = "";
        // let li =  `<li>${task}</li>`
        // let mli = ul.innerHTML;
        // let finalHTML = li+mli;
        // ul.innerHTML = finalHTML;
        let li = document.createElement("li");
        li.classList.add("tasklist-item");
        li.innerText = task;
        li.addEventListener("dblclick",taskdeleter);
        ul.insertBefore(li,ul.firstChild);   
    }
})