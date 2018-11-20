import Route from '@ember/routing/route';
import fetch from 'fetch';
import environment from '../config/environment';

const { host } = environment;

export default class ApplicationRoute extends Route {
  async model() {
    return {
      questions: await fetch(`${host}/qcount/?format=json`)
        .then(blob => blob.json()),
      answers: await fetch(`${host}/qacount/?format=json`)
        .then(blob => blob.json()),
    };
  }
}
