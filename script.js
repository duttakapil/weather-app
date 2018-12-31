$(document).ready(function(){
  function getCity(){
    $.ajax({
      url: "https://geoip-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function( location ) {
          weather(location.city);
      }
    });     
  }


  function weather(city){
    var url = "https://api.openweathermap.org/data/2.5/weather?";
    var key = "3a53d3f03d189f460e7bd9e53adfa628"
    
    $.getJSON(url + 'q=' + city + "&APPID=" + key +"&units=metric", function(data){
      var main = data.main, weather = data.weather[0], temp = main.temp.toFixed(1) + "&deg; C", name = data.name;
      document.getElementById('temp').innerHTML = temp;      
      document.getElementById('city').innerHTML = name;
      document.getElementById('data').innerHTML =  weather.description.split(' ').map(function(elem){ return elem[0].toUpperCase() + elem.slice(1)}).join(' ');
      var icon = "http://openweathermap.org/img/w/" + weather.icon + ".png";
      document.getElementById('icon').innerHTML = '<img src='+icon+'>';
      background(city);
      setBackgroundGif(weather.main);
    });  
    
  }; 

  function converter(temp){
    var temp2 = temp.slice(0,2);
    if(temp[temp.length - 1] === 'C'){
      document.getElementById('convert').innerHTML = 'C';
      return (32 + temp2 * 1.8).toFixed(1)  +  "&deg; F";        
    }
    if(temp[temp.length - 1] === 'F') {
      document.getElementById('convert').innerHTML = 'F';
      return Math.round((temp2 - 32) / 1.8).toFixed(1) +  "&deg; C";
    }
  }

  $('#convert').click(function(){
    var temp = document.getElementById('temp').innerHTML;
    document.getElementById('temp').innerHTML = converter(temp);
  });

  function background(city){
    let imageUrl = "https://pixabay.com/api/?key=1112231-237234b930a9cd7fe7e3c6f91&q=" + city;
    $.getJSON(imageUrl, function(data){
      let randomNum = Math.round(Math.random()*(data.totalHits-1));
      console.log(randomNum)
      console.log(data.hits[randomNum].largeImageURL)
      $('body').append("<style>html { background: url(" + data.hits[randomNum].largeImageURL + ") no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover;          -o-background-size: cover;          background-size: cover;        }      </style>");  
    })
  }
  function setBackgroundGif(type){
    var gifs = {
      rain : "https://tinyurl.com/y7hcjtfu",
      dust : "https://tinyurl.com/ycmp4thk",
      thunderstorm : "https://tinyurl.com/y7pr4xjf",
      clouds : "https://tinyurl.com/hxjc4u5",
      haze : "https://tinyurl.com/yboxrbh7",
      smoke : "https://tinyurl.com/yboxrbh7",
      mist : "https://tinyurl.com/y83fjb9x"
    }  
    $('.main').append("<style>.main { background: url(" + gifs[type.toLowerCase()] + ") no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;          background-size: cover;        }</style>");    
  }

  $('#locate').click(function(){
    let city = $('#search').val();           
    if(!city){
        $('#search').attr('placeholder', '   Please Enter A City Name');
    }
    else{
        weather(city);
        $('#search').attr('placeholder', '   Enter City Name');
    }
  }); 

   $('#search').keypress(function (e) {
   console.log("Enter key pressed")
   var key = e.which;
   if(key == 13){
      $('#locate').click();
      return false;  
   }
  });   

  getCity();
});