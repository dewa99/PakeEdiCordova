$('[class="fas fa-pause"]').hide();

$(function() {
  var height = 140;
     $("#player").swipe( {
       swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection){
         if(distance<= 400 && direction=='up'){
           if(phase=='move'){
             $(this).css('height',140+distance);
           }
           else if(phase=='cancel'){
             $(this).css('height',140);
           }

           console.log(phase);
         }

       },
       threshold:300,
       maxTimeThreshold:5000,
       fingers:'all'
   });
 });

    $('body').on('submit','#form_search',function(){
    var search_parameter = $('[name="search_field"]').val();
    console.log(search_parameter);
    var responses;

    $.ajax({
      url: 'https://ayahku.herokuapp.com/music/search/' + search_parameter,
      type: 'GET',
      dataType: 'json',
      crossDomain : true,
      success : function(response){
        responses = response;
      }
    }).always(function(){
      console.log("this is called always");
    })
    .fail(function(response) {
      console.log("fail");
    })
    .complete(function(){
      $.mobile.changePage("#result");
      $.each(responses.itemlist, function(index, val) {

        console.log(responses.itemlist[index].info1);

        //item
        $('[data-title="result"] > div > div').
        append(
          '<div class="result_item" onclick=clickItem("'+responses.itemlist[index].m_url+'")>'+
            '<div class="list-image"></div>'+
            '<div>'+responses.itemlist[index].info1+'</div>'+
            '<div style="font-weight:800;">'+responses.itemlist[index].info2+'</div>'+
          '</div>');
        //enditem

      });
    });
});

function clickItem(link){
    $.ajax({
      url: link,
      type: 'GET',
      dataType: 'json',
      crossDomain : true,
      success : function(response){
        console.log(response)
        $('#player_img').css('background-image','url('+response.imgSrc+')');
        $('#player_singer').html(response.msinger);
        $('#player_title').html(response.msong);
        $('#audio').attr("src",response.mp3Url);
        $('#audio')[0].play();
        $('[class="fas fa-play"]').hide();
        $('[class="fas fa-pause"]').show();



      }
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

}

function pause(){
  $('#audio')[0].pause();
  $('[class="fas fa-play"]').show();
  $('[class="fas fa-pause"]').hide();
}

function play(){
  $('#audio')[0].play();
  $('[class="fas fa-play"]').hide();
  $('[class="fas fa-pause"]').show();
}
