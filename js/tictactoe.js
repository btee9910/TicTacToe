const data = {
    player1Name: 'Ben',
    player2Name: 'Tim',
    player1: [],                                                    // empty array to assign each chosen box
    player2: [],                                                    // empty array to assign each chosen box
    board: [ null, false, false, false, false, 
            false, false, false, false, false ],                    // [0] is null; [1]-[9] box positions
    threeInARow: [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7] ],   // rows for winning
    turns: 0                                                        // even no.: player 1 turn; odd no.: player 2
};

const tictactoe = ( player, pos ) => {
    data[ player ].push( pos );                                             // add chosen box to current player
    alreadyWon( player ) ?                                                  // check if someone win
        $('#message-box').text(`Winner is ${ data[ player+'Name'] }!`) :     // Winner notice
        $('#message-box').text('Next player turn');                          // Next Player notice
};

const alreadyWon = ( player ) => {
    let won = false;
    for ( let i = 0; i < data.threeInARow.length; i++ ) {                           // iterate each winning row
        for ( let j = 0; j < 3; j++ ) {                                               // iterate each box in the row
            if ( $.inArray( data.threeInARow[ i ][ j ], data[ player ] ) === -1 ) {     // check box match player's box
                won = false;                                                            
                break;                                                                  // exit iteration if not match
            } else won = true;
        }; if ( won ) return won;                                                     // if a row is matching 
    }; return won;                                                                  // otherwise it return false
};

$('document').ready( function() {

    // Game input
$('#button1, #button2, #button3, #button4, #button5, #button6, #button7, #button8, #button9').on('click', function() {
    const boxNum = Number( $(this).attr('id').slice( -1 ) );        // identify which box is clicked
    let currentPlayer = 'player1';                                  // pre-define current player
    
    if ( data.board[ boxNum ] ) {                                   // check if box is taken
        return;
    } else if ( data.turns % 2 === 0 ) {                            //define current player based on even or odd turn
        $(this).addClass('circle');                                 // assign player's token
        $(this).children('.blur-box').removeClass('blur');
    } else {
        currentPlayer = 'player2';                                  // update current player
        $(this).addClass('cross');                                  // assign player's token
        $(this).children('.blur-box').removeClass('blur');
    };
    
    tictactoe( currentPlayer, boxNum );                             // execute game function 
    data.board[ boxNum ] = true;                                    // update chosen box
    data.turns ++;                                                  // update players' turn for next round
});

// pre-select blur feature (draft only, nned to be improved)
$('#button1, #button2, #button3, #button4, #button5, #button6, #button7, #button8, #button9').mouseenter( function() { 
    const boxNum = Number( $(this).attr('id').slice( -1 ) );
    let currentPlayer = 'player1';
    if ( data.board[ boxNum ] ) {                                   
        return;
    } else if ( data.turns % 2 === 0 ) {
        $(this).addClass('circle');
        $(this).children('.blur-box').addClass('blur');
    } else {
        currentPlayer = 'player2'; 
        $(this).addClass('cross');
        $(this).children('.blur-box').addClass('blur');
    };
}).mouseleave( function() {
    const boxNum = Number( $(this).attr('id').slice( -1 ) );
    let currentPlayer = 'player1'; 
    if ( data.board[ boxNum ] ) {
        return;
    } else if ( data.turns % 2 === 0 ) {
        $(this).removeClass('circle');
        $(this).children('.blur-box').removeClass('blur');
    } else {
        currentPlayer = 'player2';
        $(this).removeClass('cross');
        $(this).children('.blur-box').removeClass('blur');
    };
});
});