import Route from '@ember/routing/route';
import fetch from 'fetch';
import environment from '../config/environment';

const { host } = environment;

export default class CategoriesRoute extends Route {
  model({ id }) {
    return fetch(`${host}/qacount/?format=json`)
      .then(blob => blob.json())
      .then(data => data.filterBy('q_id', parseInt(id)));
  }
}
