/*
 *  @author: Lakha Singh
 *
 *  @class: PB.Template
 *  @functionality: This class is used to create instances of Template
 *
 ************/

(function( ns ){
	var utils = ns.utils,
		constants = ns.constants;
  
	//checking dependencies
	if ( !createjs ){
		throw( "MISSING_DEPENDENCY" + " :CreateJS" );
	}
	
	ns.Template = function( attr ){
		utils.log( "Template.constructor() called" );
		
		this.data = attr || {};
		this.init();
	};
	
	// Inherit from Shape
	ns.Template.prototype = new createjs.Shape();
	
	// Initialise 
	ns.Template.prototype.init = function(){
		utils.log( "Template.init() called" );
		
	};
	
	// A Method
	ns.Template.prototype.method = function( delta ){
		utils.log( "Template.method() called" );

	};

}( window.PB ));