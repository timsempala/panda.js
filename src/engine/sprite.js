/**
    @module sprite
    @namespace game
**/
game.module(
    'engine.sprite',
    '1.0.0'
)
.require(
    'engine.renderer'
)
.body(function() {

/**
    http://www.goodboydigital.com/pixijs/docs/classes/Sprite%E2%84%A2.html

    __Example__

        var sprite = new game.Sprite(100, 200, 'media/logo.png');
        game.scene.stage.addChild(sprite);
    @class Sprite
    @extends PIXI.Sprite
    @constructor
    @param {Number} x
    @param {Number} y
    @param {String} path
    @param {Object} [settings]
**/
game.Sprite = PIXI.Sprite.extend({
    init: function(x, y, path, settings) {
        var texture = path instanceof PIXI.Texture ? path : PIXI.Texture.fromFrame(this.path || path);
        this.super(texture);
        game.merge(this, settings);

        this.position.x = x;
        this.position.y = y;

        // auto bind touch events for mobile
        if(game.ua.mobile && !this.tap && this.click) this.tap = this.click;
        if(game.ua.mobile && !this.touchmove && this.mousemove) this.touchmove = this.mousemove;
        if(game.ua.mobile && !this.touchstart && this.mousedown) this.touchstart = this.mousedown;
        if(game.ua.mobile && !this.touchend && this.mouseup) this.touchend = this.mouseup;
        if(game.ua.mobile && !this.touchendoutside && this.mouseupoutside) this.touchendoutside = this.mouseupoutside;
    },

    /**
        Remove sprite from it's container.
        @method remove
    **/
    remove: function() {
        if(this.parent) this.parent.removeChild(this);
        game.scene.sprites.erase(this);
    }
});

/**
    Sprite container.
    @class Container
**/
game.Container = PIXI.DisplayObjectContainer.extend({
});

game.Texture = PIXI.Texture.extend();
game.Texture.fromImage = PIXI.Texture.fromImage;

});