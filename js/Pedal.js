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
		this.color = this.data.color || "#00FF00";
		
		// Pedal's Length		
		this.length = this.data.length || 100;

		// Pedal's Height		
		this.height = this.data.height || 10;
		
		// Pedals vertical position
		// TODO: default should be calc dynamically
		this.y = this.data.y || 550;
		
		// Pedals horizontan positio
		// TODO: Default should be in mid;
		this.x = this.data.x || 150;
		
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
	};

}( window.PB ));