import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { htmlSafe } from '@ember/string';

const CARD_STYLE = {
  stroke: 'rgb(0,0,0)',
  fill: 'red',
  width: 10,
  height: 20,
};

@tagName('svg')
export default class ResponsesByTypeVisualizationComponent extends Component {
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
  width = 200;

  @attribute
  height = 200;
}

// object to HTML style string
function kv(object) {
  return htmlSafe(Object
    .keys(object)
    .reduce((acc, curr) => {
      return acc.concat(`${curr}: ${object[curr]};`)
    }, ''));
}
