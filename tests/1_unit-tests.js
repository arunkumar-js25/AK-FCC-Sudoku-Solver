const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
let invalidpuzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9..T...1945....4.37.4.3..6..";
let notpossiblepuzzle = "..9..5.1.85.4....2432...7..1...69.83.9...2.6.62.71...9..7...1945....4.37.4.3..6..";

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', function () {
		  assert.equal(solver.validate(puzzle),"");
	});
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
		  assert.equal(solver.validate(invalidpuzzle),"Invalid characters in puzzle");
	});
  test('Logic handles a puzzle string that is not 81 characters in length', function () {
		  assert.equal(solver.validate("..9..5"),"Expected puzzle to be 81 characters long");
	});
  test('Logic handles a valid row placement', function () {
		  assert.equal(solver.checkRowPlacement(puzzle, "A", "1", "1"),false);
	});
  test('Logic handles an invalid row placement', function () {
		  assert.equal(solver.checkRowPlacement(puzzle, "A", "3", "2"),true);
	});
  test('Logic handles a invalid column placement', function () {
		  assert.equal(solver.checkColPlacement(puzzle, "A", "3", "2"),false);
	});
  test('Logic handles an valid column placement', function () {
		  assert.equal(solver.checkColPlacement(puzzle, "A", "1", "2"),true);
	});
  test('Logic handles a valid region (3x3 grid) placement', function () {
		  assert.equal(solver.checkRegionPlacement(puzzle, "A", "1", "1"),true);
	});
  test('Logic handles an invalid region (3x3 grid) placement', function () {
		  assert.equal(solver.checkRegionPlacement(puzzle, "A", "3", "2"),false);
	});
  test('Valid puzzle strings pass the solver', function () {
		  assert.equal(solver.solve(puzzle),"769235418851496372432178956174569283395842761628713549283657194516924837947381625");
	});
  test('Invalid puzzle strings fail the solver', function () {
		  assert.equal(solver.solve(notpossiblepuzzle),notpossiblepuzzle);
	});
  test('Solver returns the expected solution for an incomplete puzzle', function () {
		  assert.equal(solver.solve(notpossiblepuzzle),notpossiblepuzzle);
	});
});
