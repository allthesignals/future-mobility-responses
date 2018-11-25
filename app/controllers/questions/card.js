import Controller from '@ember/controller';
import environment from '../../config/environment';
import scale from 'ember-animated/motions/scale';

const { host } = environment;

export default class QuestionsCardController extends Controller {
  host = host;

  transition = function* ({ insertedSprites, receivedSprites, removedSprites }) {
    insertedSprites.forEach(scale);

    receivedSprites.forEach(scale);

    removedSprites.forEach(scale);
  }
}
