$(document).ready(function () {
  console.log("I'm Ready!")

  //enables dropdown of radius in index.html
  $('select').formSelect();

  var zip;
  var radius;

  var filter;
  var filters = [];

  var latArray = [];
  var lonArray = [];

  var userInput = $("#user-input");
  var mainDisplay = $("#main-display");

  userInput.show();
  mainDisplay.hide();

  //saves zipcode & radius values as local storage
  $(document).on('click', '.submit-btn', function () {
    event.preventDefault();
    zip = $('#zipcode').val().trim()
    radius = $('.select-radius :selected').val()
    localStorage.setItem('zipcode', zip);
    localStorage.setItem('radius', radius);
    userInput.hide();
    mainDisplay.show();
    initMap();
    console.log('Zipcode: ' + zip)
    console.log('Radius: ' + radius);
  });

  //saves filter input when typed
  $(document).on('input', '#filter-input', function () {
    filter = $('#filter-input').val().trim();
  });

  //pushes filter variables into an array that is stored locally and creates new buttons based on custom filters
  $(document).on('touchstart', '.filter-submit', function () {
    var div = $('<div>').addClass('tag-button waves-effect');
    var lowerCase = filter.toLowerCase();
    div.attr('data-tag', lowerCase);
    div.text(filter);
    $('#tag-buttons').append(div);

    filters.push(filter);
    localStorage.setItem('filters', filters);
  });






  /*************************************************************************************/
  var localZip = localStorage.getItem("zipcode");
  console.log("The locally stored zip is: " + localZip);
  var localRadius = localStorage.getItem("radius");
  console.log("The locally stored zip is: " + localRadius);

  // temporary data since eventful doesn't populate a ton of results based on zip and radius
  // var tempArea = "chicago";
  // var tempRadius = "15";


  //event
  var eventfulKey = "TQGmk2sjCkvfxS3r";
  var eventfulURL = "https://api.eventful.com/json/events/search?app_key="
    + eventfulKey
    + "&location="
    + localZip
    + "&ga_search=happy%20hour&ga_type=events"
    + "&within&within="
    + localRadius
    + "&units=miles"
  //        + "&date=Today";
  console.log(eventfulURL);


  $.ajax({
    url: eventfulURL,
    dataType: 'jsonp',
    method: "GET"
  }).then(function (response) {

    var resultLength = parseInt(response.total_items);
    console.log(response);
    console.log("the result length is = " + resultLength);

    for (var i = 0; i < resultLength; i++) {

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

      latArray.push(eventLat);
      lonArray.push(eventLon);

      var sectionBlock = $("<div class='section'>");
      var businessName = $("<h1>");
      var distance = $("<h2>");
      var description = $("<p class='twitter-preview'>");
      var linkToAddress = $("<a class='map-link__temp'>");

      if (eventVenue !== null) {
        businessName.html(eventVenue);
      } else {
        businessName.html("unamed location")
      }

      if (eventDescription !== null) {
        description.html(eventDescription);
      } else if (eventURL !== null) {
        description.html("<a href='" + eventURL + "' target='_blank'>no description available: link to event</a>");
      } else {
        description.text("Oops... no info available");
      }

      distance.text("0.4 mi");

      if (eventAddress !== null) {
        linkToAddress.attr("href", "http://maps.google.com/?q=" + eventAddress).attr("target", "_blank").text("Link to Map");
      }

      sectionBlock.append(businessName, distance, description, linkToAddress);
      $(".info-block").append(sectionBlock);
      $(".info-block").append("<div class='divider'>");

      var littleObject = {
        coords: {
          lat: parseFloat(latArray[i]),
          lng: parseFloat(lonArray[i])
        },
        iconImage: 'assets/images/map-icon.png',
        content: eventVenue
      }
      markers.push(littleObject);
    }
  });







  /**********************************************************************************************/
  //push place data to this array
  // possibly use this API to find coordinates https://www.gps-coordinates.net/


  // //variable for concatenated place names
  // var placeName = "";

  // //https://maps.googleapis.com/maps/api/place/textsearch/json?query=hopleaf&key=AIzaSyBbm7r_pRBvTL_02fAcL3_eWtNkpxZ5tIY

  // var placeNameQueryURLForMarers = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
  //                                   + placeName +
  //                                       "&key=AIzaSyBbm7r_pRBvTL_02fAcL3_eWtNkpxZ5tIY";  

  //Link to custom icon (has to be a url)//
  var image = {
    url: 'assets/images/map-icon.png'
  };


  //create variables to push to this array from incoming data
  ///markers object
  var markers = [{
    coords: {
      lat: 42.0564,
      lng: -87.6752
    },
    iconImage: 'assets/images/map-icon.png',
    content: '<h1>Northwestern</h1>'
  },
  {
    coords: {
      lat: 41.9690,
      lng: -87.7197
    },
    iconImage: 'assets/images/map-icon.png',
    content: '<h1>Albany Park</h1>'
  },
  {
    coords: {
      lat: 41.9231,
      lng: -87.7197
    },
    iconImage: 'assets/images/map-icon.png',
    content: '<h1>Logan Square</h1>'
  },
  ];

  var geocoder; //To use later
  var map; //Your map
  //map styling
  function initMap() {

    ///map stuff
    var map, infoWindow;

    //create a variable for location
    var myLatLng = { lat: 42.0564, lng: -87.6752 };
    var bounds = new google.maps.LatLngBounds();

    geocoder = new google.maps.Geocoder();


    infoWindow = new google.maps.InfoWindow;

    function codeAddress(zipCode) {
      geocoder.geocode({ 'address': zipCode }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //Got result, center the map and put it out there
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: zip.results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }

    codeAddress(zip);


    // Styles a map in night mode.
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#00162f' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#00695c' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#00897b' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#01040d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    });

    //not sure if we actually want this to be a functinoality yet
    //   // HTML5 geolocation. Finds users exact location
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };

    //         marker.setIcon(image.url)

    //         // infoWindow.setPosition(pos);
    //         // infoWindow.setContent('Location found.');
    //         // infoWindow.open(map);
    //         map.setCenter(pos);
    //     }, function() {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //     });
    // } else {
    //     // If Browser doesn't support Geolocation, this will allow an error window to prompt
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }

    for (var i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
    }
    //for loop for generating markers array into markers on the map- this isn't working yet.
    //loops through markers array
    for (var i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
    }

    function addMarker(props) {
      // Adds a marker
      var marker = new google.maps.Marker({

        position: props.coords,
        map: map,
      });
      //checks for custom icon
      if (props.iconImage) {
        //set icon image
        marker.setIcon(props.iconImage)
      }

      //checks content of info window
      if (props.content) {
        var infoWindow = new google.maps.InfoWindow({
          //info window text
          content: props.content
        })
        //click on marker for infowindow to display
        marker.addListener('click', function () {
          infoWindow.open(map, marker);
        })
      }
    }

    // var marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    //   title: 'Hello World!'
    // });
  };





});
