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

			// Set the stage for New Game
			this.resetGame();
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

			// Detaches Ball from pedal
			this.pedal.detach();
		},
		
		// Watches ball movement - for Boundary-Pedal-Bricks Hit and Game-over use case
		watchBall: function(){
			utils.log( "PB.GameManager.watchBall() called" );
			
			var bounceAngle;
			
			// Watch only if Ball's moving
			if ( this.ball.stopped ){
				return false;
			}
			
			// Ball's cordinates transformed w.r.t Pedal, Helpfull in Ball-Pedal Hit detection
			var point = this.ball.localToLocal( 0, this.ball.radius, this.pedal );
			
			// Caches previous Boud that Ball Hit
			var ballPrevBound = this.ballPrevBound;
			
			// Flag Indicates ig ball has hit any object
			var hit = false;
			
			// Test Ball HIT Object			
			// LEFT Boundary
			if ( this.ball.x - this.ball.radius <= this.bounds.LEFT ){
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
			
			// Hit Pedal
			else if ( this.pedal.hitTest( point.x, point.y) ){
				this.ballPrevBound = constants.BOUND.BOTTOM;
				hit = true;
				//bounceAngle = this.pedal.bounceAngle( point );
			}
						
			// Crossing Boundary ( Game-over )
			else if ( this.ball.y + this.ball.radius >= this.bounds.BOTTOM ){
				this.resetGame();
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
							
				//console.log( this.ball.direction );
				// Change its movement angle
				this.ball.bounce( bounceAngle );
			}
		},
		
		// Restarts the Game
		resetGame: function(){
			utils.log( "PB.GameManager.resetGame() called" );
									
			// Set horizontal position for Pedal ( center )
			this.pedal.x = this.stage.canvas.width / 2 - this.pedal.length / 2;
			// Set verticle position for Pedal
			this.pedal.y = this.stage.canvas.height - this.placement;
			
			// Attach ball to pedal
			this.pedal.attach( this.ball );
			
			// Set the Balls first boundary Hit, as its on Pedal
			this.ballPrevBound = constants.BOUND.BOTTOM;
			
			// Ball's angle at start
			this.ball.angle = 135;
			
			// Sets ball's movement direction
			this.ball.direction = constants.DIRECTION.CLOCKWISE;
			
			// Sets Balls Speed
			this.ball.speed = 200;
		}
	}
	
}( window.PB = window.PB ));