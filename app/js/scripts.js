$(function() {
    svg4everybody();

    $(document).on('click', '[data-tab-open]', function() {
        var t = $(this);
        if ( !t.hasClass('is-active') ) {
            var id = t.attr('data-tab-open');
            var container = t.parents('[data-tab-container]');
            var $tabs = container.find('[data-tab]');
            $tabs.removeClass('is-opened').filter('[data-tab="'+id+'"]').addClass('is-opened');
            var $links = container.find('[data-tab-open]');
            $links.removeClass('is-active').filter('[data-tab-open="'+id+'"]').addClass('is-active');
        }
    });

    $(function() {
        var $loginContent = $('.js-login-content');
        var $tabs = $loginContent.find('[data-tab]');
        if ( $loginContent.length ) {
            var max = 0;
            $tabs.each(function() {
                var h = $(this).outerHeight();
                if ( h > max ) {
                    max = h;
                }
            });
            $loginContent.css({
                'min-height': max
            })
        }
    });

    $(function() {
        function updatePrice(input) {
            var val = input.val();
            var container = input.parents('.js-price');
            var dummy = container.find('.js-price-dummy');
            var sign = container.find('.js-price-sign');
            dummy.text(val);
            var margin = dummy.outerWidth()/2;
            if ( margin + sign.outerWidth() > container.outerWidth()/2 ) {
                margin = container.outerWidth()/2 - sign.outerWidth();
            }
            sign.css({
                marginLeft: margin
            });
            if ( !sign.hasClass('is-loaded') ) {
                sign.addClass('is-loaded');
            }
        }

        updatePrice($('.js-price-input'));

        $(document).on('change input keyup', '.js-price-input', function() {
            if ( /\D/g.test(this.value) ) {
                this.value = this.value.replace(/\D/g, '');
            }
            updatePrice($(this));
        });
    });

    $('.js-important').flipswitch({
        texts: null,
        width: 44,
        height: 22,
        animates: {
            duration: 200
        }
    });

    $('.js-compose-open').on('click', function() {
        var t = $(this);
        var $compose = $('.js-compose-content');
        if ( !t.hasClass('is-active') ) {
            $compose.stop().slideDown(200);
            t.addClass('is-active');
        } else {
            $compose.stop().slideUp(200);
            t.removeClass('is-active');
        }
    });

    $(function() {
        function modalOpen(t) {
            if ( $('.modal').filter('is-opened').length > 0 ) {
                modalsClose();
            }
            $('.modal[data-target="'+t+'"]').addClass('is-opened');
            $('.fade-bg').addClass('is-opened');
            $('body').addClass('is-locked');
        }

        function modalsClose() {
            $('.modal').removeClass('is-opened');
            $('.fade-bg').removeClass('is-opened');
            $('body').removeClass('is-locked');
        }

        $('.modal, .fade-bg').addClass('is-loaded');

        $('[data-open]').on('click', function(e) {
            e.preventDefault();
            var id = $(this).attr('data-open');
            modalsClose();
            modalOpen(id);
        });

        $('[data-modal-close]').on('click', function() {
            modalsClose();
        });

        $(document).on('click', function(event) {
            if ( event.target.classList.contains('modal') ) {
                modalsClose();
            }
        });
    });
	
    function startApp() {
    }

    startApp();

    var lastWidth = $(window).width();
    $(window).on('resize', _.debounce(function() {
        if ( $(window).width() !== lastWidth ) {
            startApp();
            lastWidth = $(window).width();
        }
    }, 100));
});