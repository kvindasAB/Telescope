cleanUrl = function(url){
    if(!url){
        return "";
    }
    return (url.substring(0, 7) == "http://" || url.substring(0, 8) == "https://") ? url : "http://"+url;
}

isUrlExisting = function(url, successFn, failFn) {
    if(!url || url === ""){
        failFn();
    }
    $.get(url).done(function(response){
      if(!response.results || response.results.length === 0 ){
          if(failFn){
             failFn();
          }
          return;
      }
      if(!successFn){
          return;
      }
      successFn(response)
    }).fail(function(){
      if(!failFn){
          return;
      }
      failFn();
    });
}


// Validates if url exists, in case it does, returns the url result
recommendTitleAndContent = function(url, $titleEl, $descEl, $titleLinkEl){
    var suggestedTitle, suggestedDescription, failFn;

    if(!url){
        return;
    }
    $titleLinkEl.addClass("loading");
    $.get(url).done(function(response){
      if(!response.results || response.results.length === 0 ){
          $titleLinkEl.removeClass("loading");
          return;
      }
      suggestedTitle=getTitleFromHtml(response.results[0]);
      suggestedDescription=getDescriptionFromHtml(response.results[0]);
      if (suggestedTitle){
          $titleEl.val(suggestedTitle);
      }
      if (suggestedDescription){
          $descEl.text(suggestedDescription);
      }
      $titleLinkEl.removeClass("loading");
    }).fail(function(){
      $titleLinkEl.removeClass("loading");
    });
}

getTitleFromHtml = function(htmlTxt){
    var title = ((/<title>(.*?)<\/title>/m).exec(htmlTxt));
    return title[1];
}

getDescriptionFromHtml = function(htmlTxt){
    var description = ((/content="(.*?)"\s.*name="description"/mi).exec(htmlTxt));
    if(!description){
      description = ((/content="(.*?)"\s.*name="description"/mi).exec(htmlTxt));
    }
    if(!description){
      description = ((/content="(.*?)"\s.*property="og:description"/mi).exec(htmlTxt));
    }
    if(!description){
      description = ((/property="og:description"\s.*content="(.*?)"/mi).exec(htmlTxt));
    }
    if(!description){
      description = ((/<p>(.*?)<\/p>/m).exec(htmlTxt));
    }
    if(description){
      return description[1];
    }
    return undefined;
}