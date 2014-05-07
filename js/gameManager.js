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
			
			// Distance from bottom at which Bann & Pedal will be placed on start
			this.placement = 50;
			
			// Using RAF api over setInterval ( for Performance )
			createjs.Ticker.timingMode = createjs.Ticker.RAF;
						
			// Set horizontal position for Pedal ( center )
			this.pedal.x = this.stage.canvas.width / 2 - this.pedal.length / 2;
			// Set verticle position for Pedal
			this.pedal.y = this.stage.canvas.height - this.placement;

			// Attach ball to pedal
			this.pedal.attach( this.ball );
		},
		
		// Bind all Events here
		bindEvents: function(){
			utils.log( "PB.GameManager.bindEvents() called" );
			
			createjs.Ticker.on( "tick", this.hRenderGame, this );
			this.stage.canvas.addEventListener( "click", this.hStartGame.bind( this ) );
		},
		
		// Game Loop
		hRenderGame: function( e ){
			utils.log( "PB.GameManager.hRenderGame() called" );
			
			// Moves Ball
			this.ball.move( e.delta );
			
			// Moves Pedal
			this.pedal.move( this.stage.mouseX );
			
			// Watches ball movement
			this.watchBall();
			
			//render
			this.stage.update();
		},

		// Starts the Game
		hStartGame: function( e ){
			utils.log( "PB.GameManager.hStartGame() called" );
			//alert("");
			console.log(this);
			// Detaches Ball from pedal
			this.pedal.detach();
		},
		
		// Watches ball movement - for boundary violation and hitting against Objects
		watchBall: function(){
			utils.log( "PB.GameManager.watchBall() called" );
			
			var point;
			
			// Test Boundary Violation
			if ( (this.ball.x - this.ball.radius) <= this.bounds.start.x || (this.ball.y - this.ball.radius) <= this.bounds.start.y || (this.ball.x + this.ball.radius) >= this.bounds.end.x ){
				this.ball.bounce();
			}
			
			// Test hitting against Pedal
			point = this.ball.localToLocal( 0, this.ball.radius, this.pedal );
			if ( this.pedal.hitTest( point.x, point.y) ){
				this.ball.bounce();
			}
		}
	}; 
	
}( window.PB = window.PB ));