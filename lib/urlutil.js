// Validates if url exists, in case it does, returns the url result
recommendTitleAndContent = function(url, $titleEl, $descEl, $titleLinkEl){
    var suggestedTitle, suggestedDescription;

    if(!url){
        return;
    }
    $titleLinkEl.addClass("loading");
    $.get(url).done(function(response){
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