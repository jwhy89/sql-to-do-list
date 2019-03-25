
$(document).ready(readyNow); // end doc ready

function clearInputs() {
  $('#taskIn').val('');
}

function createTask() {
  console.log('creating task');
  let taskToSend = {
    task: $('#taskIn').val(),
    completed: $('#completed').val(),
  };
  return taskToSend;
}

function readyNow() {
  // when addTaskButton clicked, run saveTask
  $('#addTaskButton').on('click', addTask);
  $('#viewTasks').on('click', '.btn-mark-task', completeTask);
  $('#viewTasks').on('click', '.btn-del-task', deleteTask);
  getTasks();
}

function validate(item) {
  console.log('validating');
  console.log(item);
  if (item.task === '') {
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

// Adds a task to server on add button click
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
      // Get the tasks from the server and render them
      // This will add the one we just added, and get any other new/changed ones
      getTasks();
      clearInputs();
    })
    .catch(function (error) {
      console.log('Something bad happened adding the task');
      alert('Couldn\'t add task, try again later');
    });
}

/* // Original rendTasks function
function renderTasks(taskArray) {
  $('#viewTasks').empty();
  for (let task of taskArray) {
    let readyOut = 'N';
    if (task.completed == true) {
      readyOut = 'Y';
    }
    let $tr = $(`<tr>
      <td>${task.task}</td>
      <td>${readyOut}</td>
      <td>
        <button class="btn-mark-task">Mark Completed</button>
      </td>
      <td>
        <button class="btn-del-task">Remove Task</button>
      </td>
    </tr>`);
    $('#viewTasks').append($tr);
    $tr.data(task);
  };
}
*/

// renderTasks function to sort out completed tasks
function renderTasks(taskArray) {
  $('#viewTasks').empty();
  for (let task of taskArray) {
    // let readyOut = 'N';
    if (task.completed == true) {
    let readyOut = 'Y';
    let $tr = $(`<tr>
      <td>${task.task}</td>
      <td>${readyOut}</td>
      <td>
        <button class="btn-mark-task" disabled>Mark Completed</button>
      </td>
      <td>
        <button class="btn-del-task">Remove Task</button>
      </td>
    </tr>`);
    $('#viewTasks').append($tr);
    $tr.data(task);
    // ASK MARY WHY AN ELSE STATEMENT WON'T WORK HERE
    } else if(task.completed == false) {
      let readyOut = 'N';
      let $tr = $(`<tr>
      <td>${task.task}</td>
      <td>${readyOut}</td>
      <td>
        <button class="btn-mark-task btn btn-success">Mark Completed</button>
      </td>
      <td>
        <button class="btn-del-task btn btn-danger">Remove Task</button>
      </td>
    </tr>`);
    $('#viewTasks').append($tr);
    $tr.data(task);
    };
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

function completeTask() {
  let $completeButton = $(this);
  let $tr = $completeButton.closest('tr');
  console.log('Did I get a tr???', $tr);

  let taskToSend = {
    completed: 'true'
  };

  let taskId = $tr.data('id');
  console.log('Task id is ', taskId);

  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskId}`,
    data: taskToSend
  })
    .then(function (response) {
      getTasks();
    })
    .catch(function () {
      console.log(`Something bad happened updating task ${taskId}`);
      alert('Couldn\'t update the task, try again later');
    })
}