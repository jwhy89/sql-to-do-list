
$(document).ready(readyNow); // end doc ready

function clearInputs() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}

function createTask() {
  console.log('creating task');
  let transferIn = $('#readyForTransferIn').val();
  let readyOut = false;
  if (transferIn == 'Y') {
    readyOut = true;
  }
  let taskToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    transfer: readyOut,
    notes: $('#notesIn').val(),
  };
  return taskToSend;
}

function readyNow() {
  // when addButton clicked, run saveTask
  $('#addButton').on('click', addTask);
  $('#viewTasks').on('click', '.btn-del-task', deleteTask);
  getTasks();
}

function validate(item) {
  console.log('validating');
  console.log(item);
  if (item.name === '') {
    console.log('user input validation test failed');
    alert('INCOMPLETE DATA! Please do not leave any fields empty.');
    return false;
  }
  else if (item.age <= 0) {
    console.log('user input validation test failed');
    alert('INCOMPLETE DATA! Please do not leave any fields empty.');
    return false;
  }
  else if (item.notes === '') {
    console.log('user input validation test failed');
    alert('INCOMPLETE DATA! Please do not leave any fields empty.');
    return false;
  }
}

//**** AJAX ********************************************************************
function getTasks() {
  console.log('in getTasks');
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/tasks'
  })
    .then(function (response) {
      let tasks = response;
      console.log(`Response from get all tasks`, tasks);
      /*  appendTasks(tasks); */
      renderTasks(tasks);
    })
    .catch(function (error) {
      console.log('Something bad happened getting getting tasks');
      alert('Couldn\'t get all tasks, try again later');
    });

} // end getTasks

// Adds a song to server on add button click
function addTask(event) {
  event.preventDefault();
  console.log('adding a task');
  // create task based on user inputs
  let task = createTask();
  // validate user inputs
  let isValid = validate(task);
  if (isValid === false) {
    return;
  }

  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: task
  })
    .then(function (response) {
      // Get the songs from the server and render them 
      // This will add the one we just added, and get any other new/changed ones
      getTasks();
      clearInputs();
    })
    .catch(function (error) {
      console.log('Something bad happened adding the task');
      alert('Couldn\'t add task, try again later');
    });
}

function renderTasks(taskArray) {
  $('#viewTasks').empty();
  for (let task of taskArray) {
    let readyOut = 'N';
    if (task.transfer == true) {
      readyOut = 'Y';
    }
    let $tr = $(`<tr>
      <td>${task.name}</td>
      <td>${task.age}</td>
      <td>${task.gender}</td>
      <td>${readyOut}</td>
      <td>${task.notes}</td>
      <td>
        <button class="btn-del-task">Remove Task</button>
      </td>
    </tr>`);
    $('#viewTasks').append($tr);
    $tr.data(task);
  };
}

function deleteTask() {
  let $deleteButton = $(this);
  let $tr = $deleteButton.closest('tr');
  // let $tr = $deleteButton.parent().parent();
  console.log('Did I get a tr???', $tr);

  let taskId = $tr.data('id');
  console.log('Task id is ', taskId);

  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`
  })
    .then(function (response) {
      getTasks();
    })
    .catch(function () {
      console.log(`Something bad happened deleting task ${taskId}`);
      alert('Couldn\'t delete the task, try again later');
    })
}