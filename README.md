# Cellular Automaton Simulator

Interactively explore cellular automata governed by randomly generated
iteration rules.

<https://darthkeith.github.io/cellular-automaton/>

# Description

A cellular automaton consists of a lattice of cells, each of which is in one of
a finite number of states.  It repeatedly undergoes iterations during which the
state of each cell is changed according to a certain rule that depends only on
the states of the cells in its neighborhood, which can be defined in different
ways.

This program simulates one-dimensional cellular automata, where the
neighborhood of each cell consists of itself and the two cells adjacent to it.
Each cell state is represented by a different color.  The leftmost and
rightmost cells are considered adjacent, so the lattice is a closed loop.  The
length of the cell lattice is determined automatically based on the viewport
size and the current cell size in pixels.  As the automaton evolves, its cell
states between iterations are scrolled across the screen.  The iteration rule
is generated uniformly at random from the set of all functions
$f: S^{3} \to S$, where $S$ is the set of cell states.

# Controls

* Number of States buttons
  * Set the number of possible cell states.
* Change Rule button
  * Randomly generate a new iteration rule.
  * Keyboard shortcut: `<Enter>`
* Randomize Cells button
  * Set the automaton's cells to random states.
  * Keyboard shortcut: `<Backspace>`
* Cell Size buttons
  * Set the display size of the cells in pixels.
* Change Colors button
  * Generate a set of random colors to assign to cell states.
  * Keyboard shortcut: `<c>`
* Play/Pause button
  * Play/pause the iteration process.
  * Keyboard shortcut: `<Space>`

