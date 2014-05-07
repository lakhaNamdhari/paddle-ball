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
			this.bounds.BOTTOM = this.stage.canvas.height;
			this.bounds.LEFT = 0;
			this.bounds.TOP = 0;
			this.bounds.RIGHT = this.stage.canvas.width;
			
			// Distance from bottom at which Bann & Pedal will be placed on start
			this.placement = 50;
			
			// Using RAF api over setInterval ( for Performance )
			createjs.Ticker.timingMode = createjs.Ticker.RAF;
						
			// Set horizontal position for Pedal ( center )
			this.pedal.x = this.stage.canvas.width / 2 - this.pedal.length / 2;
			// Set verticle position for Pedal
			this.pedal.y = this.stage.canvas.height - this.placement;

			// Set Ball's Speed
			this.ball.speed = 150;
			//this.ball.radius = 100;
			
			// Attach ball to pedal
			this.pedal.attach( this.ball );
			
			//
			this.ballPrevBound = constants.BOUND.BOTTOM;
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
		
		// Watches ball movement - for Boundary-Pedal-Bricks hit
		watchBall: function(){
			utils.log( "PB.GameManager.watchBall() called" );
			
			var point,
				ballPrevBound = this.ballPrevBound,
				hit = false;
			
			// Test Ball HIT
			// BOTTOM Boundary
			if ( this.ball.y + this.ball.radius >= this.bounds.BOTTOM ){
				this.ballPrevBound = constants.BOUND.BOTTOM;
				hit = true;
			}
			
			// LEFT Boundary
			else if ( this.ball.x - this.ball.radius <= this.bounds.LEFT ){
				this.ballPrevBound = constants.BOUND.LEFT;
				hit = true;
			}

			// TOP Boundary
			else if ( this.ball.y - this.ball.radius <= this.bounds.TOP ){
				this.ballPrevBound = constants.BOUND.TOP;
				hit = true;
			}

			// RIGHT Boundary
			else if ( this.ball.x + this.ball.radius >= this.bounds.RIGHT ){
				this.ballPrevBound = constants.BOUND.RIGHT;
				hit = true;
			}
			
			// If Ball is Hit
			if ( hit ){			
				// Test if Ball's rotation needs to be Flipped ( Clockwise / Anti-clockwise )
				// For Clockwise moving Ball
				if ( this.ball.direction === constants.DIRECTION.CLOCKWISE && ((ballPrevBound + 1) % 4) !== this.ballPrevBound ){
					this.ball.direction = 1 - this.ball.direction;
				}

				// For Anti-Clockwise moving Ball
				else if ( this.ball.direction === constants.DIRECTION.ANTICLOCKWISE && ( ( (ballPrevBound - 1) < 0 ) ? constants.BOUND.RIGHT : (ballPrevBound - 1) ) !== this.ballPrevBound ){
					this.ball.direction = 1 - this.ball.direction;
				}
							
				console.log( this.ball.direction );
				
				// Change its movement angle
				this.ball.bounce();
			}

			/*
			if ( (this.ball.x - this.ball.radius) <= this.bounds.start.x || (this.ball.y - this.ball.radius) <= this.bounds.start.y || (this.ball.x + this.ball.radius) >= this.bounds.end.x || (this.ball.y + this.ball.radius) >= this.bounds.end.y ){
				this.ball.bounce();
			}
			*/
			
			/*
			// Test hitting against Pedal
			point = this.ball.localToLocal( 0, this.ball.radius, this.pedal );
			if ( this.pedal.hitTest( point.x, point.y) ){
				this.ball.bounce();
			}
			*/
		}
	}
	
}( window.PB = window.PB ));