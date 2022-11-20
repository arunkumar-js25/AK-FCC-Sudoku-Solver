'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      
      console.log("Started /api/check");
      let puzzleString=req.body.puzzle;
      //Validate
      let msg = solver.validate(puzzleString);
      if( msg != "")
      {
        res.json({error:msg});
      }

      if(req.body.coordinate == "" || req.body.coordinate == undefined
        || req.body.value == "" || req.body.value == undefined){
        res.json({error:"Required field(s) missing"});
      }
      else{
        let row=req.body.coordinate.split("")[0];
      let column=req.body.coordinate.split("")[1];
      let value=req.body.value;
        
      if( !(row>="A" && row<="I") || !(column>=1 && column <=9)){
        res.json({error:"Invalid coordinate"});
      }
      else if(!(value>=1 && value<=9)){
        res.json({error:"Invalid value"});
      }
      else
      {
        let validFlag = true;
        let conflictArray = [];
        
        //Row
        if(!solver.checkRowPlacement(puzzleString, row, column, value)){
          conflictArray.push("row");
          validFlag = false;
        }
  
        //Col
        if(!solver.checkColPlacement(puzzleString, row, column, value)){
          conflictArray.push("column");
          validFlag = false;
        }
  
        //Region
        if(!solver.checkRegionPlacement(puzzleString, row, column, value)){
          conflictArray.push("region");
          validFlag = false;
        }
        
        res.json({ "valid": validFlag, 
                  "conflict": conflictArray });
      }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      console.log("Started /api/solve");
      //Validate
      let msg = solver.validate(req.body.puzzle);
      if( msg != "")
      {
        res.json({error:msg});
      }
      else
      {
        let solutionPuzzle = solver.solve(req.body.puzzle);
        res.json({solution : solutionPuzzle});
      }
    });
};
