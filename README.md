Save the Kitty
==============

## Goal

Get the weapon and kill the monsters before they get to the kitty! Play it at:

https://bradleykh.github.io/SaveTheKitty/

## Design

Each level map is stored as an array of characters (see level.js). A table displaying the level is rendered dynamically based on the grid size of each level.

The monsters move in a random direction every half second. The kitty and weapon are stationary.

The user begins with 3 lives. The user loses a life by walking into a hole, allowing a monster to get the kitty, or encountering a monster unarmed.

After completing all the levels, it resets to level 1, but the monsters double in speed, and the user gains a life.

## Issues

* Monsters can overlap
* I eventually plan to connect this to a database to keep track of high scores.