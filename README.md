Save the Kitty
==============

## Goal

Get the weapon and kill the monster before it gets to the kitty! Play it at:

https://bradleykh.github.io/SaveTheKitty/

## Design

Each level is an array of characters (see level.js). A table displaying the level is rendered dynamically based on the grid size of each level.

The monster moves in a random direction every half second. The kitty and weapon are stationary.

The user begins with 3 lives. The user loses a life by walking into a hole, allowing the monster to get the kitty, or encountering the monster unarmed.

After completing all the levels, it resets to level 1, but the monster doubles in speed, and the user gains a life.

## Issues

* Sometimes the monster move function can't seem to find the level map.
* I plan to make multiple monsters possible.
* I eventually plan to connect this to a database to keep track of high scores.