import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class SidePanel extends Component {

  // function that activates the location marker, which name is passed
  activateLocation (locationName) {
    const { markers } = this.props
    markers.forEach(function (marker) {
      marker.title === locationName ? window.google.maps.event.trigger(marker, 'click') : ''
    })
  }

  render() {
    const { query, searched, filteredPlaces } = this.props
    return (
      <div className="SidePanel" aria-label="sidebar">
        <div className="side-title" aria-label="Best Cafes in Wroclaw">Best Cafes in Wroclaw</div>
        <div className="SearchBox" aria-label="searchbox">
          <input
            type="text"
            placeholder="Search cafes..."
            value={query}
            aria-label="Search cafes"
            role="search"
            onChange={(event) => searched(event.target.value)}
          />
        </div>
        <div className="ListView" aria-label="list of cafes">
        <ul>
          {filteredPlaces.map((location, index) => (
            <li key={index}><button onClick={(event) => this.activateLocation(location.name)} aria-label="cafe button">{location.name}</button></li>
          ))}
        </ul>
      </div>
      </div>
    )
  }
}

export default SidePanel
