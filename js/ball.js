/*
 *  @author: Lakha Singh
 *
 *  @class: PB.Ball
 *  @functionality: This class is used to create instances of ball
 *
 ************/

(function( ns ){
	var utils = ns.utils,
		constants = ns.constants;
  
	//checking dependencies
	if ( !createjs ){
		throw( "MISSING_DEPENDENCY" + " :CreateJS" );
	}
	
	ns.Ball = function( attr ){
		utils.log( "Ball.constructor() called" );
		
		this.data = attr || {};
		
		this.init();
	};
	
	// Inherit from Shape
	ns.Ball.prototype = new createjs.Shape();
	
	// Initialise the Ball object
	ns.Ball.prototype.init = function(){
		utils.log( "Ball.init() called" );
		
		// The inital angle at which ball will move
		this.angle = this.data.angle || 135;
		
		// Speed for ball ( in pixels / sec )
		this.speed = this.data.speed || 350;
		
		// Movement direction for ball - can be Clockwise / Anti-clockwise
		this.direction = this.data.direction || constants.DIRECTION.clockwise;
		
		// Ball's color
		this.color = this.data.color || "#FF0000";
		
		// Ball's radius		
		this.radius = this.data.radius || 15;
		
		// Sets Ball position on X-axis
		this.x = this.data.x || 0;
		
		// Sets Balls position on Y-axis
		this.y = this.data.y || 0;
		
		// Create Ball
		this.graphics.beginFill( this.color ).drawCircle( 0, 0, this.radius );
	};
	
	// To move ball
	ns.Ball.prototype.move = function( delta ){
		utils.log( "Ball.move() called" );
		
		var angleInRadians = this.angle / 180 * Math.PI;
		
		//movement in pixels
		var r = delta && delta / 1000 * this.speed;
		
		// Multipliers to transform Geometry cordinates to screen cordinates
		var dx = 1, dy = -1;
		
		//move ball
		this.x += dx * r *  Math.cos( angleInRadians );
		this.y += dy * r *  Math.sin( angleInRadians );

	};
	
	// To change balls direction
	ns.Ball.prototype.bounce = function( angle ){
		utils.log( "Ball.bounce() called" );
		
		//process only valid param
		if ( typeof angle === "number" && ( angle >= 0 && angle <= 360 ) ){
			this.angle = angle;
		}
		else {
			//reflect existing angle
			//For Clock wise movement
			if ( this.direction === constants.DIRECTION.clockwise ){
				this.angle -= 90;
				
				//For boundary condition
				if ( this.angle < 0 ){
					this.angle = 360 + this.angle;
				} 
			}
			//For anti-clockwise movement
			else {
				this.angle += 90;
				
				//For boundary condition
				if ( this.angle > 360 ){
					this.angle = 360 - this.angle;
				}
			}
		}
	};	
	
}( window.PB ));