var BOTTOM_ROW = 700;
var SLOT_DIMENSIONS = {w: 150, h: 110};
var SLOT_PADDING = 6;
var CARD_DIMENSIONS = {w: SLOT_DIMENSIONS.w, h: 200};
var BOARD_POSITION = {x: 0, y: BOTTOM_ROW - SLOT_DIMENSIONS.h};
var DECK_POSITION = {x: 1100, y: BOTTOM_ROW - CARD_DIMENSIONS.h};

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
            w: CARD_DIMENSIONS.w, h: CARD_DIMENSIONS.h, z: 1
        });
        this.color('green');
    },
});

Crafty.c('PlayerBoard', {
    init: function() {
        this.slots = Crafty.e('SlotCollection');
    },

    canBePlaced: function(card) {
        return this.slots.canBePlaced(card);
    },

    newPosition: function(card) {
        return this.slots.newPosition(card);
    }
});

Crafty.c('SlotCollection', {
    init: function() {
        this.slots = [];
        for (var y = 0; y < 5; ++y) {
            var row = [];
            for (var x = 0; x < 5; ++x) {
                row.push(
                    Crafty.e('Slot').create(
                        BOARD_POSITION.x + x * (SLOT_DIMENSIONS.w + SLOT_PADDING),
                        BOARD_POSITION.y - y * (SLOT_DIMENSIONS.h + SLOT_PADDING)
                    )
                );
            }
            this.slots.push(row);
        }
    },

    canBePlaced: function(card) {
        for (var x = 0; x < 5; ++x) {
            for (var y = 0; y < 5; ++y) {
                if (this.slots[x][y].intersect(card)) {
                    return true;
                }
            }
        }
        return false;
    },

    newPosition: function(card) {
        var slot = this._slotMatch(card);
        return {x: slot.x, y: slot.y};
    },

    _slotMatch: function(card) {
        // best matching slot
        return this._slotArray().reduce(function(oldSlot, newSlot) {
            var oldArea = oldSlot.intersectArea(card);
            var newArea = newSlot.intersectArea(card);
            if (oldArea < newArea) {
                return newSlot;
            } else {
                return oldSlot;
            }
        });
    },

    _slotArray: function() {
        var slots = [];
        for (var x = 0; x < 5; ++x) {
            for (var y = 0; y < 5; ++y) {
                slots.push(this.slots[x][y]);
            }
        }
        return slots;
    }
});

Crafty.c('Slot', {
    init: function() {
        this.requires('Rectangle, Canvas, Color');
        this.attr({w: SLOT_DIMENSIONS.w, h: SLOT_DIMENSIONS.h});
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
