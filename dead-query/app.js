(function() {
  'use strict';
  angular.module("DeadQueryApp", [])
  .controller("QueryController", QueryController)
  .service("ArchiveOrgQueryService", ArchiveOrgQueryService)
  .service("DateParseService", DateParseService)
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With']; //http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is
  });

  QueryController.$inject=["ArchiveOrgQueryService", "DateParseService"];
  function QueryController(QueryService, DateParseService) {
    var qc = this;
    qc.message = QueryService.getMessage();
    qc.displayShows = function() {
      console.log("Display shows function");
      var showsPromise = QueryService.requestShows(qc.titleQuery);
      var queryTimerStart = Date.now();
      showsPromise.then(function(response) {
        qc.responeseTime = Date.now() - queryTimerStart;
        //console.log(qc.responeseTime);
        qc.shows = QueryService.getShows(response);
        if (qc.shows != null) {
          for(var show of qc.shows) {
            //console.log(show);
            ///*qc.metadata = */QueryService.getShowMetaData(show);
          }
        }
      })
      .catch(function(error) {
        console.log("Error on service.getShows() / example HTTP request");
        console.log(error);
        return null;
      });
    }
    qc.fullDate = null;
    qc.day = null;
    qc.month = null;
    qc.year = null;
    qc.parseDate = function() {
      DateParseService.fetchDate(qc.dateQuery);
      qc.fullDate = DateParseService.dateObj;
      qc.day = DateParseService.day;
      qc.month = DateParseService.month;
      qc.monthWord = DateParseService.getMonthWord(qc.month);
      qc.year = DateParseService.year;
    }

  }

})();
