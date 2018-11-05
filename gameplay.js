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


function toCoord(a, b) {
	return a.toString() + '-' + b.toString();
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


function moveMonsters() {
  for (var i = 0; i < monsterPoints.length; i++) {

    var newx;
    var newy;

    do {
      var valid = true;
      var change = randomMove();
      const x = monsterPoints[i][1];
      const y = monsterPoints[i][0];
      newx = x + change[0];
      newy = y + change[1];
	  
      // monster cannot move off the grid
      if (newx < gridMin || newx > gridMax || newy < gridMin || newy > gridMax)
        valid = false;
	
      else {
          const hole = isHole(newx, newy);
          const wall = isWall(newx, newy);
      
          // monster cannot move into the weapon
          if (newy == weaponPoint[0] && newx == weaponPoint[1])
            valid = false;

          // monster cannot move into a hole or wall
          else if (hole || wall)
            valid = false;

          // monster cannot move into another monster
          for (var j = 0; j < monsterPoints.length; j++) {
            if (newx == monsterPoints[j][1] && newy == monsterPoints[j][0])
                valid = false;
          }
      }	
    } while (!valid);

    document.getElementById(toCoord(monsterPoints[i][0], monsterPoints[i][1])).innerHTML = '';
    document.getElementById(toCoord(newy,newx)).innerHTML = '<img src=\"' + monsterURL + '\">';
    monsterPoints[i][1] = newx;
    monsterPoints[i][0] = newy;
  }

  comparePoints();
}


function moveUser(dir) {
  if (!gameActive) // User can only move when game is active
    return;
	
  var x = userPoint[1];
  var y = userPoint[0];

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
  if (!barrier && (x != kittyPoint[1] || y != kittyPoint[0])) {
    document.getElementById(toCoord(userPoint[0], userPoint[1])).innerHTML = '';
    document.getElementById(toCoord(y, x)).innerHTML = '<img src=\"' + userURL + '\">';
    userPoint[1] = x;
    userPoint[0] = y;
  }

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
    document.getElementById(toCoord(userPoint[0], userPoint[1])).innerHTML = '<img src=\"' + abyssURL + '\">';
  }
  
// Monsters + Kitty

  for (var i = 0; i < monsterPoints.length; i++) {

    if (kittyPoint[0] == monsterPoints[i][0] && kittyPoint[1] == monsterPoints[i][1]) {
      loseLife();
      endLevel('The monster killed the kitty!');
      if (isAlive)
        restartLevelAlert();
      document.getElementById(toCoord(monsterPoints[i][0], monsterPoints[i][1])).innerHTML = '<img src=\"' + catDiesURL + '\">';
    }
  }

// Monsters + User

  for (var i = 0; i < monsterPoints.length; i++) {

  if (userPoint[0] == monsterPoints[i][0] && userPoint[1] == monsterPoints[i][1])
    userMonsterEncounter();
  }

// User + Weapon

  if (userPoint[0] == weaponPoint[0] && userPoint[1] == weaponPoint[1]) {
    userURL = armedUserURL;
    monsterURL = scaredMonsterURL;
    userArmed = true;
    document.getElementById(toCoord(userPoint[0], userPoint[1])).innerHTML = '<img src=\"' + userURL + '\">';
    weaponPoint = [gridMax + 1, gridMax + 1];
    alert('You got the weapon!');
  }
}


function getMonsterIndex(x, y) {
  for (var i = 0; i < monsterPoints.length; i++) {
    if (monsterPoints[i][0] == x && monsterPoints[i][1] == y)
      return i;
  }
  return -1;
}


function userMonsterEncounter() {
  const userCoord = toCoord(userPoint[0], userPoint[1]);

  // if user has the weapon
  if (userArmed) { 
  
    // remove monsterpoint from array
    const monsterLocation = getMonsterIndex(userPoint[0], userPoint[1]);
	if (monsterLocation != -1)
      monsterPoints.splice(monsterLocation, 1);
  
    document.getElementById(userCoord).innerHTML = '<img src=\"' + victoryURL + '\">';
    
	// if there are more monsters
	if (monsterPoints.length > 0)  
      alert('You killed a monster!');
  
    // if there are no more monsters
    else { 
      endLevel('You killed all the monsters!');
      victoryAlert();
      document.getElementById(toCoord(kittyPoint[0], kittyPoint[1])).innerHTML = '<img src=\"' + catLivesURL + '\">';
      kittensSaved++;
      document.getElementById('saved').innerHTML = kittensSaved;
      currentLevel++;
      if (currentLevel > maxLevel) {
        currentLevel = 1;
        monsterSpeed = monsterSpeed / 2;
        addLife();
      }    
    }
  }
  
  // if user has no weapon
  else { 
    loseLife();
    endLevel('The monster killed you!');
    if (isAlive)
      restartLevelAlert();
    document.getElementById(userCoord).innerHTML = '<img src=\"' + userDiesURL + '\">';
    gameActive = false;
  }
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
    case 32: // Spacebar
      onSpaceBar();
      break;
  }
  
  document.getElementById('controls').style.display = 'none';
}


function onSpaceBar() {
  event.preventDefault();
  if (!gameActive)
    loadLevel();
}


document.addEventListener("keydown", keyCheck, false);