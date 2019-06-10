

d3.csv("/data/Housing/propertyprices.csv") 
  .then(function(data) {

       let dublinData = data.map((v) => {
      return {
        xv: v["date"],
        yv: v["Dublin"],
        //console.log(JSON.stringify(Count));
      }
    });
  


    let DublinPopBands = {
      x: dublinData.map((v) => {
        return v.xv;
      }),
      y: dublinData.map((v) => {
        return v.yv;
      }),
      name: 'Dublin City',
      orientation: '',
     fillcolor: '#4682B4',
      type: 'scatter'
    };


layout = {

   
     responsive: true,
 
      showlegend:true,
      autosize: true, 
      height: 454, 
      title: 'Houses prices in Dublin by quarters of the year', 
      width: 900, 
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
        title: 'Price', 
        type: 'linear'
      }

}
  
    // Figure 9 ib Dashboard
    let popBandsData = [DublinPopBands];
    Plotly.newPlot('chart8',popBandsData,layout,{});
});


