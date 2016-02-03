(function() {
    
    var lp_createBookmarklet, lp_css, lp_iframe, lp_bm_url, lp_bm_title, lp_bm_desc, lp_msg;

    lp_iframe = null;

    lp_css = null;

    lp_bm_url = location.href

    lp_bm_title = document.title;

    if (document.getSelection) {
        lp_bm_desc = document.getSelection();
    };

    lp_createBookmarklet = function() {
        var css, frag;
        frag = document.createDocumentFragment();
        lp_iframe = document.createElement('iframe');
        lp_iframe.id = 'lp_bookmarklet';
        lp_iframe.classList.add('animate');
        lp_iframe.classList.add('whoosh');
        lp_iframe.src = 'https://linkpin.io/bookmarks/add/?is_bookmarklet=true&url=' + encodeURIComponent(lp_bm_url) + '&' + 'description=' +encodeURIComponent(lp_bm_desc) + '&' + 'title=' + encodeURIComponent(lp_bm_title);
        frag.appendChild(lp_iframe);
        lp_css = document.createElement('style');
        lp_css.type = 'text/css';
        css = "#lp_bookmarklet {
                width: 300px;
                height: 100%;
                position: fixed;
                border: none;
                border-top: 10px solid #1BA39C;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 9999999999999;
                background: #fff;
                box-shadow: 0 0 20px 10px rgba(0, 0, 20, 0.1);
            }
            .animate {
                -webkit-animation-fill-mode: both;
                -moz-animation-fill-mode: both;
                -ms-animation-fill-mode: both;
                -o-animation-fill-mode: both;
                animation-fill-mode: both;
                -webkit-animation-duration: 0.4s;
                -moz-animation-duration: 0.4s;
                -ms-animation-duration: 0.4s;
                -o-animation-duration: 0.4s;
                animation-duration: 0.4s;
            }
            @-webkit-keyframes whoosh {
                0% { 
                    opacity: 0;
                    -webkit-transform: translateX(2000px);
                } 100% {
                    opacity: 1;
                    -webkit-transform: translateX(0);
                }
            } 
            @-moz-keyframes whoosh {
                0% {
                    opacity: 0;
                    -moz-transform: translateX(2000px);
                } 100% { 
                    -moz-transform: translateX(0);
                }
            }
            @-o-keyframes whoosh {
                0% {
                    opacity: 0; -o-transform: translateX(2000px);
                } 100% {
                    -o-transform: translateX(0);
                }
            }
            @keyframes whoosh {
                0% {
                    opacity: 0;
                    transform: translateX(2000px);
                } 100% {
                    transform: translateX(0);
                }
            }
            .whoosh {
                -webkit-animation-name: whoosh;
                -moz-animation-name: whoosh;
                -o-animation-name: whoosh;
                animation-name: whoosh;
            }";

        lp_css.appendChild(document.createTextNode(css));
  
        frag.appendChild(lp_css);
        
        return document.body.appendChild(frag);
        
    };

    lp_msg = function(e) {
        if (e.data.action === 'close') {
          return lp_close();
        }
    };

    lp_close = function() {
        if (lp_iframe) {
            document.body.removeChild(lp_iframe);
        }
        if (lp_css) {
            document.body.removeChild(lp_css);
        }
    }

    if (!document.getElementById('lp_bookmarklet')) {
        window.addEventListener('message', lp_msg, false);
        lp_createBookmarklet();
    }

}).call(this);


