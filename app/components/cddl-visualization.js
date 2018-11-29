import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { mapBy } from '@ember-decorators/object/computed';
import { classNames } from '@ember-decorators/component';
import { CATEGORIES as categoryLookup } from './cddl-navigation';
import d3 from 'd3';
import GLModule from '../gl';

const { nest } = d3;

const INSTANCES = 3000;
const RADIAL = 0.3;
const ANGULAR = 0.4;
const DECAY = 0.009;

@classNames('cddl-visualization')
export default class CDDLVisualization extends Component {
  constructor(...args) {
    super(...args);

    this.addObserver('router.currentRouteName', () => {
      const glModule = this.get('glModule');
      const currentRouteName = this.get('router.currentRouteName');
      const lastRoute = this.get('lastRoute');

      if (currentRouteName == 'index') {
        glModule.unHighlight();
      }
    });
  }

  @service
  router;

  @computed('questionCounts.{questions,answers}')
  get proportions() {
    const { questions, answers: answerObjects } = this.get('questionCounts');

    return nest()
      .key(d => d.q_id)
      .entries(answerObjects)
      .map(grouped => {
        const { key } = grouped;
        const { values: answers } = grouped;
        const [{ q_id, q_text }] = answers;
        const { total } = questions.find(({ q }) => q === q_id);

        return {
          q_id,
          q_text,
          total,
          answers: answers.map(({ a_id, a_text, id_list, total: count }) => {
            return {
              a_id,
              a_text,
              id_list,
              count,
            };
          })
        };
      });
  }

  questionCounts;

  visualizationEnabled;

  glModule;

  handleClick(index, cat_index) {
    // TODO: route to a real id
    const { answers } = this.get('questionCounts');
    const category = cat_index + 3;

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
