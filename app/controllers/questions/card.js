import Controller from '@ember/controller';
import environment from '../../config/environment';

const { host } = environment;

export default class QuestionsCardController extends Controller {
  host = host;
}
