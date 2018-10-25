function randomCoord() {
  var x = Math.floor(Math.random()*(gridMax + 1));
  var y = Math.floor(Math.random()*(gridMax + 1));
  return y.toString() + x.toString();
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