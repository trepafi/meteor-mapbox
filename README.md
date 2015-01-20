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
[Here][1] you can find more details regarding usage

[1]: https://github.com/trepafi/meteor-poc/blob/master/docs/mapbox.md


## Example
[This][2] is a mini-project to test MapBox integration with Meteor among other cool packages

[2]: https://github.com/trepafi/meteor-poc


## Explanation
* All the files are previously loaded so you can use Mapbox directly


## Author
Made with &#9829; in Marbella for [Lubert Palacios](es.linkedin.com/in/lubertpalacios/en)
