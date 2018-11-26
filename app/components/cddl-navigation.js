import Component from '@ember/component';
import jQuery from 'jquery';
import { action } from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';

const pointsAlongArc = (startAngle = 0, endAngle = Math.PI, r, n) => {
  //startAngle: starting point of the arc
  //endAngle: end point of the arc
  //default is a 180 degree arc (= Math.PI radians)
  
  const ARC_LENGTH = endAngle - startAngle;
  
  const thetas = Array.from({length:n})
    .map((d,i) => i/(n-1) * ARC_LENGTH);
  
  //return value will be a n-element array, where each element is a two element array [x,y]
  //Note that this [x,y] is relative to the center of the arc
  return thetas.map(theta => [r*Math.cos(theta), r*Math.sin(theta)]);
}

@classNames('cddl-navigation')
export default class CddlNavigationComponent extends Component {
  categories = [];

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

    const { clientWidth } = this.element;

    const labelCenters = pointsAlongArc(0, Math.PI, clientWidth/4, 10);

    // css name map. TODO: refactor to be data-driven
    const CATEGORIES = [
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
      return {
        label: cat, 
        id: index + 3, 
        x: Math.floor(labelCenters[index][0]), 
        y: Math.floor(labelCenters[index][1]) * 0.5,
      };
    });

    this.set('categories', CATEGORIES);
  }
}
