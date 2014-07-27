(function (_) {
    /**
     * The text tool
     * @class IFTextTool
     * @extends IFShapeTool
     * @constructor
     */
    function IFTextTool() {
        IFShapeTool.call(this, true, true);
    }

    IFObject.inherit(IFTextTool, IFShapeTool);

    /** @override */
    IFTextTool.prototype.getCursor = function () {
        if (!this._shape) {
            return IFCursor.Text;
        } else {
            return IFShapeTool.prototype.getCursor.call(this);
        }
    };

    /** @override */
    IFTextTool.prototype._createShape = function () {
        return new IFRectangle();
    };

    /** @override */
    IFTextTool.prototype._updateShape = function (shape, area, line, scene) {
        if (scene) {
            shape.setProperty('trf', new IFTransform(area.getWidth(), 0, 0, area.getHeight(), area.getX(), area.getY()));
        } else {
            shape.setProperty('trf',
                new IFTransform(area.getWidth() / 2, 0, 0, area.getHeight() / 2,
                    area.getX() + area.getWidth() / 2, area.getY() + area.getHeight() / 2));
        }
    };

    /** @override */
    IFTextTool.prototype._insertShape = function (shape) {
        // Create our text out of our rectangle here
        var text = new IFText();
        text.setProperties(['aw', 'vb', 'trf'], [false, IFText.VerticalBox.Fixed, shape.getProperty('trf')]);

        this._insertText(text);
    };

    /** @override */
    IFTextTool.prototype._hasCenterCross = function () {
        return true;
    };

    /** @override */
    IFTextTool.prototype._createShapeManually = function (position) {
        var text = new IFText();
        text.setProperty('trf', new IFTransform(1, 0, 0, 1, position.getX(), position.getY()));
        this._insertText(text);
    };

    /** @private */
    IFTextTool.prototype._insertText = function (text) {
        // Insert text, first
        IFShapeTool.prototype._insertShape.call(this, text);

        // Save as this will be lost after switching tool
        var editor = this._editor;
        var view = this._view;

        // Switch to select tool
        this._manager.activateTool(IFPointerTool);

        // Open inline editor for text
        editor.openInlineEditor(text, view);
    };

    /** override */
    IFTextTool.prototype.toString = function () {
        return "[Object IFTextTool]";
    };

    _.IFTextTool = IFTextTool;
})(this);