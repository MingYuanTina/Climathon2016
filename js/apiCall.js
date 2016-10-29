"use strict"

function init() {
 $.ajax({
        //API URL
        url: 'https://api.skywatch.co/data/time/2015/location/36.281389,-80.060278/level/3',

        dataType: 'json',
        method: 'GET',
        beforeSend: function(xhr) {
             xhr.setRequestHeader('x-api-key', "Bee5ahO55x660Gjwib3wb2pHMrJEgtXO7SH7dbeL");
        },
        success: function(data){
          for(var i in data) {
            console.log(data[i]);
          }
        }
      });
};

window.onload = init;
