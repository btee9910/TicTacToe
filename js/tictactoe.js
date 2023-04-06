// Database
const data = {
    player1: {
        id: '#player1', 
        name: 'Player 1',
        token: 'circle',
        box: []     // empty array to assign each chosen box
    },
    player2: { 
        id: '#player2', 
        name: 'Player 2',
        token: 'cross',
        box: []
    },
// [0] is null; [1]-[9] box positions
    board: [ true, false, false, false, false,
             false, false, false, false, false ],
// rows for winning
    threeInARow: [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7] ],
    winningRow: 1,
// return current players turn
    player: function( next = 0 ) {
        if ( ( this.round + next ) % 2 === 0 ) {
            return this.player1;
        } else return this.player2; 
    },
// keep track of game round
    round: 0,
// When game end
    theEnd: false,
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
                return data.theEnd = true;                  // if a row is matching 
            };
        }; return won;                                      // otherwise it return false
    }
};


$('document').ready( function() {

    // Take players name
    $('#p1, #p2').on('keyup', function () {
        const currentPlayer = 'player' + $(this).attr('id').slice( -1 ) ;  
        data[ currentPlayer ].name = $(this).val();      // Store player name to data
    });

    // Game input
    $('#box1, #box2, #box3, #box4, #box5, #box6, #box7, #box8, #box9').on('click', function() {

        const boxNum = Number( $(this).attr('id').slice( -1 ) );            // get clicked box number
        if ( data.theEnd || data.board[ boxNum ] ) return;                  // return if game end or box taken

        $( data.player().id ).removeClass('player-turn');                   // remove 'whose turn' border from player
        $(this).children('.content-box').addClass( data.player().token );   // assign token image in box
        $(this).find('.draft-layer').removeClass('draft');                  // remove draft effect
        data.player().box.push( boxNum );                                   // record player's box in data
        data.board[ boxNum ] = true;                                        // record chosen box on board in data

        if ( data.alreadyWon() ) {                                          // check if someone win
            $(`.line`).addClass(`line${ data.winningRow }`).slideDown();
            $('#message-box').text(`Winner is ${ data.player().name }!`).stop(true,false).animate( { fontSize: '3em' } ).animate( { fontSize: '2em' } ).animate( { fontSize: '3em' }, 1000 );   // message animation
            // show winner border and animation for trophy
            $( data.player().id ).addClass('winner').find('.trophy').fadeIn().animate({
                right: '95%', height: '+=80%', width: '+=80%'
                }).delay(4000).animate({
                    left: '65%', height: '-=80%', width: '-=80%'
                });
            return;
        } else if ( data.round === 8 ) {                                    // check for draw game
            $('#message-box').text(`Draw!`).stop(true,false).animate( { fontSize: '3em' } ).animate( { fontSize: '2em' } ).animate( { fontSize: '3em' }, 1000 );                // animation
        } else {
            $('#message-box').text(`${ data.player( 1 ).name }'s turn.`);               // Next Player notice
            $( data.player( 1 ).id ).addClass('player-turn');                           // add 'whose turn' border to next player
            data.round ++;                                                              // update round
            $('#message-box').stop(true,false).fadeIn(1000).delay(4000).fadeOut(2000);  // message box animation
        };
    });

    // pre-select drafting feature
    $('#box1, #box2, #box3, #box4, #box5, #box6, #box7, #box8, #box9').mouseenter( function() { 
        const boxNum = Number( $(this).attr('id').slice( -1 ) );                // get clicked box number

        if ( data.board[ boxNum ] || data.theEnd ) {                             // return if box is taken or game end
            return;
        } else {
            $(this).find('.content-box').addClass( data.player().token );       // add token
            $(this).find('.draft-layer').addClass('draft');                     // add lighter layer
        };
    }).mouseleave( function() {
        const boxNum = Number( $(this).attr('id').slice( -1 ) );                // get clicked box number

        if ( data.board[ boxNum ] ) {                                           // return if box is taken
            return;
        } else {
            $(this).find('.content-box').removeClass( data.player().token );    // remove token
            $(this).find('.draft-layer').removeClass('draft');                  // remove lighter layer
        };
    });
    $('#message-box').stop(true,false).fadeIn(1000).delay(4000).fadeOut(2000);
});