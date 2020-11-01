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

        function modalsClose(checkRequired) {
            var activeModal = $('.modal').filter('.is-opened');
            activeModal.removeClass('is-opened');
            var requiredId = activeModal.attr('data-required');
            if ( requiredId !== undefined && requiredId !== '' && checkRequired ) {
                modalOpen(requiredId);
            } else {
                $('.fade-bg').removeClass('is-opened');
                $('body').removeClass('is-locked');
            }
        }

        $('.modal, .fade-bg').addClass('is-loaded');

        $('[data-open]').on('click', function(e) {
            e.preventDefault();
            var id = $(this).attr('data-open');
            modalsClose();
            modalOpen(id);
        });

        $('[data-modal-close]').on('click', function() {
            modalsClose(true);
        });

        $(document).on('click', function(event) {
            if ( event.target.classList.contains('modal') ) {
                modalsClose(true);
            }
        });
    });

    var isDesktop = false;
    var justSwitched = false;
    function detectDevice() {
        var temp = isDesktop;
        isDesktop = !!Modernizr.mq('(min-width:992px)');
        justSwitched = temp !== isDesktop;
    }
	
    function startApp() {
        detectDevice();
        if ( justSwitched ) {
            var $nav = $('.js-nav');
            if (  $nav.length ) {
                if (isDesktop) {
                    $nav.clone().appendTo('.js-nav-desktop');
                } else {
                    $('.js-nav-desktop').empty();
                }
            }
        }
    }

    startApp();

    var lastWidth = $(window).width();
    $(window).on('resize', _.debounce(function() {
        if ( $(window).width() !== lastWidth ) {
            startApp();
            lastWidth = $(window).width();
        }
    }, 100));

    $(document).on('click', '.js-bq-header', function() {
        var group = $(this).parents('.js-bq-group')
        if ( !group.hasClass('is-opened') ) {
            group.addClass('is-opened')
        } else {
            group.removeClass('is-opened')
        }
    });

    $(document).on('click', '[data-tip-open]', function() {
        var id = $(this).attr('data-tip-open');
        $('[data-tip-target="'+id+'"]').addClass('is-opened');
    });

    $(document).on('click', '[data-tip-close]', function() {
        var target = $(this).parents('[data-tip-target]');
        target.removeClass('is-opened');
    });

    $(document).on('click', '[data-add]', function() {
        var t = $(this);
        var id = t.attr('data-add');
        var content = $('[data-add-content="'+id+'"]').html();
        t.before(content);
    });

    $(document).on('click', '.js-order-rollup', function() {
        var order = $(this).parents('[data-order]');
        var id = order.attr('data-order');
        $('[data-order="'+id+'"]').removeClass('is-opened');
    });

    $(document).on('change', '[data-activity]', function() {
        var t = $(this);
        var item = t.parents('[data-item]');
        var pic = item.find('[data-pic]');
        if ( t.prop('checked') ) {
            pic.removeClass('is-disabled');
        } else {
            pic.addClass('is-disabled');
        }
    });

    $(document).on('change', '[data-status-switcher]', function() {
        var t = $(this);
        var item = t.parents('[data-status]');
        var icon = item.find('[data-status-icon]');
        var text = item.find('[data-status-text]');
        if ( t.prop('checked') ) {
            icon.removeClass('is-disabled');
            text.removeClass('is-disabled').text(text.attr('data-enabled'));
        } else {
            icon.addClass('is-disabled');
            text.addClass('is-disabled').text(text.attr('data-disabled'));
        }
    });

    $(document).on('click', '[data-toggle]', function() {
        var t = $(this);
        var item = t.parents('[data-item]');
        if ( !item.hasClass('is-opened') ) {
            item.addClass('is-opened');
        } else {
            item.removeClass('is-opened');
        }
    });

    function initLabel(input) {
        var label = input.next('.js-label');
        label.addClass('is-loaded');
        if ( input.val() !== '' && input.val() !== null  ) {
            label.addClass('is-active');
        }
    }

    $('.js-input').each(function() {
        initLabel($(this));
    });

    $(document).on('focus', '.js-input', function() {
        var t = $(this);
        var label = t.next('.js-label');
        label.addClass('is-active');
    });

    $(document).on('blur', '.js-input', function() {
        var t = $(this);
        var label = t.next('.js-label');
        if ( t.val() === '' || t.val() === null ) {
            label.removeClass('is-active');
        }
    });

    function areaResize(textarea) {
        textarea.height(0);
        var h = textarea[0].scrollHeight - (parseInt(textarea.css('padding-top')) + parseInt(textarea.css('padding-bottom')));
        textarea.height(h);
    }

    $('.js-autoresize').each(function() {
        areaResize($(this));
    });

    $(document).on('input change keyup', '.js-autoresize', function() {
        areaResize($(this));
    });

    $(document).on('input change keyup', '[data-usertext]', function() {
        var t = $(this);
        var form = t.parents('[data-input]');
        var btn = form.find('[data-send]');
        if ( t.val() !== '' ) {
            btn.removeClass('is-disabled');
        } else {
            btn.addClass('is-disabled');
        }
    });
});