Mapbox for Meteor 
=================

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
````
Mapbox.load(['minimap']);
var container;
var config = {
	containerId: 'map',
	token: MAPBOX_TOKEN,
	projectId: MAPBOX_PROJECT_ID
	defaults: {
		zoom: 9,
		// Arbitrary location for example purposes
		marbella: [ 36.5116478, -4.8874875,15 ]
	}
};

Tracker.autorun(function (computation) {
	if (Mapbox.loaded()) {
			L.mapbox.accessToken = config.token;
			container = L.mapbox.map(config.containerId, config.projectId);
			container.setView(config.defaults.marbella, config.defaults.zoom);
			computation.stop();
		}
	});
});
```

## Explanation
* The `Mapbox.load()` is a reactive method which waits for the Mapbox.js core and plugin files
* You can specify a list of plugins to load `['minimap', 'markercluster']`
* `Tracker.autorun` will be aware of the moment when everything is ready
* Then you can start with the Mapbox initialization
* Finally I've added `computation.stop()` to double check that Mapbox won't be initiated again. I've added this for teaching purposes
* 
