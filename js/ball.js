/*
 *  @author: Lakha Singh
 *
 *  @class: PB.Ball
 *  @functionality: This class is used to create instances of ball
 *
 ************/

(function( ns ){
  var util = ns.utility || null;
  
  //check dependencies
  if ( !util ){
    throw("Missing_Dependency for PB.Ball");
  }
  
  ns.Ball = function( attr ){
	//self invoking constructor
	if ( !( this instanceof ns.ball ) ){
		new ns.Ball( attr );
	}
	
	//Ball's properties
	this.data = attr || {};
	
	//Ball's Speed ( pixel / second )
	this.data.speed = typeof this.data.speed === "number" && this.data.speed || 200;
	
	//Ball's length ( diameter )
	this.data.length = typeof this.data.length === "number" && this.data.length || 20;
	
	//Ball's color
	this.data.color = typeof this.data.color === "string" && this.data.color || "#ff0000";
	
	//Ball's center X-axis cordinates
	this.data.x = typeof this.data.x === "number" && this.data.x || 0;

	//Ball's center Y-axis cordinates
	this.data.y = typeof this.data.y === "number" && this.data.y || 0;
	
	//Ball's direction ( angle of movement )
	this.data.direction = typeof this.data.direction === "number" && this.data.direction || 135;
  };
  
  ns.Ball.prototype = {
	//It initiates Ball movement
	move: function(){
	  util.log("PB.Ball.move");
	  
	  
	},
	
	//It changes the angle of movement for ball
	bounce: function(){
	  util.log("PB.Ball.bounce");
	  
	  
	},
	
	//Stops ball movement
	stop: function(){
	  util.log("PB.Ball.stop");
	  
	  
	}
  };
  
}( window.PB || {} )):