/**********************************/
// Initialize the visualizatio

d3.json('/samples').then(data => {
    // grab a reference to the dropdown select element
    var selector = d3.select('#selDataset');

    var samplenames = data['names'];

    samplenames.sort((a,b) => (a-b));

    samplenames.forEach(sample => {
        selector
            .append('option')
            .property('value', sample)
            .text(sample);
    });

    //use the first sample from the list to build the initial plots
    var firstSample = samplenames[0];

    buildCharts(firstSample);
    buildMetadata(firstSample);

});

/**********************************/
// buildCharts function

function buildCharts(sample) {
    d3.json('/samples').then(data => {
        var samples = data['samples'];
        var resultArray = samples['filter'](sampleObj => sampleObj['id'] == sample);
        var result = resultArray[0];

        var otu_ids = result['otu_ids'];
        var otu_labels = result['otu_labels'];
        var sample_values = result['sample_values'];

        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            xaxis: {title: 'OTU ID'}
        };

        /**********************************/
        // build a bubble chart

        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size: sample_values, 
                    color: otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);


        /**********************************/
        // build a bar chart

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: {t: 30, 1: 150},
            xaxis: {'title': 'Sample Values'},
            yaxis: {'title': 'OTU ID'}
        };

        Plotly.newPlot('bar', barData, barLayout);
                
    });
};


/**********************************/
// buildMetadata function

function buildMetadata(sample) {
    d3.json('/samples').then((data) => {
        var metadata = data['metadata']

        var resultArray = metadata.filter(sampleObj => sampleObj['id'] == sample);
        var result = resultArray[0];


        var PANEL = d3.select('#sample-metadata');

        PANEL.html('');


        Object.entries(result).forEach(([key, value]) => {
            PANEL.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });

        wash_frequency = result.wfreq;
        buildGauge(wash_frequency);

    });
};

/**********************************/
// buildGauge function

function buildGauge(wash_frequency) {
    var data = [
        {
            type: 'indicator',
            mode: 'gauge+number',
            value: wash_frequency,
            title: { text: "Weekly Wash Frequency", font: { size: 16 } },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: 'darkblue' },
                bar: { color: 'darkblue' },
                bgcolor: 'white',
                borderwidth: 2,
                bordercolor: 'gray', 
                steps: [
                    { range: [0 ,9], color: 'lavender' },
                ]
            }
        }
    ]

    var layout = {
        width: 350,
        height: 300,
        margin: { t: 25, r: 25, 1: 25, b: 25 },
        font: { size: 12 }
    };

    var GAUGE = d3.select('#gauge').node();
    Plotly.newPlot(GAUGE, data, layout);

};


/**********************************/
// optionChanged function

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
};

























