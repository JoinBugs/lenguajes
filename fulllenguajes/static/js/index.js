( function( window, document, undefined )
{
	window.addEventListener( 'load', init, false );

	function init()
	{
	   Lenguaje.getAll( function( lenguajes )
       {
           initLenguajes( lenguajes );
       });

     var btnAddLenguaje = document.querySelector( '#btnAddLenguaje' ),

         type_request = document.querySelector( '#type-request' ),

         isClickedAddLenguaje = false,

         initLenguajes = function( lenguajes )
         {
            var table = grid.createGrid(
             {
                 'data': lenguajes,
                 'appendNode': '#workArea',
                 'attrs': {
                     'id': 'tblLenguajes',
                     'class': 'table'
                 }
             });
             initTable( table );
             initAddLenguaje( table );
             type_request.textContent = 'LAST Request : ' + 'GET';
             window.table = table;
         }

         initAddLenguaje = function( table )
         {
          btnAddLenguaje.addEventListener( 'click', function( e )
          {
            e.preventDefault();
            isClickedAddLenguaje = true;
            var newData = table.params.data.map( function( e ){ return e; } );
            newData.push({
              'id' : newData[ newData.length - 1 ].id + 1,
              'nombre' : '',
              'version' : '',
              'version_api' : '',
              'tipo_lenguaje' : ''
            });
            table.updateData( newData );
            initTable( table );
            ( function()
              {
                util.toArray( document.querySelectorAll( '#tblLenguajes button' ) )
                  .forEach( function( btn )
                  {
                    btn.remove();
                  });
              })();
            table.tBodies[0].rows[ table.tBodies[0].rows.length - 1 ].click();
          }, false );
         },

         initTable = function( table )
         {
          grid.events.onClickRow( '#tblLenguajes', function( e, row, index )
               {
                 var rows = util.toArray( table.rows );
                 //index = row.indexOf( e.target );
                  if( rows.indexOf( row ) > 0 && e.target.type != 'submit' )
                  {
                    table.addHeader( 'Apply' );
                    var cells = row.cells;
                    if( cells[ 1 ].querySelector( 'input' ) == null )
                    {
                      for( var i = 1, l = cells.length; i < l; i++ )
                      {
                        var txt = document.createElement( 'input' );
                        txt.setAttribute( 'type', 'text' );
                        txt.value = cells[ i ].textContent;
                        cells[ i ].textContent = '';
                        cells[ i ].appendChild( txt );
                      }
                      table.addColumn( { 
                        innerHTML : '<button class="btnSave">Save Changes</button>' + 
                                    '<button class="btnDelete">Delete</button>', 
                        index : rows.indexOf( row )
                      });
                      document.querySelector( '#tblLenguajes tbody tr:nth-child( ' + index + '  ) .btnDelete' )
                        .addEventListener( 'click', function( e )
                        {
                          var row = e.target.parentNode.parentNode;
                          row.remove();
                          Lenguaje.delete( parseInt( row.cells[0].textContent ) );
                          type_request.textContent = 'LAST Request : ' + 'DELETE';
                          table.removeHeader( 'Apply' );
                        }, false );

                    document.querySelector( '#tblLenguajes tbody tr:nth-child( ' + index + '  ) .btnSave' )
                           .addEventListener( 'click', function( e )
                           {
                            e.preventDefault();
                            var newLen = new Lenguaje({
                              'nombre' : cells[ 1 ].querySelector( 'input' ).value,
                              'version' : cells[ 2 ].querySelector( 'input').value,
                              'version_api' : cells[ 3 ].querySelector( 'input' ).value,
                              'tipo_lenguaje' : cells[ 4 ].querySelector( 'input' ).value
                            });

                            if( isClickedAddLenguaje )
                            {
                              newLen.insert();
                              type_request.textContent = 'LAST Request : ' + 'POST';
                            }
                            else
                            {
                              newLen.id = parseInt( cells[ 0 ].textContent );
                              newLen.update();
                              type_request.textContent = 'LAST Request : ' + 'PUT';
                            }
                            isClickedAddLenguaje = false;

                              for( var i = 1, l = cells.length - 1; i < l; i++ )
                              {
                                var txt  = cells[ i ].querySelector( 'input' ),
                                    text = txt.value;
                                txt.remove();
                                cells[ i ].textContent = text;
                              }
                              if( document.querySelectorAll( '.btnSave' ).length === 1 )
                                table.removeHeader( 'Apply' );
                              e.target.parentNode.remove();
                           }, false );
                    }
                  }
               });
        document.querySelector( '#txt-get-id' )
              .addEventListener( 'keydown', function( e )
              {
                e.key || ( e.key = e.keyIdentifier );
                if( e.key === 'Enter' )
                {
                  var table       = document.querySelector( '#tblLenguajes' ),
                      lblNotFound = document.querySelector( '#lblNotFound' );
                  if( table !== null )
                    table.remove();
                  if( lblNotFound !== null )
                    lblNotFound.remove();
                  var value = e.target.value;
                  e.target.value = '';
                  if( value === 'ALL' )
                     Lenguaje.getAll( function( lenguajes )
                     {
                         initLenguajes( lenguajes );
                     });
                  else
                  {
                    var res = Lenguaje.get( parseInt( value ), function( len )
                    {
                        initLenguajes( [len] );
                    });
                    console.log( res );
                  }
                }
              }, false );
     }
	}
})
( window, document );