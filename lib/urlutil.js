// Validates if url exists, in case it does, returns the url result
isUrlValid=function(url){

}

recommendTitleAndContent = function(url, $titleEl, $descEl, $titleLinkEl){
    var suggestedTitle, suggestedDescription;

    if(!url){
        return;
    }
    $titleLinkEl.addClass("loading");
    $.get(url).done(function(response){
      suggestedTitle=((/<title>(.*?)<\/title>/m).exec(response.results[0]));
      suggestedDescription=((/content="(.*?)"\s.*name="description"/mi).exec(response.results[0]));
      if(!suggestedDescription){
        suggestedDescription=((/name="description"\s.*content="(.*?)"/mi).exec(response.results[0]));
      }
      if (suggestedTitle){
          $titleEl.val(suggestedTitle[1]);
      }
      if (suggestedDescription){
          $descEl.text(suggestedDescription[1]);
      }
      $titleLinkEl.removeClass("loading");
    }).fail(function(){
      $titleLinkEl.removeClass("loading");
    });
}