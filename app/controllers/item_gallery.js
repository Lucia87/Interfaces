MeteorDdp = require("meteor-ddp"), 
Anuncios = require('models/anuncios'), 
ddp = undefined;

var args = arguments[0]||{};

var titulo = args.titulo || '';

$.titulo.setText(titulo);

exports.titulo = $.titulo;

function unsubscribe(e){
    ddp.unsubscribe('cartelerasByIdWithAnuncios');
   
};

// se crea una conexion con el socket de la pagina http://encartelera.meteor.com
ddp = new MeteorDdp('ws://encartelera.meteor.com/websocket');
ddp.connect().done(function() {
	Ti.API.info('Connected!');
});
