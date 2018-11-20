import Route from '@ember/routing/route';
import fetch from 'fetch';
import environment from '../../config/environment';

const { host } = environment;

export default class QuestionsCardRoute extends Route {
  model(params, transition) {
    const { params: { questions: { id } } } = transition;
    return fetch(`${host}/random/?format=json&q=${id}`)
      .then(blob => blob.json())
      .then(([randomCard]) => randomCard);
  }
}
