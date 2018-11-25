import Component from '@ember/component';
import jQuery from 'jquery';
import { action } from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';

// css name map. TODO: refactor to be data-driven
export const CATEGORIES = [
  'car',
  'commute',
  'people',
  'environ',
  'safety',
  'ethics',
  'money',
  'time',
  'robots',
  'time',
].map((cat, index) => {
  return { label: cat, id: index + 2 };
});

@classNames('cddl-navigation')
export default class CddlNavigationComponent extends Component {
  categories = CATEGORIES;

  isSortedByCategory;

  visualization;

  labelCenters;

  opened = false;

  @action
  handleToggleClick() {
    this.toggleProperty('isSortedByCategory');
  }

  @action
  showCat(id) {
    this.get('visualization')
      .showCat(id, (nodes) => {
        this.set('labelCenters', nodes);
      });
  }

  init(...args) {
    super.init(...args);
    // TODO: this should be handled in an initializer somewhere else
    jQuery.fn.circleNav = function(o) {
      const l = jQuery.extend({}, jQuery.fn.circleNav.settings, o);

      return this.each(function() {
        const o = jQuery(this);
        const c = jQuery(".circle-nav-toggle");
        const a = jQuery(".circle-nav-panel");
        const n = jQuery(".circle-nav-menu");

        const shouldRender = true;

        if (shouldRender) {
          jQuery("body")
            .append("<div class='circle-nav-overlay'></div>");

          jQuery(".circle-nav-overlay")
            .css({
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
              position: "fixed",
              "background-color": l.overlayColor,
              opacity: l.overlayOpacity,
              "z-index": "-1",
              display: "none"
            });

          jQuery(".circle-nav-toggle, .circle-nav-overlay")
            .on("click", () => {
              o.stop().toggleClass("circle-nav-open");
              c.stop().toggleClass("circle-nav-open");
              a.stop().toggleClass("circle-nav-open");
              n.stop().toggleClass("circle-nav-open");
              jQuery(".circle-nav-overlay").fadeToggle();

              if (jQuery("body").css("overflow")) {
                jQuery("body, html").css("overflow", "")
              } else {
                jQuery("body, html").css("overflow", "hidden");
              }
            });
        }
      })
    };

    jQuery.fn.circleNav.settings = {
      hasOverlay: true,
      overlayColor: "#fff",
      overlayOpacity: ".0",
    };
  }

  didInsertElement(...params) {
    super.didInsertElement(...params);

    jQuery("#circle-nav-wrapper").circleNav();

    jQuery("#toggle").click(() => {
      jQuery('.answer-container div').removeClass('selected');
      jQuery("#car-container div").removeClass('container-shift');
    });
  }
}
