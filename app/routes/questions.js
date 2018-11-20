import Route from '@ember/routing/route';
import fetch from 'fetch';
import environment from '../config/environment';

const { host } = environment;

export default class CategoriesRoute extends Route {
  model({ id }) {
    const { answers } = this.modelFor('application');

    const min = Math.min(...answers.mapBy('total'));
    const max = Math.max(...answers.mapBy('total'));

    return {
      answers: answers.filterBy('q_id', parseInt(id)),
      meta: { min, max },
    };
  }
}
