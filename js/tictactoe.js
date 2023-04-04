const data = {
    player1Name: '',
    player2Name: '',
    player1: [],
    player2: [],
    board: ['','','','','','','','','',''],     // [0] is number of spot taken; [1]-[9] box positions
    threeInARow: [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7] ],
    turns: 0
}


//get basic function for now
// const checkWin = () => {
//     data.board[ 1 ] === data.board[ 2 ] && data.board[ 2 ] === data.board[ 3 ] ||
//         data.board[ 4 ] === data.board[ 5 ] && data.board[ 5 ] === data.board[ 6 ] ||
//         data.board[ 7 ] === data.board[ 8 ] && data.board[ 8 ] === data.board[ 9 ] ||
//         data.board[ 1 ] === data.board[ 4 ] && data.board[ 4 ] === data.board[ 7 ] ||
//         data.board[ 2 ] === data.board[ 5 ] && data.board[ 5 ] === data.board[ 8 ] ||
//         data.board[ 3 ] === data.board[ 6 ] && data.board[ 6 ] === data.board[ 9 ] ||
//         data.board[ 1 ] === data.board[ 5 ] && data.board[ 5 ] === data.board[ 9 ] ||
//         data.board[ 3 ] === data.board[ 5 ] && data.board[ 5 ] === data.board[ 7 ] ?
//         console.log('WIN') : console.log('not done yet');
// };

const tictactoe = ( player, pos ) => {
    data.turns ++;
    data[ player ].push( pos );
    data.turns < 1 ? console.log('Next player') : 
        checkWin( player ) ? console.log(`winner is ${ player }`) :
        console.log('no winner so next player')
    console.log( data.player1, data.player2 );
}

const checkWin = ( player ) => {
    let won = false;
    for ( let i = 0; i < data.threeInARow.length; i++ ) {               // loop through each winning method
        for ( let j = 0; j < 3; j++ ) {
            if ( $.inArray( data.threeInARow[ i ][ j ] , data[ player ] ) === -1 ) {
                won = false;
                break;
            } else {
                won = true;
            };
        };
        if ( won ) {
            return won;
        };
    };
    return won;
};

$('document').ready( function() {








});