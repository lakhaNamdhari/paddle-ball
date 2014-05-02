
(function( ns ){

	var constants = ns.constants;
	
	ns.utils = {
		log: function( msg ){
			if ( constants.DEBUG && window.console && console.log ){
				return console.log( msg );
			}
		}
	};

}( window.PB ));