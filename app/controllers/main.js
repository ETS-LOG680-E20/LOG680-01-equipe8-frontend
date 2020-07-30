import Controller from '@ember/controller';
import { action } from '@ember/object';


export default class MainController extends Controller {

  queryParams = {
    searchId : 4601,
    startDate : '2020-07-30',
    endDate : '2020-06-30',
  };

  @action
  reloadModel() {
    this.transitionToRoute('main', {queryParams: {
      searchId: this.searchId,
      startDate : this.startDate,
      endDate : this.endDate
      }});
  }

  @action
  setSearchIssueId(value) {
    this.set('searchId', value);
  }

  @action
  setSearchStartDate(value) {
    this.set('startDate', value);
  }

  @action
  setSearchEndDate(value) {
    this.set('endDate', value);
  }
}
