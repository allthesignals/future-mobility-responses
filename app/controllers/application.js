import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  constructor(...args) {
    super(...args);

    this.queryParams = [{ visualizationEnabled: { type: 'boolean' } }];
  }

  visualizationEnabled = true;
}
