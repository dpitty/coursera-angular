function DateParseService() {
  service = this;
  service.dateObj = null;
  var monthPattern = /jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(t)?(ember)?|oct(ober)?|nov(ember)?|dec(ember)?/;
  var mmddyPattern = /^(0?[1-9]|1[012])[\s- /.,]+(0?[1-9]|[12][0-9]|3[01])[\s-,/.]+(19|20)?[0-9][0-9]$/

  var mmddyStringToDate = function(str) {
    var a = str.split(/[\s,-/]+/);
    var y = a[2];
    if (y.length == 2 && y < 20) y = "20"+y;
    var m = a[0]-1; //months 0-11
    var d = a[1];
    return new Date(y,m,d);
  }

  var monthHash = {
    jan : 1, january : 1,
    feb: 2, february : 2,
    mar: 3, march : 3,
    apr: 4, april : 4,
    may: 5,
    jun: 6, june : 6,
    jul: 7, july : 7,
    aug: 8, august : 8,
    sep: 9, september : 9,
    oct: 10, october : 10,
    nov: 11, november : 11,
    dec: 12, december : 12,
  };


  var replaceMonth = function(str) {
    if(str == null) str = "";
    str = str.toLowerCase();
    var monthMatch = str.match(monthPattern)
    if (monthMatch !== null) {
      //console.log("Matched", monthMatch[0]);
      str = str.replace(monthMatch[0], monthHash[monthMatch[0]] + " ");
      //console.log("After month replace:", str);
      console.log("Month replaced: ", str);
    }
    return str;
  }



  service.fetchDate = function(inputDate) {
    var numericMonthDate = replaceMonth(inputDate);

    if (numericMonthDate.match(mmddyPattern)) {
      var dateObj = mmddyStringToDate(numericMonthDate);
      console.log(dateObj);
      if(dateObj != null && dateObj.getFullYear() > 1949 && dateObj.getFullYear() < 2050) {
        service.dateObj = dateObj;
        service.year = dateObj.getFullYear();
        service.month = dateObj.getMonth();
        service.day = dateObj.getDate();
      }
      else {
        service.dateObj = null;
      }
    } else {
      var fourDigitYearMatch = service.inputDate.match(/\d\d\d\d/);
      var monthMatch = service.inputDate.match(monthPattern);

      console.log(fourDigitYearMatch);
      if (fourDigitYearMatch && fourDigitYearMatch[0] > 1949 && fourDigitYearMatch[0] < 2050) {
        service.year = fourDigitYearMatch[0];
      }
      else {
        service.year = null;
      }
      if (monthMatch) {
        service.month = monthHash[monthMatch[0]] - 1;
        if(monthMatch != null) {
          var twoDigitYearMatch = service.inputDate.match(/\d\d/);
          if (twoDigitYearMatch != null) {
            if (twoDigitYearMatch[0] > 49) service.year = "19" + twoDigitYearMatch[0];
            else if (twoDigitYearMatch[0] < 20) service.year = "20" + twoDigitYearMatch[0];
          }
        }
      }
    }
  }
}
