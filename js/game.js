var BOTTOM_ROW = 600;

var startGame = function() {
    Crafty.init(1333, 800, "crafty-star-anise");
    Crafty.scene('FightScene');
};

Crafty.scene('StartScene', function() {
    Crafty.e('StartScreen');
});

Crafty.scene('FightScene', function() {
    Crafty.e('Player Side');
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

Crafty.c('Player Side', {
    init: function() {
        this.card = Crafty.e('Card');
        Crafty.e('Slot').create(100, BOTTOM_ROW);
        Crafty.e('Slot').create(400, BOTTOM_ROW);
        Crafty.e('Slot').create(700, BOTTOM_ROW);
    }
});

Crafty.c('Card', {
    init: function() {
        this.requires('2D, Canvas, Color, Draggable');
        this.attr({x: 1000, y: BOTTOM_ROW, w: 180, h: 180, z: 1});
        this.color('green');
    }
});

Crafty.c('Slot', {
    init: function() {
        this.requires('2D, Canvas, Color');
        this.attr({w: 180, h: 180});
        this.color('white');
    },

    create: function(x, y) {
        this.attr({x: x, y: y});
        return this;
    }
});


Crafty.sprite(1333, 800, "img/star-anise-sprite.png", {
    BackgroundSprite: [0,0]
});
