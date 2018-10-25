Save the Kitty
==============

## Goal

Get the weapon and kill the monster before it gets to the kitty! 

## Design

Each of the levels is an array of characters parsed by the program. A table displaying the level is rendered dynamically based on the grid size of each level.

The monster moves in a random direction every half second.

The user begins with 3 lives. After completing all the levels, it resets to level 1, but the monster doubles in speed, and the user gains a life.

## Issues

* Sometimes the monster move function can't seem to find the level map.
* I eventually plan to connect this to a database to keep track of high scores.
* I might make the monster smarter.