import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  constructor(...args) {
    super(...args);
  }

  visualizationEnabled = true;
}
