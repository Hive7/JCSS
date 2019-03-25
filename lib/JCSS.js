(function () {
    var JC = selector => new JC.select(selector);

    JC.select = function (selector) {
        this.rules = {};
        this.selector = selector;
        this.length = 0;
    };

    JC.select.prototype = {
        rule: function (opts) {

            let gen = this.rule_create("", opts);

            document.getElementById("JCStyle").innerHTML += gen;

            this.rules[this.selector] = opts;

            return this;
        },
        rule_create: function (ext, opts) {

            let gen = this.selector + ext + "{";

            for (let opt in opts) {
                gen += opt;
                gen += ":";
                gen += opts[opt];
                gen += ";";
            }

            gen += "}";

            return gen;
        },
        select_rule: function (selector, opts) {

            let gen = this.rule_create(":" + selector, opts);

            document.getElementById("JCStyle").innerHTML += gen;

            this.rules[this.selector + ":" + selector] = opts;

            return this;
        },
        select: function (selector) {

            let selected = new JC.select(selector);

            selected.selector = this.selector + " " + selected.selector;

            return selected;
        },
        load: function () {

            let elems = document.querySelectorAll(this.selector);

            for (let i = 0; i < elems.length; i++) {
                this[i] = elems[i];
            }

            this.length = elems.length;

            return this;
        },
        apply: function (func, static) {

            if (!static && !this[0]) {
                this.load();
            }

            for (let i = 0; i < this.length | 0; i++) {
                func.call(this[i]);
            }

            return this;
        },
        bind: function (attr, prop) {

            this.apply(function () {
                this[attr] = prop;
            });

            return this;
        }
    };

    window.JC = JC;
})();
