var arr = [[], [], [], [], [], [], [], [], []]
let board;

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}

function FillBoard() {
	for (var i = 0; i < 9; i++) {
        // console.log(board[i])
		for (var j = 0; j < 9; j++) {
            // console.log(board[i][j])
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.addEventListener('click', function () {
	// var xhrRequest = new XMLHttpRequest()
	// xhrRequest.onload = function () {
	// 	var response = JSON.parse(xhrRequest.response)
	// 	console.log(response)
	// 	board = response.board
	// 	FillBoard(board)
	// }
	// xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	// //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	// xhrRequest.send()

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2f74210093msh2907e5dfd3d354ep125553jsn40f7f5002b92',
            'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com'
        }
    };
    
    fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true', options)
        .then(response => {
            // console.log(response);
            return response.json()
        })
        .then(json => {
            // console.log(json);
            // console.table(response)
            // console.table(response["unsolved-sudoku"])
            board = json.response['unsolved-sudoku'];
            // console.log(board)
            FillBoard(board);
        })
        .catch(err => console.error(err));
}
)

SolvePuzzle.addEventListener('click', () => {
	let status = getSolveSudoku();
    if(status)
        FillBoard();
});

// function isValid(board, i, j, num, n) {

//     //Row and Column Check
//     for (let x = 0; x < n; x++) {
//         if (board[i][x] == num || board[x][j] == num)
//             return false;
//     }

//     //Submatrix check
//     let rn = Math.sqrt(n);
//     let si = i - i % rn;
//     let sj = j - j % rn;
//     for (let x = si; x < si + rn; x++) {
//         for (let y = sj; y < sj + rn; y++) {
//             if (board[x][y] == num)
//                 return false;
//         }
//     }
//     return true;
// }

// function SudokuSolver(board, i, j, n) {
//     //Base cases
//     if (i == n) {
//         // Print(board,n);
//         FillBoard(board);
//         return true;
//     }
//     //If we are not inside the board
//     if (j == n) {
//         return SudokuSolver(board, i + 1, 0, n);
//     }
//     //If the cell of board is already filled
//     if (board[i][j] != 0) {
//         return SudokuSolver(board, i, j + 1, n);
//     }

//     //We try to fill cell with appropriate number
//     for (let num = 1; num < 10; num++) {
//         //check if num is valid here
//         if (isValid(board, i, j, num, n)) {
//             board[i][j] = num;
//             if (SudokuSolver(board, i, j + 1, n)) {
//                 return true;
//             }
//             board[i][j] = 0;
//         }
//     }
//     //Not able to fill this sudoku
//     return false;
// }

let N = 9;
function isSafe(r, c, n)
{
    // Checking in the row & column
    for(let i = 0; i < 9; i++)
    {
        if(board[r][i] == n || board[i][c] == n)
        {
            return false;
        }
    }
    // Checking in the subboard 
    let s = Math.sqrt(N);
    let tempR = r-r%s, tempC = c-c%s;
    for(let i = 0; i < s; i++)
    {
        for(let j = 0; j < s; j++)
        {
            if(board[i+tempR][j+tempC] == n)
            {
                return false;
            }
        }
    }
    return true;
}

function getSolveSudoku()  
{ 
    let r = -1, c = -1;
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(board[i][j] == 0)
            {
                r = i;
                c = j;
                break;
            }
        }
        if(r != -1 && c != -1)
            break;
    }
    if(r == -1 && c == -1)
        return true;
    else
    {
        for(let i = 0; i < 9; i++)
        {
            if(isSafe(r, c, i+1))
            {
                board[r][c] = i+1;
                let flag = getSolveSudoku();
                if(flag)
                    return true;
                else
                    board[r][c] = 0;
            }
        }
        return false;
    }
}
