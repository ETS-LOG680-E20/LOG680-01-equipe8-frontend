import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class MainRoute extends Route {
  model(params){
    var today = new Date();
    var lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    var searchId = params.searchIssueId || 4601;
    var startDate = params.searchStartDate || today;
    var endDate = params.searchEndDate || lastMonth;
    console.log('je suis ici');
    this.set('baseURL', 'https://localhost:44319/metric/');
    return this.getAll(searchId, startDate.toDateString(), endDate.toDateString());
	this.set('chartOptions',{
		showArea: true,
		lineSmooth: false,

		axisX: {
		  showGrid: false
		}
	  });

    return this.getAll(4601, this.lastMonth.toDateString(), this.today.toDateString());

  }

  getAll(issueId, startDate, endDate){
    var columns = this.getColumns();
    columns.forEach(col => {
      col.issues = this.activeIssuesWithColumnId(col.id).metricValue;
    });

	var daylist = [];
	var issuesForEachColumnJson = this.issuesForEachColumnWithTimeInterval(startDate, endDate);
	issuesForEachColumnJson.forEach(issue=>{
		daylist.push(issue["metricDate"]);
	});
    return {
      issueId : issueId,
      startDate : startDate,
      endDate : endDate,
      issueProcessTime : this.processTimeWithIssue(issueId),
      processTimeInterval : this.processTimeWithTimeInterval(startDate, endDate),
      columns : columns,
      completedInterval : this.completedIssuesWithTimeInterval(startDate, endDate),
      columnsInterval : this.issuesForEachColumnWithTimeInterval(startDate, endDate),
      openPR : this.openPullRequest(), 
      commits : this.commits(),
	  chartData : {
        labels: ['2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09'],
		  series: [
			[5, 4, 8, 5, 4, 8, 5, 4, 8],
			[10, 2, 7,10, 2, 7,10, 2, 7],
			[8, 3, 6,8, 3, 6,8, 3, 6]
		  ]
      },
	  issuesForEachColumn : {
        labels: ['2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09'],
		  series: [
			[5, 4, 8, 5, 4, 8, 5, 4, 8],
			[10, 2, 7,10, 2, 7,10, 2, 7],
			[8, 3, 6,8, 3, 6,8, 3, 6]
		  ]
      }
	  }
  }

  // @action
  // setSearchIssueId(value) {
  //   console.log(value);
  //   this.set('searchIssueId', value);
  // }

  // @action
  // setSearchStartDateRoute(value) {
  //   console.log(value);
  //   this.set('searchStartDate', value);
  // }

  // @action
  // setSearchEndDateRoute(value) {
  //   console.log(value);
  //   this.set('searchEndDate', value);
  // }

  getColumns(){
    var url = `${this.baseURL}Columns`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    console.log(JSON.parse(xmlHttp.response));
    return JSON.parse(xmlHttp.response);
  }

  processTimeWithIssue(id){
    var url = `${this.baseURL}ProcessTime/${id}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.response)['metricValue'];
  }

  processTimeWithTimeInterval(startDate, endDate){
    var url = `${this.baseURL}ProcessTime/${startDate}/${endDate}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.response)['metricValue'];
  }

  activeIssuesWithColumnId(id){
    var url = `${this.baseURL}NbActiveIssues/${id}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.response);
  }

  completedIssuesWithTimeInterval(startDate, endDate){
    var url = `${this.baseURL}NbCompletedIssues/${startDate}/${endDate}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.response)['metricValue'];
  }

  issuesForEachColumnWithTimeInterval(startDate, endDate){
    var url = `${this.baseURL}NbIssues/${startDate}/${endDate}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.response);
  }

  openPullRequest() {
    var url = `${this.baseURL}NbOpenPullRequest`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.response)['metricValue'];
  }

  commits() {
    var url = `${this.baseURL}NbCommits`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.response)['metricValue'];
  }

  @action
  reloadModel() {
    this.refresh();
  }
}
