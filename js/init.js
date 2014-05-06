/*
 *  @author: Lakha Singh
 *
 *  @functionality: This file initialises the Game
 *
 ************/
 
(function( ns ){

	//checking dependencies
	if ( !createjs ){
		throw( "MISSING_DEPENDENCY" + " :CreateJS" );
	}

	if ( !ns ){
		throw( "MISSING_DEPENDENCY" + " : Root Namespace." );
	}
	
	var utils = ns.utility,
		constants = ns.constants;
	
	// Create an EventDispatcher for inter-object messages
	ns.EventDispatcher = new createjs.EventDispatcher();
		
	// Main window where Game is rendered 
	var stage = new createjs.Stage("pedal-ball");
		
	// Ball to be used in game
	var ball = stage.addChild( new ns.Ball() );
	
	// Pedal that user controls
	var pedal = stage.addChild( new ns.Pedal( { trackLength: stage.canvas.width } ) );
	
	// Controle the Game
	var gameManager = new ns.GameManager( stage );
	
	// To simulate bouncing ball
	//setInterval(function(){ ball.bounce( Math.random() * 360 ); }, 500);
	
}( window.PB ));