// set up the defalut views for x and y on page load
var xView = "poverty";
var yView = "obesity";

// read the data from the csv file 
d3.csv(".\\assets\\data\\data.csv").then(function(dataset){
        
        showVisual(dataset, xView, yView); 
        
});

// Create the svg canvas height and width 

var svgHeight = 500;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 

var margin = {
    top: 50, 
    right: 50,
    bottom: 20, 
    left: 50
}

var padding = {
    top: -49,
    right: 19,
    left: 0
}

// Adjust your svg position 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Append svg to the index.html 
var svg = d3.select("#scatter")
          .append("svg")
          .attr("width", width)
          .attr("height", height) 
          .attr("class", "scatter")
          .append("g")
          .attr("tranform", `translate( ${margin.left}, ${margin.top})`);


function showVisual(data, xView, yView){

    data.map(d =>{
  
        data.poverty = +d[xView];
        data.obesity = +d[yView];
        
    });

 // we need to get the min and max of x & y in the dataset to pass to .domain()
var xValues  = data.map(d => parseFloat(d[xView]));
var yValues  = data.map(d => parseFloat(d[yView])); 


// use extent to grab the min and max of the selected Scale and Axis
var xScale = d3.scaleLinear()
            .domain(d3.extent(xValues))
            .range([margin.right, width+margin.right]);

var yScale = d3.scaleLinear()
            .domain(d3.extent(yValues))
            .range([height-40, margin.top]); 


// Add the x & y Axis
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);


// add the x & y scales to the index.html <svg> tag 
svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${padding.top},  ${height - margin.bottom})`)
        .call(xAxis);

svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${padding.left}, ${padding.right})`)
        .call(yAxis);

///I'm not sure why my y axis data doesn't show up in my local host (?)


// Create the <circle></circle> element 

var scatter = svg.selectAll("circles")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale( d[xView] ))
            .attr("cy", d => yScale( d[yView] ))
            .attr("r", 10);


// data[xView] is the scale that will be 
    // updated on click. You will need to update the bubbles with:

    //Text for state abbr      


//Event Handlers
circlesGroup.on("mouseover", function(d, i) {
  toolTip.style("display", "block");
  toolTip.html(`Poverty and Obesity: <strong>${"variable for Poverty and Obesity"[i]}</strong>`)
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + "px");
})
  //Add an onmouseout event to make the tooltip invisible
  .on("mouseover", function() {
    toolTip.style("display", "Poverty and Obesity") //How do I link this data percentage to this toolTip?
  })
  
  
  .on("mouseout", function() {
    toolTip.style("display", "none");
  });
}
//axes labels: 
         
 console.log("data", data[xView]); //Not exactly sure what all this does, namely the xView.