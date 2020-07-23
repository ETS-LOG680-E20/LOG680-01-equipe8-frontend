import Route from '@ember/routing/route';

export default class MainRoute extends Route {
  model(){
    this.set('defaultDate', 'test');
    this.set('test7', this.processTimeWithWithIssue(4601));
  }

  processTimeWithWithIssue(id){
    var url = `https://localhost:44319/metric/ProcessTime/${id}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
  }
}
