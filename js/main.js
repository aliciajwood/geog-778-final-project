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
        basemap: "arcgis/light-gray"
    });

    const view = new MapView({
        map: map,
        center: [-100.1458467, 40.0006606],
        zoom: 3,
        container: "viewDiv"
    });
    view.ui.components = [ "attribution" ];

    
    //symbology renderers
    //FOR NOW DON'T NEED BUT IF DOING ANY SYMBOLOGY SWITCHING FROM DEFAULTS ADD HERE LATER
    
    
    //popup templates
    const prisonRatePopupTemplate = {
        title: "Prison Incarceration Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"CUSTODY_MORE_1_YEAR",
                label:"Prisoners Sentenced to more than 1 Year",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"CUSTODY_LESS_1_YEAR",
                label:"Prisoners Sentenced to less than 1 Year",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"CUSTODY_UNSENTENCED",
                label:"Prisoners yet to be Sentenced",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_CUSTODY_M",
                label:"Total Male Prisoners",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_CUSTODY_F",
                label:"Total Female Prisoners",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_CUSTODY",
                label:"Total Prisoners",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_CUSTODY_RATE",
                label:"Total Prisoners Rate (per 100,000 people)",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"WHITE_POP_2022",
                label:"White",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"BLACK_POP_2022",
                label:"Black",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"HISP_POP_2022",
                label:"Hispanic",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"AIAN_POP_2022",
                label:"American Indian or Alaska Native",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ASIAN_POP_2022",
                label:"Asian",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"NHPI_POP_2022",
                label:"Hawaiian or Other Pacific Islander",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TWO_RACE_POP_2022",
                label:"Two or More Races",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ADD_RACE_POP_2022",
                label:"Additional Races",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"UNK_RACE_POP_2022",
                label:"Unknown Race",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOT_RACE_POP_2022",
                label:"Total Population for Race Calculations",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: [
            {
                type:"text",
                text: "<b>{TOTAL_CUSTODY}</b> prisoners were held within state and federal prisons in the state of <b>{STATE_NAME}</b> in the year <b>2022</b>."
            },
            {
                type: "media",
                title:"Percentage of Prisoners by Race and Ethnicity in {STATE_NAME} ",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['WHITE_POP_2022', 'BLACK_POP_2022', 'HISP_POP_2022', 'AIAN_POP_2022', 'ASIAN_POP_2022', 'NHPI_POP_2022', 'TWO_RACE_POP_2022', 'ADD_RACE_POP_2022', 'UNK_RACE_POP_2022'], 
                            normalizeField: "TOT_RACE_POP_2022"
                        }
                    }
                ]
            }
        ]
    };
    
    const capitalSentencePopupTemplate = {
        title: "Capital Punishment (Sentencing) in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"DEATH_SENT_TOTAL_2000",
                label:"Prisoners Under Death Sentence in 2000",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2001",
                label:"Prisoners Under Death Sentence in 2001",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2002",
                label:"Prisoners Under Death Sentence in 2002",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2003",
                label:"Prisoners Under Death Sentence in 2003",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2004",
                label:"Prisoners Under Death Sentence in 2004",
                visible:"false"
            }, 
            {
                fieldName:"DEATH_SENT_TOTAL_2005",
                label:"Prisoners Under Death Sentence in 2005",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2006",
                label:"Prisoners Under Death Sentence in 2006",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2007",
                label:"Prisoners Under Death Sentence in 2007",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2008",
                label:"Prisoners Under Death Sentence in 2008",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2009",
                label:"Prisoners Under Death Sentence in 2009",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2010",
                label:"Prisoners Under Death Sentence in 2010",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2011",
                label:"Prisoners Under Death Sentence in 2011",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2012",
                label:"Prisoners Under Death Sentence in 2012",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2013",
                label:"Prisoners Under Death Sentence in 2013",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2014",
                label:"Prisoners Under Death Sentence in 2014",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2015",
                label:"Prisoners Under Death Sentence in 2015",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2016",
                label:"Prisoners Under Death Sentence in 2016",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2017",
                label:"Prisoners Under Death Sentence in 2017",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2018",
                label:"Prisoners Under Death Sentence in 2018",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2019",
                label:"Prisoners Under Death Sentence in 2019",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2020",
                label:"Prisoners Under Death Sentence in 2020",
                visible:"false"
            },
            {
                fieldName:"DEATH_SENT_TOTAL_2021",
                label:"Prisoners Under Death Sentence in 2021",
                visible:"false"
            }
        ],
        content: [
            {
                type:"text",
                text: "<b>{DEATH_SENT_TOTAL_2021}</b> prisoners were currently held under the death sentence in the state of <b>{STATE_NAME}</b> in the year <b>2021</b>."
            }, 
            {
                type: "media",
                title:"Prisoners in {STATE_NAME} with a Death Sentence 2000 - 2021",
                mediaInfos: [
                    {
                        type: "line-chart", 
                        value: {
                            fields:['DEATH_SENT_TOTAL_2000', 'DEATH_SENT_TOTAL_2001', 'DEATH_SENT_TOTAL_2002', 'DEATH_SENT_TOTAL_2003', 'DEATH_SENT_TOTAL_2004', 'DEATH_SENT_TOTAL_2005', 'DEATH_SENT_TOTAL_2006', 'DEATH_SENT_TOTAL_2007', 'DEATH_SENT_TOTAL_2008', 'DEATH_SENT_TOTAL_2009', 'DEATH_SENT_TOTAL_2010', 'DEATH_SENT_TOTAL_2011', 'DEATH_SENT_TOTAL_2012', 'DEATH_SENT_TOTAL_2013', 'DEATH_SENT_TOTAL_2014', 'DEATH_SENT_TOTAL_2015', 'DEATH_SENT_TOTAL_2016', 'DEATH_SENT_TOTAL_2017', 'DEATH_SENT_TOTAL_2018', 'DEATH_SENT_TOTAL_2019', 'DEATH_SENT_TOTAL_2020', 'DEATH_SENT_TOTAL_2021']
                        }
                    }
                ]
            }
        ]
    };
   
    

    //add feature layers
    const incarcerationRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Prison_Incarceration_Rates/FeatureServer/0",
        title:"Incarceration Rates", 
        popupTemplate: prisonRatePopupTemplate,
        visible: true
    });
    // only adding this layer to begin with. the rest are controlled with the toggle variables function later
    map.add(incarcerationRateLayer);
    
    const DemographicsRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Prison_Demographic_Rates/FeatureServer/0",
        title:"Demographics", 
        visible: false
    });
    
    const YouthRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Youth_Incarceration_Rates/FeatureServer/0",
        title:"Youth Incarceration Rates", 
        visible: true
    });
    
    const FelonyLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Felony_Disenfranchisement_Rates/FeatureServer/0",
        title:"Felony Disenfranchisement Rates", 
        visible: true
    });
    
    const CPSentencedLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Capital_Punishment_Sentenced_Rates/FeatureServer/0",
        title:"Capital Punishment Sentencing Rates", 
        visible: true,
        popupTemplate:capitalSentencePopupTemplate
    });
    
    const CPExecutedLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Capital_Punishment_Execution_Rates/FeatureServer/0",
        title:"Capital Punishment Execution Rates", 
        visible: true
    });
    
    const PrisonMortalityLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Prison_Mortality_Rates/FeatureServer/0",
        title:"Prison Mortality Rates", 
        visible: true
    });
    
    const JailMortalityLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Jail_Mortality_Rates/FeatureServer/0",
        title:"Jail Mortality Rates", 
        visible: true
    });
    
    
    
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

    
    // ADD ZOOM BUTTONS
    
    let zoom = new Zoom({
        view: view
    });
    view.ui.add(zoom, "bottom-right");
    
    
    // LAYER TOGGLING
    const IncarcerationRateButton = document.getElementById("IncarcerationRateButton");
    IncarcerationRateButton.addEventListener("click", turnOnIncRates);
    function turnOnIncRates(event) {
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(incarcerationRateLayer);
        
    }
    
    const YouthRateButton = document.getElementById("YouthRateButton");
    YouthRateButton.addEventListener("click", turnOnYouthRates);
    function turnOnYouthRates(event) {
        map.remove(incarcerationRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(YouthRateLayer);
    }
    
    const felonyRateButton = document.getElementById("FelonyRateButton");
    felonyRateButton.addEventListener("click", turnOnFelonyRates);
    function turnOnFelonyRates(event) {
        map.remove(incarcerationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(FelonyLayer);
    }
    
    const CaptialSentencedButton = document.getElementById("CaptialSentencedButton");
    CaptialSentencedButton.addEventListener("click", turnOnCPSentRates);
    function turnOnCPSentRates(event) {
        map.remove(incarcerationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(CPSentencedLayer);
    }
    
    const CapitalExecutedButton = document.getElementById("CapitalExecutedButton");
    CapitalExecutedButton.addEventListener("click", turnOnCPExeRates);
    function turnOnCPExeRates(event) {
        map.remove(incarcerationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(CPExecutedLayer);
    }
    
    const PrisonMortalityButton = document.getElementById("PrisonMortalityButton");
    PrisonMortalityButton.addEventListener("click", turnOnPrisonMortRates);
    function turnOnPrisonMortRates(event) {
        map.remove(incarcerationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(JailMortalityLayer);
        map.add(PrisonMortalityLayer);
    }
    
    const JailMortalityButton = document.getElementById("JailMortalityButton");
    JailMortalityButton.addEventListener("click", turnOnJailMortRates);
    function turnOnJailMortRates(event) {
        map.remove(incarcerationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.add(JailMortalityLayer);
    }
    
    
});