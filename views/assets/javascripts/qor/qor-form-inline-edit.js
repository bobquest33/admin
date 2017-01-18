(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    'use strict';

    var NAMESPACE = 'qor.formInlineEdit';
    var EVENT_ENABLE = 'enable.' + NAMESPACE;
    var EVENT_DISABLE = 'disable.' + NAMESPACE;

    function QorFormInlineEdit(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorFormInlineEdit.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }

    QorFormInlineEdit.prototype = {
        constructor: QorFormInlineEdit,

        init: function () {
            this.initEdit();
        },

        bind: function () {
            this.$element
                .on('click', '.qor-inlineedit__button', this.showEdit)
                .on('change', 'select input', this.change);
        },

        initEdit: function () {
            let template_edit = `<button type="button" class="mdl-button mdl-button--icon qor-inlineedit__button">
                                    <i class="material-icons">mode_edit</i>
                                </button>`;

            this.$element.find('.qor-field__show').append(template_edit);
            this.bind();
        },

        showEdit: function (e) {
            let $target = $(e.target);

            $target.closest('.qor-field__show').hide();
            $target.closest('.qor-field').find('.qor-field__edit').show();
        },

        change: function (e) {
            // let $target = $(e.target);
            // if ($target.is('input')) {

            // }
        },

        destroy: function () {
            this.$element.select2('destroy').removeData(NAMESPACE);
        }
    };

    QorFormInlineEdit.DEFAULTS = {};

    QorFormInlineEdit.plugin = function (options) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(NAMESPACE);
            var fn;

            if (!data) {

                if (/destroy/.test(options)) {
                    return;
                }

                $this.data(NAMESPACE, (data = new QorFormInlineEdit(this, options)));
            }

            if (typeof options === 'string' && $.isFunction(fn = data[options])) {
                fn.apply(data);
            }
        });
    };

    $(function () {
        var selector = '[data-toggle="qor.form.inlineEdit"]';

        $(document).
        on(EVENT_DISABLE, function (e) {
            QorFormInlineEdit.plugin.call($(selector, e.target), 'destroy');
        }).
        on(EVENT_ENABLE, function (e) {
            QorFormInlineEdit.plugin.call($(selector, e.target));
        }).
        triggerHandler(EVENT_ENABLE);
    });

    return QorFormInlineEdit;

});
