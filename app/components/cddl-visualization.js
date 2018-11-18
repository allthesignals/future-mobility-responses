import Component from '@ember/component';
import cddl from 'cddl';

const INSTANCES = 4000;

export default class CDDLVisualization extends Component {
  didInsertElement(...params) {
    super.didInsertElement(...params);

    console.log(cddl);

    const container = document.querySelector('.gl-container');
    const canvas = container.appendChild(document.createElement('canvas'));
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const gl = canvas.getContext('webgl2');

    const glModule = cddl(gl, canvas)
      .setSize([canvas.width, canvas.height])
      .setInstances(INSTANCES)
      .onClick(function() {
        console.log('did click');
      }, canvas);

    glModule();
  }
}
