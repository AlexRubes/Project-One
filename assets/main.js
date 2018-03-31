//hotel data pull
$.ajax({
    url: "https://api.sandbox.amadeus.com/v1.2/hotels/YXLAS338?apikey=yYOQMsJDsfO5Yk0WU7xgP6vX7YS8H1lC&check_in=2018-06-15&check_out=2018-06-16&referrer=more_rooms_at_this_hotel",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });          
// //restaurants data pull
//   $.ajax({
//     url: "",
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//   });
// //weather data pull
//   $.ajax({
//     url: "",
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//   });
  //geocoding data pull
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAru-oavpiTSJBC9fHeKNA7OZasJFa15eA",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });