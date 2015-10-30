var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // GAMEOBJECT CLASS
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTOR 
        function GameObject(imageString, x, y) {
            _super.call(this, atlas, imageString);
            this.x = x;
            this.y = y;
        }
        return GameObject;
    })(createjs.Sprite);
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map