//click event to get user input sting to google geocoding
  $(".js-submit").on("click", function(event) {
    event.preventDefault();
    var place = $(".js-main-input").val().trim();

  //geocoding data pull to get lat and long
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ place +"&key=AIzaSyAru-oavpiTSJBC9fHeKNA7OZasJFa15eA",
        method: "GET"
      }).then(function(response) {
        console.log(response);
        
        //create variables for lat and long to use for remaining 3 apis
        var lat = response.results["0"].geometry.location.lat;
        var long = response.results["0"].geometry.location.lng;
        console.log(lat);
        console.log(long);

        //hotel data pull with lat and long variable included
            $.ajax({
                url: "https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=yYOQMsJDsfO5Yk0WU7xgP6vX7YS8H1lC&latitude=" + lat + "&longitude=" + long + "&radius=10&check_in=2018-06-15&check_out=2018-06-16&currency=USD&number_of_results=4",
                method: "GET"
            }).then(function(response) {
                console.log(response);

                console.log(response.results["0"].property_name);
                console.log(response.results["0"].amenities["0"].description);
                console.log("http://hotelsearchengine.amadeus.com/hotelSearchEngineBrowser/#SINGLE/propertyCode="+response.results["0"].property_code +"")

                let stayItem = $("<a>").attr("href", "http://hotelsearchengine.amadeus.com/hotelSearchEngineBrowser/#SINGLE/propertyCode="+response.results[1].property_code +"");
                let stayItemTitle = $("<h2>").text(response.results["0"].property_name);
                let stayItemDesc = $("<p>").text(response.results["0"].amenities);
                stayItem.append(stayItemTitle).append(stayItemDesc);
            });    

        //weather data pull using city
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + place +"&appid=9ba90c3ac88ea1ab90059c06b34a2ce1",
                method: "GET"
            }).then(function(response) {    
                console.log(response);
                var valNum = response.main.temp
                valNum = parseFloat(valNum);
                var tempF = ((valNum-273.15)*1.8)+32;
                $(".js-weather-temp").text(tempF);         
                $(".js-weather-description").text(response.weather["0"].description);      

            });    
        //restaurants data pull using city, lat, long
            // $.ajax({
            //     url: "https://developers.zomato.com/api/v2.1/search?count=4&lat=41.8781&lon=87.6298&radius=20&sort=rating&order=desc",
            //     method: "GET", 
            //     headers: {"user-key": "7d02708bbc26f8cf3047e6bc3a0b0cc4"}
            // }).then(function(response) {    
            //     console.log(response);
            // });    
      });

  });