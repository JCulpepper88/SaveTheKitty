var gameActive = true;

var userPoint = [];
var evilPoint = [];
var kittyPoint = [];
var weaponPoint = [];

var unarmedUserURL = 'user.png';
var armedUserURL = 'armed.png';
var userURL = unarmedUserURL;
var evilURL = 'monster.png';
var kittyURL = 'cat.png';
var weaponURL = 'sword.png';
var victoryURL = 'victory.png';
var catdiesURL = 'catdies.png';
var userdiesURL = 'userdies.png';

var gridMax = 7;
var gridMin = 0;
var userArmed = false;

function randomCoord() {
  var x = Math.floor(Math.random()*8);
  var y = Math.floor(Math.random()*8);
  return y.toString() + x.toString();
}

function randomMove() {
  var xchange = Math.floor(Math.random()*3);
  xchange = xchange == 2 ? -1 : xchange;
  var ychange;
  if (xchange != 0)
    ychange = 0;
  else {
    ychange = Math.floor(Math.random()*2);
    ychange = ychange == 0 ? -1 : 1;
  }
  return [xchange, ychange];
}

function load() { // we need to make sure two things don't load on the same point
  initialAlert();
	
  var userCoord = randomCoord();
  userPoint[1] = parseInt(userCoord[1]);
  userPoint[0] = parseInt(userCoord[0]);

  var evilCoord = randomCoord();
  evilPoint[1] = parseInt(evilCoord[1]);
  evilPoint[0] = parseInt(evilCoord[0]);

  var kittyCoord = randomCoord();
  kittyPoint[1] = parseInt(kittyCoord[1]);
  kittyPoint[0] = parseInt(kittyCoord[0]);

  var weaponCoord = randomCoord();
  weaponPoint[1] = parseInt(weaponCoord[1]);
  weaponPoint[0] = parseInt(weaponCoord[0]);

  document.getElementById(userCoord).innerHTML = '<img src=\"' + userURL + '\">';
  document.getElementById(evilCoord).innerHTML = '<img src=\"' + evilURL + '\">';
  document.getElementById(kittyCoord).innerHTML = '<img src=\"' + kittyURL + '\">';
  document.getElementById(weaponCoord).innerHTML = '<img src=\"' + weaponURL + '\">';
}

function reload() {
  var userCoord = userPoint[0].toString() + userPoint[1].toString();
  var evilCoord = evilPoint[0].toString() + evilPoint[1].toString();
  var kittyCoord = kittyPoint[0].toString() + kittyPoint[1].toString();
  var weaponCoord = weaponPoint[0].toString() + weaponPoint[1].toString();
  document.getElementById(userCoord).innerHTML = '';
  document.getElementById(evilCoord).innerHTML = '';
  document.getElementById(kittyCoord).innerHTML = '';
  userURL = unarmedUserURL;
  userArmed = false;
  if (weaponPoint[0] <= gridMax)
    document.getElementById(weaponCoord).innerHTML = '';
  gameActive = true;
  load();
}

function updateUserCoord(x,y) {
  var newCoord = y.toString() + x.toString();
  var oldCoord = userPoint[0].toString() + userPoint[1].toString();
  var evilCoord = evilPoint[0].toString() + evilPoint[1].toString();
  if (oldCoord != evilCoord) {
    document.getElementById(oldCoord).innerHTML = '';
    document.getElementById(newCoord).innerHTML = '<img src=\"' + userURL + '\">';
  }
  else // it would be nice to limit this to cases where the user and monster switch places
    userMonsterEncounter();  
  userPoint[1] = x;
  userPoint[0] = y;
}

function updateEvilCoord() {
  var newx;
  var newy;

  do {
    var valid = true;
    var change = randomMove();
    var x = parseInt(evilPoint[1]);
    var y = parseInt(evilPoint[0]);
    newx = x + change[0];
    newy = y + change[1];
		// monster cannot move into the weapon
		if (newy == weaponPoint[0] && newx == weaponPoint[1])
		  valid = false;
		// monster cannot move off the grid
    if (newx < gridMin || newx > gridMax || newy < gridMin || newy > gridMax)
      valid = false;
  } while (!valid);

  var newCoord = newy.toString() + newx.toString();
  var oldCoord = evilPoint[0].toString() + evilPoint[1].toString();
  document.getElementById(oldCoord).innerHTML = '';
  document.getElementById(newCoord).innerHTML = '<img src=\"' + evilURL + '\">';
  evilPoint[1] = newx;
  evilPoint[0] = newy;
}

function move(dir) {
  if (!gameActive)
	  return;
		
  updateEvilCoord();
	
  var x = parseInt(userPoint[1]);
  var y = parseInt(userPoint[0]);

  switch (dir) {
    case 'left':
      if (x > gridMin)
        x -= 1;
      break;
    case 'up':
      if (y > gridMin)
        y -= 1;
      break;
    case 'right':
      if (x < gridMax)
        x += 1;
      break;
    case 'down':
      if (y < gridMax)
        y += 1;
      break;
  }
  // prevent user from moving onto kitty	
  if (x != kittyPoint[1] || y != kittyPoint[0])
    updateUserCoord(x,y);
  comparePoints();
}

function userMonsterEncounter() {
  var userCoord = userPoint[0].toString() + userPoint[1].toString();
  if (userArmed) {
	  alert('You killed the monster! You win!');
		document.getElementById(userCoord).innerHTML = '<img src=\"' + victoryURL + '\">';
	}
	else {
	  alert('The monster killed you! You lose!');
		document.getElementById(userCoord).innerHTML = '<img src=\"' + userdiesURL + '\">'; 
	}
	reloadAlert();
	gameActive = false;
}

function comparePoints() {

// User gets the weapon

  if (userPoint[0] == weaponPoint[0] && userPoint[1] == weaponPoint[1]) {
    userURL = armedUserURL;
    userArmed = true;
		var userCoord = userPoint[0].toString() + userPoint[1].toString();
		document.getElementById(userCoord).innerHTML = '<img src=\"' + userURL + '\">';
		weaponPoint = [gridMax + 1, gridMax + 1];
		alert('You got the weapon!');
  }

// Monster + User

  if (userPoint[0] == evilPoint[0] && userPoint[1] == evilPoint[1]) {
   userMonsterEncounter();
  }

// Monster + Kitty

  if (kittyPoint[0] == evilPoint[0] && kittyPoint[1] == evilPoint[1]) {
    // monster kills kitten
		alert('The monster killed the kitty! You lose!');
		var evilCoord = evilPoint[0].toString() + evilPoint[1].toString();
		document.getElementById(evilCoord).innerHTML = '<img src=\"' + catdiesURL + '\">';
		reloadAlert();
		gameActive = false;
  }

}

function alert(message) {
  document.getElementById('message').innerHTML = '<p>' + message + '</p>';
}

function reloadAlert() {
  document.getElementById('message').innerHTML += '<p>Press Spacebar to reset.</p>';
}

function initialAlert() {
  document.getElementById('message').innerHTML = '<p>Get the weapon and slay the monster before it gets to the kitten!</p>' +
    '<p>You are blue. Use arrow keys to move.</p>';
}

function keyCheck(e) {
	
  evt = e.keyCode || e.charCode;
  	
  if (evt == 37) // Left Arrow
    move('left');
  else if (evt == 38) // Up Arrow
    move('up');
  else if (evt == 39) // Right Arrow
    move('right');
  else if (evt == 40) // Down Arrow
    move('down');
  else if (evt == 32) // Space
    reload();
}

document.addEventListener("keydown", keyCheck, false);