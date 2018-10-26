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
  var newCoord = y.toString() + '-' + x.toString();
  var oldCoord = userPoint[0].toString() + '-' + userPoint[1].toString();
  // var monsterCoord = monsterPoint[0].toString() + '-' + monsterPoint[1].toString();
//  if (oldCoord != monsterCoord) {
    document.getElementById(oldCoord).innerHTML = '';
    document.getElementById(newCoord).innerHTML = '<img src=\"' + userURL + '\">';
//  }
 // else // it would be nice to limit this to cases where the user and monster switch places
  //  userMonsterEncounter();
	
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
  for (var i = 0; i < monsterPoints.length; i++) {

  var newx;
  var newy;

  do {
    var valid = true;
    var change = randomMove();
    const x = parseInt(monsterPoints[i][1]);
    const y = parseInt(monsterPoints[i][0]);
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

   // monster cannot move into another monster
   // not implemented

  } while (!valid);

  const newCoord = newy.toString() + '-' + newx.toString();
  const oldCoord = monsterPoints[i][0].toString() + '-' + monsterPoints[i][1].toString();
  document.getElementById(oldCoord).innerHTML = '';
  document.getElementById(newCoord).innerHTML = '<img src=\"' + monsterURL + '\">';
  monsterPoints[i][1] = newx;
  monsterPoints[i][0] = newy;

  } // end for loop

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
    if (isAlive)
      restartLevelAlert();
    const userCoord = userPoint[0].toString() + '-' + userPoint[1].toString();
    document.getElementById(userCoord).innerHTML = '<img src=\"' + abyssURL + '\">';
  }
  
// Monsters + Kitty

  for (var i = 0; i < monsterPoints.length; i++) {

  if (kittyPoint[0] == monsterPoints[i][0] && kittyPoint[1] == monsterPoints[i][1]) {
    loseLife();
    endLevel('The monster killed the kitty!');
    if (isAlive)
      restartLevelAlert();
    const monsterCoord = monsterPoints[i][0].toString() + '-' + monsterPoints[i][1].toString();
    document.getElementById(monsterCoord).innerHTML = '<img src=\"' + catDiesURL + '\">';
  }
  } // end for loop

// Monsters + User

  for (var i = 0; i < monsterPoints.length; i++) {

  if (userPoint[0] == monsterPoints[i][0] && userPoint[1] == monsterPoints[i][1])
    userMonsterEncounter();

  }

// User + Weapon

  if (userPoint[0] == weaponPoint[0] && userPoint[1] == weaponPoint[1]) {
    userURL = armedUserURL;
    userArmed = true;
    const userCoord = userPoint[0].toString() + '-' + userPoint[1].toString();
    document.getElementById(userCoord).innerHTML = '<img src=\"' + userURL + '\">';
    weaponPoint = [gridMax + 1, gridMax + 1];
    alert('You got the weapon!');
  }
}


function userMonsterEncounter() {
  if (!gameActive) // this prevents duplicate calls
    return;
  const userCoord = userPoint[0].toString() + '-' + userPoint[1].toString();
  const kittyCoord = kittyPoint[0].toString() + '-' + kittyPoint[1].toString();
  if (userArmed) {
    endLevel('You killed the monster!');
    victoryAlert();
    document.getElementById(userCoord).innerHTML = '<img src=\"' + victoryURL + '\">';
    document.getElementById(kittyCoord).innerHTML = '<img src=\"' + catLivesURL + '\">';
    kittensSaved++;
    document.getElementById('saved').innerHTML = kittensSaved;
    currentLevel++;
    if (currentLevel > maxLevel) {
      currentLevel = 1;
      monsterSpeed = monsterSpeed / 2;
      addLife();
    }    
  }
  else {
    loseLife();
    endLevel('The monster killed you!');
    if (isAlive)
      restartLevelAlert();
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
  const lives = document.getElementById('lives');
  lives.removeChild(lives.childNodes[0]);
}


function endLevel(message) {
  clearInterval(autoMove);
  alert(message);
  gameActive = false;
  if (!isAlive)
    gameOverAlert();
}


function keyCheck(e) {

  evt = e.keyCode || e.charCode;

  switch (evt) {
    case 37: // Left Arrow
      event.preventDefault();
      moveUser('left');
      break;
    case 38: // Up Arrow
      event.preventDefault();
      moveUser('up');
      break;
    case 39: // Right Arrow
      event.preventDefault();
      moveUser('right');
      break;
    case 40: // Down Arrow
      event.preventDefault();
      moveUser('down');
      break;
    case 32:
      event.preventDefault();
      if (!gameActive)
        loadLevel();
  }
}


document.addEventListener("keydown", keyCheck, false);