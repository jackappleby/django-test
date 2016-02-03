queryBookmarks = new Array();
    queryBookmarks.b = new Array();
    initialQueryBookmarks = queryString.parse(location.search).b
    if (initialQueryBookmarks) {
        if (typeof initialQueryBookmarks == 'string') {
            queryBookmarks.b.push(initialQueryBookmarks);
        } else {
            $.each(initialQueryBookmarks, function(key, value) {
               queryBookmarks.b.push(value);
            });
        }
    }

    function buildSelectedBookmarksQuery($bookmark, id) {
        if ($bookmark.data('isSelected')) {
            queryBookmarks.b.push(id);
        } else {
            queryBookmarks.b = $.grep(queryBookmarks.b, function(value) {
                return value != id;
            });
        }
        $('.js-pagination-link').each(function() {
            var currentQueryStringObj = queryString.parse($(this).attr('href'));
            delete currentQueryStringObj.b;
            var newHref = '?' + queryString.stringify(currentQueryStringObj) + '&' + queryString.stringify(queryBookmarks);
            $(this).attr('href', newHref);
        });
    }

    $(document).on('click', '.js-select-bookmark-input', function() {
        var $bookmark = $(this).closest('.js-bookmark');
        $bookmark.toggleClass('item-list__item--selected js-bookmark-is-selected');
        var bookmarkId = $(this).attr('value');
        if ($bookmark.hasClass('js-bookmark-is-selected')) {
            $bookmark.data('isSelected', true);
            var $input = $(this).clone().removeAttr('id');
            $('.js-collection-form').append($input);
        } else {
            $bookmark.data('isSelected', false);
            $('.js-collection-form').find($('.js-select-bookmark-input[value="' + bookmarkId + '"]')).remove();
        }
        buildSelectedBookmarksQuery($bookmark, bookmarkId);
        var $submitButton = $('.js-collection-submit');
        if (queryBookmarks.b.length > 0) {
            $submitButton.removeClass('button--disabled js-collection-submit-is-disabled').val($submitButton.data('default-value') + ' (' + queryBookmarks.b.length + ')');
        } else {
            $submitButton.addClass('button--disabled js-collection-submit-is-disabled').val($submitButton.data('default-value'));
        }
    });

    $(document).on('click', '.js-collection-submit', function(e) {
        e.preventDefault();
        if ($(this).hasClass('js-collection-submit-is-disabled')) {
            alert($(this).data('warning'));
        } else {
            var dataString = $(this).closest('.js-collection-form').serialize();
            $.magnificPopup.open({
                type: 'ajax',
                items: {
                    src: app.collectionAdd + '?' + dataString 
                }
            });
        }
    });