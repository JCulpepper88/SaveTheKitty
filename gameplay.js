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

function isAlive() {
 return userLives > 0;
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
  if (!gameActive) // User can only move when game is active
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

  // prevent user from moving onto kitty or a wall
  const barrier = isWall(x, y);
  if (!barrier && (x != kittyPoint[1] || y != kittyPoint[0]))
    updateUserCoord(x,y);
  comparePoints();
}

function comparePoints() {

// User + Hole

  const fellIntoTheAbyss = isHole(userPoint[1], userPoint[0]);  
  if (fellIntoTheAbyss) {
    loseLife();
    endLevel('You fell into the abyss!');
    const userCoord = userPoint[0].toString() + userPoint[1].toString();
    document.getElementById(userCoord).innerHTML = '<img src=\"' + abyssURL + '\">';
  }
  
// Monster + Kitty

  if (kittyPoint[0] == monsterPoint[0] && kittyPoint[1] == monsterPoint[1]) {
    loseLife();
    endLevel('The monster killed the kitty!');
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
    endLevel('You killed the monster!');
    document.getElementById(userCoord).innerHTML = '<img src=\"' + victoryURL + '\">';
    kittensSaved++;
    document.getElementById('saved').innerHTML = kittensSaved;
    currentLevel++;
    if (currentLevel > maxLevel) {
      currentLevel = 1;
      monsterSpeed = monsterSpeed / 2;
      addLife();
    }      
    victoryAlert();
  }
  else {
    loseLife();
    endLevel('The monster killed you!');
    document.getElementById(userCoord).innerHTML = '<img src=\"' + userDiesURL + '\">';
  }
  gameActive = false;
}

function addLife() {
  userLives++;
  var heartIMG = document.createElement("img");
  heartIMG.src = lifeURL;
  heartIMG.className = 'heart';

  var heart = document.createElement("LI");
  heart.appendChild(heartIMG);
  document.getElementById('lives').appendChild(heart);
}

function loseLife() {
  userLives--;
  const lives = document.getElementById('lives')
  lives.removeChild(lives.childNodes[0]);
}

function endLevel(message) {
  clearInterval(autoMove);
  alert(message);
  gameActive = false;
  if (userLives < 1)
    gameOverAlert();
}

function keyCheck(e) {

  evt = e.keyCode || e.charCode;

  if (evt == 37) { // Left Arrow
    event.preventDefault();
    moveUser('left');
  }
  else if (evt == 38) { // Up Arrow
    event.preventDefault();
    moveUser('up');
  }
  else if (evt == 39) { // Right Arrow
    event.preventDefault();
    moveUser('right');
  }
  else if (evt == 40) { // Down Arrow
    event.preventDefault();
    moveUser('down');
  }
  else if (evt == 32) { // Space
    event.preventDefault();
    if (!gameActive)
      loadLevel();
  }
}

document.addEventListener("keydown", keyCheck, false);