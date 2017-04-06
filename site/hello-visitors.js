function setButtonsVisibility(showReset) {
  if (showReset == true) {
    document.querySelector('.resetbtn').style.visibility='visible';
    document.querySelector('.signinModelBtn').style.visibility='hidden';
    document.querySelector('.signoutModelBtn').style.visibility='hidden';
  }
  else {
    document.querySelector('.resetbtn').style.visibility='hidden';
    document.querySelector('.signinModelBtn').style.visibility='visible';
    document.querySelector('.signoutModelBtn').style.visibility='visible';
  }
}

function clearInputs() {
  document.getElementById("companyname").value = "";
  document.getElementById("fullname").value = "";
}


var signinModelBtn = document.querySelector('.signinModelBtn');
signinModelBtn.onclick = function(e) {
  document.getElementById('signinModel').style.display='block';
}

var signoutModelBtn = document.querySelector('.signoutModelBtn');
signoutModelBtn.onclick = function(e) {
  document.getElementById('signoutModel').style.display='block';

  var selectOptions = document.getElementById('visitors');

  // Reset existing options, if any.
  selectOptions.options.length = 0;
  var defaultOption = new Option("Choose here", "NoName", true, true);
  defaultOption.setAttribute('disabled', 'disabled');
  selectOptions.appendChild(defaultOption);

  // Retrieve data from API Gateway
  var apigClient = apigClientFactory.newClient();
  var params = {};
  var body = {};
  var additionalParams = {};

  apigClient.visitorsGet(params, body, additionalParams)
    .then(function(result){
      for(i=0; i<result['data']['Count']; ++i) {
        items = result['data']['Items'];
        opt = new Option(items[i]['FullName'], items[i]['UUID']);
        selectOptions.appendChild(opt);
      }
    }).catch(function(result){
      document.querySelector('.msg').innerHTML = "Failed to retrieve visitors. Please try again.";
    });
}

// Get the modal
var signin_model = document.getElementById('signinModel');
window.onclick = function(event) {
  if (event.target == signin_model) {
    signin_model.style.display = "none";
    document.getElementById("msg").value = document.getElementById("fullname").value;
  }
}

var signout_model = document.getElementById('signoutModel');
window.onclick = function(event) {
  if (event.target == signout_model) {
    signout_model.style.display = "none";
  }
}

var closeSigninBtn = document.querySelector('div#signinModel > .close');
closeSigninBtn.onclick = function(e) {
  document.getElementById('signinModel').style.display='none';
}

var closeSignoutBtn = document.querySelector('div#signoutModel > .close');
closeSignoutBtn.onclick = function(e) {
  document.getElementById('signoutModel').style.display='none';
}

var cancelSigninBtn = document.querySelector('div#signinModel > div > div > .cancelbtn');
cancelSigninBtn.onclick = function(e) {
  document.getElementById('signinModel').style.display='none';
}

var cancelSignoutBtn = document.querySelector('div#signoutModel > div > div > .cancelbtn');
cancelSignoutBtn.onclick = function(e) {
  document.getElementById('signoutModel').style.display='none';
}

var signinBtn = document.querySelector('.signinbtn');
signinBtn.onclick = function(e) {
  var fullname = document.querySelector('#fullname').value;
  var companyname = document.querySelector('#companyname').value;

  if (companyname == "") {
    document.querySelector('.msg').innerHTML = "\"Please specify your Company Name. Thank you!\"";
  }
  else if (fullname == "") {
    document.querySelector('.msg').innerHTML = "\"Please specify your Full Name. Thank you!\"";
  }
  else {
    var apigClient = apigClientFactory.newClient();
    var params = {};
    var body = {
      "companyname": companyname,
      "fullname": fullname
    };
    var additionalParams = {};

    apigClient.visitorsPost(params, body, additionalParams)
      .then(function(result){
        document.querySelector('.msg').innerHTML = "Welcome " + fullname + "!";
        clearInputs();

      }).catch( function(result){
        console.error(JSON.stringify(result));
        document.querySelector('.msg').innerHTML = "Failed to add new visitor. Please try again.";
      });
  }
  setButtonsVisibility(true);
  document.getElementById('signinModel').style.display='none';
  // prevent page jumps
  //e.preventDefault();
}

var signoutBtn = document.querySelector('.signoutbtn');
signoutBtn.onclick = function(e) {
  var selectOptions = document.getElementById('visitors');

  if (selectOptions.value != 'NoName') {

    var uuid = selectOptions[selectOptions.selectedIndex].value
    var fullName = selectOptions[selectOptions.selectedIndex].text

    var apigClient = apigClientFactory.newClient();
    var params = {};
    var body = {
      "uuid": uuid
    };
    var additionalParams = {};

    apigClient.visitorsPut(params, body, additionalParams)
      .then(function(result){
        document.querySelector('.msg').innerHTML = "Goodbye " + fullName + "!";
      }).catch( function(result){
        console.error(JSON.stringify(result));
        document.querySelector('.msg').innerHTML = "Failed to signout " + fullName + ". Please try again.";
      });

    setButtonsVisibility(true);
    document.getElementById('signoutModel').style.display='none';
  }
  // prevent page jumps
  //e.preventDefault();
}

var resetBtn = document.querySelector('.resetbtn');
setButtonsVisibility(false);
resetBtn.onclick = function(e) {
  setButtonsVisibility(false);
  msgMsg = document.querySelector('.msg').innerHTML = "\"Hello visitor!\"";
}
