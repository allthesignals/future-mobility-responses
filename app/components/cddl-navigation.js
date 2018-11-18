import Component from '@ember/component';
import jQuery from 'jquery';

export default class CddlNavigationComponent extends Component {
  init(...args) {
    super.init(...args);

    // TODO: this should be handled in an initializer somewhere else
    !function(e) {
        e.fn.circleNav = function(o) {
            var l = e.extend({}, e.fn.circleNav.settings, o);
            return this.each(function() {
                var o = e(this),
                    c = e(".circle-nav-toggle"),
                    a = e(".circle-nav-panel"),
                    n = e(".circle-nav-menu");
                // these settings should be extracted as constants
                l.hasOverlay && 0 == e(".circle-nav-overlay").length && (e("body").append("<div class='circle-nav-overlay'></div>"), e(".circle-nav-overlay").css({
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0",
                    position: "fixed",
                    "background-color": l.overlayColor,
                    opacity: l.overlayOpacity,
                    "z-index": "-1",
                    display: "none"
                })), e(".circle-nav-toggle, .circle-nav-overlay").on("click", function() {
                    o.stop().toggleClass("circle-nav-open"), c.stop().toggleClass("circle-nav-open"), a.stop().toggleClass("circle-nav-open"), n.stop().toggleClass("circle-nav-open"), e(".circle-nav-overlay").fadeToggle(), e("body").css("overflow") ? e("body, html").css("overflow", "") : e("body, html").css("overflow", "hidden")
                })
            })
        }, e.fn.circleNav.settings = {
            hasOverlay: !0,
            overlayColor: "#fff",
            overlayOpacity: ".0"
        }
    }(jQuery, window, document);
  }

  didInsertElement(...params) {
    super.didInsertElement(...params);

    jQuery("#circle-nav-wrapper").circleNav();

    jQuery("#toggle").click(function(){
      jQuery("#pie_color").toggleClass('hidden');
      jQuery(".answer-container").addClass('hidden');
      jQuery(".container").removeClass('hidden');
      jQuery('.card-placeholder').addClass('hidden');
      jQuery('.answer-container div').removeClass('selected');
      jQuery("#car-container div").removeClass('container-shift');
    });
    jQuery('.circle-nav-item').click(function(){
      jQuery('.container').addClass('hidden');
      jQuery('.card-placeholder').addClass('hidden');
      jQuery('.answer-container div').removeClass('selected');
      jQuery("#car-container div").removeClass('container-shift');
    });
    jQuery('#car').click(function(){
      jQuery('.answer-container').addClass('hidden');
      jQuery('#car-container').toggleClass('hidden');
    });
    jQuery("#car-container div").click(function(){
      jQuery("#car-container div").addClass('container-shift');
      jQuery("#car-container div").removeClass('selected');
      jQuery('.card-placeholder').addClass('hidden');
      jQuery('#car-cards').delay( 800 ).removeClass('hidden');
      jQuery(this).addClass('selected');
    });

  }
}
