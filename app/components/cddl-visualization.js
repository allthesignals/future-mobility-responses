import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { mapBy } from '@ember-decorators/object/computed';
import GLModule from '../gl';

const INSTANCES = 4000;

export default class CDDLVisualization extends Component {
  @service
  router;

  questionCounts;

  @mapBy('questionCounts', 'total')
  proportions

  glModule;

  handleClick(id, category) {
    this.get('router').transitionTo('categories', category);
  }

  didInsertElement(...params) {
    super.didInsertElement(...params);

    const container = this.element.querySelector('.gl-container');
    const canvas = container.appendChild(document.createElement('canvas'));
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const gl = canvas.getContext('webgl2');

    const glModule = GLModule(gl, canvas)
      .setSize([canvas.width, canvas.height])
      .setInstances(INSTANCES)
      .setProportions(this.get('proportions'))
      .onClick((...args) => {
        this.handleClick(...args);
      }, canvas);

    glModule();

    this.set('glModule', glModule);
  }

  _isSortedByCategory = false;

  @computed('')
  get isSortedByCategory() {
    return this.get('_isSortedByCategory');
  }
  set isSortedByCategory(boolean) {
    this.get('glModule').separateByCat(boolean);
    this.set('_isSortedByCategory', boolean);
  }
}
