$('[class="fas fa-pause"]').hide();

$(document).on('pageinit', '#favorite', function(){
  var data = jsonDe();
  $.each(data, function(index, val) {
    //item
    $('[data-title="Favorites"] > div > div').
    append(
      // '<div class="result_item" onclick=clickItem("'+responses.itemlist[index].m_url+'")>'+
      '<div class="result_item">'+
        '<input name="url" value="'+data[index].url+'" hidden="true"></input>'+
        '<div class="list-image"></div>'+
          // '<i class="fas fa-heart"></i>'+
          '<div class="result_description">'+
            '<div>'+data[index].title+'</div>'+
            '<div style="font-weight:800;">'+data[index].artist+'</div>'+
          '</div>'+
      '</div>');
    });


});
//=============================================================================================================//
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
    var data = jsonDe();
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

      $('[role="main"] > i').hide();
      $.each(responses.itemlist, function(index, val) {
        //item
        $('[data-title="result"] > div > div').
        append(
          // '<div class="result_item" onclick=clickItem("'+responses.itemlist[index].m_url+'")>'+
          '<div class="result_item">'+
            '<input name="url" value="'+responses.itemlist[index].m_url+'" hidden="true"></input>'+
            '<div class="list-image"></div>'+
              // '<i class="fas fa-heart"></i>'+
              '<div class="result_description">'+
                '<div>'+responses.itemlist[index].info1+'</div>'+
                '<div style="font-weight:800;">'+responses.itemlist[index].info2+'</div>'+
              '</div>'+
          '</div>');
        //enditem

        $(document).ready(function() {
          $('.result_item').each(function(index,val){
            $(this).swipe({
                tap:function(event,target){
                  clickItem($(this).children('input').val());
                  $('.result_item').removeClass('item_active');
                  $(this).addClass('item_active');
                },
                doubleTap:function(event,target){
                  if($(this).hasClass('item_fav')){
                    $(this).removeClass('item_fav');
                    unlike($(this).children('input').val());
                  }
                  else{
                    $(this).addClass('item_fav');
                    like($(this).children('.result_description').children('div:eq(0)').text(),$(this).children('.result_description').children('div:eq(1)').text(),$(this).children('.result_item > input').val());
                  }
                },threshold : 50
            });
          });
        });
      });
      //=====search=====/

      $.each(data,function(index, value) {
        $('.result_item').each(function(index2, value2) {
            if($(this).children('input').val()==data[index].url){
              $(this).addClass('item_fav');
            }
        });
      });

      //=====search====/
    });

});

//=====================================================================================================//

function clickItem(link){

    $.ajax({
      url: link,
      type: 'GET',
      dataType: 'json',
      crossDomain : true,
      success : function(response){
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
      console.log("playing");
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
