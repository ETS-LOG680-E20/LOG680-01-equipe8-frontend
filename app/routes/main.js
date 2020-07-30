import Route from '@ember/routing/route';

export default class MainRoute extends Route {
  model(){
    // var today = new Date();
    this.set('today', new Date());
    var lastMonth = new Date();
    lastMonth.setDate(this.today.getDate() - 30);
    this.set('lastMonth', lastMonth);
    this.set('baseURL', 'https://localhost:44319/metric/');
    return this.getAll(4601, this.lastMonth.toDateString(), this.today.toDateString());
    // this.getAll();
  }

  getAll(issueId, startDate, endDate){
    issueId = issueId || 4601; //default
    startDate = startDate || this.lastMonth;
    endDate = endDate || this.today;

    // this.set('issueProcessTime', this.processTimeWithIssue(issueId));
    // this.set('processTimeInterval', this.processTimeWithTimeInterval(startDate, endDate));

    var columns = this.getColumns();
    columns.forEach(col => {
      col.issues = this.activeIssuesWithColumnId(col.id).metricValue;
    });
    // this.set('columns', columns);
    // this.set('completedInterval', this.completedIssuesWithTimeInterval(startDate, endDate));
    // this.set('columnsInterval', this.issuesForEachColumnWithTimeInterval(startDate, endDate));
    // this.set('openPR', this.openPullRequest());
    // this.set('commits', this.commits());

    return {
      issueProcessTime : this.processTimeWithIssue(issueId),
      processTimeInterval : this.processTimeWithTimeInterval(startDate, endDate),
      columns : columns,
      completedInterval : this.completedIssuesWithTimeInterval(startDate, endDate),
      columnsInterval : this.issuesForEachColumnWithTimeInterval(startDate, endDate),
      openPR : this.openPullRequest(), 
      commits : this.commits()}
  }

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
}
