import Controller from '@ember/controller';
import { action } from '@ember/object';


export default class MainController extends Controller {

  @action
  reloadModel() {
    var test = this.get('target');
    console.log(test.searchIssueId);
    console.log(test.searchStartDate);
    console.log(test.searchEndDate);
    this.transitionToRoute('main');
  }
}
