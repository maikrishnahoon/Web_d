let TC = document.querySelector(".ticket-container");
let allFilters = document.querySelectorAll(".filter");
let deleteButton = document.querySelector(".delete");
let modalVisible = false;
let SelectedPriority = "pink";
let task = "";
let selectedTicketsColor = undefined;


function loadTickets(priority) {
  let allTaskData = localStorage.getItem("allTasks");
  if (allTaskData != null) {
    let data = JSON.parse(allTaskData);
    if(priority){
      data = data.filter(function(ticket){
      return ticket.SelectedPriority == priority;
      });
    }
        TC.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      let ticket = document.createElement("div");
      ticket.classList.add("ticket");
      ticket.innerHTML = `<div class="ticket">
    <div class="ticket-color ticket-color-${data[i].SelectedPriority}"></div>
    <div class="ticket-id">${data[i].taskId}</div>
    <div class="task">
     ${data[i].task}
    </div>`
      ticket.addEventListener("click", function (e) { // double eventListner???
        if (e.currentTarget.classList.contains("active")) {
          e.currentTarget.classList.remove("active");
        } else {
          e.currentTarget.classList.add("active");
        }
      });
      TC.appendChild(ticket);
    }
  }
}
loadTickets();

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", filterHandler);
}
function filterHandler(e) {
  if (e.currentTarget.classList.contains("active")) {
    e.currentTarget.classList.remove("active");
    loadTickets();
  } else {
    let selectedFIlter = document.querySelector(".filter.active");
    if (selectedFIlter) {
      selectedFIlter.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    loadTickets(e.currentTarget.children[0].classList[0].split("-")[0]);
  }
}
let addButton = document.querySelector(".add");
addButton.addEventListener("click", showModal);
function showModal(e) {
  if (!modalVisible) {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `<div class="task-to-be-added" data-type="false" contenteditable="true">
     <span class="placeholder">Enter your text here</span>
  </div>
  <div class="priority-list"> 
    <div class="pink-modal-filter modal-filter active"></div>
    <div class="blue-modal-filter modal-filter"></div>
    <div class="purple-modal-filter modal-filter"></div>
    <div class="green-modal-filter modal-filter"></div>
  </div>`;
    TC.appendChild(modal);
    SelectedPriority = "pink";
    let tasktyper = document.querySelector(".task-to-be-added");
    tasktyper.addEventListener("click", function (e) {
      if (e.currentTarget.getAttribute("data-type") == "false") {
        e.currentTarget.innerText = "";
        e.currentTarget.setAttribute("data-type", "True")
      }
    });
    tasktyper.addEventListener("keypress", addTicket.bind(this, tasktyper));
    modalVisible = true;
    let modalFilters = document.querySelectorAll(".modal-filter");
    for (let i = 0; i < modalFilters.length; i++) {
      modalFilters[i].addEventListener("click", selectPriority);
    }
  }
}
function selectPriority(e) {
  let activeFilter = document.querySelector(".modal-filter.active");
  activeFilter.classList.remove("active");
  SelectedPriority = e.currentTarget.classList[0].split("-")[0];
  e.currentTarget.classList.add("active");
}

function addTicket(tasktyper, e) {
  if (e.key == "Enter" && e.shiftKey == false && tasktyper.innerText.trim() != "") {
    // let ticket = document.createElement("div");
    // ticket.classList.add("ticket");
    let id = uid();
    let task = tasktyper.innerText;
    // ticket.innerHTML = `<div class="ticket">
    //     <div class="ticket-color ticket-color-${SelectedPriority}"></div>
    //     <div class="ticket-id">${id}</div>
    //     <div class="task">
    //      ${task}
    //     </div>
    //   </div>`
    document.querySelector(".modal").remove();
    modalVisible = false;
    // ticket.addEventListener("click", function (e) {
    //   if (e.currentTarget.classList.contains("active")) {
    //     e.currentTarget.classList.remove("active");
    //   } else {
    //     e.currentTarget.classList.add("active");
    //   }
    // });
    // TC.appendChild(ticket);
    let allTaskData = localStorage.getItem("allTasks");
    if (allTaskData == null) {
      let data = [{ "taskId": id, "task": task, "SelectedPriority": SelectedPriority }]
      localStorage.setItem("allTasks", JSON.stringify(data));
    } else {
      let data = JSON.parse(allTaskData);
      data.push({ "taskId": id, "task": task, "SelectedPriority": SelectedPriority });
      localStorage.setItem("allTasks", JSON.stringify(data));
    }
    let selectedFIlter = document.querySelector(".filter.active");
     if(selectedFIlter){
      let priority = selectedFIlter.children[0].classList[0].split("-")[0];
      loadTickets(priority);
     }else{
      loadTickets();
     }
   
  } else if (e.key == "Enter" && e.shiftKey == false) {
    e.preventDefault();  // stop all default action
    alert("Empty");
  }
}

deleteButton.addEventListener("click", function (e) {
  let selectedtickets = document.querySelectorAll(".ticket.active")
  let allTasks = JSON.parse(localStorage.getItem("allTasks"));
  for (let i = 0; i < selectedtickets.length; i++) {
    selectedtickets[i].remove();
    allTasks = allTasks.filter(function (data) {
      return data.taskId != selectedtickets[i].querySelector(".ticket-id").innerText;
    })
  }
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
});

