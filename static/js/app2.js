function init() {

  // Grab a reference to the dropdown select element
  //var dropdownMenu = d3.select("#selDataset");
  var dropdownMenu = document.getElementById("selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/samples").then((data) => {

      // your-code-here
      data.names.forEach(name => {
        
        var dropDownItem = document.createElement('option');
        dropDownItem.text = name;
        dropDownItem.value = name;
        dropdownMenu.add(dropDownItem);

      });

    // Add ID#s to dropdown menu
    var idList = data.names;
    for (var i = 0; i < idList.length; i++) {
      selectBox = d3.select("#selDataset");
      selectBox.append("option").text(idList[i]);
    };
    
    // create default plot using index [0]
    updatePlots(0);

    // create function to update plots depending on index of the name selected 
    function updatePlots(index) {

      // Create arrays for the charts
      var ChartData = data['samples'][index];
      console.log(ChartData)
      var sample_values = ChartData['sample_values'].slice(0, 10).reverse();
      var otu_ids = ChartData['otu_ids'].slice(0, 10).reverse();
      var washFrequency = data.metadata[+index].wfreq;

      // Create bar chart with index parameter
      var tracec1 = [
        {
          x: sample_values,
          y: otu_ids.map(id => {return `OTU ${id}`}),
          type: 'bar',
          orientation: 'h'
        }
      ];
      
      Plotly.newPlot('bar',  tracec1);

      // Create bubble chart with index parameter
      var trace2 = [
        {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          color: otu_ids,
          opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
        }
        }];
      
      Plotly.newPlot('bubble', trace2);


      // Create guage chart with index parameter
      var trace3 = [
        {
        domain: {x: [0, 1], y: [0,1]},
        type: "indicator",
        mode: "gauge+number",
        value: washFrequency,
        title: { text: "Belly Button Washes Per Week" },
        gauge: {
          axis: { range: [0, 9], tickwidth: 0.5, tickcolor: "black" },
          bar: { color: "#669999" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "transparent",
          steps: [
            { range: [0, 1], color: "#fff" },
            { range: [1, 2], color: "#e6fff5" },
            { range: [2, 3], color: "ccffeb" },
            { range: [3, 4], color: "b3ffe0" },
            { range: [4, 5], color: "#99ffd6" },
            { range: [5, 6], color: "#80ffcc" },
            { range: [6, 7], color: "#66ffc2" },
            { range: [7, 8], color: "#4dffb8" },
            { range: [8, 9], color: "#33ffad" }
  
          ],
        }
      }];
  
      gaugeData = trace3;

      Plotly.newPlot("gauge", trace3);
  
    };



 

    // update the barchart with change event
    d3.select('#selDataset').on("change", optionChanged);

    function optionChanged() {
      //select the drop down ID from html
      var dropdown = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var PersonID = dropdown.property("value");
      console.log(PersonID);
      // Initialize an empty array for the person's data  
      for (var i = 0; i < data.names.length; i++) {
        if (PersonID === data.names[i]) {
          updatePlots(i);
          return
        }
      };

    };

  });
  
};

/*
   Hints: Create additional functions to build the charts,
          build the gauge chart, set up the metadata,
          and handle the event listeners

   Recommended function names:
    optionChanged() 
    buildChart()
    buildGauge()
    buildMetadata()
*/

// Initialize the dashboard
init();

