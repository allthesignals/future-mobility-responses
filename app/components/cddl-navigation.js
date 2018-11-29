import Component from '@ember/component';
import jQuery from 'jquery';
import { action } from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';

// css name map. TODO: refactor to be data-driven
export const CATEGORIES = [
  ['car', 'In 2040, the average person will...'],
  ['commute', 'My preferred transport mode(s) in 2040 will be...'],
  ['people', 'In 2040, everyone will have access to...'],
  ['environ', 'In 2040...'],
  ['safety', 'Travel in the future will be more dangerous for...'],
  ['ethics', 'Responsibility for autonomous vehicle accidents belongs to...'],
  ['money', 'In the future, my transportation costs will...'],
  ['time', 'In 2040, commuting will take...'],
  ['equity', 'The future of mobility will make the world...'],
  ['jobs', 'Future mobility options will have the greatest impact on...'],
].map(([cat, question], index) => {
  return { label: cat, question, id: index + 3 };
});

@classNames('cddl-navigation')
export default class CddlNavigationComponent extends Component {
  categories = CATEGORIES;

  isSortedByCategory;

  visualization;

  labelCenters;

  currentCategory = null;

  opened = false;

  @action
  handleToggleClick() {
    this.toggleProperty('isSortedByCategory');
    if (this.get('labelCenters').length) {
      this.set('labelCenters', []);
      this.set('currentCategory', null);
    }
  }

  @action
  showCat(id) {
    this.get('visualization')
      .showCat(id, (nodes) => {
        this.set('labelCenters', nodes);
      });

    this.set('currentCategory', id);
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
              // jQuery(".circle-nav-overlay").fadeToggle();

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
