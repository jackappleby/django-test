$(function() {

    function initClamp() {
        var bookmarkTitles = document.querySelectorAll('.js-item-list-link');
        [].forEach.call(bookmarkTitles, function(el) {
            $clamp(el, {clamp: 2, useNativeClamp: false});
        });
        var bookmarkDescriptions = document.querySelectorAll('.js-item-list-description');
        [].forEach.call(bookmarkDescriptions, function(el) {
            $clamp(el, {clamp: 2, useNativeClamp: false});
        });
    }

    $(document).pjax('.js-pjax-me', '.js-pjax-container', {
        timeout: 1500
    });
    $(document).on('pjax:start', function() {
        $('.js-section-transition-inner').addClass('section-transition__inner--byebye');
    });
    $(document).on('pjax:end', function() {
        initClamp();
        initFilterTags();
        initLightbox();
        $('.js-message').remove();
    });
 
    
    function checkboxContentToggler(el) {
        if (el.is(':checked')) {
            $('.js-checkbox-target').removeClass('js-hide');
        } else {
            $('.js-checkbox-target').addClass('js-hide');
        }
    }

    function initLightbox() {
        $('.js-popup').magnificPopup({
            type: 'ajax',
            callbacks: {
                ajaxContentAdded: function() {
                    checkboxContentToggler($('.js-checkbox-toggle'));
                },
                close: function() {
                  // Will fire when popup is closed
                }
            }
        });
    }

    $(document).on('change, keyup', '.js-bookmark-url-input', function() {
        url = $(this).val();
        if (url) {
            $('.js-bookmark-title-input').addClass('field__loading');
        }
        $.ajax({
            dataType: 'json',
            url: app.urlLookup,
            data: 'url=' + url,
            success: function(data) {
                var $titleInput = $('.js-bookmark-title-input');
                if (data.status == 'success') {
                    $titleInput.val(data.title);
                } else if (data.status == 'error') {
                    $titleInput.attr('placeholder', 'Couldn\'t grab a title. Add your own here...');
                }
                $titleInput.removeClass('field__loading');
            }
        });
    });

    $(document).on('click', '.js-bool-toggle-submit', function(event) {
        event.preventDefault();
        that = $(this);
        var $form = that.closest('.js-bool-toggle-form');
        that.attr('disabled', 'disabled').addClass('is-throbbing');
        $.post(
            $form.attr('action'),
            $form.serialize(),
            function(data) {
                if (data.status == 'success') {
                    var $iconEl = that.find('.js-bool-toggle-icon');
                    var state = $form.find('.js-book-toggle-value-input').val();
                    if (state == 'True') {
                        $form.find('.js-book-toggle-value-input').val('False');
                        that.find('.js-bool-toggle-text').text('False');
                        $iconEl.attr('data-icon', $iconEl.data('icon-off')).removeClass('item-list__bool-icon--on').addClass('item-list__bool-icon--off'); 
                    } else {
                        $form.find('.js-book-toggle-value-input').val('True');
                        that.find('.js-bool-toggle-text').text('True');
                        $iconEl.attr('data-icon', $iconEl.data('icon-on')).removeClass('item-list__bool-icon--off').addClass('item-list__bool-icon--on'); 
                    }
                    that.removeAttr('disabled').blur().removeClass('is-throbbing');
                }
            }
        );
    });
    

    function initFilterTags() {
        $('.js-filter-tags-input').change(function() {
            var filter = $(this).val();
            if (filter) {
                $('.js-tag-list .js-tag-list-name:not(:contains(' + filter + '))').closest('.js-tag-list .js-tag-list-item').hide();
                $('.js-tag-list .js-tag-list-name:contains(' + filter + ')').closest('.js-tag-list .js-tag-list-item').show();
            } else {
                $('.js-tag-list .js-tag-list-item').show();
            }
            return false;
        }).keyup(function() {
            $(this).change();
        });
    }

    $(document).on('change', '.js-checkbox-toggle', function() {
        checkboxContentToggler($(this));
    });
    checkboxContentToggler($('.js-checkbox-toggle'));

    $(document).on('click', '.js-item-list-actions-toggle', function(event) {
        event.stopPropagation();
        $(this).closest('.js-bookmark').find('.js-item-list-actions').fadeToggle(100);
    });

    $(document).on('click', 'body', function(event) {
        event.stopPropagation();
        $('.js-item-list-actions').hide();
        $('.tag-autocomplete').remove();
    });

    // Pagination ajax load
    $(document).on('click', '.js-pagination-load-trigger', function(event) {
        var currentPageNumber = $('.js-pagination').data('page-number');
        var nextPageNumber    = currentPageNumber + 1;
        var pageTotal         = $('.js-pagination').data('page-total');
        var $bookmarkList     = $('.js-bookmark-list');
        if (currentPageNumber < pageTotal) {
            $.get('', {is_ajax_loaded : 'True', p : nextPageNumber} ).done(function(data) {
                $bookmarkList.append(data);
                $('.js-pagination').data('page-number', nextPageNumber);
                initClamp();
                initLightbox();
            });
        }
        if ((currentPageNumber + 1) == pageTotal) {
            $('.js-pagination-load-trigger').delay(1000).queue(function() {
                $(this).addClass('button--disabled').text($(this).data('all-done-text')).blur();
            });
        }
    });


    initClamp();
    initFilterTags();
    initLightbox();

    
});