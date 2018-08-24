This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# Neighborhood Map
FEND final project!

Neighborhood Map is an app that lets you find the best cafes in Wroclaw, Poland.
Here you can see their location on the map, search for particular ones and check their exact adress!

## How to run?
- clone or download the repository
- go to command line
- change directory to the downloaded project directory
- `npm install`
- `npm start`

## Attribution
#### Google Maps API:
You're supposed to add your own Google Maps API key here (MapContainer.js, line 35):\
`componentDidMount(){`\
`   loadScript("https://maps.googleapis.com/maps/api/js?key=YOURAPIKEY&v=3&callback=initMap")`\
`   window.initMap = this.initMap`\
`}`
  
#### Foursquare API:
The data (address) of a cafe displayed in a marker's infowindow are fetched from Foursquare

#### Offline
By default, the create-react-app includes a service worker in the production build.
In order to do that, run:
- `npm run build`
For more info check:
- https://reactjs.org/docs/optimizing-performance.html
- https://react-server.io/docs/guides/production

## Dependencies
- axios: https://www.npmjs.com/package/axios
- react: https://www.npmjs.com/package/react
- react-dom: https://www.npmjs.com/package/react-dom
- prop-types: https://www.npmjs.com/package/prop-types
- escape-string-regexp: https://www.npmjs.com/package/escape-string-regexp
