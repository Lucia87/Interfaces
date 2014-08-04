function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "anuncio";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.anuncio = Ti.UI.createWindow({
        layout: "vertical",
        width: "80%",
        height: "80%",
        fullscreen: "false",
        navBarHidden: "true",
        id: "anuncio"
    });
    $.__views.anuncio && $.addTopLevelView($.__views.anuncio);
    $.__views.anuncioContent = Ti.UI.createView({
        opacity: "1",
        backgroundColor: "#8A0808",
        layout: "vertical",
        borderRadius: "10",
        id: "anuncioContent"
    });
    $.__views.anuncio.add($.__views.anuncioContent);
    $.__views.titulo = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20",
            fontFamily: "Arial",
            fontStyle: "Italic"
        },
        id: "titulo",
        shadowOffset: "{x:5, y:5}",
        shadowRadius: "3",
        shadowColor: "#848484",
        text: "A simple label",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "50",
        color: "#5858FA"
    });
    $.__views.anuncioContent.add($.__views.titulo);
    $.__views.contenido = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "15",
            fontFamily: "Arial"
        },
        id: "contenido",
        borderRadius: "5",
        shadowRadius: "3",
        color: "#FFFFFF",
        shadowColor: "#aaa",
        text: "A simple label",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "30"
    });
    $.__views.anuncioContent.add($.__views.contenido);
    exports.destroy = function() {};
    _.extend($, $.__views);
    MeteorDdp = require("meteor-ddp"), Anuncios = require("models/anuncios"), ddp = void 0;
    var args = arguments[0] || {};
    Ti.API.info(args.titulo);
    Ti.API.info(args.contenido);
    $.titulo.setText(args.titulo);
    $.contenido.setHtml(args.contenido);
    ddp = new MeteorDdp("ws://encartelera.meteor.com/websocket");
    ddp.connect().done(function() {
        Ti.API.info("Connected!");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;