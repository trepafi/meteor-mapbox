# Mapbox for Meteor

## Information
* Meteor version: 1.0
* Mapbox version: 2.1.4
* [Supported plugins](https://www.mapbox.com/mapbox.js/plugins/)

## Installation
````
cd /path/to/your/meteor/project
meteor add trepafi:mapbox
````

## Usage
You don't need to do anything just use directly MapBoxJS
````
<div id='map'></div>
````


````
L.mapbox.accessToken = '<your access token here>';
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
			.setView([40, -74.50], 9);
````

## Explanation
* All the files are previously loaded so you can use Mapbox directly


## Author
Made with &#9829; in Marbella for [Lubert Palacios](es.linkedin.com/in/lubertpalacios/en)
