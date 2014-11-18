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


/*
 * MapBox Loading Class
 *
 */
function LoadingMapbox() {
    var 
        tracker = new Tracker.Dependency,
        head = document.getElementsByTagName('head')[0],
        baseUrl = 'https://api.tiles.mapbox.com/mapbox.js/',
        sources = {
            mapboxJS: { src: 'v2.1.4/mapbox.js', type: 'js', core: true },
            mapboxCSS: { src: 'v2.1.4/mapbox.css', type: 'css', core: true },
            plugins: pluginsSource
        },
        isLoaded = false;

    var jsQueue = [];
    var cssQueue = [ sources.mapboxCSS ];

    return {
        loaded: loaded,
        load: load
    }

    function loaded() {
        tracker.depend();
        return isLoaded;
    }

    function load() {
        _.each(_.values(arguments), function(plugin) {
            if(sources.plugins[plugin]) {
                // queue = _.union(queue, sources.plugins[plugin])
                jsQueue = _.union(cssQueue, _.where(sources.plugins[plugin], {type: 'js'}));
                cssQueue = _.union(cssQueue, _.where(sources.plugins[plugin], {type: 'css'}));
            }
        });

        loadFiles(cssQueue);
        loadFile(sources.mapboxJS, function() {
            loadFiles(jsQueue);
        });
    }

    function loadFiles(queue) {
        _.each(queue, function(file) {
            file.loading = true;
            loadFile(file, onFileLoaded);
        });
    }

    function loadFile(file, callback) {
        var elem, url = baseUrl + (!file.core ? 'plugins/' : '') + file.src;
        switch(file.type) {
            case 'js':
                elem = document.createElement('script');
                elem.type = 'text/javascript';
                elem.src = url;
                elem.defer = true;
                break;
            case 'css':
                elem = document.createElement('link');
                elem.rel = 'stylesheet';
                elem.href = url;
                break;
        }

        head.appendChild(elem);

        elem.addEventListener('load', function() {
            // console.log('>>> file loaded', url);
            file.loading = false;
            callback();
        }, false);
    }

    function onFileLoaded() {
        // console.log('>>> loaded ', url);
        if( _.size(_.compact(_.pluck(_.union(cssQueue, jsQueue), 'loading'))) === 0 ) {
            isLoaded = true;
            tracker.changed();
        }
        
    }
}






