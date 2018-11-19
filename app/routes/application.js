import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ApplicationRoute extends Route {
  model() {
    return fetch('http://18.85.45.120/qcount/?format=json')
      .then(blob => blob.json());
  }
}
