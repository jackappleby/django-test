$(function() {

    var eventTriggered = false;
    $(document).on('touchstart click', '.js-nav-togglable-trigger', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!eventTriggered) {
            eventTriggered = true;
            setTimeout(function() {
                eventTriggered = false;
            }, 250);
            var targetEl = $($(this).attr('href'));
            if (targetEl.hasClass('nav-togglable--is-active')) {
                targetEl.removeClass('nav-togglable--is-active');
                $(this).removeClass('nav-togglable-trigger--is-active');
            } else {
                targetEl.addClass('nav-togglable--is-active');
                $(this).addClass('nav-togglable-trigger--is-active');
            }
        }
    });
    $(document).on('click', 'body', function() {
        $('.js-nav-togglable').removeClass('nav-togglable--is-active');
        $('.js-nav-togglable-trigger').removeClass('nav-togglable-trigger--is-active');
    });
    $(document).on('click', '.js-nav-togglable', function(e) {
        e.stopPropagation();
    });



});