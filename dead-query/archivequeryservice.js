ArchiveOrgQueryService.$inject=["$http", "$sce", "DateParseService"];
function ArchiveOrgQueryService($bogus, $sce, DateParseService) {
  var service = this;

  service.getMessage = function() { return "Query service and controller running" };

  var testUrl = "https://archive.org/advancedsearch.php";

  var queryNum = 0;

  service.requestShows = function(title) {
    console.log("Query title: " + title);
    var response = $bogus({
      method: "JSONP", //http://stackoverflow.com/questions/29547003/angularjs-no-access-control-allow-origin-header-is-present-on-the-requested-r
      url: testUrl,
      params: {
        q:"collection:(GratefulDead AND etree AND stream_only) AND NOT post_text:(released OR not streamable OR commercially OR cannot)" +
        " AND title:" + "'" + title + "'",
        //,"fl[]":["date","description","identifier"]
        //,year:"1986"
        rows:"15",
        output:"json",
        callback:"angular.callbacks._" + queryNum //http://stackoverflow.com/questions/26262235/jsonp-returning-uncaught-syntaxerror-unexpected-token-angularjs-routingnu
        //,save:"yes"
      }
    });
    //console.log(response);
    queryNum++;
    return response;
  }

  service.requestSongs = function() {
    var songsUrl = "http://archive.org/download/gd1991-09-05.sbd.gardner.barberi-fix.121620.sbefixed.flac16/gd1991-09-05.sbd.gardner.barberi-fix.121620.sbefixed.flac16_vbr.m3u";
    $sce.trustAsResourceUrl(songsUrl);
    var promise = $bogus({
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
    $bogus({
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
