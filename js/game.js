var startGame = function() {
    Crafty.init(1333, 800, "crafty-star-anise");
    Crafty.e('StartScreen');
};

Crafty.c('StartScreen', {
    init: function() {
        this.requires('2D, Canvas, SpriteAnimation, BackgroundSprite');
        this.attr({x: 0, y: 0});
        this.reel('BackgroundAnimating', 1000, 0, 0, 6);
        this.animate('BackgroundAnimating', -1);
    }
});

Crafty.sprite(1333, 800, "img/star-anise-sprite.png", {
    BackgroundSprite: [0,0]
});
