import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { mapBy } from '@ember-decorators/object/computed';
import { classNames } from '@ember-decorators/component';
import { timeout, task } from 'ember-concurrency';
import GLModule from '../gl';

const INSTANCES = 3000;
const RADIAL = 0.3;
const ANGULAR = 0.4;
const DECAY = 0.009;

@classNames('cddl-visualization')
class CDDLVisualization extends Component {
  constructor(...args) {
    super(...args);

    this.get('reloadTimer').perform();

    this.addObserver('router.currentRouteName', () => {
      const glModule = this.get('glModule');
      const currentRouteName = this.get('router.currentRouteName');

      this.get('reloadTimer').perform();

      if (currentRouteName === 'index') {
        console.log('is lowering lights...');
        glModule.unHighlight();
      }
    });
  }

  @service
  router;

  maxIdleTime = 300000;

  proportions;

  questionCounts;

  visualizationEnabled;

  glModule;

  // any click event
  click() {
    // click event
    this.get('reloadTimer').perform();
  }

  handleClick(index, cat_index) {
    // TODO: route to a real id
    const { answers } = this.get('questionCounts');
    const category = this.proportions[cat_index].q_id;

    const combinedAnswers = answers
      .filter(({ q_id }) => q_id === category)
      .reduce((acc, { id_list }) => {
        return acc.concat(id_list);
      }, []);

    const randomIndex = Math.floor(Math.random()*combinedAnswers.length);
    const randomAnswer = combinedAnswers[randomIndex];

    if (randomAnswer) {
      this.get('router')
        .transitionTo('questions.card', randomAnswer);
    }
  }

  didInsertElement(...params) {
    super.didInsertElement(...params);

    const container = this.element.querySelector('.gl-container');
    const proportions = this.get('proportions');
    console.log(proportions)
    const SCHEMA = this.get('proportions');
    const canvas = container.appendChild(document.createElement('canvas'));
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const gl = canvas.getContext('webgl2');

    const glModule = GLModule(gl, canvas)
      .setSize([canvas.width, canvas.height])
      .setInstances(INSTANCES)
      .setSchema(SCHEMA)
      .setMotionRadial(RADIAL)
      .setMotionAngular(ANGULAR)
      .setDecay(DECAY)
      .setColors(
        proportions
          .mapBy('color')
          .reduce((acc, curr) => acc.concat(curr), [])
          .map(d => d/255)
      )
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

Object.defineProperty(CDDLVisualization.prototype, 'reloadTimer', {
  value: task(function* () {
    yield timeout(this.get('maxIdleTime'));

    window.location.reload();
  }).restartable(),
});

export default CDDLVisualization;
