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
		const x = monsterPoints[i][1];
		const y = monsterPoints[i][0];
	
		do {
			var valid = true;
			var change = randomMove();
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

				else {
					// monster cannot move into another monster
					for (var j = 0; j < monsterPoints.length; j++) {
						if (newx == monsterPoints[j][1] && newy == monsterPoints[j][0])
							valid = false;
					}
					if (!valid && monsterPoints.length > 1) {
						newx = x;
						newy = y;
						valid = true;
					}
				}
			}
		} while (!valid)
			
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
    document.getElementById(toCoord(userPoint[0], userPoint[1])).innerHTML = '<img src=\"' + abyssURL + '\">';
    endLevel('You fell into the abyss!');
  }
  
// Monsters + Kitty

  for (var i = 0; i < monsterPoints.length; i++) {

    if (kittyPoint[0] == monsterPoints[i][0] && kittyPoint[1] == monsterPoints[i][1]) {
      loseLife();
      document.getElementById(toCoord(monsterPoints[i][0], monsterPoints[i][1])).innerHTML = '<img src=\"' + catDiesURL + '\">';
      endLevel('The monster killed the kitty!');
      
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
      endLevel('You killed all the monsters!', true);
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
      else if (currentLevel % 10 == 0)
		addLife();
      }
  }
  
  // if user has no weapon
  else { 
    loseLife();
    document.getElementById(userCoord).innerHTML = '<img src=\"' + userDiesURL + '\">';
    endLevel('The monster killed you!');
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


function endLevel(message, victory = false) {
  clearInterval(autoMove);
  alert(message);
  gameActive = false;
  if (userLives == 0) {
    gameOverAlert();
  }
  else if (!victory)
    restartLevelAlert();
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