var local = window.localStorage;
var list = [];

function like(title,artist,url){
  if(local.getItem("favorite")===null){
    local.setItem("favorite",list);
    list.push({title:title,artist:artist,url:url});
    saveData(jsonEn(list));
  }
  else{
    list = jsonDe();
    list.push({title:title,artist:artist,url:url});
    saveData(jsonEn(list));
  }
}

function unlike(url){
  list = jsonDe();
  var data = $.grep(list,function(e){
    return e.url != url;
  });
  saveData(jsonEn(data));
}

function jsonEn(data){
  return JSON.stringify(data);
}

function jsonDe(){
  if(local.getItem("favorite")===null){
    return 0;
  }
  else{
    return JSON.parse(local.getItem("favorite"));

  }
}

function getData(){

}

function saveData(data){
  localStorage.setItem('favorite',data);
}
