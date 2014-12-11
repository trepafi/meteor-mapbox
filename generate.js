var path = require("path");
var url = require("url");
var pluginsSource = {
    directions: [
        { src: 'mapbox-directions.js/v0.0.1/mapbox.directions.js', type: 'js' },
        { src: 'mapbox-directions.js/v0.0.1/mapbox.directions.css', type: 'css' }
    ],

    zoomslider: [
        { src: 'leaflet-zoomslider/v0.7.0/L.Control.Zoomslider.js', type: 'js' },
        { src: 'leaflet-zoomslider/v0.7.0/L.Control.Zoomslider.css', type: 'css' }
    ],

    pip: [
        { src: 'leaflet-pip/v0.0.2/leaflet-pip.js', type: 'js' }
    ],

    osm: [
        { src: 'leaflet-osm/v0.1.0/leaflet-osm.js', type: 'js' }
    ],

    omnivore: [
        { src: 'leaflet-omnivore/v0.2.0/leaflet-omnivore.min.js', type: 'js' }
    ],

    minimap: [
        { src: 'leaflet-minimap/v1.0.0/Control.MiniMap.js', type: 'js' },
        { src: 'leaflet-minimap/v1.0.0/Control.MiniMap.css', type: 'css' }
    ],

    markercluster: [
        { src: 'leaflet-markercluster/v0.4.0/leaflet.markercluster.js', type: 'js' },
        { src: 'leaflet-markercluster/v0.4.0/MarkerCluster.css', type: 'css' },
        { src: 'leaflet-markercluster/v0.4.0/MarkerCluster.Default.css', type: 'css' }
    ],

    // FIXME: Doesn't support IE<9
    // https://www.mapbox.com/mapbox.js/example/v1.0.0/leaflet-locatecontrol/
    locate: [
        { src: 'leaflet-locatecontrol/v0.24.0/L.Control.Locate.js', type: 'js' },
        { src: 'leaflet-locatecontrol/v0.24.0/L.Control.Locate.css', type: 'css' }
    ],

    label: [
        { src: 'leaflet-label/v0.2.1/leaflet.label.js', type: 'js' },
        { src: 'leaflet-label/v0.2.1/leaflet.label.css', type: 'css' }
    ],

    image: [
        { src: 'leaflet-image/v0.0.4/leaflet-image.js', type: 'js' }
    ],

    heat: [
        { src: 'leaflet-heat/v0.1.0/leaflet-heat.js', type: 'js' }
    ],

    hash: [
        { src: 'leaflet-hash/v0.2.1/leaflet-hash.js', type: 'js' }
    ],

    geodesy: [
        { src: 'leaflet-geodesy/v0.1.0/leaflet-geodesy.js', type: 'js' }
    ],

    fullscreen: [
        { src: 'leaflet-fullscreen/v0.0.3/Leaflet.fullscreen.min.js', type: 'js' },
        { src: 'leaflet-fullscreen/v0.0.3/leaflet.fullscreen.css', type: 'css' }
    ],

    draw: [
        { src: 'leaflet-draw/v0.2.2/leaflet.draw.js', type: 'js' },
        { src: 'leaflet-draw/v0.2.2/leaflet.draw.css', type: 'css' }
    ],

    geojsonExtend: [
        { src: 'geojson-extent/v0.0.1/geojson-extent.js', type: 'js' }
    ],

    geoViewport: [
        { src: 'geo-viewport/v0.1.1/geo-viewport.js', type: 'js' }
    ],

    arc: [
        { src: 'arc.js/v0.1.0/arc.js', type: 'js' }
    ]
};

// Defining Object
Mapbox = new LoadingMapbox();
Mapbox.load();

/*
 * MapBox Loading Class
 *
 */
function LoadingMapbox() {
    var isLoaded = false,
        queue = [];
        baseUrl = 'https://api.tiles.mapbox.com/mapbox.js/',
        core = [
            { src: 'v2.1.4/mapbox.js', type: 'js', core: true},
            { src: 'v2.1.4/mapbox.css', type: 'css', core: true}
        ];

    return {
        loaded: loaded,
        load: load
    }

    function loaded() {
        return isLoaded;
    }

    function addFile(file, isPlugin) {
        return {
            file: file.src,
            url: url.resolve(baseUrl + (isPlugin ? 'plugins/' : ''), file.src),
            bare: file.type === 'js'
        }
    }

    function load() {
        core.forEach(function(item) {
            queue.push(addFile(item));
        });

        for(var i in pluginsSource) {
            var pluginSrc = pluginsSource[i];
            pluginSrc.forEach(function(plugin) {
                queue.push(addFile(plugin, true));
            });
        }
    }
}
