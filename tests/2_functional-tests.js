const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
let puzzle2 = "..9T.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
let puzzle3 = "..9..5.1.85.4...2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
let notpossiblepuzzle = "..9..5.1.85.4....2432...7..1...69.83.9...2.6.62.71...9..7...1945....4.37.4.3..6..";

suite('Functional Tests', () => {
  test('Solve a puzzle with valid puzzle string', function (done) {
		  chai
			.request(server)
			.post('/api/solve')
      .send({puzzle:puzzle})
			.end(function (err, res) {
			  assert.equal(res.body.solution, "769235418851496372432178956174569283395842761628713549283657194516924837947381625");
			  done();
			});
		});

  test('Solve a puzzle with missing puzzle string', function (done) {
		  chai
			.request(server)
			.post('/api/solve')
      .send()
			.end(function (err, res) {
			  assert.equal(res.body.error, "Required field missing");
			  done();
			});
		});

  test('Solve a puzzle with invalid characters', function (done) {
		  chai
			.request(server)
			.post('/api/solve')
      .send({puzzle:puzzle2})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Invalid characters in puzzle");
			  done();
			});
		});

  test('Solve a puzzle with incorrect length', function (done) {
		  chai
			.request(server)
			.post('/api/solve')
      .send({puzzle:puzzle3})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
			  done();
			});
		});

  test('Solve a puzzle that cannot be solved', function (done) {
		  chai
			.request(server)
			.post('/api/solve')
      .send({puzzle:notpossiblepuzzle})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Puzzle cannot be solved");
			  done();
			});
		});

  test('Check a puzzle placement with all fields:', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle,coordinate:"A1",value:7})
			.end(function (err, res) {
			  assert.equal(res.body.valid, true);
			  done();
			});
		});

  test('Check a puzzle placement with single placement conflict', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle,coordinate:"A1",value:1})
			.end(function (err, res) {
			  assert.equal(res.body.valid, false);
			  done();
			});
		});

  test('Check a puzzle placement with multiple placement conflicts', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle,coordinate:"A1",value:1})
			.end(function (err, res) {
			  assert.equal(res.body.valid, false);
			  done();
			});
		});

  test('Check a puzzle placement with all placement conflicts', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle,coordinate:"A1",value:1})
			.end(function (err, res) {
			  assert.equal(res.body.valid, false);
			  done();
			});
		});

  test('Check a puzzle placement with missing required fields', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle,coordinate:"A1",value:""})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Required field(s) missing");
			  done();
			});
		});

  test('Check a puzzle placement with invalid characters', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle2,coordinate:"A1",value:7})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Invalid characters in puzzle");
			  done();
			});
		});

  test('Check a puzzle placement with incorrect length', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle3,coordinate:"A1",value:7})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
			  done();
			});
		});

  test('Check a puzzle placement with invalid placement coordinate', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle,coordinate:"A99",value:7})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Invalid coordinate");
			  done();
			});
		});

  test('Check a puzzle placement with invalid placement value', function (done) {
		  chai
			.request(server)
			.post('/api/check')
      .send({puzzle:puzzle,coordinate:"A1",value:"R"})
			.end(function (err, res) {
			  assert.equal(res.body.error, "Invalid value");
			  done();
			});
		});
});

