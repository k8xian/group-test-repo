# Get Happy (Hour)
**Collaborators:** 
[Kate Christian](https://github.com/k8xian) - 
[John Cirone](https://github.com/Ciwonie) - 
[Eric Eissler](https://github.com/eeissler83) - 
[Chris Milan](https://github.com/cmilan81)

**Deployment Link:** https://k8xian.github.io/Project1/

**For** Northwestern University's Full Stack Flex Coding Bootcamp

*This web-app will help you find Happy Hours based on your zipcode and desired search radius*


##

### Interface / Development
* User inputs zipcode and desired search radius
* eventful API returns events that contain the term "happy hour" that meet that query
* Data populates in a scrollable list on the next view with a link to a map containing directions
* Venues are populated on a map with custom markers
* Special info blocks render on-click showing the description of the venue with a link to the map
* Design is Mobile-First with a dark scheme for on-the-go use in the evening
* The embedded map customized to match the aesthetic of the rest of the web-app
* **Note:** that the API calls take a few seconds, and the map will then re-render with the markers

##

### Challenges
* Populating markers in embedded Google map by passing in JSON data
* Not being able to access Twitter because browser access is prohibited by the API
* Google Maps APIs is a massive system with complicated protocols and expensive pricing 
* Issues relating to timing of  user input and asynchronous Google map rendering
* Adjusting scroll bars rendering on PC views to maintain functionality & design scheme

##

### Upcoming Features
* Data populated from Twitter API, using Node.js
* Filters by price, food, type of beverage, and custom values
    * This page is partially developed, but the eventful API doesn't contain enough data to make this useful
* Users will be able to verify a happy hour
* Businesses will be able to directly add a happy hour
* A detailed screen for each venue with a preview of related posts

##

### Known Bugs
* Note that the API calls take a few seconds, and the map will re-render with the markers
* There will be a geocode error and the map won't center after a while, this is because there is a limit on the number of calls allowed becuase the Geocode API costs money
* Distance calculation is close, but not quite working, and will to submit this until after the demonstration. 

