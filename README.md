# Project-One
This project was created rapidly, within a week, for a class project. 

This public repository is for the administration of Trip-Thang, Project-One. This application is designed to make traveling easier by providing hotels and restaurant/bars data for USA cities searched. The user can also add their favorite cities to their very own Bucket List, which can be referenced later to perfom the same searches. 

For each USA city that is searched, we use four different API’s to gather information on the specific location and relay it back to the user. The Google places API is used to get the exact location of the search, while the Barzz API and Amedeus API render data for restaurants/bars and hotels. Lastly, the open weather API returns current weather data for city that is searched.

To properly use our application, please download “Cross-Origin Resource Sharing (CORS)” chrome plugin and install it as an extension to your Chrome web browser. Within the extension you will need to paste this into the intercepted URL box, https://api.barzz.net/*

To visit the main website use the following link, https://alexrubes.github.io/Project-One/

For the reason that if the Amadeus API key expires, replace the api link with this: https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=RSNrav3uKFujMiYCBry4ADhrzEzCXK3E&latitude=

At this time you will be able to freely search any location you would like.

Files that include our work are within the assets folder.
