import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import GLModule from '../gl';

const INSTANCES = 4000;

export default class CDDLVisualization extends Component {
  proportions;

  glModule;

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
      .onClick(function() {

      }, canvas);

    glModule();

    this.set('glModule', glModule);
  }

  @action
  toggleCategorization(boolean) {
    this.get('glModule').separateByCat(boolean);
  }
}
