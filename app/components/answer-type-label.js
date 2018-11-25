import Component from '@ember/component';
import { classNames, attribute } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { htmlSafe } from '@ember/string';

@classNames('label')
export default class AnswerTypeLabelComponent extends Component {
  label;

  @computed('label.{x,y}')
  @attribute
  get style() {
    const { x, y } = this.get('label');
    return htmlSafe(`left: ${x}px; top: ${y}px;`);
  }
}
