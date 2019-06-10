d3.csv("/data/Stories/Housing/Property_tax.csv").then(function(data){

   

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
      type: 'linear',
      
    
    };



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
      }),
     name:'Property Related Tax Revenue',
      orientation: '',
      type: 'scatter',
      //fillcolor:'#DC143C',
      stackgroup: 'one',
       mode :'none'
    };





  
let popBandsData = [dlrPopBands1];



layout = {

  //updatemenus: updatemenus,
 
  responsive: true,
 
      showlegend:true,
      autosize: true, 
      height: 454, 
      title: '', 
      width: 870, 
      xaxis: {
        autorange: true, 
        range: [1,16], 
        title: 'Date', 
        type: '',
         gridcolor:'rgb(255, 255, 255)',
         zerolinecolor:'rgb(255, 255, 255)',
         showbackground:true,
         backgroundcolor:'rgb(230, 230,230)',
      },

           yaxis: {
        
             
        autorange: true, 
        range: [1,16], 
        title: 'Value', 
        type: 'scatter'
      }








    };




 // Figure 7 ib Dashboard
    Plotly.newPlot('chart8',popBandsData,layout,{title:''});
});
 

  
