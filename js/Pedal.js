/*
 *  @author: Lakha Singh
 *
 *  @class: PB.Pedal
 *  @functionality: This class is used to create User driven Pedal
 *
 ************/

(function( ns ){
	var utils = ns.utils,
		constants = ns.constants;
  
	//checking dependencies
	if ( !createjs ){
		throw( "MISSING_DEPENDENCY" + " :CreateJS" );
	}
	
	ns.Pedal = function( attr ){
		utils.log( "Pedal.constructor() called" );
		
		this.data = attr || {};
		this.init();
	};
	
	// Inherit from Shape
	ns.Pedal.prototype = new createjs.Shape();
	
	// Initialise 
	ns.Pedal.prototype.init = function(){
		utils.log( "Pedal.init() called" );
		
		this.initElements();
	};
	
	// Initialises elements
	ns.Pedal.prototype.initElements = function(){
		utils.log( "Pedal.initElements() called" );
		
		// Pedal's color
		this.color = this.data.color || "#0096fd";
		
		// Pedal's Length		
		this.length = this.data.length || 100;

		// Pedal's Height		
		this.height = this.data.height || 10;
		
		// Width of pedal's container
		this.trackLength = this.data.trackLength || 1000;
		//accounting for Pedals Length, so it always remains visible
		this.trackLength -= this.length;
		
		// Create pedal
		this.graphics.beginFill( this.color ).drawRect( 0, 0, this.length, this.height );
	};

	// Method to move Pedal as cursor moves
	ns.Pedal.prototype.move = function( xPos ){
		utils.log( "Pedal.bindEvents() called" );

		// Centering cursor W.r.t Pedal
		xPos -= this.length / 2;
		
		// Normalizing for Min-Max boundaries
		this.x = xPos > this.trackLength ? this.trackLength : ( ( xPos < 0 ) ? 0 : xPos );		

		if ( this.attached ){
			this.attached.x = this.x + this.length / 2;
		}
	};
	
	// Attaches Ball to its center, in a way that ball moves along with pedal
	ns.Pedal.prototype.attach = function( ball ){
		utils.log( "Pedal.attach() called" );
		
		if ( !(ball && ball instanceof ns.Ball) ){
			return false;
		}
		
		// Stop moving Ball
		ball.stop();
		
		this.attached = ball;
		
		//Position ball at the center of pedal
		ball.y = this.y - ball.radius;
		ball.x = this.x + this.length / 2;		
	};
	
	// To detach object ( ball ) from Pedal
	ns.Pedal.prototype.detach = function(){
		utils.log( "PB.Pedal.detach() called" );
		
		if ( this.attached ){
			// Move Ball
			this.attached.stop( false );
			
			this.attached = null;
		}
	};

	// Calculates ball's bounce angle based on its local point which is hit
	ns.Pedal.prototype.bounceAngle = function( point ){
		utils.log( "PB.Pedal.bounceAngle() called" );
		
		var angle = {
			start: 30,
			end: 150
		},
		angleMagnitude = angle.end - angle.start;
		
		// Angle corrosponding to 1px
		var dx = angleMagnitude / this.length;
		
		// returns bounce angle in degree
		return angle.start + Math.round( point.x * dx );
	};

}( window.PB ));