(function() {
  'use strict';
  angular.module("DeadQueryApp", [])
  .controller("QueryController", QueryController)
  .service("ArchiveOrgQueryService", ArchiveOrgQueryService)
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With']; //http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is
  });

  QueryController.$inject=["ArchiveOrgQueryService"];
  function QueryController(QueryService) {
    var qc = this;
    qc.message = QueryService.getMessage();
    var showsPromise = QueryService.requestShows();
    showsPromise.then(function(response) {
      qc.shows = QueryService.getShows(response);
      if (qc.shows != null) {
        for(var show of qc.shows) {
          console.log(show);
          /*qc.metadata = */QueryService.getShowMetaData(show);
        }
      }
    })
    .catch(function(error) {
      console.log("Error on service.getShows() / example HTTP request");
      console.log(error);
      return null;
    });

    var songsPromise = QueryService.requestSongs();
    // songsPromise.then(function(response) {
    //   console.log("Sucessful songs request", response);
    // }).catch(function(error) {
    //   console.log("Error songs request", error);
    // });

  }

  ArchiveOrgQueryService.$inject=["$http", "$sce"];
  function ArchiveOrgQueryService($http, $sce) {
    var service = this;

    service.getMessage = function() { return "Query service and controller running" };

    var testUrl = "https://archive.org/advancedsearch.php";

    service.requestShows = function() {
      var response = $http({
        method: "JSONP", //http://stackoverflow.com/questions/29547003/angularjs-no-access-control-allow-origin-header-is-present-on-the-requested-r
        url: testUrl,
        params: {
          q:"collection:(GratefulDead AND etree AND stream_only) AND NOT post_text:(released OR not streamable OR commercially OR cannot)"
          //,"fl[]":["date","description","identifier"]
          ,rows:"5"
          ,output:"json"
          ,callback:"angular.callbacks._0" //http://stackoverflow.com/questions/26262235/jsonp-returning-uncaught-syntaxerror-unexpected-token-angularjs-routingnu
          //,save:"yes"
        }
      });
      //console.log(response);
      return response;
    }

    service.requestSongs = function() {
      var songsUrl = "http://archive.org/download/gd1991-09-05.sbd.gardner.barberi-fix.121620.sbefixed.flac16/gd1991-09-05.sbd.gardner.barberi-fix.121620.sbefixed.flac16_vbr.m3u";
      $sce.trustAsResourceUrl(songsUrl);
      var promise = $http({
        method: "JSONP",
        url:songsUrl,
        params:{
          //rows:"5",
          output:"JSON"
          //callback:"angular.callbacks._0"
        }
      });
      console.log(promise);
      return promise;
    }

    service.getShowMetaData = function(show) {
      if (show == null) return;
      $http({
        method: "GET",
        url: "http://archive.org/metadata/" + show.identifier,
        params: {
          //output:"json",
          //callback:"angular.callbacks._0"
        }
      }).then(function(response) {
        var metadata = response.data.metadata;
        console.log("Title: ", metadata.title);
        console.log(metadata);
        console.log("MD5s:", metadata.md5s.split(/\n/));

      }).catch(function(errorResponse) {
        console.log("Error retrieving show metadata");
      });
    }

    service.digJson = function(respObj) {
      console.log(respObj);
      console.log("DIG: ");

      var shows = respObj.response.docs;
      for (var show of shows) {
        console.log(show);
      }
      return shows;
    }

    service.getShows = function(httpResponse) {
      console.log("objects for shows: ", httpResponse.data.response.docs);
      var shows = httpResponse.data.response.docs;
      return shows;
    }
  }
})();
