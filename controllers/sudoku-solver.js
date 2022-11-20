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
    let rowOrder = [["A","B","C"],["D","E","F"],["G","H","I"]];
    let rowStart = 0;
    for(let i=0;i<rowOrder.length;i++){
      if(rowOrder[i].indexOf(row) == -1){
        rowStart += 9*3;
      }
      else{
        break;
      }
    }
  
    let colStart = 0;
    if(column >= 4 && column <= 6){
      colStart = 3;
    }
    else if(column >= 7 && column <= 9){
      colStart = 6;
    }
  
    let count=0;
    console.log(rowStart);
    console.log(colStart);
    for(let j=rowStart;count<3;j=j+9)
    {
      console.log(puzzleString.slice(j+colStart,j+colStart+3));
      if(puzzleString[j+colStart] == value || puzzleString[j+colStart+1] == value || puzzleString[j+colStart+2] == value){
        return false;
      }
      count++;
    }
    
    return true;
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

