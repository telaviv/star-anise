var BOTTOM_ROW = 600;
var DECK_POSITION = {x: 1000, y: BOTTOM_ROW};
var CARD_DIMENSION = 150;

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
        var playerBoard = Crafty.e('PlayerBoard');
        var card = Crafty.e('Card');
        card.bind('StopDrag', function() {
            if (playerBoard.canBePlaced(card)) {
                card.attr(playerBoard.newPosition(card));
            } else {
                card.attr(DECK_POSITION);
            }
        });
    }
});

Crafty.c('Card', {
    init: function() {
        this.requires('Rectangle, Canvas, Color, Draggable');
        this.attr({
            x: DECK_POSITION.x, y: DECK_POSITION.y,
            w: CARD_DIMENSION, h: CARD_DIMENSION, z: 1
        });
        this.color('green');
    },
});

Crafty.c('PlayerBoard', {
    init: function() {
        this.slots = [
            Crafty.e('Slot').create(100, BOTTOM_ROW),
            Crafty.e('Slot').create(400, BOTTOM_ROW),
            Crafty.e('Slot').create(700, BOTTOM_ROW)
        ];
    },

    canBePlaced: function(card) {
        for (var i = 0; i < this.slots.length; ++i) {
            if (this.slots[i].intersect(card)) {
                return true;
            }
        }
        return false;
    },

    newPosition: function(card) {
        var slot = this.slots.reduce(function(oldSlot, newSlot) {
            var oldArea = oldSlot.intersectArea(card);
            var newArea = newSlot.intersectArea(card);
            if (oldArea < newArea) {
                return newSlot;
            } else {
                return oldSlot;
            }
        });
        return {x: slot.x, y: slot.y};
    }
});

Crafty.c('Slot', {
    init: function() {
        this.requires('Rectangle, Canvas, Color');
        this.attr({w: CARD_DIMENSION, h: CARD_DIMENSION});
        this.color('white');
    },

    create: function(x, y) {
        this.attr({x: x, y: y});
        return this;
    },
});

Crafty.c('Rectangle', {
    init: function() {
        this.requires('2D');
    },

    left: function() {
        return this.x;
    },

    right: function() {
        return this.x + this.w;
    },

    top: function() {
        return this.y;
    },

    bottom: function() {
        return this.y + this.h;
    },

    intersectArea: function(rect) {
        var left = Math.max(this.left(), rect.left());
        var right = Math.min(this.right(), rect.right());
        var bottom = Math.min(this.bottom(), rect.bottom());
        var top = Math.max(this.top(), rect.top());

        if (left > right || bottom < top) return 0;
        return (bottom - top) * (right - left);
    }
});



Crafty.sprite(1333, 800, "img/star-anise-sprite.png", {
    BackgroundSprite: [0,0]
});
