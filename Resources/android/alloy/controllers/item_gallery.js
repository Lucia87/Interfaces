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
    this.__controllerPath = "item_gallery";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.mainView = Ti.UI.createView({
        id: "mainView"
    });
    $.__views.mainView && $.addTopLevelView($.__views.mainView);
    $.__views.itemContainer = Ti.UI.createView({
        backgroundImage: "/images/fondo4.jpg",
        borderRadius: "5",
        opacity: "1",
        font: {
            fontSize: "20",
            fontFamily: "Arial"
        },
        id: "itemContainer"
    });
    $.__views.mainView.add($.__views.itemContainer);
    $.__views.titulo = Ti.UI.createLabel({
        id: "titulo",
        color: "#FFFFFF",
        shadowColor: "#aaa",
        text: "",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    $.__views.itemContainer.add($.__views.titulo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    MeteorDdp = require("meteor-ddp"), Anuncios = require("models/anuncios"), ddp = void 0;
    var args = arguments[0] || {};
    var titulo = args.titulo || "";
    $.titulo.setText(titulo);
    exports.titulo = $.titulo;
    ddp = new MeteorDdp("ws://encartelera.meteor.com/websocket");
    ddp.connect().done(function() {
        Ti.API.info("Connected!");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;