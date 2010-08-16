(function (tree) {

tree.URL = function (val, paths) {
    // Add the base path if the URL is relative and we are in the browser
    if (!/^(?:https?:\/)?\//.test(val.value) && paths.length > 0 && typeof(window) !== 'undefined') {
        var matches = paths[0].match(/^(https?:\/\/)(.+)/), protocol;
        if (matches) {
            protocol = matches[1];
            paths[0] = matches[2];
        }
        val.value = [paths[0], val.value].join('/').replace(/\/\/+/, '/');
        if (protocol) {
            val.value = protocol + val.value;
            paths[0] = protocol + paths[0];
        }
    }
    this.value = val;
    this.paths = paths;
};
tree.URL.prototype = {
    toCSS: function () {
        return "url(" + this.value.toCSS() + ")";
    },
    eval: function (ctx) {
        return new(tree.URL)(this.value.eval(ctx), this.paths);
    }
};

})(require('less/tree'));
