import Route from '@ember/routing/route';

export default class MainRoute extends Route {
  model(){
    this.set('defaultDate', 'test');
  }
}
