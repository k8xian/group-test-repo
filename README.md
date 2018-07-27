# Get Happy (Hour)
* For Northwestern University's Full Stack Flex Coding Bootcamp
* This web-app will help you find Happy Hours based on your zipcode and desired search radius

# Deployment link
* https://k8xian.github.io/Project1/

# Collaborators
* Kate Christian https://github.com/k8xian
* John Cirone https://github.com/Ciwonie
* Eric Eissler https://github.com/eeissler83
* Chris Milan https://github.com/cmilan81

# Interface / Development
* User inputs zipcode and desired search radius
* eventful API returns events that contain the term "happy hour" that meet that query
* Data populates in a scrollable list on the next view with a link to a map containing directions
* Venues are populated on a map with custom markers

# Challenges
* Populating markers in embedded Google map by passing in JSON data
* Not being able to access Twitter because browser access is prohibited by the API
* Google Maps APIs is a massive system with complicated protocols and expensive pricing 
* Issues relating to timing of  user input and asynchronous Google map rendering
* Adjusting scroll bars rendering on PC views to maintain functionality & design scheme


# Upcoming Features
* Data populated from Twitter API, using Node.js
* Filters by price, food, type of beverage, and custom values
    * This page is partially developed, but the eventful API doesn't contain enough data to make this useful
* Users will be able to verify a happy hour
* Businesses will be able to directly add a happy hour

# Known Bugs
* You may have to input your zip and radius twice for the app to work becuase of compcliations related to the Maps API
    * We had a fix for this, but it broke the rendering of the markers, we are currently working on this
