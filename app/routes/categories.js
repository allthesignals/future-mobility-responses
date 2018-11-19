import Route from '@ember/routing/route';

export default class CategoriesRoute extends Route {
  model({ category }) {
    return this.modelFor('application').find(({ q }) => `${q}` === category);
  }
}
