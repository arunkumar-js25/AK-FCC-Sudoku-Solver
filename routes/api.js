'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      
      console.log("Started /api/check");
      let puzzleString=req.body.puzzle;
      if(req.body.puzzle == "" || req.body.puzzle == undefined){
        res.json({error:"Required field(s) missing"});
      }
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
        let column=req.body.coordinate.substring(1,req.body.coordinate.length);
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

        //console.log(solver.checkCell(puzzleString, row, column, value));
        if(solver.checkCell(puzzleString, row, column, value)){
          return res.json({"valid": validFlag});
        }
        else{
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
  
          if(validFlag){
            //console.log(req.body);
            res.json({"valid": validFlag});
          }
          else{
            //console.log(req.body);
            res.json({ "valid": validFlag, 
                    "conflict": conflictArray });
          }
        }
        
      }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      console.log("Started /api/solve");
      if(req.body.puzzle == "" || req.body.puzzle == undefined){
        res.json({error:"Required field missing"});
      }
      //Validate
      let msg = solver.validate(req.body.puzzle);
      if( msg != "")
      {
        res.json({error:msg});
      }
      else
      {
        let solutionPuzzle = solver.solve(req.body.puzzle);
        if(!solver.isComplete(solutionPuzzle)){
          res.json({ error: 'Puzzle cannot be solved' });
        }
        else{
          res.json({solution : solutionPuzzle});
        }
        
      }
    });
};
