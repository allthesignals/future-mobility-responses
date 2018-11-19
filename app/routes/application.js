import Route from '@ember/routing/route';
import fetch from 'fetch';
import environment from '../config/environment';

const { host } = environment;

export default class ApplicationRoute extends Route {
  model() {
    return fetch(`${host}/qcount/?format=json`)
      .then(blob => blob.json());
  }
}
