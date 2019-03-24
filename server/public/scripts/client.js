
$(document).ready(readyNow); // end doc ready

function clearInputs() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}

function createKoala() {
  console.log('creating koala');
  let transferIn = $('#readyForTransferIn').val();
  let readyOut = false;
  if (transferIn == 'Y') {
    readyOut = true;
  }
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    transfer: readyOut,
    notes: $('#notesIn').val(),
  };
  return koalaToSend;
}

function readyNow() {
  // when addButton clicked, run saveKoala
  $('#addButton').on('click', addKoala);
  $('#viewKoalas').on('click', '.btn-del-koala', deleteKoala);
  getKoalas();
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
function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
    .then(function (response) {
      let koalas = response;
      console.log(`Response from get all koalas`, koalas);
      /*  appendKoalas(koalas); */
      renderKoalas(koalas);
    })
    .catch(function (error) {
      console.log('Something bad happened getting getting koalas');
      alert('Couldn\'t get all koalas, try again later');
    });

} // end getKoalas

// Adds a song to server on add button click
function addKoala(e) {
  e.preventDefault();
  console.log('adding a koala');
  // create koala based on user inputs
  let koala = createKoala();
  // validate user inputs
  let isValid = validate(koala);
  if (isValid === false) {
    return;
  }

  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: koala
  })
    .then(function (response) {
      // Get the songs from the server and render them 
      // This will add the one we just added, and get any other new/changed ones
      getKoalas();
      clearInputs();
    })
    .catch(function (error) {
      console.log('Something bad happened adding the koala');
      alert('Couldn\'t add koala, try again later');
    });
}

function renderKoalas(koalaArray) {
  $('#viewKoalas').empty();
  for (let koala of koalaArray) {
    let readyOut = 'N';
    if (koala.transfer == true) {
      readyOut = 'Y';
    }
    let $tr = $(`<tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${readyOut}</td>
      <td>${koala.notes}</td>
      <td>
        <button class="btn-del-koala">Remove Koala</button>
      </td>
    </tr>`);
    $('#viewKoalas').append($tr);
    $tr.data(koala);
  };
}

function deleteKoala() {
  let $deleteButton = $(this);
  let $tr = $deleteButton.closest('tr');
  // let $tr = $deleteButton.parent().parent();
  console.log('Did I get a tr???', $tr);

  let koalaId = $tr.data('id');
  console.log('Koala id is ', koalaId);

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  })
    .then(function (response) {
      getKoalas();
    })
    .catch(function () {
      console.log(`Something bad happened deleting koala ${koalaId}`);
      alert('Couldn\'t delete the koala, try again later');
    })
}