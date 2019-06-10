d3.csv("/data/Stories/Housing/housecomp2.csv").then(function(data){

    // console.log("Data " + JSON.stringify(data[0]));
    // console.log("Keys: " + Object.keys(data[0]));

    let Dun_Laoghaire_Rathdown = data.filter((v) => {
      return v.region ==='Dun Laoghaire Rathdown';
    });



      Dun_Laoghaire_Rathdown1 = Dun_Laoghaire_Rathdown.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands1 = {
      x:Dun_Laoghaire_Rathdown1.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_Laoghaire_Rathdown1.map((val) => {
        return val.PH;
      },


           ),

      name:'Dun Laoghaire Rathdown',
      orientation: '',
      type: 'linear',
      
      fill: 'toself',
    fillcolor: '#4682B4',
      stackgroup: 'one'
    };


     //--2
let Dun_2 = data.filter((v) => {
      return v.region ==='Fingal';
    });



      Dun_21 = Dun_2.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands2 = {
      x:Dun_21.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_21.map((val) => {
        return val.PH;
      },


           ),

      name:'Fingal',
      orientation: '',
      type: 'linear',
      
      fill: 'toself',
      fillcolor: '#4682B4',
      stackgroup: 'one'
    };


     



     //--2
     //--3
let Dun_3 = data.filter((v) => {
      return v.region ==='South Dublin';
    });



      Dun_31 = Dun_3.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands3 = {
      x:Dun_31.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_31.map((val) => {
        return val.PH;
      },


           ),

      name:'South Dublin',
      orientation: '',
      type: 'linear',
      
      fill: 'toself',
      fillcolor: '#4682B4',
     stackgroup: 'one'
    };

     //--3
    //--4
    let Dun_4 = data.filter((v) => {
      return v.region ==='Dublin City';
    });



      Dun_41 = Dun_4.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands4 = {
      x:Dun_41.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_41.map((val) => {
        return val.PH;
      },


           ),

      name:'Dublin City',
      orientation: '',
      type: 'linear',
      
      fill: 'toself',
      fillcolor: '#4682B4',
      stackgroup: 'one'
    };
    //--4
    //--5

let Dun_5 = data.filter((v) => {
      return v.region ==='Kildare';
    });



      Dun_51 = Dun_5.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands5 = {
      x:Dun_51.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_51.map((val) => {
        return val.PH;
      },


           ),

      name:'Kildare',
      orientation: '',
      type: 'linear',
      
     // fill: 'toself',
    //fillcolor: '#4682B4',
      stackgroup: 'one'
    };

    //--5
//--6

let Dun_6 = data.filter((v) => {
      return v.region ==='Meath';
    });



      Dun_61 = Dun_6.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands6 = {
      x:Dun_61.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_61.map((val) => {
        return val.PH;
      },


           ),

      name:'Meath',
      orientation: '',
      type: 'linear',
      
     // fill: 'toself',
    //fillcolor: '#4682B4',
      stackgroup: 'one'
    };
    //--6


//--7

let Dun_7 = data.filter((v) => {
      return v.region ==='Wicklow';
    });



      Dun_71 = Dun_7.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands7 = {
      x:Dun_71.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_71.map((val) => {
        return val.PH;
      },


           ),

      name:'Wicklow',
      orientation: '',
      type: 'linear',
      
     // fill: 'toself',
    //fillcolor: '#4682B4',
      stackgroup: 'one'
    };
    //--7


//--8

let Dun_8 = data.filter((v) => {
      return v.region ==='Rest of Ireland';
    });



      Dun_81 = Dun_8.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
      }
    
    });

     
    
  


    let PopBands8 = {
      x:Dun_81.map((val) => {
        return val.Qua;
      },

       
     
      ),
      y: Dun_81.map((val) => {
        return val.PH;
      },


           ),

      name:'Rest of Ireland',
      orientation: '',
      type: 'linear',
      
     // fill: 'toself',
    //fillcolor: '#4682B4',
      stackgroup: 'one'
    };
    //--8



  
 let popBandsData = [PopBands1,PopBands2,PopBands3,PopBands4,PopBands5,PopBands6,PopBands7,PopBands8];




let fig7Layout = Object.assign({}, multilineChartLayout);
  fig7Layout.title = 'Housing Test';
  fig7Layout.legend = {
    x: 0.8,
    y: 0.85
  };



 // Figure 7 ib Dashboard
    // Plotly.newPlot('chart7',popBandsData,fig7Layout,{title:''});

Plotly.newPlot('chart7',popBandsData,fig7Layout, {
    modeBarButtons: multilineModeBarButtonsInclude,
    displayModeBar: true,
    displaylogo: false,
    responsive: true
  });

});
 


    

  
