MeteorDdp = require("meteor-ddp"), 
Anuncios = require('models/anuncios'), 
ddp = undefined;


var args = arguments[0] || {};
Ti.API.info(args.titulo);
Ti.API.info(args.contenido);
$.titulo.setText(args.titulo);
$.contenido.setHtml(args.contenido);
function unsubscribe(e){
    ddp.unsubscribe('cartelerasByIdWithAnuncios');
   
};

// se crea una conexion con el socket de la pagina http://encartelera.meteor.com
ddp = new MeteorDdp('ws://encartelera.meteor.com/websocket');
ddp.connect().done(function() {
	Ti.API.info('Connected!');
});

