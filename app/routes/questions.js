import Route from '@ember/routing/route';

export default class CategoriesRoute extends Route {
  model({ id }) {
    return this.modelFor('application').find(({ q }) => `${q}` === id);
  }
}
