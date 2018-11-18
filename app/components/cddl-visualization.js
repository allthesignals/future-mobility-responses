import Component from '@ember/component';
import GLModule from '../gl';
import { classNames } from '@ember-decorators/component';

const INSTANCES = 4000;

@classNames('gl-container')
export default class CDDLVisualization extends Component {
  proportions;

  didInsertElement(...params) {
    super.didInsertElement(...params);

    const container = this.element;
    const canvas = container.appendChild(document.createElement('canvas'));
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const gl = canvas.getContext('webgl2');

    const glModule = GLModule(gl, canvas)
      .setSize([canvas.width, canvas.height])
      .setInstances(INSTANCES)
      .setProportions(this.get('proportions'))
      .onClick(function() {
        console.log('did click', arguments);
      }, canvas);

    glModule();

    // glModule.separateByCat(true)
  }
}
