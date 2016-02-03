$(function() {

    var $selectedTag, allowEnterOnTagField = true;

    function buildTagAutocomplete($input) {
        $('body').append('<ul class="tag-autocomplete" />');
        var $container = $('.tag-autocomplete');
        var inputHeight = $input.outerHeight();
        var inputWidth = $input.outerWidth() + 1;
        var inputTop = $input.offset().top - 3;
        var inputleft = $input.offset().left;
        $container.css({'top' : inputTop + inputHeight + 'px', 'left' : inputleft + 'px', 'width' : inputWidth + 'px'});
    }

    function populateTagAutocomplete(data) {
        $.each(data, function(key, value) {
            $('.tag-autocomplete').append('<li class="tag-autocomplete__item">' + value.n + '</li>');
        });
    }

    function destroyTagAutocomplete() {
        $('.tag-autocomplete').remove();
    }

    function updateTagString(currentTags, $tagEl, $input) {
        var tagString = '';
        // remove partial text
        currentTags.pop();
        // add selected tag
        currentTags.push($tagEl.text().trim());
        // stringify tags
        $.each(currentTags, function(key, value) {
            tagString += value.trim() + ', ';
        });
        // add tag string to input
        $input.val(tagString).focus();
    }

    $(document).on('keyup', '.js-tag-input', function(event) {
        var currentTags = $(this).val().split(',');
        var s           = currentTags.slice(-1)[0].trim();
        var $input      = $(this);
        if (event.which === 40 || event.which === 38 || event.which === 13) {
            allowEnterOnTagField = false;
            if (event.which === 40) {
                if ($selectedTag) {
                    $selectedTag.removeClass('tag-autocomplete__item--active');
                    next = $selectedTag.next();
                    if (next.length > 0) {
                        $selectedTag = next.addClass('tag-autocomplete__item--active');
                    } else {
                        $selectedTag = $('.tag-autocomplete__item').first().addClass('tag-autocomplete__item--active');
                    }
                } else {
                    $selectedTag = $('.tag-autocomplete__item').first().addClass('tag-autocomplete__item--active');
                }
            // up
            } else if (event.which === 38) {
                if ($selectedTag) {
                    $selectedTag.removeClass('tag-autocomplete__item--active');
                    next = $selectedTag.prev();
                    if (next.length > 0) {
                        $selectedTag = next.addClass('tag-autocomplete__item--active');
                    } else {
                        $selectedTag = $('.tag-autocomplete__item').last().addClass('tag-autocomplete__item--active');
                    }
                } else {
                    $selectedTag = $('.tag-autocomplete__item').last().addClass('tag-autocomplete__item--active');
                }
            // enter
            } else if (event.which === 13 && $selectedTag) {
                updateTagString(currentTags, $selectedTag, $input);
                $selectedTag = null;
                allowEnterOnTagField = true;
            }
            // scroll the dropdown
            $('.tag-autocomplete').scrollTop($('.tag-autocomplete').scrollTop() + $selectedTag.position().top - $('.tag-autocomplete').height()/2 + $selectedTag.height()/2);
        // search
        } else if (s) {
            $selectedTag = null;
            $.ajax({
                dataType: 'json',
                url: app.tagList,
                data: 's=' + s,
                success: function(data) {
                    destroyTagAutocomplete();
                    if (data.length > 0) {
                        buildTagAutocomplete($input);
                        populateTagAutocomplete(data);
                        $(document).on('click', '.tag-autocomplete__item', function(event) {
                            updateTagString(currentTags, $(this), $input);
                        });
                    }
                }
            });
        } else {
            destroyTagAutocomplete();
        }
    });

    $('.js-tag-input').closest('form').on('submit', function() {
        if (!allowEnterOnTagField) {
            return false;
        }
    });

});
