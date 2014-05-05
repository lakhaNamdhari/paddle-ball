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
	
	// Ball to be used in game
	var ball = new ns.Ball();
	
	// Main window where Game is rendered 
	var stage = new createjs.Stage("pedal-ball");
	
	// Pedal that user controls
	var pedal = new ns.Pedal( { trackLength: stage.canvas.width } );
	
	// To simulate bouncing ball
	//setInterval(function(){ ball.bounce( Math.random() * 360 ); }, 500);
	
	// Sets Game Frame rate
	createjs.Ticker.setFPS( 60 ); 
	
	// Set initial position for ball
	ball.x = stage.canvas.width / 2;
	ball.y = stage.canvas.height - 15;

	// Adds ball to stage
	stage.canvas.style.background = "#000";
	stage.addChild( ball );
	stage.addChild( pedal );
	
	// Add motion to Ball
	createjs.Ticker.addEventListener("tick", function( e ){
		// Moves Ball
		ball.move( e.delta );
		
		// Moves Pedal
		pedal.move( stage.mouseX );
		//render
		stage.update();
	});
	
}( window.PB ));