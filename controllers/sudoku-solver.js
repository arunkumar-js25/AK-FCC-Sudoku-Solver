class SudokuSolver {

  validate(puzzleString) {
    
    var lengthStr = puzzleString.length;
    //Check count is 81
    if(lengthStr != 81){
      return false;
    }

    //Loop and find the character is digit or .
    for(let i=0;i<lengthStr;i++){
      if(puzzleString[i] != "." && !(puzzleString[i] >= "0" && puzzleString[i] <= "9")){
        return false;
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

