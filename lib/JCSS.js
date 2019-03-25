(function () {
    var JC = function (selector, binding) {
        if (binding) {
            selector = binding + " " + selector;
        }

        return JC.selections[selector] || new JC.select(selector);
    }

    JC.selections = {};

    JC.style_id = "JCStyle";

    JC.apply_style = function () {

        let style = document.getElementById(JC.style_id);

        for (let elem in JC.selections) {

            let item = JC.selections[elem];

            for (let opt in item.rules) {

                let gen = item.rule_create(opt, item.rules[opt]);

                style.innerHTML += gen;
            }
        }
    }

    JC.select = function (selector) {
        this.rules = {};
        this.selector = selector;
        this.length = 0;

        JC.selections[selector] = this;
    };

    JC.select.prototype = {
        rule: function (opts) {

            this.apply_rule("", opts);

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

            this.apply_rule(":" + selector, opts);

            return this;
        },
        apply_rule: function (selector, opts) {
            let rules = this.rules[selector] || {};

            for (var opt in opts) {
                rules[opt] = opts[opt];
            }

            this.rules[selector] = rules;

            return this;
        },
        select: function (selector) {
            return JC(selector, this.selector);
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
