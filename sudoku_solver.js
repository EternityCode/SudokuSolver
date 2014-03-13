/*
 * Title            : Sudoku Solving Function Logic
 * Purpose          : Solves a valid 9x9 Sudoku puzzle using a recursive backtracking algorithm.
 * Reference        : http://see.stanford.edu/materials/icspacs106b/H19-RecBacktrackExamples.pdf
 * Author           : Vincent W. F. Chung (University of Waterloo)
 * Date Modified    : 2014-03-12
 */

(function(sudoku, undefined) {
    // Define static grid to reduce memory usage during recursion (this system is consistent)
    sudoku.grid = [[5, 3, 4, 6 ,7 ,8, 9, 1, 2],
                   [6, 7, 2, 1, 9, 5, 3, 4, 8],
                   [1, 9, 8, 3, 4, 2, 5, 6, 7],
                   [8, 5, 9, 7, 6, 1, 4, 2, 3],
                   [4, 2, 6, 8, 5, 3, 7, 9, 1],
                   [7, 1, 3, 9, 2, 4, 8, 5, 6],
                   [9, 6, 1, 5, 3, 7, 2, 8, 4],
                   [2, 8, 7, 4, 1, 9, 6, 3, 5],
                   [3, 4, 5, 2, 8, 6, 1, 7, 9]];
    
    sudoku.solve = function() {
        uns_coord = sudoku.find_unassigned();
        row = uns_coord[0];
        col = uns_coord[1];
        // If all cells are assigned, then the solution has been found!
        if (row == -1 && col == -1) return true;
        for (var i = 1; i <= 9; i++) {
            if (sudoku.insert_valid(row, col, i)) {
                // Try i at (row,column), will "branch" from here
                sudoku.grid[row][col] = i;
                // Solution was found "below", pass this good news back up the stack!!
                if (sudoku.solve()) return true;
                // Reset the grid to try the next i, this path led to nowhere
                sudoku.grid[row, col] = 0;
            }
        }
        return false;
    }
    
    sudoku.insert_valid = function(row, col, num) {
        // Check the 9 numbers in the current row
        for (var icol = 0; icol < 9; icol++) {
            if (sudoku.grid[row][icol] == num) return false;
        }
        // Check the 9 numbers in the current column
        for (var irow = 0; irow < 9; irow++) {
            if (sudoku.grid[irow][col] == num) return false;
        }
        // Check the 9 numbers in the current 3x3 sub-grid
        for (irow = 0; irow < 3; irow++) {
            for (icol = 0; icol < 3; icol++) {
                if (sudoku.grid[(row-row%3)+irow][(col-col%3)+icol] == num) {
                    return false;
                }
            }
        }
        // If all three tests pass, num at (row,col) is a legal insertion
        return true;
    };
    
    sudoku.find_unassigned = function() {
        // Look for unassigned (value 0) cells
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                if (sudoku.grid[row][col] == 0) return [row, col];
            }
        }
        // Every cell has been assigned a value!
        return [-1, -1];
    }
    
    // Validate a user-inputted 9x9 Sudoku grid
    sudoku.grid_valid = function() {
        // Verify that each assigned cell (value != 0) is valid (relative to the rest)
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                if (sudoku.grid[row][col] != 0) {
                    tmp = sudoku.grid[row][col]; sudoku.grid[row][col] = 0;
                    if (!sudoku.insert_valid(row, col, tmp)) return false;
                    sudoku.grid[row][col] = tmp;
                }
            }
        }
        return true;
    }
} (window.sudoku = window.sudoku || {}));