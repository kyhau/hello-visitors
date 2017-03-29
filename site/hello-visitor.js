// Get the modal
var signin_model = document.getElementById('signinModel');
window.onclick = function(event) {
  if (event.target == signin_model) {
    signin_model.style.display = "none";
    document.getElementById("feedback").value = document.getElementById("fullname").value;
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
  var fullnameInput = document.querySelector('#fullname');
  var companynameInput = document.querySelector('#companyname');

  // TODO call api gateway
  var apigClient = apigClientFactory.newClient();

  var params = {
    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
  };
  var body = {
    "fullname": fullnameInput.value,
    "companyname": companynameInput.value,
  };
  var additionalParams = {
    //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
    headers: {},
    queryParams: {}
  };

  apigClient.visitorsPost(params, body, additionalParams)
    .then(function(result){
      //This is where you would put a success callback
      document.querySelector('.feedback').innerHTML = "Welcome " + fullnameInput.value + "!";

    }).catch( function(result){
      //This is where you would put an error callback
      document.querySelector('.feedback').innerHTML = "Failed to add new visitor. Please try again.";
    });

  document.querySelector('.resetbtn').style.display='block';
  document.getElementById('signinModel').style.display='none';
  // prevent page jumps
  //e.preventDefault();
}

var signoutBtn = document.querySelector('.signoutbtn');
signoutBtn.onclick = function(e) {
  var fullnameInput = document.querySelector('#searchname');

  // TODO call api gateway

  document.querySelector('.feedback').innerHTML = "Goodbye " + fullnameInput.value + "! Have a nice day!";
  document.querySelector('.resetbtn').style.display='block';
  document.getElementById('signoutModel').style.display='none';

  // prevent page jumps
  //e.preventDefault();
}

var resetBtn = document.querySelector('.resetbtn');
resetBtn.style.display='none';
resetBtn.onclick = function(e) {
  this.style.display='none';
  feedbackMsg = document.querySelector('.feedback').innerHTML = "";
}
