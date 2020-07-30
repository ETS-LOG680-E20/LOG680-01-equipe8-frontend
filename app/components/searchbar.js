import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SearchbarComponent extends Component {
  @action
  getSearchParams() {
    console.log(this.searchIssueId);
    console.log(this.searchStartDate);
    console.log(this.searchEndDate);
    this.get('main').send('refresh');
  }
  
}
