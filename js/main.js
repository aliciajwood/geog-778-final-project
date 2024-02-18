$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    
});

require(["esri/config", 
         "esri/Map", 
         "esri/views/MapView", 
         "esri/layers/FeatureLayer",
         "esri/widgets/Search",
         "esri/widgets/LayerList",
         "esri/widgets/Legend",
         "esri/widgets/Popup",
         "esri/widgets/Expand",
         "esri/widgets/Zoom",
         "esri/widgets/Editor",
         "esri/form/elements/FieldElement"
        ], function(esriConfig, Map, MapView, FeatureLayer, Search, LayerList, Legend, Popup, Expand, Zoom, Editor, FieldElement) {

    esriConfig.apiKey = "AAPK055be895e75b4ec9af472f62ac3e01e71PKf7aMZmG7KFFEYjwo8Nq4oP5tdvIqZj16gjjJZCJLvLd7JEWzhRSE1hi1Cv9_r";

    const map = new Map({
        //basemap: "osm/light-gray"
        //basemap: "arcgis/newspaper" //like this one but labels are beneath polygons added
        //basemap: "arcgis/human-geography"
        //basemap: "arcgis/light-gray/base"
        //basemap: "arcgis/terrain"
        basemap: "arcgis/light-gray"
        //basemap: "arcgis/topographic"
        //basemap: "gray-vector" // basemap styles service
    });

    const view = new MapView({
        map: map,
        center: [-100.1458467, 40.0006606], // Longitude, latitude
        zoom: 3, // Zoom level
        container: "viewDiv" // Div element
    });
    view.ui.components = [ "attribution" ];

    
    //symbology renderers
    
    
    
    //popup templates
    
    

    //add feature layers
    const stateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/State_Incarceration_Rates/FeatureServer/0",
        title:"Incarceration Rates"
    });
    map.add(stateLayer);
    
    
    // ADD SEARCH WIDGET
    const search = new Search({
        view: view,
        allPlaceholder: "Search address or place",
        includeDefaultSources: false,
        sources: [
            {
                name: "ArcGIS World Geocoding Service",
                placeholder: "Search address",
                apiKey: "AAPK055be895e75b4ec9af472f62ac3e01e71PKf7aMZmG7KFFEYjwo8Nq4oP5tdvIqZj16gjjJZCJLvLd7JEWzhRSE1hi1Cv9_r",
                singleLineFieldName: "SingleLine",
                url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
            }
        ]
    });
    const searchExpand = new Expand({
        view: view,
        content:search
    });
    view.ui.add(searchExpand, "top-right");
    
    
    // ADD LEGEND WIDGET
    
    let legend = new Legend({
        view: view,
        layerInfos: [
            //FILL OUT
        ]
    });
    const legendExpand = new Expand({
        view: view,
        content:legend
    });
    view.ui.add(legendExpand, "top-right");
    

    // ADD LAYER LIST WIDGET
    //DON'T THINK I WANT LAYER LIST WIDGET SINCE THE USER WILL BE CONTROLLING THE VARIABLE SELECTED IN THE SIDEBAR?????
    /*
    view.when(() => {
        const layerList = new LayerList({
            view: view
        });
        const lyrlistExpand = new Expand({
            view: view,
            content: layerList
        });
        // Add widget to the top right corner of the view
        view.ui.add(lyrlistExpand, "top-right");
    });
    */

    
    // ADD ZOOM BUTTONS
    
    let zoom = new Zoom({
        view: view
    });
    view.ui.add(zoom, "bottom-right");
    
});