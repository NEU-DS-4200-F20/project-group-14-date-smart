//console.log('Hello, world!');

// draw plot circles
/*    var dotC = chartGroup.append("g").selectAll("myCircles")
.data(VASexControl)
.enter()
.append("circle")
.attr("fill", "red")
.attr("stroke", "none")
.attr("cx", function(d) { return xScale(d[0]) })
.attr("cy", function(d) { return yScale(d[1]) })
.attr("r", 3)   */

/*  var dotControlTest = chartGroup
.selectAll('circle')
.data(rollupControlVAs)
.enter()
.append('circle')
.attr("cx", function(d) { for (item in l) { return xScale(d[0])}})
.attr("cy", function(d) { for (item in l) {
return yScale(d[1].get(l[item])); }})
//console.log(d[1].get(l[item]))}})

.attr("r", 3)
.style("fill", "#69b3a2")
.on("click", function(){dispatch.call('changeColor', this);})
;  */

/*
var dot = chartGroup
.selectAll('circle')
.data(VASDS)
.enter()
.append('circle')
.attr("cx", function(d) { return xScale(d[0]) })
.attr("cy", function(d) { return yScale(d[1]) })
.attr("r", 3)
.style("fill", "#695859"); */

//example output of d3.svg.symbol().type('circle')();
//"M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,
//-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z"

//https://d3-legend.susielu.com/#color-examples
//generates legend
/*var symbolScale =  d3.scaleOrdinal()
.domain(['a longer label','b','c', 'd', 'e'])
.range([ triangleU, circle, cross, diamond, star] );
svg3.append("g")
.attr("class", "legendSymbol")
.attr("transform", "translate(0, 0)");

var legendPath = d3.legendSymbol()
.scale(symbolScale)
.orient("horizontal")
.labelFormat(".03f")
.labelWrap(30)
.title("Symbol Legend Title")
//.on("cellclick", function(d){alert("clicked " + d);});

svg3.select(".legendSymbol")
.call(legendPath);*/

/* var ygridlines = d3.axisTop()
.tickFormat("")
.tickSize(-h)
.ticks(10)
.scale(xScale);*/

/*svg3.append("g")
.attr("class", "main-grid")
.call(ygridlines);*/

/**
* For each data point
*  1) get variable value (that has to do with shape)
*  2) get participant id
*      a) match participant id to key in dict
*      b) yScale3(key -.5)
*  3) get day from baseline
*      a) xScale(day -.5)
*  4) place shape there
*
*/

/*
for(objectNum = 0; objectNum < arraytotal; objectNum++ ){
pid = array[objectNum].getParticipantID
pidToOrderedNum = dict.get(pid)
dayFromBase = array[objectNum].getDaysFromBase
placeAllShapes(pid, dayFromBase, objectNum)
}


function placeAllShapes(x, y, obj){
for(i = 0; i < num; i++ ){

}
}*/

// an few example calls
/*var tri = draw(d3.symbolTriangle,25, 25,'#69a3b2', 1);
var wye = draw(d3.symbolWye, 1, 3,'#ffc0cb', 1);
var star = draw(d3.symbolStar, 1, 4,'#40e0d0', 1);
var cross = draw(d3.symbolCross, 1, 5, '#40e0d0', 1);
var diamond = draw(d3.symbolDiamond, 1, 6, '#40e0d0', 1);
var circle = draw(d3.symbolCircle, 1, 7, '#40e0d0', 1);
var square = draw(d3.symbolSquare, 1,8, '#40e0d0', 1);
var rect = svg3.append("rect")
.attr("class", "rectangle");
drawRect(rect, 1, 9);*/

/* svg3.append("g")
.attr("class", "legendQuant")
.attr("transform", "translate(20,20)");

var legend = d3.legendColor()
.labelFormat(d3.format(".2f"))
.useClass(true)
.title("A really really really really")
.titleWidth(10)
.scale(yScale3);

svg3.select(".legendQuant")
.call(legend);*/

//placeShape(s2, 1, 2);
/*
//create the scale for the xAxis
var xScale3 = d3.scaleBand() // ordinal??
.domain(['0', '1', '2', '3', '4'])
.range([0, width]);


var par = new Array()
for(var i = 0; i < totalParticipants.length; i++){
par.push(totalParticipants[i].participant_id)
}
console.log(par)

//create the scale for the yAxis
var yScale3 = d3.scaleBand()
/* .domain([0, d3.max([yesVASexCountControl, yesCondomUsedCountControl, yesForcedSexCountControl, yesSelfAUCountControl, yesSelfDUCountControl, yesSelfAUCountControl,
yesPartnerAUCountControl, yesPartnerDUCountControl, yesDVCountControl])]) */ //I think instead it should maybe use yes____, or maybe keep the axis the same?
/*.domain(par)
.range([height - margin.bottom - margin.top, 0]);


//create the xAxis
var xAxis = d3.axisTop(xScale3)
.tickSize(height -80);
chartGroup.append('g')
.attr('class', 'x axis')
.attr('transform', 'translate(-42, ' + (height - margin.bottom - margin.top) + ')')
.call(xAxis);

// text label for the x axis
// https://stackoverflow.com/questions/11189284/d3-axis-labeling
svg3.append("text")
.attr("class", "xlabel")
.attr("text-anchor", "end")
.attr("x", width - 150)
.attr("y", height - 6)
.text("Days From Each Timepoint");

// title
// http://www.d3noob.org/2013/01/adding-title-to-your-d3js-graph.html
svg3.append("text")
.attr("x", width - 150)
.attr("y", 30 )
.attr("text-anchor", "middle")
.style("font-size", "16px")
.style("text-decoration", "underline")
.text("Date SMART Group 'Yes' Responses");

//create the yAxis
var yAxis = d3.axisLeft(yScale3)
.tickSize(-width + 40);
chartGroup.append('g')
.attr('class', 'y axis')
.attr('transform', 'translate(0, 0)')
.call(yAxis);

// text label for the y axis
// https://stackoverflow.com/questions/11189284/d3-axis-labeling
svg3.append("text")
.attr("class", "ylabel")
.attr("text-anchor", "end")
.attr("x", -200)
.attr("y", 6)
.attr("dy", ".20em")
.attr("transform", "rotate(-90)")
.text("Participants");

/*

//http://www.d3noob.org/2013/01/adding-grid-lines-to-d3js-graph.html
svg3.append("g")
.attr("class", "grid")
.attr("transform", "translate(0," + height + ")")
.call(make_x_axis()
.tickSize(-height, 0, 0)
.tickFormat("")
);


svg3.append("g")
.attr("class", "grid")
.call(make_y_axis()
.tickSize(-width, 0, 0)
.tickFormat("")
);*/

/*
// title
// http://www.d3noob.org/2013/01/adding-title-to-your-d3js-graph.html
svg.append("text")
     .attr("x", width - 150)
     .attr("y", 30 )
     .attr("text-anchor", "middle")
     .style("font-size", "10px")
     .style("text-decoration", "underline")
     .text("Control Group and Date SMART 'Yes' Responses");
     */
