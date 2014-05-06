/*
 *  @author: Lakha Singh
 *
 *  @class: PB.GameManager
 *  @functionality: GameManager drives the entire game. It contains rules for game
 *	and acts as a central point for managing the game.
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
	
	var constants = ns.constants,
		utils = ns.utils;
	
	ns.GameManager = function( stage ){
		utils.log( "PB.GameManager() called" );
		
		// Check for required Parameters
		if ( !stage ){
			throw( constants.ERROR.TOO_FEW_PARAMS );
		}
		
		// Check for correct Type
		if ( !(stage instanceof createjs.Stage) ){
			throw( constants.ERROR.INVALID_PARAMS );
		}
		
		this.stage = stage;

		this.init();
	};
	
	ns.GameManager.prototype = {
		init: function(){
			utils.log( "PB.GameManager.init() called" );
			
			this.initElements();
			this.bindEvents();
		},
		
		// Sets initial position for Game elements
		initElements: function(){
			utils.log( "PB.GameManager.initElements() called" );
			
			var i, noOfElements = this.stage.getNumChildren(), element;
			
			// Extract elements from Stage
			for ( i = 0; i < noOfElements; i++ ){
				element = this.stage.getChildAt( i );
				
				if ( element instanceof ns.Ball ){
					this.ball = element;
				}else if ( element instanceof ns.Pedal ){
					this.pedal = element;
				}
			}
			
			// Game boundaries
			this.bounds = {};
			this.bounds.start = {
				x: 0,
				y: 0
			};
			this.bounds.end = { 
				x: this.stage.canvas.width,
			};

			// Frame rate for game
			this.fps = 60;
			
			// Sets Game Frame rate
			createjs.Ticker.setFPS( this.fps );
			
			// Set initial position for Ball
			this.ball.x = this.stage.canvas.width / 2;
			this.ball.y = this.stage.canvas.height - 15;
			
			// Set horizontal position for Pedal ( center )
			this.pedal.x = this.stage.canvas.width / 2 - this.pedal.length / 2;
			
			// Set verticle position for Pedal ( 50px from bottom )
			this.pedal.y = this.stage.canvas.height - 50;			
		},
		
		// Bind all Events here
		bindEvents: function(){
			utils.log( "PB.GameManager.bindEvents() called" );
			
			createjs.Ticker.on( "tick", this.hRenderGame, this );
		},
		
		// Game Loop
		hRenderGame: function( e ){
			// Moves Ball
			this.ball.move( e.delta );
			
			// Moves Pedal
			this.pedal.move( this.stage.mouseX );
			
			//render
			this.stage.update();
		}
	}; 
	
}( window.PB = window.PB ));