$(function() {
    // tags
    $('.tag-block__body').each(function() {
        var $this            = $(this);
        var $btn             = $this.find('.tag-block__more-btn');
        var hideText         = $('html').attr('lang') == 'ru' ? 'Свернуть' : 'Hide';
        var $hiddenItem      = $this.find('.tag-block__item:hidden');

        $hiddenItem.addClass('hidden_item');

        if ($hiddenItem.length>0) {
            $(this).find('.tag-block__more').show();
        };

        $btn.on('click', function(){
            var currentText  = $btn.data('text');

            if ($this.find('.hidden_item').hasClass('active')) {
                $btn.find('.tag-block__more-text').text(currentText);
                $this.find('.hidden_item').removeClass('active');
            } else {
                $btn.find('.tag-block__more-text').text(hideText);
                $this.find('.hidden_item').addClass('active');
            };
        });
    });
    // tags

    // sorting
    $('.sorting-input span').html($('.sorting-body ul li:first-child span').text());

    $('.sorting-input').click(function(){
        $(this).toggleClass('opened');
        $('.sorting-body').slideToggle();
    });

    $('.sorting-body ul span').click(function(e){
        e.stopPropagation();
        $('.sorting-body').slideToggle();
        $('.sorting-input span').html($(this).text());
        $('.sorting-input').toggleClass('opened');
    });
    // sorting

    // filter
    $(".form-input input").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
    var $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
        instance,
        min = 0,
        max = 1000,
        from = 0,
        to = 0;

    $range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        onStart: updateInputs,
        onChange: updateInputs,

        hide_min_max: true,
        hide_from_to: true
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs (data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    $inputTo.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });


    $('.filter-form__item').each(function() {
        var $this            = $(this);
        var $title           = $this.find('.filter-form__item-title');
        var $body            = $this.find('.filter-form__item-body');

        $title.on('click', function(){
            $body.slideToggle();
            $title.toggleClass('closed');
        });
    });



    $('.filter-btn button').on('click', function(e) {
        $('.filter-popup').addClass('opened');
        $('body').addClass('overflowHidden');
    });

    $('.filter-popup-close-btn').on('click', function(e) {
        $('.filter-popup').removeClass('opened');
        $('body').removeClass('overflowHidden');
    });

    var appendFilter = () => {
        if( window.matchMedia("(max-width: 1280px)").matches ){
            if (!$('.filter-popup').hasClass('has_appended_blocks')) {
                $('.filter-block').appendTo('.filter-popup .filter-popup__body');

                $('.filter-popup').addClass('has_appended_blocks');
            }
        } else {
            $('.filter-block').appendTo('.site__main-left');
            $('.filter-popup').removeClass('has_appended_blocks');
        }
    }
    appendFilter();

    $(window).on('resize', function() {
        appendFilter();
    });
    // filter

    // amount
    $(function() {
        $("input[name='amount_input']").on('input', function(e) {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));

            if (this.value > max) this.value = max;
        });
    });

    function incrementValue(e) {
        e.preventDefault();
        var parent = $(e.target).parents('.amount-block');
        var currentVal = parseInt(parent.find('input[name="amount_input"]').val(), 10);

        if (!isNaN(currentVal)) {
            parent.find('input[name="amount_input"]').val(currentVal + 1);
        } else {
            parent.find('input[name="amount_input"]').val(0);
        }
    }

    function decrementValue(e) {
        e.preventDefault();
        var parent = $(e.target).parents('.amount-block');
        var currentVal = parseInt(parent.find('input[name="amount_input"]').val(), 10);

        if (!isNaN(currentVal) && currentVal > 0) {
            parent.find('input[name="amount_input"]').val(currentVal - 1);
        } else {
            parent.find('input[name="amount_input"]').val(0);
        }
    }

    $('.amount-block').on('click', '.plus', function(e) {
        incrementValue(e);
    });

    $('.amount-block').on('click', '.minus', function(e) {
        decrementValue(e);
    });

    $(document).on('closed', '.remodal.buy-extra-options', function (e) {
        var parent = $(e.target).find('.amount-block');
        parent.find('input[name="amount_input"]').val('0');
    });
    // amount

    // callback-block
    $(function() {
        $(".callback-block input[name='phone']").on('input', function(e) {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
        });
    });
    // callback-block

    // shop-modules
    var appendModules = () => {
        if( window.matchMedia("(max-width: 1280px)").matches ){
            if (!$('.header-module-mobile').hasClass('has_appended_blocks')) {
                $('.shop-modules').appendTo('.header-module-mobile');

                $('.header-module-mobile').addClass('has_appended_blocks');
            }
        } else {
            $('.shop-modules').appendTo('.header__bottom-right');
            $('.header-module-mobile').removeClass('has_appended_blocks');
        }
    }
    appendModules();

    $(window).on('resize', function() {
        appendModules();
    });
    // shop-modules

    // search
    var appendSearch = () => {
        if( window.matchMedia("(max-width: 1280px)").matches ){
            if (!$('.catalog-remodal__content').hasClass('has_appended_blocks')) {
                $('.search-block').prependTo('.catalog-remodal__content');

                $('.catalog-remodal__content').addClass('has_appended_blocks');
            }
        } else {
            $('.search-block').prependTo('.header-module__item.search-item');
            $('.catalog-remodal__content').removeClass('has_appended_blocks');
        }
    }
    appendSearch();

    $(window).on('resize', function() {
        appendSearch();
    });
    // search
});