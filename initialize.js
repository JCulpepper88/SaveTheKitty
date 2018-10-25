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
const gridMax = 7;
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

function loadMap() {
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
