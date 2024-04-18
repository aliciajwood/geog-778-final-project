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
         "esri/form/elements/FieldElement",
         "esri/widgets/Print", 
         "esri/WebMap",
         "esri/Color",
         "esri/popup/content/TextContent",
         "esri/popup/content/MediaContent",
        ], function(esriConfig, Map, MapView, FeatureLayer, Search, LayerList, Legend, Popup, Expand, Zoom, Editor, FieldElement, Print, WebMap, Color, TextContent, MediaContent) {

    esriConfig.apiKey = "AAPK055be895e75b4ec9af472f62ac3e01e71PKf7aMZmG7KFFEYjwo8Nq4oP5tdvIqZj16gjjJZCJLvLd7JEWzhRSE1hi1Cv9_r";

    const map = new Map({
        //basemap: "arcgis/light-gray"
        basemap: "osm/light-gray"
    });

    const view = new MapView({
        map: map,
        center: [-100.1458467, 40.0006606],
        zoom: 3,
        container: "viewDiv"
    });
    view.ui.components = [ "attribution" ];

    
    
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
                label:"Male",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_CUSTODY_F",
                label:"Female",
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
                label:"Native Hawaiian or Other Pacific Islander",
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
            },
            {
                fieldName:"PRISON_POP_1980",
                label:"1980",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1981",
                label:"1981",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1982",
                label:"1982",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1983",
                label:"1983",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1984",
                label:"1984",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1985",
                label:"1985",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1986",
                label:"1986",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1987",
                label:"1987",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1988",
                label:"1988",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1989",
                label:"1989",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1990",
                label:"1990",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1991",
                label:"1991",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1992",
                label:"1992",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1993",
                label:"1993",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1994",
                label:"1994",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1995",
                label:"1995",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1996",
                label:"1996",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1997",
                label:"1997",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1998",
                label:"1998",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_1999",
                label:"1999",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2000",
                label:"2000",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2001",
                label:"2001",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2002",
                label:"2002",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2003",
                label:"2003",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2004",
                label:"2004",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2005",
                label:"2005",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2006",
                label:"2006",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2007",
                label:"2007",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2008",
                label:"2008",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2009",
                label:"2009",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2010",
                label:"2010",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2011",
                label:"2011",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2012",
                label:"2012",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2013",
                label:"2013",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2014",
                label:"2014",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2015",
                label:"2015",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2016",
                label:"2016",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2017",
                label:"2017",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2018",
                label:"2018",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2019",
                label:"2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_POP_2020",
                label:"2020",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"US_CIT_PRISON_POP_2022",
                label:"U.S. Citizens",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"NON_US_CIT_PRISON_POP_2022",
                label:"Non-U.S. Citizens",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: [
            {
                type:"text",
                text: "<b>{TOTAL_CUSTODY}</b> prisoners were held within state and federal prisons in <b>{STATE_NAME}</b> in the year <b>2022</b>."
            },
            {
                type: "media",
                title:"Prison Populations over Time:",
                mediaInfos: [
                    {
                        type: "line-chart", 
                        value: {
                            fields:['PRISON_POP_1980', 'PRISON_POP_1981', 'PRISON_POP_1982', 'PRISON_POP_1983', 'PRISON_POP_1984', 'PRISON_POP_1985', 'PRISON_POP_1986', 'PRISON_POP_1987', 'PRISON_POP_1988', 'PRISON_POP_1989', 'PRISON_POP_1990', 'PRISON_POP_1991', 'PRISON_POP_1992', 'PRISON_POP_1993', 'PRISON_POP_1994', 'PRISON_POP_1995', 'PRISON_POP_1996', 'PRISON_POP_1997', 'PRISON_POP_1998', 'PRISON_POP_1999', 'PRISON_POP_2000', 'PRISON_POP_2001', 'PRISON_POP_2002', 'PRISON_POP_2003', 'PRISON_POP_2004', 'PRISON_POP_2005', 'PRISON_POP_2006', 'PRISON_POP_2007', 'PRISON_POP_2008', 'PRISON_POP_2009', 'PRISON_POP_2010', 'PRISON_POP_2011', 'PRISON_POP_2012', 'PRISON_POP_2013', 'PRISON_POP_2014', 'PRISON_POP_2015', 'PRISON_POP_2016', 'PRISON_POP_2017', 'PRISON_POP_2018', 'PRISON_POP_2019', 'PRISON_POP_2020'],
                            colors: [new Color("#fa7e1e")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title: "Race and Ethnicity:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['WHITE_POP_2022', 'BLACK_POP_2022', 'HISP_POP_2022', 'AIAN_POP_2022', 'ASIAN_POP_2022', 'NHPI_POP_2022', 'TWO_RACE_POP_2022', 'ADD_RACE_POP_2022', 'UNK_RACE_POP_2022'], 
                            normalizeField: "TOT_RACE_POP_2022",
                            colors: [new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"), new Color("#b3cde0"), new Color("#b39eb5"), new Color("#6497b1"), new Color("#f0f7da"), new Color("#ffbf00"), new Color("#ffcb85")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Gender:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['TOTAL_CUSTODY_M', 'TOTAL_CUSTODY_F'],
                            normalizeField: "TOTAL_CUSTODY",
                            colors: [new Color("#ffdc73"), new Color("#fa7e1e")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Citizenship Status:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['US_CIT_PRISON_POP_2022', 'NON_US_CIT_PRISON_POP_2022'],
                            normalizeField: "TOTAL_CUSTODY",
                            colors: [new Color("#77ab59"), new Color("#ffdc73"), new Color("#b3cde0")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Length of Sentence:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['CUSTODY_MORE_1_YEAR', 'CUSTODY_LESS_1_YEAR','CUSTODY_UNSENTENCED'],
                            normalizeField: "TOTAL_CUSTODY",
                            colors: [new Color("#fa7e1e"), new Color("#ffdc73")]
                        }
                    }
                ]
            }
        ]
    };
    
    const jailRatePopupTemplate = {
        title: "Jail Incarceration Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"TOTAL_JAIL_POP_2005",
                label:"Total Inmates in Custody 2005",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_JAIL_POP_2013",
                label:"Total Inmates in Custody in 2013",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_JAIL_POP_2019",
                label:"Total Inmates in Custody in 2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_JAIL_POP_RATE_2005",
                label:"Jail Incarceration Rate in 2005",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_JAIL_POP_RATE_2013",
                label:"Jail Incarceration Rate in 2013",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_JAIL_POP_RATE_2019",
                label:"Jail Incarceration Rate in 2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ADULT_JAIL_POP_2019",
                label:"Adult Inmates",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ADULT_M_JAIL_POP_2019",
                label:"Adult Male",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ADULT_F_JAIL_POP_2019",
                label:"Adult Female",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JUV_JAIL_POP_2019",
                label:"Juvenile Inmates",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JUV_M_JAIL_POP_2019",
                label:"Juvenile Male",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JUV_F_JAIL_POP_2019",
                label:"Juvenile Female",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ADULT_M_JAIL_POP_PCT_2019",
                label:"Male",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ADULT_F_JAIL_POP_PCT_2019",
                label:"Female",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"WHITE_JAIL_POP_PCT_2019",
                label:"White",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"BLACK_JAIL_POP_PCT_2019",
                label:"Black",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"HISP_JAIL_POP_PCT_2019",
                label:"Hispanic",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"AIAN_JAIL_POP_PCT_2019",
                label:"American Indian or Alaska Native",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ASIAN_JAIL_POP_PCT_2019",
                label:"Asian",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"NHPI_JAIL_POP_PCT_2019",
                label:"Native Hawaiian or Other Pacific Islander",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"MULTIRACE_JAIL_POP_PCT_2019",
                label:"Two or More Races",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"CONVICTED_JAIL_PCT_2019",
                label:"Convicted Inmates",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"UNCONVICTED_JAIL_PCT_2019",
                label:"Unconvicted Inmates",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MSO_FELONY_PCT_2019",
                label:"Felony Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MSO_MISD_PCT_2019",
                label:"Misdemeanor Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MSO_OTHER_PCT_2019",
                label:"Other Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"US_CIT_JAIL_PCT_2019",
                label:"U.S. Citizens",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"NON_US_CIT_JAIL_PCT_2019",
                label:"Non-U.S. Citizens",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"UNK_CIT_JAIL_PCT_2019",
                label:"Unknown Citizenship",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PCT_JAILS_OVER_CAPACITY_2013",
                label:"Percent Jails Over Capacity in 2013",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PCT_JAILS_OVER_CAPACITY_2019",
                label:"Percent Jails Over Capacity in 2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"POP_2019",
                label:"Total State Population in 2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: setJailContent
    };
    
    function setJailContent(feature){
        if (feature.graphic.attributes.TOTAL_JAIL_POP_2019 == null) {
            const textElement = new TextContent();
            textElement.text = "<b>{STATE_NAME}</b> has a combined prison & jail system, so all inmates reside in the prison system.";
            return [textElement];
        } else {
            const textElement1 = new TextContent();
            textElement1.text = "<b>{TOTAL_JAIL_POP_2019}</b> inmates were held in jails in <b>{STATE_NAME}</b> in the year <b>2019</b>.";
            const textElement2 = new TextContent();
            textElement2.text = "<b>{PCT_JAILS_OVER_CAPACITY_2019}%</b> of jails in <b>{STATE_NAME}</b> were over capacity in the year <b>2019</b>.";
            const mediaElement1 = new MediaContent({
                title:"Jail Populations over Time:",
                mediaInfos: [
                    {
                        type: "line-chart", 
                        value: {
                            fields:['TOTAL_JAIL_POP_2005', 'TOTAL_JAIL_POP_2013', 'TOTAL_JAIL_POP_2019'],
                            colors: [new Color("#fa7e1e")]
                        }
                    }
                ]
            });
            const mediaElement2 = new MediaContent({
                title:"Conviction Status:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['CONVICTED_JAIL_PCT_2019', 'UNCONVICTED_JAIL_PCT_2019'],
                            colors: [new Color("#b3cde0"), new Color("#ffdc73")]
                        }
                    }
                ]
            });
            const mediaElement3 = new MediaContent({
                title:"Offense:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['JAIL_MSO_FELONY_PCT_2019', 'JAIL_MSO_MISD_PCT_2019','JAIL_MSO_OTHER_PCT_2019'],
                            colors: [new Color("#77ab59"), new Color("#ffdc73"), new Color("#b3cde0")]
                        }
                    }
                ]
            });
            const mediaElement4 = new MediaContent({
                title:"Race and Ethnicity:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['WHITE_JAIL_POP_PCT_2019', 'BLACK_JAIL_POP_PCT_2019', 'HISP_JAIL_POP_PCT_2019', 'AIAN_JAIL_POP_PCT_2019', 'ASIAN_JAIL_POP_PCT_2019', 'NHPI_JAIL_POP_PCT_2019', 'MULTIRACE_JAIL_POP_PCT_2019'],
                            colors: [new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"),new Color("#b3cde0"), new Color("#b39eb5"), new Color("#6497b1"),new Color("#ffcb85")]
                        }
                    }
                ]
            });
            const mediaElement5 = new MediaContent({
                title:"Gender:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['ADULT_M_JAIL_POP_PCT_2019', 'ADULT_F_JAIL_POP_PCT_2019'],
                            colors: [new Color("#ffdc73"), new Color("#fa7e1e")]
                        }
                    }
                ]
            });
            const mediaElement6 = new MediaContent({
                title:"Citizenship Status:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['US_CIT_JAIL_PCT_2019', 'NON_US_CIT_JAIL_PCT_2019', 'UNK_CIT_JAIL_PCT_2019'],
                            colors: [new Color("#77ab59"), new Color("#ffdc73"), new Color("#b3cde0")]
                        }
                    }
                ]
            });
            return [textElement1, textElement2, mediaElement1, mediaElement2, mediaElement3, mediaElement4, mediaElement5, mediaElement6];
        };
    };
    
    const paroleRatePopupTemplate = {
        title: "Parole Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"PAROLE_POP_DEC_2018",
                label:"Total Parole Population in 2018",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_MALE_2018",
                label:"Male",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_FEMALE_2018",
                label:"Female",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_GEND_UNK_2018",
                label:"Unknown Gender",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_WHITE_2018",
                label:"White",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_BLACK_2018",
                label:"Black",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_HISP_2018",
                label:"Hispanic",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_AIAN_2018",
                label:"American Indian or Alaska Native",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_ASIAN_2018",
                label:"Asian",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_NHPI_2018",
                label:"Native Hawaiian or Other Pacific Islander",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_TWO_RACE_2018",
                label:"Two or More Races",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_ADD_RACE_2018",
                label:"Additional Races",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_POP_UNK_RACE_2018",
                label:"Unknown Race",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_SEX_OFFENSE_2018",
                label:"Sex Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_VIOLENT_OFFENSE_2018",
                label:"Other Violent Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_PROPERTY_OFFENSE_2018",
                label:"Property Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_DRUG_OFFENSE_2018",
                label:"Drug Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_WEAPON_OFFENSE_2018",
                label:"Weapon Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_OTHER_OFFENSE_2018",
                label:"Other Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_UNKNOWN_OFFENSE_2018",
                label:"Unknown Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"POP_2018",
                label:"Total State Population 2018",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PAROLE_RATE_2018",
                label:"Total Parole Rate (per 100,000 people)",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: [
            {
                type:"text",
                text: "<b>{PAROLE_POP_DEC_2018}</b> inmates were on parole in <b>{STATE_NAME}</b> in the year <b>2018</b>."
            },
            {
                type: "media",
                title:"Offense:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['PAROLE_SEX_OFFENSE_2018', 'PAROLE_VIOLENT_OFFENSE_2018','PAROLE_PROPERTY_OFFENSE_2018', 'PAROLE_DRUG_OFFENSE_2018', 'PAROLE_WEAPON_OFFENSE_2018', 'PAROLE_OTHER_OFFENSE_2018', 'PAROLE_UNKNOWN_OFFENSE_2018'],
                            normalizeField: "PAROLE_POP_DEC_2018",
                            colors: [new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"),new Color("#b3cde0"), new Color("#b39eb5"), new Color("#6497b1"),new Color("#ffcb85")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Race and Ethnicity:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['PAROLE_POP_WHITE_2018', 'PAROLE_POP_BLACK_2018', 'PAROLE_POP_HISP_2018', 'PAROLE_POP_AIAN_2018', 'PAROLE_POP_ASIAN_2018', 'PAROLE_POP_NHPI_2018', 'PAROLE_POP_TWO_RACE_2018', 'PAROLE_POP_ADD_RACE_2018', 'PAROLE_POP_UNK_RACE_2018'], 
                            normalizeField: "PAROLE_POP_DEC_2018",
                            colors: [new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"), new Color("#b3cde0"), new Color("#b39eb5"), new Color("#6497b1"), new Color("#f0f7da"), new Color("#ffbf00"), new Color("#ffcb85")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Gender:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['PAROLE_POP_MALE_2018', 'PAROLE_POP_FEMALE_2018', 'PAROLE_POP_GEND_UNK_2018'], 
                            normalizeField: "PAROLE_POP_DEC_2018",
                            colors: [new Color("#ffdc73"), new Color("#fa7e1e"), new Color("#77ab59")]
                        }
                    }
                ]
            }
        ]
    };
    
    const probationRatePopupTemplate = {
        title: "Probation Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"PROB_POP_DEC_2018",
                label:"Total Parole Population in 2018",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_MALE_2018",
                label:"Male",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_FEMALE_2018",
                label:"Female",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_GEND_UNK_2018",
                label:"Unknown Gender",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_WHITE_2018",
                label:"White",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_BLACK_2018",
                label:"Black",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_HISP_2018",
                label:"Hispanic",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_AIAN_2018",
                label:"American Indian or Alaska Native",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_ASIAN_2018",
                label:"Asian",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_NHPI_2018",
                label:"Native Hawaiian or Other Pacific Islander",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_TWO_RACE_2018",
                label:"Two or More Races",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_ADD_RACE_2018",
                label:"Additional Races",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_POP_UNK_RACE_2018",
                label:"Unknown Race",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_DMVIOL_OFFENSE_2018",
                label:"Domestic Violence Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_SEX_OFFENSE_2018",
                label:"Sex Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_OTHVIOL_OFFENSE_2018",
                label:"Other Violent Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_PROPERTY_OFFENSE_2018",
                label:"Property Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_DRUG_OFFENSE_2018",
                label:"Drug Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_DUI_OFFENSE_2018",
                label:"DUI Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_TRAFFIC_OFFENSE_2018",
                label:"Traffic Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_OTHER_OFFENSE_2018",
                label:"Other Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROB_UNKNOWN_OFFENSE_2018",
                label:"Unknown Offense",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"POP_2018",
                label:"Total State Population 2018",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PROBATION_RATE_2018",
                label:"Total Probation Rate (per 100,000 people)",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: [
            {
                type:"text",
                text: "<b>{PROB_POP_DEC_2018}</b> inmates were on probation in <b>{STATE_NAME}</b> in the year <b>2018</b>."
            },
            {
                type: "media",
                title:"Offense:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['PROB_DMVIOL_OFFENSE_2018', 'PROB_SEX_OFFENSE_2018','PROB_OTHVIOL_OFFENSE_2018', 'PROB_PROPERTY_OFFENSE_2018', 'PROB_DRUG_OFFENSE_2018', 'PROB_DUI_OFFENSE_2018', 'PROB_TRAFFIC_OFFENSE_2018', 'PROB_OTHER_OFFENSE_2018', 'PROB_UNKNOWN_OFFENSE_2018'],
                            normalizeField: "PROB_POP_DEC_2018",
                            colors: [new Color("#b39eb5"), new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"), new Color("#b3cde0"), new Color("#ffbf00"), new Color("#f0f7da"), new Color("#6497b1"), new Color("#ffcb85")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Race and Ethnicity",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['PROB_POP_WHITE_2018', 'PROB_POP_BLACK_2018', 'PROB_POP_HISP_2018', 'PROB_POP_AIAN_2018', 'PROB_POP_ASIAN_2018', 'PROB_POP_NHPI_2018', 'PROB_POP_TWO_RACE_2018', 'PROB_POP_ADD_RACE_2018', 'PROB_POP_UNK_RACE_2018'], 
                            normalizeField: "PROB_POP_DEC_2018",
                            colors: [new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"), new Color("#b3cde0"), new Color("#b39eb5"), new Color("#6497b1"), new Color("#f0f7da"), new Color("#ffbf00"), new Color("#ffcb85")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Gender:",
                mediaInfos: [
                    {
                        type: "pie-chart", 
                        value: {
                            fields:['PROB_POP_MALE_2018', 'PROB_POP_FEMALE_2018', 'PROB_POP_GEND_UNK_2018'], 
                            normalizeField: "PROB_POP_DEC_2018",
                            colors: [new Color("#ffdc73"), new Color("#fa7e1e"), new Color("#77ab59")]
                        }
                    }
                ]
            }
        ]
    };
    
    const youthIncarcerationRatePopupTemplate = {
        title: "Youth Incarceration Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"JUVENILE_LIFE_SENTENCE_POP",
                label:"Total Incarcerated Youth with Life Sentence",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"YOUTH_CUSTODY_POP_TOTAL",
                label:"Total Incarcerated Youth",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"YOUTH_CUSTODY_RATE_TOTAL",
                label:"Total Youth Incarceration Rate",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"YOUTH_CUSTODY_RATE_WHITE",
                label:"White Youth Incarceration Rate",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"YOUTH_CUSTODY_RATE_BLACK",
                label:"Black Youth Incarceration Rate",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"YOUTH_CUSTODY_RATE_LATINX",
                label:"Hispanic Youth Incarceration Rate",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"YOUTH_CUSTODY_RATE_NATIVE",
                label:"Native American Youth Incarceration Rate",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"YOUTH_CUSTODY_RATE_ASIAN",
                label:"Asian Youth Incarceration Rate",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: setYouthContent
    };
    
    function setYouthContent(feature){
        const textElement = new TextContent();
        textElement.text = "On average, <b>{YOUTH_CUSTODY_POP_TOTAL}</b> people under the age of 18 are held daily in juvenile justice facilities in <b>{STATE_NAME}</b>.";
        
        const mediaElement = new MediaContent({
            title:"Race and Ethnicity:",
            mediaInfos: [
                {
                    type: "bar-chart", 
                    value: {
                        fields:['YOUTH_CUSTODY_RATE_TOTAL', 'YOUTH_CUSTODY_RATE_WHITE', 'YOUTH_CUSTODY_RATE_BLACK', 'YOUTH_CUSTODY_RATE_LATINX', 'YOUTH_CUSTODY_RATE_NATIVE', 'YOUTH_CUSTODY_RATE_ASIAN'],
                        colors: [new Color("#6497b1"), new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"),new Color("#b3cde0"), new Color("#b39eb5")]
                    }
                }
            ]
        });
        
        if (feature.graphic.attributes.JUVENILE_LIFE_SENTENCE_POP == 1) {
            const textElement2 = new TextContent();
            textElement2.text = "<b>{JUVENILE_LIFE_SENTENCE_POP}</b> person is serving a life sentence without the possibility of parole for offenses committed prior to their 18th birthday.";
            return [textElement,textElement2,mediaElement];
        } else {
            const textElement2 = new TextContent();
            textElement2.text = "<b>{JUVENILE_LIFE_SENTENCE_POP}</b> people are serving a life sentence without the possibility of parole for offenses committed prior to their 18th birthday.";
            return [textElement, textElement2, mediaElement];
        };
    };
    
    const felonyDisRatePopupTemplate = {
        title: "Felony Disenfranchisment Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"FELONY_DISENFRAN_POP_ALL",
                label:"Total Population Disenfranchised",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"FELONY_DISENFRAN_PCT_ALL",
                label:"Percent of Total Voting Age Population Disenfranchised",
                visible:"false"
            },
            {
                fieldName:"FELONY_DISENFRAN_PCT_BLACK",
                label:"Percent of Black Voting Age Population Disenfranchised",
                visible:"false"
            },
            {
                fieldName:"FELONY_DISENFRAN_PCT_LATINX",
                label:"Percent of Latinx Voting Age Population Disenfranchised",
                visible:"false"
            }
            
        ],
        content: [
            {
                type:"text",
                text: "<b>{FELONY_DISENFRAN_PCT_ALL}%</b> of voting-age residents in <b>{STATE_NAME}</b> are disenfranchised due to a felony conviction."
            },
            {
                type: "media",
                title:"Race and Ethnicity:",
                mediaInfos: [
                    {
                        type: "bar-chart", 
                        value: {
                            fields:['FELONY_DISENFRAN_PCT_ALL', 'FELONY_DISENFRAN_PCT_BLACK', 'FELONY_DISENFRAN_PCT_LATINX'],
                            colors: [new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e")]
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
            },
            {
                fieldName:"YEAR_OF_ABOLISHMENT",
                label:"Year of Death Penalty Abolishment",
                visible:"false"
            }
        ],
        content: setCapitalSentencingContent
    };
    
    function setCapitalSentencingContent(feature){
        const textElement = new TextContent();
        if (feature.graphic.attributes.DEATH_SENT_TOTAL_2021 == 1) {
            console.log("state with 1 death row.");
            textElement.text = "<b>{DEATH_SENT_TOTAL_2021}</b> prisoner was held under the death sentence in <b>{STATE_NAME}</b> in the year <b>2021</b>.";
        } else {
            textElement.text = "<b>{DEATH_SENT_TOTAL_2021}</b> prisoners were held under the death sentence in <b>{STATE_NAME}</b> in the year <b>2021</b>.";
        };
        
        const mediaElement = new MediaContent({
            title:"Death Sentences 2000 - 2021:",
            mediaInfos: [
                {
                    type: "line-chart", 
                    value: {
                        fields:['DEATH_SENT_TOTAL_2000', 'DEATH_SENT_TOTAL_2001', 'DEATH_SENT_TOTAL_2002', 'DEATH_SENT_TOTAL_2003', 'DEATH_SENT_TOTAL_2004', 'DEATH_SENT_TOTAL_2005', 'DEATH_SENT_TOTAL_2006', 'DEATH_SENT_TOTAL_2007', 'DEATH_SENT_TOTAL_2008', 'DEATH_SENT_TOTAL_2009', 'DEATH_SENT_TOTAL_2010', 'DEATH_SENT_TOTAL_2011', 'DEATH_SENT_TOTAL_2012', 'DEATH_SENT_TOTAL_2013', 'DEATH_SENT_TOTAL_2014', 'DEATH_SENT_TOTAL_2015', 'DEATH_SENT_TOTAL_2016', 'DEATH_SENT_TOTAL_2017', 'DEATH_SENT_TOTAL_2018', 'DEATH_SENT_TOTAL_2019', 'DEATH_SENT_TOTAL_2020', 'DEATH_SENT_TOTAL_2021'],
                        colors: [new Color("#fa7e1e")]
                    }
                }
            ]
        });
        
        if (feature.graphic.attributes.YEAR_OF_ABOLISHMENT == null ) {
            if (['Arizona', 'California', 'Ohio', 'Oregon', 'Pennsylvania', 'Tennessee'].includes(feature.graphic.attributes.STATE_NAME)){
                const textElement2 = new TextContent();
                textElement2.text = "While the death penalty is still legal, there is currently a pause on executions due to an executive order.";
                return [textElement,textElement2,mediaElement];
            } else {
                return [textElement,mediaElement];
            };
        } else {
            const textElement3 = new TextContent();
            textElement3.text = "The death penalty was abolished in the year <b>{YEAR_OF_ABOLISHMENT}</b>.";
            return [textElement, textElement3, mediaElement];
        };
    };
    
    const capitalExecutionPopupTemplate = {
        title: "Capital Punishment (Execution) in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"TOTAL_EXECUTIONS_SINCE_1930",
                label:"Total Executions since 1930",
                visible:"false"
            },
            {
                fieldName:"TOTAL_EXECUTIONS_SINCE_1977",
                label:"Total Executions since 1977",
                visible:"false"
            },{
                fieldName:"EXECUTIONS_1977",
                label:"Prisoners Executed in 1977",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1978",
                label:"Prisoners Executed in 1978",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1979",
                label:"Prisoners Executed in 1979",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1980",
                label:"Prisoners Executed in 1980",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1981",
                label:"Prisoners Executed in 1981",
                visible:"false"
            }, 
            {
                fieldName:"EXECUTIONS_1982",
                label:"Prisoners Executed in 1982",
                visible:"false"
            }, 
            {
                fieldName:"EXECUTIONS_1983",
                label:"Prisoners Executed in 1983",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1984",
                label:"Prisoners Executed in 1984",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1985",
                label:"Prisoners Executed in 1985",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1986",
                label:"Prisoners Executed in 1986",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1987",
                label:"Prisoners Executed in 1987",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1988",
                label:"Prisoners Executed in 1988",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1989",
                label:"Prisoners Executed in 1989",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1990",
                label:"Prisoners Executed in 1990",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1991",
                label:"Prisoners Executed in 1991",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1992",
                label:"Prisoners Executed in 1992",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1993",
                label:"Prisoners Executed in 1993",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1994",
                label:"Prisoners Executed in 1994",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1995",
                label:"Prisoners Executed in 1995",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1996",
                label:"Prisoners Executed in 1996",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1997",
                label:"Prisoners Executed in 1997",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1998",
                label:"Prisoners Executed in 1998",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_1999",
                label:"Prisoners Executed in 1999",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2000",
                label:"Prisoners Executed in 2000",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2001",
                label:"Prisoners Executed in 2001",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2002",
                label:"Prisoners Executed in 2002",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2003",
                label:"Prisoners Executed in 2003",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2004",
                label:"Prisoners Executed in 2004",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2005",
                label:"Prisoners Executed in 2005",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2006",
                label:"Prisoners Executed in 2006",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2007",
                label:"Prisoners Executed in 2007",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2008",
                label:"Prisoners Executed in 2008",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2009",
                label:"Prisoners Executed in 2009",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2010",
                label:"Prisoners Executed in 2010",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2011",
                label:"Prisoners Executed in 2011",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2012",
                label:"Prisoners Executed in 2012",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2013",
                label:"Prisoners Executed in 2013",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2014",
                label:"Prisoners Executed in 2014",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2015",
                label:"Prisoners Executed in 2015",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2016",
                label:"Prisoners Executed in 2016",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2017",
                label:"Prisoners Executed in 2017",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2018",
                label:"Prisoners Executed in 2018",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2019",
                label:"Prisoners Executed in 2019",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2020",
                label:"Prisoners Executed in 2020",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2021",
                label:"Prisoners Executed in 2021",
                visible:"false"
            },
            {
                fieldName:"EXECUTIONS_2022",
                label:"Prisoners Executed in 2022",
                visible:"false"
            },
            {
                fieldName:"YEAR_OF_ABOLISHMENT",
                label:"Year of Death Penalty Abolishment",
                visible:"false"
            }
        ],
        content: setCapitalExecutionContent
    };
    
    function setCapitalExecutionContent(feature){
        const textElement = new TextContent();
        if (feature.graphic.attributes.EXECUTIONS_2022 == 1) {
            textElement.text = "<b>{EXECUTIONS_2022}</b> prisoner was executed in <b>{STATE_NAME}</b> in the year <b>2022</b>.";
        } else {
            textElement.text = "<b>{EXECUTIONS_2022}</b> prisoners were executed in <b>{STATE_NAME}</b> in the year <b>2022</b>.";
        };
        
        const textElement2 = new TextContent();
        if (feature.graphic.attributes.TOTAL_EXECUTIONS_SINCE_1930 == 1) {
            textElement2.text = "Since 1930 <b>{TOTAL_EXECUTIONS_SINCE_1930}</b> prisoner has been executed in the state of <b>{STATE_NAME}</b>.";
        } else {
            textElement2.text = "Since 1930 <b>{TOTAL_EXECUTIONS_SINCE_1930}</b> prisoners have been executed in the state of <b>{STATE_NAME}</b>.";
        };
        
        const mediaElement = new MediaContent({
            title:"Executions 1977 - 2022:",
            mediaInfos: [
                {
                    type: "line-chart", 
                    value: {
                        fields:['EXECUTIONS_1977', 'EXECUTIONS_1978', 'EXECUTIONS_1979', 'EXECUTIONS_1980', 'EXECUTIONS_1981', 'EXECUTIONS_1982', 'EXECUTIONS_1983', 'EXECUTIONS_1984', 'EXECUTIONS_1985', 'EXECUTIONS_1986', 'EXECUTIONS_1987', 'EXECUTIONS_1988', 'EXECUTIONS_1989', 'EXECUTIONS_1990', 'EXECUTIONS_1991', 'EXECUTIONS_1992', 'EXECUTIONS_1993', 'EXECUTIONS_1994', 'EXECUTIONS_1995', 'EXECUTIONS_1996', 'EXECUTIONS_1997', 'EXECUTIONS_1998', 'EXECUTIONS_1999', 'EXECUTIONS_2000', 'EXECUTIONS_2001', 'EXECUTIONS_2002', 'EXECUTIONS_2003', 'EXECUTIONS_2004', 'EXECUTIONS_2005', 'EXECUTIONS_2006', 'EXECUTIONS_2007', 'EXECUTIONS_2008', 'EXECUTIONS_2009', 'EXECUTIONS_2010', 'EXECUTIONS_2011', 'EXECUTIONS_2012', 'EXECUTIONS_2013', 'EXECUTIONS_2014', 'EXECUTIONS_2015', 'EXECUTIONS_2016', 'EXECUTIONS_2017', 'EXECUTIONS_2018', 'EXECUTIONS_2019', 'EXECUTIONS_2020', 'EXECUTIONS_2021', 'EXECUTIONS_2022'],
                        colors: [new Color("#fa7e1e")]
                    }
                }
            ]
        });
        
        if (feature.graphic.attributes.YEAR_OF_ABOLISHMENT == null ) {
            if (['Arizona', 'California', 'Ohio', 'Oregon', 'Pennsylvania', 'Tennessee'].includes(feature.graphic.attributes.STATE_NAME)){
                const textElement3 = new TextContent();
                textElement3.text = "While the death penalty is still legal, there is currently a pause on executions due to an executive order.";
                return [textElement,textElement3,textElement2,mediaElement];
            } else {
                return [textElement,textElement2,mediaElement];
            };
        } else {
            const textElement4 = new TextContent();
            textElement4.text = "The death penalty was abolished in the year <b>{YEAR_OF_ABOLISHMENT}</b>.";
            return [textElement,textElement4, textElement2, mediaElement];
        };
    };
    
    const prisonMortalityRatePopupTemplate = {
        title: "Prison Mortality Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"PRISON_MORTALITY_RATE_2001",
                label:"Prison Mortality Rate in 2001",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2002",
                label:"Prison Mortality Rate in 2002",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2003",
                label:"Prison Mortality Rate in 2003",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2004",
                label:"Prison Mortality Rate in 2004",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2005",
                label:"Prison Mortality Rate in 2005",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2006",
                label:"Prison Mortality Rate in 2006",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2007",
                label:"Prison Mortality Rate in 2007",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2008",
                label:"Prison Mortality Rate in 2008",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2009",
                label:"Prison Mortality Rate in 2009",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2010",
                label:"Prison Mortality Rate in 2010",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2011",
                label:"Prison Mortality Rate in 2011",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2012",
                label:"Prison Mortality Rate in 2012",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2013",
                label:"Prison Mortality Rate in 2013",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2014",
                label:"Prison Mortality Rate in 2014",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2015",
                label:"Prison Mortality Rate in 2015",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2016",
                label:"Prison Mortality Rate in 2016",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2017",
                label:"Prison Mortality Rate in 2017",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2018",
                label:"Prison Mortality Rate in 2018",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"PRISON_MORTALITY_RATE_2019",
                label:"Prison Mortality Rate in 2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"TOTAL_DEATHS_2001_2019",
                label:"Total Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"HEART_DEATHS_2001_2019",
                label:"Heart Disease Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"CANCER_DEATHS_2001_2019",
                label:"Cancer Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"LIVER_DEATHS_2001_2019",
                label:"Liver Disease Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"AIDS_DEATHS_2001_2019",
                label:"AIDS Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"RESPIRATORY_DEATHS_2001_2019",
                label:"Respiratory Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"OTHER_ILL_DEATHS_2001_2019",
                label:"Other Illness Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"SUICIDE_DEATHS_2001_2019",
                label:"Suicide Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"DRUG_DEATHS_2001_2019",
                label:"Drug Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"ACCIDENT_DEATHS_2001_2019",
                label:"Accidental Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"HOMOCIDE_DEATHS_2001_2019",
                label:"Homocide Deaths 2001-2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: [
            {
                type:"text",
                text: "The mortality rate for state prisoners in <b>{STATE_NAME}</b> was <b>{PRISON_MORTALITY_RATE_2019}</b> deaths per 100,000 inmates in the year <b>2019</b>."
            },
            {
                type: "media",
                title:"Prison Mortality Rates over Time:",
                mediaInfos: [
                    {
                        type: "line-chart", 
                        value: {
                            fields:['PRISON_MORTALITY_RATE_2001', 'PRISON_MORTALITY_RATE_2002', 'PRISON_MORTALITY_RATE_2003','PRISON_MORTALITY_RATE_2004', 'PRISON_MORTALITY_RATE_2005','PRISON_MORTALITY_RATE_2006', 'PRISON_MORTALITY_RATE_2007', 'PRISON_MORTALITY_RATE_2008','PRISON_MORTALITY_RATE_2009', 'PRISON_MORTALITY_RATE_2010', 'PRISON_MORTALITY_RATE_2011','PRISON_MORTALITY_RATE_2012', 'PRISON_MORTALITY_RATE_2013', 'PRISON_MORTALITY_RATE_2014','PRISON_MORTALITY_RATE_2015', 'PRISON_MORTALITY_RATE_2016', 'PRISON_MORTALITY_RATE_2017','PRISON_MORTALITY_RATE_2018', 'PRISON_MORTALITY_RATE_2019'],
                            colors: [new Color("#fa7e1e")]
                        }
                    }
                ]
            },
            {
                type: "media",
                title:"Cause of Death (2000-2019):",
                mediaInfos: [
                    {
                        type: "bar-chart", 
                        value: {
                            fields:['HEART_DEATHS_2001_2019', 'CANCER_DEATHS_2001_2019','LIVER_DEATHS_2001_2019', 'AIDS_DEATHS_2001_2019', 'RESPIRATORY_DEATHS_2001_2019','OTHER_ILL_DEATHS_2001_2019', 'SUICIDE_DEATHS_2001_2019', 'DRUG_DEATHS_2001_2019','ACCIDENT_DEATHS_2001_2019', 'HOMOCIDE_DEATHS_2001_2019'],
                            colors: [new Color("#ffdc73"), new Color("#77ab59"), new Color("#fa7e1e"), new Color("#b3cde0"), new Color("#b39eb5"), new Color("#6497b1"), new Color("#997a8d"), new Color("#ffbf00"), new Color("#ffcb85"), new Color("#afafaf")]
                        }
                    }
                ]
            }
        ]
    };

    const jailMortalityRatePopupTemplate = {
        title: "Jail Mortality Rates in {STATE_NAME}",
        outFields: ["*"],
        fieldInfos: [
            {
                fieldName:"JAIL_MORTALITY_RATE_2001",
                label:"Jail Mortality Rate in 2001",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2002",
                label:"Jail Mortality Rate in 2002",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2003",
                label:"Jail Mortality Rate in 2003",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2004",
                label:"Jail Mortality Rate in 2004",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2005",
                label:"Jail Mortality Rate in 2005",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2006",
                label:"Jail Mortality Rate in 2006",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2007",
                label:"Jail Mortality Rate in 2007",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2008",
                label:"Jail Mortality Rate in 2008",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2009",
                label:"Jail Mortality Rate in 2009",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2010",
                label:"Jail Mortality Rate in 2010",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2011",
                label:"Jail Mortality Rate in 2011",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2012",
                label:"Jail Mortality Rate in 2012",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2013",
                label:"Jail Mortality Rate in 2013",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2014",
                label:"Jail Mortality Rate in 2014",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2015",
                label:"Jail Mortality Rate in 2015",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2016",
                label:"Jail Mortality Rate in 2016",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2017",
                label:"Jail Mortality Rate in 2017",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2018",
                label:"Jail Mortality Rate in 2018",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            },
            {
                fieldName:"JAIL_MORTALITY_RATE_2019",
                label:"Jail Mortality Rate in 2019",
                visible:"false",
                format: {
                  digitSeparator: true
                }
            }
        ],
        content: [
            {
                type:"text",
                text: "The mortality rate for state jail inmates in <b>{STATE_NAME}</b> was <b>{JAIL_MORTALITY_RATE_2019}</b> deaths per 100,000 inmates in the year <b>2019</b>."
            },
            {
                type: "media",
                title:"Jail Mortality Rates over Time:",
                mediaInfos: [
                    {
                        type: "line-chart", 
                        value: {
                            fields:['JAIL_MORTALITY_RATE_2001', 'JAIL_MORTALITY_RATE_2002', 'JAIL_MORTALITY_RATE_2003','JAIL_MORTALITY_RATE_2004', 'JAIL_MORTALITY_RATE_2005','JAIL_MORTALITY_RATE_2006', 'JAIL_MORTALITY_RATE_2007', 'JAIL_MORTALITY_RATE_2008','JAIL_MORTALITY_RATE_2009', 'JAIL_MORTALITY_RATE_2010', 'JAIL_MORTALITY_RATE_2011','JAIL_MORTALITY_RATE_2012', 'JAIL_MORTALITY_RATE_2013', 'JAIL_MORTALITY_RATE_2014','JAIL_MORTALITY_RATE_2015', 'JAIL_MORTALITY_RATE_2016', 'JAIL_MORTALITY_RATE_2017','JAIL_MORTALITY_RATE_2018', 'JAIL_MORTALITY_RATE_2019'],
                            colors: [new Color("#fa7e1e")]
                        }
                    }
                ]
            }
        ]
    };
    
    
    
    //add feature layers
    const prisonIncarcerationRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Prison_Incarceration_Rates/FeatureServer/0",
        title:"Prison Incarceration Rates", 
        popupTemplate: prisonRatePopupTemplate,
        visible: true
    });
    // only adding this layer to begin with. the rest are controlled with the toggle variables function later
    map.add(prisonIncarcerationRateLayer);
    
    const DemographicsRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Prison_Demographic_Rates/FeatureServer/0",
        title:"Demographics", 
        visible: false
    });
    
    const jailIncarcerationRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Jail_Incarceration_Rates/FeatureServer/0",
        title:"Jail Incarceration Rates", 
        popupTemplate: jailRatePopupTemplate,
        visible: true
    });
    
    const paroleRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Parole_Rates/FeatureServer/0",
        title:"Parole Rates", 
        popupTemplate: paroleRatePopupTemplate,
        visible: true
    });
    
    const probationRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Probation_Rates/FeatureServer/0",
        title:"Probation Rates", 
        popupTemplate: probationRatePopupTemplate,
        visible: true
    });
    
    const YouthRateLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Youth_Incarceration_Rates/FeatureServer/0",
        title:"Youth Incarceration Rates", 
        popupTemplate: youthIncarcerationRatePopupTemplate,
        visible: true
    });
    
    const FelonyLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Felony_Disenfranchisement_Rates/FeatureServer/0",
        title:"Felony Disenfranchisement Rates",
        popupTemplate: felonyDisRatePopupTemplate,
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
        visible: true,
        popupTemplate:capitalExecutionPopupTemplate
    });
    
    const PrisonMortalityLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Prison_Mortality_Rates/FeatureServer/0",
        title:"Prison Mortality Rates", 
        popupTemplate: prisonMortalityRatePopupTemplate,
        visible: true
    });
    
    const JailMortalityLayer = new FeatureLayer({
        url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Jail_Mortality_Rates/FeatureServer/0",
        title:"Jail Mortality Rates", 
        popupTemplate: jailMortalityRatePopupTemplate,
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
        content:search,
        expandTooltip: "Expand Search"
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
        content:legend,
        expandTooltip: "Expand Legend"
    });
    view.ui.add(legendExpand, "top-right");

    
    // ADD ZOOM BUTTONS
    
    let zoom = new Zoom({
        view: view
    });
    view.ui.add(zoom, "bottom-right");
    
    
    // LAYER TOGGLING
    const PrisonIncarcerationRateButton = document.getElementById("PrisonIncarcerationRateButton");
    PrisonIncarcerationRateButton.addEventListener("click", turnOnPrisonIncRates);
    function turnOnPrisonIncRates(event) {
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(prisonIncarcerationRateLayer);  
    };
    
    const JailIncarcerationRateButton = document.getElementById("JailIncarcerationRateButton");
    JailIncarcerationRateButton.addEventListener("click", turnOnJailIncRates);
    function turnOnJailIncRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(jailIncarcerationRateLayer);
    };
    
    const ParoleRateButton = document.getElementById("ParoleRateButton");
    ParoleRateButton.addEventListener("click", turnOnParoleRates);
    function turnOnParoleRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(paroleRateLayer);
    };
    
    const ProbationRateButton = document.getElementById("ProbationRateButton");
    ProbationRateButton.addEventListener("click", turnOnProbationRates);
    function turnOnProbationRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(probationRateLayer);
    };
    
    const YouthRateButton = document.getElementById("YouthRateButton");
    YouthRateButton.addEventListener("click", turnOnYouthRates);
    function turnOnYouthRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(YouthRateLayer);
    };
    
    const felonyRateButton = document.getElementById("FelonyRateButton");
    felonyRateButton.addEventListener("click", turnOnFelonyRates);
    function turnOnFelonyRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(FelonyLayer);
    };
    
    const CaptialSentencedButton = document.getElementById("CaptialSentencedButton");
    CaptialSentencedButton.addEventListener("click", turnOnCPSentRates);
    function turnOnCPSentRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(CPSentencedLayer);
    };
    
    const CapitalExecutedButton = document.getElementById("CapitalExecutedButton");
    CapitalExecutedButton.addEventListener("click", turnOnCPExeRates);
    function turnOnCPExeRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(PrisonMortalityLayer);
        map.remove(JailMortalityLayer);
        map.add(CPExecutedLayer);
    };
    
    const PrisonMortalityButton = document.getElementById("PrisonMortalityButton");
    PrisonMortalityButton.addEventListener("click", turnOnPrisonMortRates);
    function turnOnPrisonMortRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(JailMortalityLayer);
        map.add(PrisonMortalityLayer);
    };
    
    const JailMortalityButton = document.getElementById("JailMortalityButton");
    JailMortalityButton.addEventListener("click", turnOnJailMortRates);
    function turnOnJailMortRates(event) {
        map.remove(prisonIncarcerationRateLayer);
        map.remove(jailIncarcerationRateLayer);
        map.remove(paroleRateLayer);
        map.remove(probationRateLayer);
        map.remove(YouthRateLayer);
        map.remove(FelonyLayer);
        map.remove(CPSentencedLayer);
        map.remove(CPExecutedLayer);
        map.remove(PrisonMortalityLayer);
        map.add(JailMortalityLayer);
    };
    
    view.when(() => {
        const print = new Print({
            view: view,
            printServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });
        
        //console.log(print.viewModel.effectiveTemplateCustomTextElements)
        
        printExpand = new Expand({
            expandIconClass: "esri-icon-printer",
            expandTooltip: "Expand Print",
            view: view,
            content: print
        });

        view.ui.add(printExpand, "top-right");
    });
    
    
    
    
});