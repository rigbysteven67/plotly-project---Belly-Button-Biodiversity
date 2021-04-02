# plotly-project---Belly Button Biodiversity

Week 15 (and 16) Plot.ly Mini-Project - Belly Button Biodiversity

https://stevens-plotly-project.herokuapp.com/ 

For project, I built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The data was served up from samples.json via a Flask endpoint.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Develop an endpoint point using Flask 

## Step 2: Build the Web Application with Plotly 

1. Used the D3 library to read in the samples endpoint that was created in step 1.

2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

3. Created a bubble chart that displays each sample.

4. Displayed the sample metadata, i.e., an individual's demographic information.

5. Displayed each key-value pair from the metadata JSON object

6. Update all of the plots any time that a new sample is selected.

## Step 3: Incorporate the Gauge Chart 

* Adapted the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

* The gauge chart accounts for values ranging from 0 through 9.

* Update the chart whenever a new sample is selected.

- - -



