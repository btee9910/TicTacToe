
$('document').ready( function() {

    // Game input
    $('#box1, #box2, #box3, #box4, #box5, #box6, #box7, #box8, #box9').on('click', function() {

        const boxNum = Number( $(this).attr('id').slice( -1 ) );            // get clicked box number
        if ( data.endGrame || data.board[ boxNum ] ) return;                  // return if game end or box taken

        $( data.player().id ).removeClass('player-turn');                   // remove 'whose turn' border from player
        $(this).children('.content-box').addClass( data.player().token );   // assign token image in box
        $(this).find('.draft-layer').removeClass('draft');                  // remove draft effect
        data.player().box.push( boxNum );                                   // record player's box in data
        data.board[ boxNum ] = true;                                        // record chosen box on board in data

        if ( data.alreadyWon() ) {                                          // check if someone win
            $(`.line`).addClass(`line${ data.winningRow }`).fadeIn();
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

        if ( data.board[ boxNum ] || data.endGrame ) {                             // return if box is taken or game end
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

    // Below are addition functions for pre-game interation. Below codes are not complete and not 'dry' as it have been done in a rush just for the purpose of adding customisatiom of the game.
    // Game setup
    $('.page1').on('click', function() {
        $('button').fadeOut(1);

        if ( $(this).attr('id') === '1p' ) {
            data.currentpage = 'page2p1';
            data.is2p = false;
            $('.page2p1').fadeIn(500);
            $('.intro-img').addClass('token-selection');
            $('.intro-block > h2').stop(true, false).fadeOut(1).text('Select your token?').fadeIn(1500);
            $('.incomplete').slideDown(500);
        } else {
            data.currentpage = 'page2p2';
            data.is2p = true;
            $('.page2p2').fadeIn(500);
            $('.intro-block > h2').stop(true, false).fadeOut(1).text('Personalise your game?').fadeIn(1500);
        }
    });

    // page 2 of intro, 
    $('button.page2p2, .page2p1').on('click', function() {

        if ( $( this ).attr('id') === 'skip' ) {
            data.p1.name = 'Player 1';
            data.p2.name = 'Player 2';
        } else if ( $( this ).attr('id') === 'back' ) {
            // call back
            return;
        };
        
        data.currentpage = 'page3';
        $('.page2p2').hide(1);
        $('.page3').fadeIn(500);
        $('.p1-name').text(`${ data.p1.name }`);
        $('.p2-name').text(`${ data.p2.name }`);
        $('.intro-img').addClass('token-selection');
        $('.intro-block > h2').stop(true, false).fadeOut(1).text('Who goes first?').fadeIn(1500);
    });

    // Page 3 of intro, page before game
    $('button.page3, img.page3').on('click', function() {

        if ( data.currentpage !== 'page3' ) {
            return;
        } else if ( $( this ).attr('id') === 'back' ) {
            // call back
            return;
        } else if ( $( this ).attr('id') === 'random' ) {
            const randNum = Math.floor( Math.random() *2 );
            data.firstPlayer = `p${ randNum + 1  }`;
            data.secondPlayer = `p${ ( 2 - randNum ) }`;
        } else if ( $( this ).attr('alt') === 'circle') {
            data.firstPlayer = 'p1';
            data.secondPlayer = 'p2';
        } else if ( $( this ).attr('alt') === 'cross') {
            data.firstPlayer = 'p2';
            data.secondPlayer = 'p1';
        };
        data.currentpage = 'game';
        $('#intro').slideUp(300);
        $('.game').delay(500).fadeIn(500);
        $( data.player().id ).addClass('player-turn'); 
    });

    // Back button function: go back to previous option 'page'
    $('#back').on('click', function() {
        if ( data.currentpage === "page2p1" || data.currentpage === "page2p2" ) {
            $('button, .incomplete').hide(1);
            $('.page1').fadeIn(500);
            $('.intro-block > h2').stop(true, false).fadeOut(1).text('Ready to play?').fadeIn(1500);
            data.currentpage = "page1";
            return;
        } else if ( data.currentpage === "page3" &&  data.is2p ) {
            $('button, .p-name>.page3').hide(1);
            $('.page2p2').fadeIn(500);
            $('.intro-img').removeClass('token-selection');
            data.currentpage = "page2p2";
        } else if ( data.currentpage === "page3" && !(data.is2p) ) {
            $('button').hide(1);
            $('.page2p1').fa;deIn(500);
            data.currentpage = "page2p1";
        };
        $('.intro-block > h2').stop(true, false).fadeOut(1).text('Personalise your game?').fadeIn(1500);
    });

    // Take personalise players name
    $('#insert-p1, #insert-p2').on('keyup', function () {
        data[ $(this).attr('id').slice( -2 ) ].name = $(this).val();      // Store player name to data
    });
});