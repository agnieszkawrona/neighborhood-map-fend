import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SidePanel from './SidePanel.js'
import escapeRegExp from 'escape-string-regexp'
import axios from 'axios'

//source: https://github.com/elharony/Udacity-P8-Neighborhood-Map-Project-Explained/blob/master/src/App.js
//creates a script element that allows using a Google Maps API key
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

class MapContainer extends Component {

  state = {
    query: '',
    locations: [
      { name: "Central Cafe", location: { lat: 51.1088921, lng: 17.0259869 }, locForFs: "51.1088921,17.0259869" },
      { name: "Cafe Borowka", location: { lat: 51.10470549999999, lng: 17.0313717 }, locForFs: "51.10470549999999,17.0313717" },
      { name: "Bema Cafe", location: { lat: 51.1180279, lng: 17.0401954 }, locForFs: "51.1180279,17.0401954" },
      { name: "Vinyl Cafe", location: { lat: 51.1117183, lng: 17.0326335 }, locForFs: "51.1117183,17.0326335" },
      { name: "Cafe Rozrusznik", location: { lat: 51.1167135, lng: 17.031193 }, locForFs: "51.1167135,17.031193" },
    ],
    markers: [],
    filteredPlaces: [],
  }

  componentDidMount() {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBvRX8bGhgEL2wjzo15bHKO_mpRp3z2L3c&v=3&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const { locations, markers } = this.state
    const { google } = this.props
    this.setState({ filteredPlaces: locations })
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { "lat": 51.1078852, "lng": 17.0385376 },
      zoom: 14
    })

    var infoWindow = new window.google.maps.InfoWindow()

    this.state.locations.forEach((location, i) => {
      //make new marker
      var marker = new window.google.maps.Marker({
        position: this.state.locations[i].location,
        map: map,
        title: this.state.locations[i].name,
        animation: window.google.maps.Animation.DROP
      })

      //taking coordinates from location;
      //they're differently formatted to work well with fetching data from Foursquare
      const stringCoord = this.state.locations[i].locForFs

      //based on lat and lng of a cafe, fetch it's address from FourSquare and put in cafe's info window
      axios.get(`https://api.foursquare.com/v2/venues/search?ll=${stringCoord}&limit=1&client_id=SU0CUUABMIBUIYGLXV30NT1KITT51TWKKLPXRYKG3PZGUAQX&client_secret=4USL5J5MTCAQLC2MGHNE0TGEZB32LFG0ZJYUQRUNWVVQMGXP&v=20180822`).then(response => {
        var locationInfo =
          '<div class="info-window">' +
          '<h1 class="info-window-heading">' + response.data.response.venues[0].name + '</h1>' +
          '<div class="info-window-content">' +
          '<p>' + response.data.response.venues[0].name + '</p>' +
          '<p>' + response.data.response.venues[0].location.formattedAddress + '</p>' +
          '<p class="foursquare-attribution">Fetched from Foursquare</p>' +
          '</div>' +
          '</div>';

        markers.push(marker);

        marker.addListener('click', function () {
          infoWindow.setContent(locationInfo)
          //opens infoWIndow after clicking on marker
          infoWindow.open(map, marker)
          //bouncing marker when clicked on
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            //stops the bouncing after 2 bounces
            setTimeout(function () {
              marker.setAnimation(null)
              infoWindow.close()
            }, 800)
          }
        })
      }).catch()
    })
  }

  //filters the search results: both listview and markers
  filterLocations = (query) => {
    const { locations, markers } = this.state
    this.setState({ query })
    if (query) {
      markers.forEach((marker) => {
        marker.setVisible(false)
      })
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState({
        filteredPlaces: locations.filter((loc) => match.test(loc.name)),
        searchedMarkers: markers.filter((marker) => match.test(marker.title))
          .forEach((marker) => marker.setVisible(true))
      })
    } else {
      if (markers) {
        markers.forEach((marker) => {
          marker.setVisible(true)
        })
      }
      this.setState({ filteredPlaces: locations })
    }
  }

  render() {
    return (
      <div className="MapContainer">
        <SidePanel
          query={this.state.query}
          searchedMarkers={this.state.searchedMarkers}
          filteredPlaces={this.state.filteredPlaces}
          markers={this.state.markers}
          location={this.state.locations}
          searched={this.filterLocations.bind(this)}
        />
        <div id="map" aria-label="map"></div>
      </div>
    )
  }
}

export default MapContainer
