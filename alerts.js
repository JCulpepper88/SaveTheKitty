function alert(message) {
  document.getElementById('message').innerHTML = '<p>' + message + '</p>';
}

function restartLevelAlert() {
  document.getElementById('message').innerHTML += '<p>Press Spacebar to start over.</p>';
}

function victoryAlert() {
  document.getElementById('message').innerHTML += '<p>Press Spacebar for next level.</p>';
}

function gameOverAlert() {
  document.getElementById('message').innerHTML += '<p>Game over. Press Spacebar to play again.</p>';
}

function initialAlert() {
  const msg = document.getElementById('message');
  msg.innerHTML = '<p>Get the weapon and slay the monsters before they get to the kitten!</p>';
  if (currentLevel == 1 && monsterSpeed == 500)
    msg.innerHTML += '<p>Use arrow keys to move.</p>';
  else
    msg.innerHTML += '<p>Watch out for holes!</p>';
}