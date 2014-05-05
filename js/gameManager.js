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
	
	var constants = ns.constants;
	
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
		},
		
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
			
			// Ball boundaries
			this.bounds = {};
			this.bounds.left = 0;
			this.bounds.right = this.stage.canvas.width;
			this.bounds.top = 0;
			
		}
		
		
	}; 
	
}( window.PB = window.PB ));