class SudokuSolver {

  validate(puzzleString) {
    
    var lengthStr = puzzleString.length;
    //Check count is 81
    if(lengthStr != 81){
      return false;
    }

    //Loop and find the character is digit or .
    for(let i=0;i<lengthStr;i++){
      if(puzzleString[i] != "." && !(puzzleString[i] >= "1" && puzzleString[i] <= "9")){
        return false;
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowDict = { "A": [0,8], "B":[9,17], "C":[18,26], "D":[27,35], "E":[36,44], "F":[45,53], "G":[54,62], "H":[63,71], "I":[72,80] };
    let checkRow = rowDict[row];
    for(let i=checkRow[0];i<=checkRow[1];i++){
      if(value == puzzleString[i]){
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for(let i=column-1;i<puzzleString.length;i=i+9){
      if(value == puzzleString[i]){
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

