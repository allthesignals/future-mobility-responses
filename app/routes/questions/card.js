import Route from '@ember/routing/route';
import fetch from 'fetch';
import environment from '../../config/environment';

const { host } = environment;

export default class QuestionsCardRoute extends Route {
  model({ id }) {
    return fetch(`${host}/responses/?format=json&q=${id}`)
      .then(blob => blob.json());
  }
}
