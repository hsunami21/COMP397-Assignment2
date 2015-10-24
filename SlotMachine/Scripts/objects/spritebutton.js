var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // SPRITE BUTTON CLASS
    var SpriteButton = (function (_super) {
        __extends(SpriteButton, _super);
        function SpriteButton(imageString, x, y) {
            _super.call(this, imageString, x, y);
            this.x = x;
            this.y = y;
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }
        // PRIVATE METHODS
        // Event Handler for mouse over
        SpriteButton.prototype.overButton = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        // Event Handler for mouse out
        SpriteButton.prototype.outButton = function (event) {
            event.currentTarget.alpha = 1.0;
        };
        return SpriteButton;
    })(objects.GameObject);
    objects.SpriteButton = SpriteButton;
})(objects || (objects = {}));
//# sourceMappingURL=spritebutton.js.map