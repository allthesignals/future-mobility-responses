import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { mapBy } from '@ember-decorators/object/computed';
import { classNames } from '@ember-decorators/component';
import GLModule from '../gl';

const INSTANCES = 3000;
const RADIAL = 0.3;
const ANGULAR = 0.4;
const DECAY = 0.009;

@classNames('cddl-visualization')
export default class CDDLVisualization extends Component {
  @service
  router;

  @mapBy('questionCounts', 'total')
  proportions;

  questionCounts;

  visualizationEnabled;

  glModule;

  handleClick() {}

  didInsertElement(...params) {
    super.didInsertElement(...params);

    const container = this.element.querySelector('.gl-container');
    const PROPORTIONS = this.get('proportions');
    const canvas = container.appendChild(document.createElement('canvas'));
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const gl = canvas.getContext('webgl2');

    const glModule = GLModule(gl, canvas)
      .setSize([canvas.width, canvas.height])
      .setInstances(INSTANCES)
      .setProportions(PROPORTIONS)
      .setMotionRadial(RADIAL)
      .setMotionAngular(ANGULAR)
      .setDecay(DECAY)
      .onClick((...args) => {
        this.handleClick(...args);
      }, canvas);

    if (this.get('visualizationEnabled')) {
      glModule();
    }

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
