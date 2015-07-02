/**
 * Created by joehua on 7/1/15.
 */

function WorldFactory(callback) {
    var world = {
    };

    callback(world); // tell Cucumber we're finished and to use our world object instead of 'this'
};
exports.World = WorldFactory;