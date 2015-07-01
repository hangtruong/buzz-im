/**
 * Created by joehua on 6/27/15.
 */

module.exports = function (schema, options) {
    schema.add(
        {
            createdTime: {type: Date, default: Date.now},
            modifiedTime: Date
        });

    schema.pre('save', function (next) {
        var _this = this;
        _this.modifiedTime = Date.now();
        next()
    });

    if (options && options.index) {
        schema.path('modifiedTime').index(options.index)
    }
};