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
const lifeURL = 'images/heart.png';
const defaultColor = '#FFFFFF';
const wallColor = '#000000';

var levelMap;
var gridMax = 0;
const gridMin = 0;
var userArmed = false;
var currentLevel = 1;
var kittensSaved = 0;
var userLives = 0;
var monsterSpeed = 500; // lower is faster
const maxLevel = levels.length;
var autoMove;
var gameActive = true;


function newGame() {
  addLife();
  addLife();
  addLife();
  currentLevel = 1;
  kittensSaved = 0;
  monsterSpeed = 500;
  loadLevel();
}


function loadLevel() {
  if (userLives < 1) {
    newGame();
  }
  else {
    userURL = unarmedUserURL;
    userArmed = false;
    document.getElementById('level').innerHTML = currentLevel;
    document.getElementById('saved').innerHTML = kittensSaved;
    document.getElementById('speed').innerHTML = 500/monsterSpeed;
    initialAlert();
    loadMap();
    gameActive = true;
    autoMove = setInterval(moveMonster, monsterSpeed);
  }
}


function createTable(size) {
  var table = document.createElement('table');
  table.className = 'grid';
	
  for (var i = 0; i <= size; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j <= size; j++) {
      var td = document.createElement('td');
      td.setAttribute('id', i + '-' + j);
      td.setAttribute('style', 'height: ' + 500/size + '; width: ' + 500/size + ';');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.getElementById('tableJS').appendChild(table);
}


function clearTable() {
  const tableArea = document.getElementById('tableJS');
  if (tableArea.childNodes.length > 0)
    tableArea.removeChild(tableArea.childNodes[0]);
}


function loadMap() {
  levelMap = levels[currentLevel - 1];
  gridMax = levelMap.length - 1;
  clearTable();
  createTable(gridMax);
  
  for (var i = 0; i < levelMap.length; i++) {
    for (var j = 0; j < levelMap[i].length; j++) {
		
	  // Validate level
	  if (levelMap[i].length != levelMap.length) {
		  alert('Level Map is not a square. Cannot load level.');
		  return;
	  }
	  
      var coord = i.toString() + '-' + j.toString();
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
