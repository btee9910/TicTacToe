// Database
const data = {
// Keep track of current page: page1- select game type; page2- insert name; page3- who goes first; game; win.
    currentpage: 'page1', 
// game type: 2p or vs computer
    is2p: null, 
    firstPlayer: '',
    secondPlayer: '',
// keep track of game round
    round: 0,
// When game start
    startGame: false,
// When game end
    endGame: false,
// Player data
    p1: {
        id: '#player1', 
        name: 'Player 1',
        token: 'circle',
        box: []     // empty array to assign each chosen box
    },
    p2: { 
        id: '#player2', 
        name: 'Player 2',
        token: 'cross',
        box: []
    },
// [0] is ignored; [1]-[9] box positions
    board: [ true, false, false, false, false,
             false, false, false, false, false ],
// rows for winning
    threeInARow: [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7] ],
    winningRow: 1,
// return current players turn
    player: function( next = 0 ) {
        if ( ( this.round + next ) % 2 === 0 ) {
            return this[ `${ this.firstPlayer }` ];
        } else return this[ `${ this.secondPlayer }` ]; 
    },

// check if someone win
    alreadyWon: function( ) {
        let won = false;
        // iterate each winning row
        for ( let i = 0; i < data.threeInARow.length; i++ ) {
            for ( let j = 0; j < 3; j++ ) {     // iterate each box in the row
                // check box match player's box
                if ( $.inArray( data.threeInARow[ i ][ j ], data.player().box ) === -1 ) {
                    won = false;                                                            
                    break;      // exit iteration if not match
                } else won = true;
            }; if ( won ) {
                data.winningRow += i;                       // identify winning row
                return data.endGame = true;                  // if a row is matching 
            };
        }; return won;                                      // otherwise it return false
    }
};
