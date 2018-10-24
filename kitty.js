var userPoint = [];
var monsterPoint = [];
var kittyPoint = [];
var weaponPoint = [];

const unarmedUserURL = 'images/user.png';
const armedUserURL = 'images/armed.png';
var userURL = unarmedUserURL;
const monsterURL = 'images/monster.png';
const kittyURL = 'images/cat.png';
const weaponURL = 'images/sword.png';
const victoryURL = 'images/victory.png';
const catDiesURL = 'images/catdies.png';
const userDiesURL = 'images/userdies.png';
const holeURL = 'images/hole.png';
const abyssURL = 'images/abyss.png';
const defaultColor = '#FFFFFF';
const wallColor = '#000000';

var levelMap;
const gridMax = 7;
const gridMin = 0;
var userArmed = false;
var currentLevel = 1;
var monsterSpeed = 500; // lower is faster
const maxLevel = levels.length;
var autoMove;
var gameActive = true;

function randomCoord() {
  var x = Math.floor(Math.random()*(gridMax + 1));
  var y = Math.floor(Math.random()*(gridMax + 1));
  return y.toString() + x.toString();
}

function randomMove() {
  var xChange = Math.floor(Math.random()*3);
  xChange = xChange == 2 ? -1 : xChange;
  var yChange;
  if (xChange != 0)
    yChange = 0;
  else {
    yChange = Math.floor(Math.random()*2);
    yChange = yChange == 0 ? -1 : 1;
  }
  return [xChange, yChange];
}

function randomStartPosition() { // not currently used
  var noOverlaps = true;

  do {
    noOverlaps = true;

    var userCoord = randomCoord();
    userPoint[1] = parseInt(userCoord[1]);
    userPoint[0] = parseInt(userCoord[0]);

    var monsterCoord = randomCoord();
    monsterPoint[1] = parseInt(monsterCoord[1]);
    monsterPoint[0] = parseInt(monsterCoord[0]);

    if (userCoord == monsterCoord)
      noOverlaps = false;

    var kittyCoord = randomCoord();
    kittyPoint[1] = parseInt(kittyCoord[1]);
    kittyPoint[0] = parseInt(kittyCoord[0]);

    if (kittyCoord == userCoord || kittyCoord == monsterCoord)
      noOverlaps = false;

    var weaponCoord = randomCoord();
    weaponPoint[1] = parseInt(weaponCoord[1]);
    weaponPoint[0] = parseInt(weaponCoord[0]);

    if (weaponCoord == userCoord || weaponCoord == monsterCoord || weaponCoord == kittyCoord)
      noOverlaps = false;
	
  } while (!noOverlaps)

  document.getElementById(userCoord).innerHTML = '<img src=\"' + userURL + '\">';
  document.getElementById(monsterCoord).innerHTML = '<img src=\"' + monsterURL + '\">';
  document.getElementById(kittyCoord).innerHTML = '<img src=\"' + kittyURL + '\">';
  document.getElementById(weaponCoord).innerHTML = '<img src=\"' + weaponURL + '\">';
}

function presetStartPosition() {
  levelMap = levels[currentLevel - 1];

  for (var i = 0; i < levelMap.length; i++) {
    for (var j = 0; j < levelMap[i].length; j++) {
      var coord = i.toString() + j.toString();
      switch (levelMap[i][j]) {
        case 'u':
          document.getElementById(coord).style.background = defaultColor;
          document.getElementById(coord).innerHTML = '<img src=\"' + userURL + '\">';
          userPoint[0] = i;
          userPoint[1] = j;
          break;
        case 'k':
          document.getElementById(coord).style.background = defaultColor;
          document.getElementById(coord).innerHTML = '<img src=\"' + kittyURL + '\">';
          kittyPoint[0] = i;
          kittyPoint[1] = j;
          break;
        case 'm':
          document.getElementById(coord).style.background = defaultColor;
          document.getElementById(coord).innerHTML = '<img src=\"' + monsterURL + '\">';
          monsterPoint[0] = i;
          monsterPoint[1] = j;
          break;
        case 'w':
          document.getElementById(coord).style.background = defaultColor;
          document.getElementById(coord).innerHTML = '<img src=\"' + weaponURL + '\">';
          weaponPoint[0] = i;
          weaponPoint[1] = j;
          break;
        case '=':
          document.getElementById(coord).innerHTML = '';
          document.getElementById(coord).style.background = wallColor;
          break;
        case '*':
          document.getElementById(coord).style.background = defaultColor;
          document.getElementById(coord).innerHTML = '<img src=\"' + holeURL + '\">';
          break;
        default:
          document.getElementById(coord).style.background = defaultColor;
          document.getElementById(coord).innerHTML = '';
          break;
      }
    }
  }
}

function load() {
  document.getElementById('level').innerHTML = currentLevel;
  document.getElementById('speed').innerHTML = 500/monsterSpeed;
  initialAlert();
  presetStartPosition();
  autoMove = setInterval(moveMonster, monsterSpeed);
}

function reload() {
  userURL = unarmedUserURL;
  userArmed = false;
  gameActive = true;
  clearInterval(autoMove);
  load();
}

function updateUserCoord(x,y) {
  var newCoord = y.toString() + x.toString();
  var oldCoord = userPoint[0].toString() + userPoint[1].toString();
  var monsterCoord = monsterPoint[0].toString() + monsterPoint[1].toString();
  if (oldCoord != monsterCoord) {
    document.getElementById(oldCoord).innerHTML = '';
    document.getElementById(newCoord).innerHTML = '<img src=\"' + userURL + '\">';
  }
  else // it would be nice to limit this to cases where the user and monster switch places
    userMonsterEncounter();  
  userPoint[1] = x;
  userPoint[0] = y;
}

function isHole(x, y) {
	return levelMap[y][x] == '*';
}

function isWall(x, y) {
	return levelMap[y][x] == '=';
}

function moveMonster() {
  var newx;
  var newy;

  do {
    var valid = true;
    var change = randomMove();
    const x = parseInt(monsterPoint[1]);
    const y = parseInt(monsterPoint[0]);
    newx = x + change[0];
    newy = y + change[1];
	
    // monster cannot move into the weapon
    if (newy == weaponPoint[0] && newx == weaponPoint[1])
      valid = false;
  
    // monster cannot move off the grid
    if (newx < gridMin || newx > gridMax || newy < gridMin || newy > gridMax)
      valid = false;

    // monster cannot move into a hole or wall
    const hole = isHole(newx, newy);
	const wall = isWall(newx, newy);
	if (hole || wall)
      valid = false;

  } while (!valid);

  const newCoord = newy.toString() + newx.toString();
  const oldCoord = monsterPoint[0].toString() + monsterPoint[1].toString();
  document.getElementById(oldCoord).innerHTML = '';
  document.getElementById(newCoord).innerHTML = '<img src=\"' + monsterURL + '\">';
  monsterPoint[1] = newx;
  monsterPoint[0] = newy;
  comparePoints();
}

function moveUser(dir) {
  if (!gameActive)
    return;
	
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
  const barrier = isWall(x, y);
  // prevent user from moving onto kitty or a wall
  if (!barrier && (x != kittyPoint[1] || y != kittyPoint[0]))
    updateUserCoord(x,y);
  comparePoints();
}

function comparePoints() {

  const fellIntoTheAbyss = isHole(userPoint[1], userPoint[0]);

// User + Hole
  
  if (fellIntoTheAbyss) {
	  endGame('You fell into the abyss! You lose!');
	  const userCoord = userPoint[0].toString() + userPoint[1].toString();
      document.getElementById(userCoord).innerHTML = '<img src=\"' + abyssURL + '\">';
  }
  
// Monster + Kitty

  if (kittyPoint[0] == monsterPoint[0] && kittyPoint[1] == monsterPoint[1]) {
	endGame('The monster killed the kitty! You lose!');
    const monsterCoord = monsterPoint[0].toString() + monsterPoint[1].toString();
    document.getElementById(monsterCoord).innerHTML = '<img src=\"' + catDiesURL + '\">';
  }

// Monster + User

  if (userPoint[0] == monsterPoint[0] && userPoint[1] == monsterPoint[1])
    userMonsterEncounter();

// User + Weapon

  if (userPoint[0] == weaponPoint[0] && userPoint[1] == weaponPoint[1]) {
    userURL = armedUserURL;
    userArmed = true;
    const userCoord = userPoint[0].toString() + userPoint[1].toString();
    document.getElementById(userCoord).innerHTML = '<img src=\"' + userURL + '\">';
    weaponPoint = [gridMax + 1, gridMax + 1];
    alert('You got the weapon!');
  }
}

function userMonsterEncounter() {
  if (!gameActive) // this prevents duplicate calls
    return;
  const userCoord = userPoint[0].toString() + userPoint[1].toString();
  if (userArmed) {
	clearInterval(autoMove);
    alert('You killed the monster! You win!');
    document.getElementById(userCoord).innerHTML = '<img src=\"' + victoryURL + '\">';
    currentLevel++;
    if (currentLevel > maxLevel) {
      currentLevel = 1;
      monsterSpeed = monsterSpeed / 2;
	}      
    nextLevelAlert();
  }
  else {
    endGame('The monster killed you! You lose!');
    document.getElementById(userCoord).innerHTML = '<img src=\"' + userDiesURL + '\">';
  }
  gameActive = false;
}

function endGame(message) {
  clearInterval(autoMove);
  alert(message);
  reloadAlert();
  currentLevel = 1;
  monsterSpeed = 500;
  gameActive = false;
}

function alert(message) {
  document.getElementById('message').innerHTML = '<p>' + message + '</p>';
}

function reloadAlert() {
  document.getElementById('message').innerHTML += '<p>Press Spacebar to start over.</p>';
}

function nextLevelAlert() {
  document.getElementById('message').innerHTML += '<p>Press Spacebar for next level.</p>';
}

function initialAlert() {
  const msg = document.getElementById('message');
  msg.innerHTML = '<p>Get the weapon and slay the monster before it gets to the kitten!</p>';
  if (currentLevel == 1)
    msg.innerHTML += '<p>You are blue. Use arrow keys to move.</p>';
  else
    msg.innerHTML += '<p>Watch out for holes!</p>';
}

function keyCheck(e) {

  evt = e.keyCode || e.charCode;
  	
  if (evt == 37) // Left Arrow
    moveUser('left');
  else if (evt == 38) // Up Arrow
    moveUser('up');
  else if (evt == 39) // Right Arrow
    moveUser('right');
  else if (evt == 40) // Down Arrow
    moveUser('down');
  else if (evt == 32) // Space
    reload();
}

document.addEventListener("keydown", keyCheck, false);