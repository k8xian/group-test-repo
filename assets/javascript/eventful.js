$(document).ready(function () {
    console.log("I'm Ready!")


//variables called from local storage 
var localZip = localStorage.getItem("zipcode");
console.log("The locally stored zip is: " + localZip);
var localRadius = localStorage.getItem("radius");
console.log("The locally stored zip is: " + localRadius);

// temporary data since eventful doesn't populate a ton of results based on zip and radius
var tempArea = "chicago";
var tempRadius = "15";
  
  
//event
  var eventfulKey = "TQGmk2sjCkvfxS3r";
  var eventfulURL = "https://api.eventful.com/json/events/search?app_key="
                  + eventfulKey+
                  "&q=happy%20hour&ga_search=happy+hour&ga_type=events&t=Today"
                  + "&location=" 
                  + tempArea
                  + "&within&within="
                  + tempRadius
                  + "&units=miles";
  console.log(eventBriteURL);


    $.ajax({
        url: eventfulURL,
        dataType: 'jsonp',
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 200; i++) {

            console.log(response);
            console.log("the result length is = " + response.events.length);

            console.log(response.events.event[i].venue_name);
            console.log(response.events.event[i].venue_address);
            console.log(response.events.event[i].description);
            console.log("event latitude " + response.events.event[i].latitude);
            console.log("event longitude " + response.events.event[i].longitude);

            var eventVenue = response.events.event[i].venue_name;
            var eventAddress = response.events.event[i].venue_address;
            var eventDescription = response.events.event[i].description;
            var eventLat = response.events.event[i].latitude;
            var eventLon = response.events.event[i].longitude;
            var eventURL = response.events.event[i].url;

            var sectionBlock = $("<div class='section'>");
            var businessName = $("<h1>");
            var distance = $("<h2>");
            var description = $("<p class='twitter-preview'>");
            
            if(eventVenue !== null) {
                businessName.html(eventVenue);
            } else {
                businessName.html("unamed location")
            }

            if(eventDescription !== null) {
                description.html(eventDescription);
            } else if (eventURL !== null) {
                description.html("<a href='" + eventURL + "' target='_blank'>link to event</a>");
            } else {
                description.text("Oops... no info available");
            }

            distance.text("0.4 mi");

            sectionBlock.append(businessName, distance, description);
            $(".info-block").append(sectionBlock);
            $(".info-block").append("<div class='divider'>");


        }
    });

});