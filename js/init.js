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
	
	// Main Ball to be used in game
	var ball = new ns.Ball(),
		stage = new createjs.Stage("pedal-ball");
	
	// To simulate bouncing ball
	setInterval(function(){ ball.bounce( Math.random() * 360 ); }, 500);
	
	// Sets Game Frame rate
	createjs.Ticker.setFPS( 60 ); 
	
	// Set initial position for ball
	ball.x = stage.canvas.width / 2;
	ball.y = stage.canvas.height - 15;

	// Adds ball to stage
	stage.canvas.style.background = "#000";
	stage.addChild( ball );
	
	// Add motion to Ball
	createjs.Ticker.addEventListener("tick", function( e ){
		ball.move( e.delta );
		
		//render
		stage.update();
	});
	
}( window.PB ));