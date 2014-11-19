var startGame = function() {
    Crafty.init(1333, 800, "crafty-star-anise");
    Crafty.scene('FightScene');
};

Crafty.scene('StartScene', function() {
    Crafty.e('StartScreen');
});

Crafty.scene('FightScene', function() {
    Crafty.e('Deck');
});

Crafty.c('StartScreen', {
    init: function() {
        this.requires('2D, Canvas, SpriteAnimation, BackgroundSprite, Mouse');
        this.attr({x: 0, y: 0});
        this.reel('BackgroundAnimating', 1000, 0, 0, 6);
        this.animate('BackgroundAnimating', -1);
        this.bind('MouseUp', function() {
            Crafty.scene('FightScene');
        });
    }
});

Crafty.c('Deck', {
    init: function() {
        this.requires('2D, Canvas, Color');
        this.attr({x: 0, y: 0, w: 180, h: 180});
        this.color('green');
    }
});

Crafty.sprite(1333, 800, "img/star-anise-sprite.png", {
    BackgroundSprite: [0,0]
});
