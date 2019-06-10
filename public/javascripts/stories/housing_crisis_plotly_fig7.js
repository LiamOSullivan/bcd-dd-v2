

d3.csv("/data/Housing/test21.csv").then(function(data){

    // console.log("Data " + JSON.stringify(data[0]));
    // console.log("Keys: " + Object.keys(data[0]));

    let dublinData = data.filter((v) => {
      return v.region ==='Dublin City Centre';
    });



      dublinData1 = dublinData.map((val) => {
      return {
        Qua: val["date"],
        PH: val["Private Houses"],
       
        
      }
    
    });

     dublinData2 = dublinData.map((val) => {
      return {
        Qua: val["date"],
        SH: val["Social Houses"],
      
       
      }
      
    });
    
  


    let DublinPopBands1 = {
      x:dublinData1.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: dublinData1.map((val) => {
        return val.PH;
      },


           ),

      name:'Dublin City P.H',
      orientation: '',
      type: 'linear',
      
     // fill: 'toself',
      fillcolor: '#4682B4',
      //fill: "tonexty",
      mode : 'none',
     stackgroup: 'one'
    };

let DublinPopBands2 = {
      x:dublinData2.map((val) => {
        return val.Qua;
      }),
      y: dublinData2.map((val) => {
        return val.SH;
      }),
      name:'Dublin City S.H',
      orientation: '',
      type: 'linear',
      
      //fill: 'toself',
      fillcolor: '#4682B4',
      mode :'none',
     //fill: "tonexty",
     stackgroup: 'one'
    };


    //


     let dlrData = data.filter((v) => {
      return v.region ==='Dun Laoghaire- Rathdown';
    });



      Dlr1 = dlrData.map((val) => {
      return {
        Qua: val["date"],
        PH: val["Private Houses"],
      
      }
    });

     Dlr2 = dlrData.map((val) => {
      return {
        Qua: val["date"],
        SH: val["Social Houses"],
      
      }
    });
    
  


    let dlrPopBands1 = {
      x:Dlr1.map((val) => {
        return val.Qua;
      }),
      y: Dlr1.map((val) => {
        return val.PH;
      }),
     name:'Dun Laoghaire- Rathdown P.H',
      orientation: '',
      type: 'linear',
      fillcolor:'#DC143C',
       mode :'none',
     stackgroup: 'one'
    };

let dlrPopBands2 = {
      x:Dlr2.map((val) => {
        return val.Qua;
      }),
      y: Dlr2.map((val) => {
        return val.SH;
      }),
      name:'Dun Laoghaire- Rathdown S.H',
      orientation: '',
      type: 'linear',
      fillcolor:'#DC143C',
       mode :'none',
     stackgroup: 'one'
    };




    //---

      let finData = data.filter((v) => {
      return v.region ==='Fingal';
    });



      Fin1 = finData.map((val) => {
      return {
        Qua: val["date"],
        PH: val["Private Houses"],
        
      }
    });

     Fin2 = finData.map((val) => {
      return {
        Qua: val["date"],
        SH: val["Social Houses"],
       
      }
    });
    
  


    let finPopBands1 = {
      x:Fin1.map((val) => {
        return val.Qua;
      }),
      y: Fin1.map((val) => {
        return val.PH;
      }),
     name:'Fingal P.H',
      orientation: '',
      type: 'linear',
      fillcolor:'#87CEFA',
       mode :'none',
     stackgroup: 'one'
    };

let finPopBands2 = {
      x:Fin2.map((val) => {
        return val.Qua;
      }),
      y: Fin2.map((val) => {
        return val.SH;
      }),
      name:'Fingal S.H',
      orientation: '',
      type: 'linear',
      fillcolor:'#87CEFA',
       mode :'none',
     stackgroup: 'one'
    };
    //---
    //----
    let SDData = data.filter((v) => {
      return v.region ==='South Dublin';
    });



      SD1 = SDData.map((val) => {
      return {
        Qua: val["date"],
        PH: val["Private Houses"],
        
      }
    });

     SD2 = SDData.map((val) => {
      return {
        Qua: val["date"],
        SH: val["Social Houses"],
       
      }
    });
    
      let SDPopBands1 = {
      x:SD1.map((val) => {
        return val.Qua;
      }),
      y: SD1.map((val) => {
        return val.PH;
      }),
     name:'South Dublin P.H',
      orientation: '',
      type: 'linear',
      //fill:'#FFFF66',
      fillcolor:'#FFFF66',
       mode :'none',
      stackgroup: 'one'
    };

let SDPopBands2 = {
      x:SD2.map((val) => {
        return val.Qua;
      }),
      y: SD2.map((val) => {
        return val.SH;
      }),
       name:'South Dublin S.H',
      orientation: '',
      type: 'linear',
      //fill:'#FFFF66',
      fillcolor:'#FFFF66',
        mode :'none',
      stackgroup: 'one'
    };



  
 let popBandsData = [DublinPopBands1,DublinPopBands2,dlrPopBands1,dlrPopBands2,finPopBands1,finPopBands2,SDPopBands1,SDPopBands2];

var updatemenus=[
    {
        buttons: [
            {
               args: [{'visible': [true,false,true,false,true,false,true,false]},
                       {'title': 'Private Housing Units',
                        'annotations': ''}],
                label: 'Private',
                method: 'update'
            },
            {
                args: [{'visible': [false,true,false,true,false,true,false,true]},
                       {'title': 'Social Housing Units',
                        'annotations': ''}],
                label: 'Social',
                method: 'update'
            },
           
            {
                args: [{'visible': [true,true,true,true,true,true,true,true]},
                       {'title': 'Social and Private Housing Units',
                        'annotations': ''}],
                label: 'Both',
                method: 'update',
               
            }
          

        ],
        direction: 'left',
        pad: {'r': 10, 't': 10},
        showactive: true,
        type: 'buttons',
        x: 0.1,
        xanchor: 'left',
        y: 1.1,
        yanchor: 'top'
    }
]



layout = {

  updatemenus: updatemenus,
 
  responsive: true,
 
      showlegend:true,
      autosize: true, 
      height: 440, 
      title: 'Social and Private housing Units Completed by Types', 
      width: 790, 
      xaxis: {
        autorange: true, 
        range: [1,16], 
        title: 'Quartrs', 
        type: '',
         

      },

      //--

      //--

  



      yaxis: {
        
             
        autorange: true, 
        range: [1,16], 
        title: 'No of Houses', 
        type: 'linear'
      }



    };

//-----
let modeBarButtonsRemove = ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines'];
let rowChartModeBarButtonsInclude = [
  ['toImage']
];
let multilineModeBarButtonsInclude = [
  ['toImage', 'hoverClosestCartesian', 'hoverCompareCartesian']
];
let areaChartModeBarButtonsInclude = [
  ['toImage', 'hoverClosestCartesian', 'hoverCompareCartesian']
];

let chartFont = {
  family: 'PT Sans',
  size: 16,
  color: '#313131'
};

// let chartColor = '#ffffff';
let chartColor = '#d8d8d8'; //nearly same as background


let colorWay = ['#f4a582', '#f7f7f7', '#92c5de', '#0571b0']; //colorbrewer divergent


let margins = {
  l: 40,
  r: 40,
  b: 40,
  t: 40,
  pad: 0
};

let rowChartLayout = {
  responsive: true,
  margin: margins,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  showlegend: false,
  annotations: [],
  hovermode: 'closest'
};

let groupedColumnLayout = {
  barmode: 'group',
  responsive: true,
  margin: margins,
  yaxis: {
    autotick: true,
    ticks: 'inside',
    tickson: 'labels',
    tick0: 0,
    // dtick: 0.25,
    ticklen: 8,
    tickwidth: 2,
    tickcolor: '#000'
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  showlegend: true,
  annotations: [],
  hovermode: 'x'
};

let multilineChartLayout = {

  responsive: true,
  margin: margins,
   
xaxis: {
        autorange: true, 
        range: [1,16], 
        title: 'Quartrs', 
        type: '',
         gridcolor:'rgb(255, 255, 255)',
         zerolinecolor:'rgb(255, 255, 255)',
         showbackground:true,
         backgroundcolor:'rgb(230, 230,230)',
         paper_bgcolor: chartColor,
        plot_bgcolor: chartColor,
        colorway: colorWay,
        font: chartFont,
        showlegend: false,
         annotations: [],
         hovermode: 'closest'

      },



   


  yaxis: {
   // showticklabels: true
  },
 paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  showlegend: true,
  //annotations: [],
  //hovermode: 'x'
};

let areaChartLayout = {
  responsive: true,
  margin: margins,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  hovermode: 'x',
  annotations: [],
  showlegend: true
};


//-----


let hpiLayout = Object.assign({}, multilineChartLayout);
  hpiLayout.title = 'House Price Index (NI)';
  hpiLayout.legend = {
    x: 0.8,
    y: 0.85
  };

 // Figure 7 on Dashboard
    Plotly.newPlot('chart7',popBandsData,layout,{
   
    displaylogo: false,
    responsive: true,
    
  });
});
    


    

  
