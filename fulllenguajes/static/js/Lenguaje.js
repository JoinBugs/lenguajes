( function()
{
	this.Lenguaje = function( args )
	{
		this.__args__ = args;
		for( var key in args )
			this[ key ] = args[key];
	};

	this.Lenguaje.get = function( id, callBack )
	{
		return $.ajax({
	        url: '/api/Lenguaje/' + id + '/',
	        type: 'GET'
        })
         .success( callBack );
	};

	this.Lenguaje.getAll = function( callBack )
	{
		return $.ajax({
	        url: '/api/Lenguaje/',
	        type: 'GET'
        })
          .success( callBack );
	};

	this.Lenguaje.prototype.insert = function( callBack )
	{
		var self = this;
		$.ajax({
	        url: '/api/Lenguaje/',
	        type: 'POST',
	        data : {
	        	'nombre' 		: self.nombre,
	        	'version' 		: self.version,
	        	'version_api' 	: self.version_api,
	        	'tipo_lenguaje' : self.tipo_lenguaje
	        }
        })
          .success( callBack );
	};

	this.Lenguaje.delete = function( id, callBack )
	{
		$.ajax({
	        url: '/api/Lenguaje/' + id + '/',
	        type: 'DELETE'
        })
          .success( callBack );
	};

	this.Lenguaje.prototype.update = function( callBack )
	{
		var self = this;
		$.ajax({
	        url: '/api/Lenguaje/' + self.id + '/',
	        type: 'PUT',
	        data: {
	        	'nombre' 		: self.nombre,
	        	'version' 		: self.version,
	        	'version_api' 	: self.version_api,
	        	'tipo_lenguaje' : self.tipo_lenguaje
	        }
        })
          .success( callBack );
	};
})
  .apply( this );