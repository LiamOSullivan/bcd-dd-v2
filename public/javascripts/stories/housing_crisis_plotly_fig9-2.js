
d3.csv("/data/Stories/Housing/Property_tax.csv").then(function(data){

    // console.log("Data " + JSON.stringify(data[0]));
    // console.log("Keys: " + Object.keys(data[0]));

    let dublinData = data.filter((v) => {
      return v.type ==='Other Tax Revenue';
    });



      dublinData1 = dublinData.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
       
        
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

      name:'Other Tax Revenue',
      orientation: '',
      type: 'scatter',
      //mode: 'bar',
      fillcolor:'#DCC',

    };




    //


     let dlrData = data.filter((v) => {
      return v.type ==='Property Related Tax Revenue';
    });



      Dlr1 = dlrData.map((val) => {
      return {
        Qua: val["date"],
        PH: val["value"],
      
      }
    });

    
  


    let dlrPopBands1 = {
      x:Dlr1.map((val) => {
        return val.Qua;
      }),
      y: Dlr1.map((val) => {
        return val.PH;
      }),     name:'Property Rel Tax Revenue',
      orientation: '',      type: 'bar',      fillcolor:'#DC143C',
      mode: 'bar',
      stackgroup: 'one',

  yaxis: "y2",
  
    };

  
 let popBandsData = [DublinPopBands1,dlrPopBands1];
//let popBandsData = [dlrPopBands1];


layout = {

  //updatemenus: updatemenus,
 
  responsive: true,
 
      showlegend:true,
      autosize: true, 
      height: 454, 
      title: 'Tax Revenue', 
      width: 870, 

      xaxis: {
       // autorange: true, 
       // range: [1,16], 
        title: 'Date', 
        type: 'bar',
         gridcolor:'rgb(255, 255, 255)',
         zerolinecolor:'rgb(255, 255, 255)',
         showbackground:true,
         backgroundcolor:'rgb(230, 230,230)',
      },

      //--

      //--

  
      yaxis: {
        
             
        //autorange: true, 
        //range: [1,16], 
        //title: 'Value', 
        //type: 'bar'
      },

yaxis2: {
    title: "",
    titlefont: {color: "rgb(100, 123, 189)"},
    tickfont: {color: "rgb(100, 103, 189)"},
    overlaying: "y",
    side: "right"
  }
    };




 // Figure 7 ib Dashboard
    Plotly.newPlot('chart8',popBandsData,layout,{title:''});
});
    


    

  
