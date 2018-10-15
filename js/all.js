$(document).ready(function(){
    var county=[];
    var result;
    
    $('.st-bar').click(function (e) { 
        e.preventDefault();
        $('body').toggleClass('open');
    });

    $.ajax({
        url: "https://opendata.epa.gov.tw/ws/Data/AQI/?$format=json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function( response ) {
            console.log( response ); // server response
            console.log(response[0]["AQI"]);
            var len = response.length;
            for(var i=0; i<len; i++)
            {
                $('#content').append("<li>"+response[i]["County"]+"  "+response[i]["SiteName"]+"<br>AQI:"+response[i]["AQI"]+"  ("+response[i]["Status"]+")</li>");
                var ariAQI = parseInt(response[i]["AQI"]);
                if(ariAQI>=0 && ariAQI<=50) {$('#content').children().last().attr("style","background-color:#00e800");}
                else if(ariAQI>=51 && ariAQI<=100){$('#content').children().last().attr("style","background-color:#ff0");}
                else if(ariAQI>=101 && ariAQI<=150){$('#content').children().last().attr("style","background-color:#ff7e00");}
                else if(ariAQI>=151 && ariAQI<=200){$('#content').children().last().attr("style","background-color:red");}
                else if(ariAQI>=201 && ariAQI<=300){$('#content').children().last().attr("style","background-color:#8f3f97");}
                else if(ariAQI>=301 && ariAQI<=500){$('#content').children().last().attr("style","background-color:#7e0023");}

                county[i]=response[i]["County"];
            }

            result = county.filter(function(element, index, arr){
                return arr.indexOf(element)===index;
            });

            result.forEach(function(e){
                $('#countyName').append('<option value="'+e+'">'+e+'</option>')
                // $('#countyName2').append('<li>'+e+'</li>')
                $('#countyName2').append('<li><a class="bar-item" href="#">'+e+'</a></li>')
            });

            $('#countyName').on('change',function(){
                _select();
            });
            $('#countyName2').click(function (e) {
                e.preventDefault();
                $('#countyName').val(e.target.text);
                $('body').toggleClass('open');
                _select();
            });

            function _select(){
                $('#content').html('');
                response.forEach(function(e){
                    if($('#countyName').val() == e.County){
                        $('#content').append("<li>"+e["County"]+"  "+e["SiteName"]+"<br>AQI:"+e["AQI"]+"  ("+e["Status"]+")</li>");
                        // $('#content').children().attr("style","background-color:green");
                        var ariAQI = parseInt(e["AQI"]);
                        if(ariAQI>=0 && ariAQI<=50) {$('#content').children().last().attr("style","background-color:#00e800");}
                        else if(ariAQI>=51 && ariAQI<=100){$('#content').children().last().attr("style","background-color:#ff0");}
                        else if(ariAQI>=101 && ariAQI<=150){$('#content').children().last().attr("style","background-color:#ff7e00");}
                        else if(ariAQI>=151 && ariAQI<=200){$('#content').children().last().attr("style","background-color:red");}
                        else if(ariAQI>=201 && ariAQI<=300){$('#content').children().last().attr("style","background-color:#8f3f97");}
                        else if(ariAQI>=301 && ariAQI<=500){$('#content').children().last().attr("style","background-color:#7e0023");}
                    }
                });
            }
        },
        error: function () {
            console.log('error');
        }
    });
});