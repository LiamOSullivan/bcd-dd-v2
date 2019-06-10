d3.csv("test21.csv").then(function(data){

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

      name:'Dublin City',
      orientation: '',
      type: 'linear',
      
     // fill: 'toself',
    fillcolor: '#4682B4',
      stackgroup: 'one'
    };

let DublinPopBands2 = {
      x:dublinData2.map((val) => {
        return val.Qua;
      }),
      y: dublinData2.map((val) => {
        return val.SH;
      }),
      name:'Dublin City',
      orientation: '',
      type: 'linear',
      
      //fill: 'toself',
    fillcolor: '#4682B4',
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
     name:'Dun Laoghaire- Rathdown',
      orientation: '',
      type: 'linear',
      fillcolor:'#DC143C',
      stackgroup: 'one'
    };

let dlrPopBands2 = {
      x:Dlr2.map((val) => {
        return val.Qua;
      }),
      y: Dlr2.map((val) => {
        return val.SH;
      }),
      name:'Dun Laoghaire- Rathdown',
      orientation: '',
      type: 'linear',
      fillcolor:'#DC143C',
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
     name:'Fingal',
      orientation: '',
      type: 'linear',
      fillcolor:'#87CEFA',
      stackgroup: 'one'
    };

let finPopBands2 = {
      x:Fin2.map((val) => {
        return val.Qua;
      }),
      y: Fin2.map((val) => {
        return val.SH;
      }),
      name:'Fingal',
      orientation: '',
      type: 'linear',
      fillcolor:'#87CEFA',
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
     name:'South Dublin',
      orientation: '',
      type: 'linear',
      fillcolor:'#FFFF66',
      stackgroup: 'one'
    };

let SDPopBands2 = {
      x:SD2.map((val) => {
        return val.Qua;
      }),
      y: SD2.map((val) => {
        return val.SH;
      }),
       name:'South Dublin',
      orientation: '',
      type: 'linear',
      fillcolor:'#FFFF66',
      stackgroup: 'one'
    };



  
 let popBandsData = [DublinPopBands1,DublinPopBands2,dlrPopBands1,dlrPopBands2,finPopBands1,finPopBands2,SDPopBands1,SDPopBands2];

var updatemenus=[
    {
        buttons: [
            {
               args: [{'visible': [true,false,true,false,true,false,true,false]},
                       {'title': 'Private',
                        'annotations': ''}],
                label: 'Private',
                method: 'update'
            },
            {
                args: [{'visible': [false,true,false,true,false,true,false,true]},
                       {'title': 'Social',
                        'annotations': ''}],
                label: 'Social',
                method: 'update'
            },
           
            {
                args: [{'visible': [true,true,true,true,true,true,true,true]},
                       {'title': 'Both',
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
      height: 654, 
      title: 'Social and Private housing Units Completed by Types', 
      width: 1600, 
      xaxis: {
        autorange: true, 
        range: [1,16], 
        title: 'Quartrs', 
        type: '',
         gridcolor:'rgb(255, 255, 255)',
         zerolinecolor:'rgb(255, 255, 255)',
         showbackground:true,
         backgroundcolor:'rgb(230, 230,230)',
      },

      //--

      //--

  



      yaxis: {
        
             
        autorange: true, 
        range: [1,16], 
        title: 'No of Houses', 
        type: 'linear'
      }

//--
//--






    };




 // Figure 7 ib Dashboard
    Plotly.newPlot('chart7',popBandsData,layout,{title:''});
});
    
    

  
