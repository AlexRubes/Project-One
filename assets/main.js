// initially hide the results section and repeat search button
$('.travel-results').hide();
$('.js-repeat-search').hide();

//initially write cities
writeCityList();

// trigger search on button click
$(".js-submit").on("click", function(event) {
    init($(".js-main-input").val().trim());
});

// trigger search on enter keyup
$(document).keypress(function(e) {
    if(e.which == 13) {
        init($(".js-main-input").val().trim());
    }
});

let list = JSON.parse(localStorage.getItem("citylist"));
// Checks to see if the list exists in localStorage and is an array currently
// If not, set a local list variable to an empty array
// Otherwise list is our current list of todos
if (!Array.isArray(list)) {
    list = [];
}

// write saved list of cities to page
function writeCityList() {
    $(".js-bucketlist").empty();
    let cityList = JSON.parse(localStorage.getItem("citylist"));
    
    if (!Array.isArray(cityList)) {
      cityList = []; 
    }
  
    // render our city list to the page
    for (let j = 0; j < cityList.length; j++) {
      let p = $("<h1>").text(cityList[j]).attr("data-index", j);
      $(".js-bucketlist").prepend(p);
    };
}

// ...the actual search program
function init(input) {
    event.preventDefault();
    $('.js-status').text('Working...');
    var place = input;

    //get lat and long from Google Geocoding API
    $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ place +"&key=AIzaSyAru-oavpiTSJBC9fHeKNA7OZasJFa15eA",
    method: "GET"
    }).then(function(response) {
        console.log(response);
        
        //create variables for lat and long to use for remaining 3 apis
        var lat = response.results["0"].geometry.location.lat;
        var long = response.results["0"].geometry.location.lng;
        var city = response.results["0"].address_components["0"].long_name;
        var state = response.results["0"].address_components["2"].long_name;

        console.log(lat);
        console.log(long);
        console.log(city);
        console.log(state);
        
        // after Google geocoding, start showing results
        $('.travel-results').fadeIn();
        $('.js-repeat-search').fadeIn();
        $('.js-travel-search').addClass('hidden');
        $('h1.page-logo').fadeOut();

        // capitalize the city name, place in city div
        place = place.charAt(0).toUpperCase() + place.substr(1);
        $('.js-city').text(place);

        //hotel data pull with lat and long variable included
        $.ajax({
            url: "https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=yYOQMsJDsfO5Yk0WU7xgP6vX7YS8H1lC&latitude=" + lat + "&longitude=" + long + "&radius=10&check_in=2018-06-15&check_out=2018-06-16&currency=USD&number_of_results=6",
            method: "GET"
        }).then(function(response) {
            console.log(response);

            console.log(response.results["0"].property_name);
            console.log(response.results["0"].amenities["0"].description);
            console.log(response.results["0"].total_price.amount);
            console.log("http://hotelsearchengine.amadeus.com/hotelSearchEngineBrowser/#SINGLE/propertyCode="+response.results["0"].property_code +"");
            
            $('.js-hotels').empty();
            for (let i = 0; i < response.results.length; i++) {
                let stayItem = $("<a>").attr("href", "http://hotelsearchengine.amadeus.com/hotelSearchEngineBrowser/#SINGLE/propertyCode="+response.results[i].property_code +"").attr("target","blank");
                let stayItemPrice = $("<h3>").text("$" + Math.trunc(response.results[i].total_price.amount) + "/night");
                let stayItemTitle = $("<h2>").text(response.results[i].property_name);
                let stayItemDesc = $("<p>").text(response.results[i].amenities[0].description + ", " + response.results[i].amenities[1].description);
                stayItem.append(stayItemPrice).append(stayItemTitle).append(stayItemDesc);
                $('.js-hotels').append(stayItem);
            }
        });    

        //weather data pull using city
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + place +"&appid=9ba90c3ac88ea1ab90059c06b34a2ce1",
            method: "GET"
        }).then(function(response) {    
            console.log(response);
            var valNum = response.main.temp;
            valNum = parseFloat(valNum);
            var tempF = Math.trunc(((valNum-273.15)*1.8)+32);
            $(".js-weather-temp").text(tempF);         
            $(".js-weather-description").text(response.weather["0"].description);      
        });    

        //restaurants data pull using city, lat, long
        $.ajax({
            url: "https://api.barzz.net/api/search?city="+city+"&state="+state+"&user_key=2de014817647c19e1bd4a957864fabe5",
            method: "GET",
            crossDomain: true,
        }).then(function(response) { 
            
            let data = JSON.parse(response);
            console.log(data.success);

            console.log(data.success.results["0"].Name);
            console.log(data.success.results["0"].Bar_Image);
            console.log(data.success.results["0"].Bar_Website);
            console.log(data.success.results["0"].Type);

            $('.js-restaurants').empty();
            for (let i = 0; i < 4 ; i++) {
                let foodItem = $("<a>").attr("href", "http://"+data.success.results[i].Bar_Website+"").attr("target","blank");
                let foodItemTitle = $("<h2>").text(data.success.results[i].Name);
                let foodItemDesc = $("<p>").text(data.success.results[i].Type);
                let foodItemImg = $("<div>").addClass("img").css("background-image", "url(" + data.success.results[i].Bar_Image + ")");
                
                foodItem.append(foodItemImg).append(foodItemTitle).append(foodItemDesc);
                $('.js-restaurants').append(foodItem);
            }
        });    
    });
};

// reset the search when clicking "repeat search"
$(".js-repeat-search").on("click", function(event) {
    $('.js-travel-search').removeClass('hidden');
    $('h1.page-logo').fadeIn();
    $('.js-status').text('Type a location and find some info on it, y’all.');
});
 
//if the user clicks on the save to list button, take the name of the city that is in the div
$('.js-addtolist').on('click', function() {
    //let cityList = JSON.parse(localStorage.getItem("citylist"));
    let cityName = $('.js-city').text().trim();
    list.push(cityName);
    
    localStorage.setItem("citylist", JSON.stringify(list));
    
    writeCityList();

    // make bucketlist blink
    $('.js-bucketlist').fadeOut(100).fadeIn(100);
});

// when user click on city in list, search that city
$(document).on('click', '.js-bucketlist h1', function() {
    console.log("clicked");
    $('.js-city').fadeOut(100).fadeIn(100);
    $('.weather h1').fadeOut(100).fadeIn(100);
    $('.js-city').text($(this).text());
    init($(this).text());
});