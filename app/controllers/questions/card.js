import Controller from '@ember/controller';
import environment from '../../config/environment';
import opacity from 'ember-animated/motions/opacity';

const { host } = environment;

export default class QuestionsCardController extends Controller {
  host = host;

  transition = function* ({ insertedSprites, receivedSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      opacity(sprite, { from: 0, to: 1 });
    });

    receivedSprites.forEach(sprite => {
      opacity(sprite, { from: 0,  to: 1 });
    });

    removedSprites.forEach(sprite => {
      opacity(sprite, { from: 1, to: 0 });
    });
  }
}
