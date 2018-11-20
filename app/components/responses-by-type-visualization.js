import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { htmlSafe } from '@ember/string';
import { classNames } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

const CARD_STYLE = {
  stroke: 'rgb(0,0,0)',
  fill: 'red',
  width: 10,
  height: 20,
};

@tagName('svg')
@classNames('responses-by-type-visualization')
export default class ResponsesByTypeVisualizationComponent extends Component {
  @service
  router;

  model;

  responses;

  @computed('responses.[]')
  get rectangles() {
    const length = this.get('responses');

    return Array
      .from({ length })
      .map(element => ({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
      }));
  }

  @computed
  get generatedStyle() {
    return kv(CARD_STYLE);
  }

  @attribute
  width = 120;

  @attribute
  height = 130;

  @action
  handleRectClick(id) {
    const TEMP_ID_REPLACE_ME = Math.random();
    this.get('router').transitionTo('questions.card', id, TEMP_ID_REPLACE_ME);
  }
}

// object to HTML style string
function kv(object) {
  return htmlSafe(Object
    .keys(object)
    .reduce((acc, curr) => {
      return acc.concat(`${curr}: ${object[curr]};`)
    }, ''));
}
