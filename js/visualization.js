// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  //console.log('Hello, world!');

})());
var parseDate = d3.timeParse('%Y-%d-%m %I:%M:%S');

//load data and call function drawing visualization
d3.csv('data/DateSMART_Data (1).csv', function(d) {
  return {
    participant_id: +d.PARTICIPANT_ID,
    ra: +d.RA,
    timepoint: d.TimePoint,
    date: parseDate(d.date),
    placement: d.Placement,
    partner_initials: d.Partner_Initials,
    partner_gender: d.Partner_Gender,
    partner_type: d.Partner_Type,
    va_sex: d.VA_Sex,
    condom_used: d.Condom_Used,
    forced_sex: d.Forced_Sex,
    self_du: d.Self_DU,
    self_au: d.Self_AU,
    partner_du: d.Partner_DU,
    partner_au: d.Partner_AU,
    dating_violence: d.Dating_Violence,
    condition: d.Condition,
    dv_role: d.DV_Role,
    breakup: d.Breakup,
    notes: d.Notes,
    timepoint_code: +d.TimePoint_Code,
    days_from_baseline: +d.Days_from_Baseline
  };
}).then(lineChart);

// function to draw visualization
function lineChart(data){
  // declare DateSMART, control, and combined variables
  var dateSMART = data.filter(function(d){ return d.condition === 'DateSMART'})
  var control = data.filter(function(d) { return d.condition === 'Control'})
  var totalData = data.filter(function(d) { return d.participant_id})
  // declare dispatchers
  let dispatch = d3.dispatch('changeColor');
  let dispatch2 = d3.dispatch('changeColor2');



  // calculate all participants
  var totalParticipants = data.filter(function(d) { return d.days_from_baseline === 0})
  //console.log(totalParticipants);
  // make array of participants
  var par = new Array()
  for(var i = 0; i < totalParticipants.length; i++){
    par.push(totalParticipants[i].participant_id)
  }
  //console.log(par)
  // make dictionary of participants and their IDs
  var participantIDDict = {}
  for(var i = 0; i < par.length; i++ ){
    participantIDDict[par[i]] = i
  }
  //console.log(participantIDDict)

  ///////////////////////// CONTROL //////////////////////////////
  //check if participant selected yes for each response, if so plot for each timepoint
  var yesVASexControl = control.filter(function(d){ return d.va_sex === 'Yes'})
  var rollupControlVA = d3.rollup(yesVASexControl, v => d3.sum(v, d => d.va_sex === 'Yes'), d => d.timepoint_code)
  var VASexControl = new Map()
  VASexControl.set(0, rollupControlVA.get(0))
  VASexControl.set(1, rollupControlVA.get(1))
  VASexControl.set(2, rollupControlVA.get(2))
  VASexControl.set(3, rollupControlVA.get(3))
  VASexControl.set(4, rollupControlVA.get(4))

  var yesCondomUsedControl = control.filter(function(d){ return d.condom_used === 'Yes'})
  var rollupControlCondom = d3.rollup(yesCondomUsedControl, v => d3.sum(v, d => d.condom_used === 'Yes'), d => d.timepoint_code)
  var CondomControl = new Map()
  CondomControl.set(0, rollupControlCondom.get(0))
  CondomControl.set(1, rollupControlCondom.get(1))
  CondomControl.set(2, rollupControlCondom.get(2))
  CondomControl.set(3, rollupControlCondom.get(3))
  CondomControl.set(4, rollupControlCondom.get(4))

  var yesForcedSexControl = control.filter(function(d){ return d.forced_sex === 'Yes'})
  var rollupFSControl = d3.rollup(yesForcedSexControl, v => d3.sum(v, d => d.forced_sex === 'Yes'), d => d.timepoint_code)
  var FSControl = new Map()
  FSControl.set(0, rollupFSControl.get(0))
  FSControl.set(1, rollupFSControl.get(1))
  FSControl.set(2, 0)
  FSControl.set(3, rollupFSControl.get(3))
  FSControl.set(4, rollupFSControl.get(4))

  var yesSelfDUControl = control.filter(function(d){ return d.self_du === 'Yes'})
  var rollupSDUControl = d3.rollup(yesSelfDUControl, v => d3.sum(v, d => d.self_du === 'Yes'), d => d.timepoint_code)
  var SDUControl = new Map()
  SDUControl.set(0, rollupSDUControl.get(0))
  SDUControl.set(1, rollupSDUControl.get(1))
  SDUControl.set(2, rollupSDUControl.get(2))
  SDUControl.set(3, rollupSDUControl.get(3))
  SDUControl.set(4, rollupSDUControl.get(4))

  var yesSelfAUControl = control.filter(function(d){ return d.self_au === 'Yes'})
  var rollupSAUControl = d3.rollup(yesSelfAUControl, v => d3.sum(v, d => d.self_au === 'Yes'), d => d.timepoint_code)
  var SAUControl = new Map()
  SAUControl.set(0, rollupSAUControl.get(0))
  SAUControl.set(1, rollupSAUControl.get(1))
  SAUControl.set(2, rollupSAUControl.get(2))
  SAUControl.set(3, rollupSAUControl.get(3))
  SAUControl.set(4, rollupSAUControl.get(4))

  var yesPartnerDUControl = control.filter(function(d){ return d.partner_du === 'Yes'})
  var rollupPDUControl = d3.rollup(yesPartnerDUControl, v => d3.sum(v, d => d.partner_du === 'Yes'), d => d.timepoint_code)
  var PDUControl = new Map()
  PDUControl.set(0, rollupPDUControl.get(0))
  PDUControl.set(1, rollupPDUControl.get(1))
  PDUControl.set(2, rollupPDUControl.get(2))
  PDUControl.set(3, rollupPDUControl.get(3))
  PDUControl.set(4, rollupPDUControl.get(4))

  var yesPartnerAUControl = control.filter(function(d){ return d.partner_au === 'Yes'})
  var rollupPAUControl = d3.rollup(yesPartnerAUControl, v => d3.sum(v, d => d.partner_au === 'Yes'), d => d.timepoint_code)
  var PAUControl = new Map()
  PAUControl.set(0, rollupPAUControl.get(0))
  PAUControl.set(1, rollupPAUControl.get(1))
  PAUControl.set(2, rollupPAUControl.get(2))
  PAUControl.set(3, rollupPAUControl.get(3))
  PAUControl.set(4, rollupPAUControl.get(4))

  var yesDatingViolenceControl = control.filter(function(d){ return d.dating_violence === 'Yes'})
  var rollupDVControl = d3.rollup(yesDatingViolenceControl, v => d3.sum(v, d => d.dating_violence === 'Yes'), d => d.timepoint_code)
  var DVControl = new Map()
  DVControl.set(0, rollupDVControl.get(0))
  DVControl.set(1, rollupDVControl.get(1))
  DVControl.set(2, rollupDVControl.get(2))
  DVControl.set(3, rollupDVControl.get(3))
  DVControl.set(4, rollupDVControl.get(4))

  //////////////////////////////////////////////////// DATE SMART ///////////////////////////////////////////////////////////
  //check if participant selected yes for each response, if so plot for each timepoint
  var yesVASexDS = dateSMART.filter(function(d){ return d.va_sex === 'Yes'})
  var rollupVASexDS = d3.rollup(yesVASexDS, v => d3.sum(v, d => d.va_sex === 'Yes'), d => d.timepoint_code)
  var VASDS = new Map()
  VASDS.set(0, rollupVASexDS.get(0))
  VASDS.set(1, rollupVASexDS.get(1))
  VASDS.set(2, rollupVASexDS.get(2))
  VASDS.set(3, rollupVASexDS.get(3))
  VASDS.set(4, rollupVASexDS.get(4))

  var yesCondomUsedDS = dateSMART.filter(function(d){ return d.condom_used === 'Yes'})
  var rollupCondomDS = d3.rollup(yesCondomUsedDS, v => d3.sum(v, d => d.condom_used === 'Yes'), d => d.timepoint_code)
  var CondomDS = new Map()
  CondomDS.set(0, rollupCondomDS.get(0))
  CondomDS.set(1, rollupCondomDS.get(1))
  CondomDS.set(2, rollupCondomDS.get(2))
  CondomDS.set(3, rollupCondomDS.get(3))
  CondomDS.set(4, rollupCondomDS.get(4))

  var yesForcedSexDS = dateSMART.filter(function(d){ return d.forced_sex === 'Yes'})
  var rollupForcedSexDS = d3.rollup(yesForcedSexDS, v => d3.sum(v, d => d.forced_sex === 'Yes'), d => d.timepoint_code)
  var ForcedSexDS = new Map()
  ForcedSexDS.set(0, rollupForcedSexDS.get(0))
  ForcedSexDS.set(1, rollupForcedSexDS.get(1))
  ForcedSexDS.set(2, rollupForcedSexDS.get(2))
  ForcedSexDS.set(3, rollupForcedSexDS.get(3))
  ForcedSexDS.set(4, 0)

  var yesSelfDUDS = dateSMART.filter(function(d){ return d.self_du === 'Yes'})
  var rollupSelfDUDS = d3.rollup(yesSelfDUDS, v => d3.sum(v, d => d.self_du === 'Yes'), d => d.timepoint_code)
  var SelfDUDS = new Map()
  SelfDUDS.set(0, rollupSelfDUDS.get(0))
  SelfDUDS.set(1, rollupSelfDUDS.get(1))
  SelfDUDS.set(2, rollupSelfDUDS.get(2))
  SelfDUDS.set(3, rollupSelfDUDS.get(3))
  SelfDUDS.set(4, rollupSelfDUDS.get(4))

  var yesSelfAUDS = dateSMART.filter(function(d){ return d.self_au === 'Yes'})
  var rollupSelfAUDS = d3.rollup(yesSelfAUDS, v => d3.sum(v, d => d.self_au === 'Yes'), d => d.timepoint_code)
  var SelfAUDS = new Map()
  SelfAUDS.set(0, rollupSelfAUDS.get(0))
  SelfAUDS.set(1, rollupSelfAUDS.get(1))
  SelfAUDS.set(2, rollupSelfAUDS.get(2))
  SelfAUDS.set(3, rollupSelfAUDS.get(3))
  SelfAUDS.set(4, rollupSelfAUDS.get(4))

  var yesPartnerDUDS = dateSMART.filter(function(d){ return d.partner_du === 'Yes'})
  var rollupPartnerDUDS = d3.rollup(yesPartnerDUDS, v => d3.sum(v, d => d.partner_du === 'Yes'), d => d.timepoint_code)
  var PartnerDUDS = new Map()
  PartnerDUDS.set(0, rollupPartnerDUDS.get(0))
  PartnerDUDS.set(1, rollupPartnerDUDS.get(1))
  PartnerDUDS.set(2, rollupPartnerDUDS.get(2))
  PartnerDUDS.set(3, rollupPartnerDUDS.get(3))
  PartnerDUDS.set(4, rollupPartnerDUDS.get(4))

  var yesPartnerAUDS = dateSMART.filter(function(d){ return d.partner_au === 'Yes'})
  var rollupPartnerAUDS = d3.rollup(yesPartnerAUDS, v => d3.sum(v, d => d.partner_au === 'Yes'), d => d.timepoint_code)
  var PartnerAUDS = new Map()
  PartnerAUDS.set(0, rollupPartnerAUDS.get(0))
  PartnerAUDS.set(1, rollupPartnerAUDS.get(1))
  PartnerAUDS.set(2, rollupPartnerAUDS.get(2))
  PartnerAUDS.set(3, rollupPartnerAUDS.get(3))
  PartnerAUDS.set(4, rollupPartnerAUDS.get(4))

  var yesDatingViolenceDS = dateSMART.filter(function(d){ return d.dating_violence === 'Yes'})
  var rollupDVDS = d3.rollup(yesDatingViolenceDS, v => d3.sum(v, d => d.dating_violence === 'Yes'), d => d.timepoint_code)
  var DVDS = new Map()
  DVDS.set(0, rollupDVDS.get(0))
  DVDS.set(1, rollupDVDS.get(1))
  DVDS.set(2, rollupDVDS.get(2))
  DVDS.set(3, rollupDVDS.get(3))
  DVDS.set(4, rollupDVDS.get(4))

  // set margin, width, and height
  let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  //create the scale for the xAxis
  var xScale = d3.scaleBand() // ordinal??
  .domain(['0', '1', '2', '3', '4'])
  .range([0, width]);

  //create the scale for the yAxis
  var yScale = d3.scaleLinear()
  .domain([0, 2200])
  .range([(height - margin.bottom - margin.top), 0]);

  // declare svg
  let svg = d3.select('#vis-svg-1')
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of the page.
    .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
    .style('background-color', '#ccc') // change the background color to white
    .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

  // declare chart object
  var chartGroup = svg
    .append('g')
    .attr("class", "line-and-dots")
    .attr('transform','translate(' + margin.left +',' + margin.top + ')');

  //create the xAxis
  var xAxis = d3.axisBottom(xScale);
  chartGroup.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(-42, ' + (height - margin.bottom - margin.top) + ')')
  .call(xAxis);

   // text label for the x axis
   // https://stackoverflow.com/questions/11189284/d3-axis-labeling
   svg.append("text")
   .attr("class", "xlabel")
   .attr("text-anchor", "end")
   .attr("x", width - 150)
   .attr("y", height - 6)
   .text("Timepoint");

   // title
   // http://www.d3noob.org/2013/01/adding-title-to-your-d3js-graph.html
   svg.append("text")
        .attr("x", width - 150)
        .attr("y", 30 )
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("text-decoration", "underline")
        .text("Control Group and Date SMART 'Yes' Responses");

  // make list of variables
  var variablesList = ['Sex', 'Condom Used', 'Forced Sex', 'Self Drug Use', 'Self Alcohol Use', 'Partner Drug Use', 'Partner Alcohol Use', 'Dating Violence']

  // add the options to the button
  d3.select("#selectButton")
  .selectAll('myOptions')
   .data(variablesList)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button


  //create the yAxis
  var yAxis = d3.axisLeft(yScale);
  chartGroup.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(0, 0)')
  .call(yAxis);

  // text label for the y axis
  // https://stackoverflow.com/questions/11189284/d3-axis-labeling
  svg.append("text")
  .attr("class", "ylabel")
  .attr("text-anchor", "end")
  .attr("x", -200)
  .attr("y", 6)
  .attr("dy", ".20em")
  .attr("transform", "rotate(-90)")
  .text("# of Yes Responses");


  // make legend svg
  var svgLeg = d3.select(".vis-svg");

  // declare type of legend and values
  var symbolScale = d3.scaleOrdinal()
  .domain(["- - - - - - - Control", "────── DateSMART"])
  .range([]);

  // add legend to legend svg
  svgLeg.append("g")
  .attr("class", "legendSymbol")
  .attr("transform", "translate(20, 30)");

  // draw legend
  var legendPath = d3.legendSymbol()
  .scale(symbolScale)
  .labelWrap(1000)
  .title("Legend");

  // make call to draw legend
  svgLeg.select(".legendSymbol")
  .call(legendPath);

  //console.log(data.filter(function(d){return d.va_sex[0]}))

 //create the line
 var line = d3.line()
 .x(function(d){
   return xScale(d[0]);
  })
 .y(function(d){
   return yScale(d[1])
 })

 // initialize variables
 var listOfSelectedControlPoints = [];
 var listOfSelectedDSPoints = [];
 var dict = {};

 for (var i in variablesList) {
   dict[variablesList[i]] = false;
 }


 // draw control line
 var controlLine = chartGroup
      .append("path")
        .datum(data.filter(function(d){return d.va_sex==variablesList[0]}))
        .attr('d', line(VASexControl))
        .style("stroke-dasharray", ("3, 3"))
        .attr('class', 'dataLine');

  // draw datesmart line
  var dsLine = chartGroup
        .append("path")
        .datum(data.filter(function(d){return d.va_sex==variablesList[0]}))
        .attr('d', line(VASDS))
        .attr('class', 'dataLine');


    // draw plot circles for datesmart group
   var dotDS = chartGroup.append("g")
      .selectAll(".pointsDS")
      .data(VASDS)
      .enter()
      .append("circle")
        .attr("class", "pointsDS")
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr("cx", function(d) { return xScale(d[0]) })
        .attr("cy", function(d) { return yScale(d[1]) })
        .attr("r", 3)
        .on("click", function() {dispatch2.call('changeColor2', this);})

  // draw plot circles for control group
   var dotControl = chartGroup
      .selectAll('.pointsControl')
      .data(VASexControl)
      .enter()
      .append('circle')
        .attr("class", "pointsControl")
        .attr("cx", function(d) { return xScale(d[0]) })
        .attr("cy", function(d) { return yScale(d[1]) })
        .attr("r", 3)
        .style("fill", "#69b3a2")
        .on("click", function() {dispatch.call('changeColor', this);})
      ;
      // declare initial variable selection
      dict['Sex'] = true;

      //https://stackoverflow.com/questions/45464364/changing-css-fill-for-svg-with-js
      // code to update fill of circles to black when selected and back when deselected
      dispatch.on('changeColor', function() {
        var timepointClicked = (this.cx.baseVal.value) / 84
        if (this.style.fill == "black") {
          this.style.fill = "#69b3a2"
          for (var i = 0; i < listOfSelectedControlPoints.length; i++) {
            if (listOfSelectedControlPoints[i] == timepointClicked) {
              listOfSelectedControlPoints.splice(i, i+1);
            }
          }
        }
        else {
          this.style.fill = "black"
          listOfSelectedControlPoints.push(timepointClicked)
        }

        var variableSelected;
        for (var key in dict) {
          if(dict[key] == true) {
            variableSelected = key
          }
        }

        svg3.selectAll(".point").remove();
        svg3.selectAll(".rectangle").remove();

        if (variableSelected === "Condom Used"){
            //get the timepoints selected
            for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
              var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
              //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
              //for each of the filtered data points  -- draw specific variable shape
              for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
                pid = filteredData[filteredDP].participant_id
                pidToOrderedNum = participantIDDict[pid]
                dayFromBase = filteredData[filteredDP].days_from_baseline
                if (dayFromBase < 460) {
                  if (filteredData[filteredDP].condom_used === "Yes"){
                    draw(d3.symbolTriangle, dayFromBase,  pidToOrderedNum, '#69a3b2', 1) // change back to one
                  }
                }
              }
            }
        }


        if (variableSelected === "Dating Violence"){
          //get the timepoints selected
          for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
            var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape
            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].dating_violence === "Yes"){
                  draw(d3.symbolCircle, dayFromBase,  pidToOrderedNum, '#ffc0cb', 1)
                } // change back to one
              }
            }
          }
        }
        if (variableSelected === "Forced Sex"){
          for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
            var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape
            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].forced_sex === "Yes"){
                  draw(d3.symbolCross, dayFromBase,  pidToOrderedNum, '#40e0d0', 1) // change back to one
                }
              }
            }
          }
        }
        if (variableSelected === "Partner Alcohol Use"){
          for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
            var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape
            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].partner_au === "Yes"){
                  draw(d3.symbolDiamond, dayFromBase,  pidToOrderedNum, '#a633ff', 1)
                }// change back to one
              }
            }
          }
        }
        if (variableSelected === "Partner Drug Use"){
          for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
            var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape
            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].partner_du === "Yes"){
                  draw(d3.symbolSquare, dayFromBase, pidToOrderedNum,'#ff338d', 1);
                }
              }
            }
        }
      }
        if (variableSelected === "Self Alcohol Use"){
          for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
            var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape
            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].self_au === "Yes"){
                  draw(d3.symbolStar, dayFromBase, pidToOrderedNum,'#33ff8c', 1);
                }
              }
            }
        }
      }
        if (variableSelected === "Self Drug Use"){
          for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
            var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape
            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].self_du === "Yes"){
                  draw(d3.symbolWye, dayFromBase, pidToOrderedNum,'#9495e2', 1);
                }
              }
            }

        }
      }

        if (variableSelected === 'Sex') {
          for(var tp = 0; tp < listOfSelectedControlPoints.length; tp++){
            var filteredData = control.filter(function(d) { return d.timepoint_code === listOfSelectedControlPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape
            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              var s = svg3.append("rect")
              .attr("class", "rectangle");
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].va_sex === "Yes"){
                  drawRect(s, dayFromBase, pidToOrderedNum)
                }
              }
            }
        }
      }
      });

      // draw shapes on temporal graph based on which circles are selected
      dispatch2.on('changeColor2', function() {
        var timepointClicked = (this.cx.baseVal.value) / 84
        if (this.style.fill == "black") {
          this.style.fill = "red"
          for (var i = 0; i < listOfSelectedDSPoints.length; i++) {
            if (listOfSelectedDSPoints[i] == timepointClicked) {
              listOfSelectedDSPoints.splice(i, i+1);
            }
          }
        }
        else {
          this.style.fill = "black"
          listOfSelectedDSPoints.push(timepointClicked)
        }


        var variableSelected;
        for (var key in dict) {
          if(dict[key] == true) {
            variableSelected = key
          }
        }



        svg3.selectAll(".point").remove();
        svg3.selectAll(".rectangle").remove();


        if (variableSelected === "Condom Used"){
          //get the timepoints selected
          for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
            var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
            //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
            //for each of the filtered data points  -- draw specific variable shape

            for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
              pid = filteredData[filteredDP].participant_id
              pidToOrderedNum = participantIDDict[pid]
              dayFromBase = filteredData[filteredDP].days_from_baseline
              if (dayFromBase < 460) {
                if (filteredData[filteredDP].condom_used === "Yes") {
                  draw(d3.symbolTriangle, dayFromBase,  pidToOrderedNum, '#69a3b2', 1) // change back to one
                }
              }
            }
          }
      }


      if (variableSelected === "Dating Violence"){
        //get the timepoints selected
        for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
          var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
          //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
          //for each of the filtered data points  -- draw specific variable shape
          for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
            pid = filteredData[filteredDP].participant_id
            pidToOrderedNum = participantIDDict[pid]
            dayFromBase = filteredData[filteredDP].days_from_baseline
            if (dayFromBase < 460) {
              if (filteredData[filteredDP].dating_violence === "Yes"){
                draw(d3.symbolCircle, dayFromBase,  pidToOrderedNum, '#ffc0cb', 1) // change back to one
              }
            }
          }
        }
      }
      if (variableSelected === "Forced Sex"){
        for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
          var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
          //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
          //for each of the filtered data points  -- draw specific variable shape
          for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
            pid = filteredData[filteredDP].participant_id
            pidToOrderedNum = participantIDDict[pid]
            dayFromBase = filteredData[filteredDP].days_from_baseline
            if (dayFromBase < 460) {
              if (filteredData[filteredDP].forced_sex === "Yes"){
                draw(d3.symbolCross, dayFromBase,  pidToOrderedNum, '#40e0d0', 1)
              } // change back to one
            }
          }
        }
      }
      if (variableSelected === "Partner Alcohol Use"){
        for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
          var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
          //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
          //for each of the filtered data points  -- draw specific variable shape
          for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
            pid = filteredData[filteredDP].participant_id
            pidToOrderedNum = participantIDDict[pid]
            dayFromBase = filteredData[filteredDP].days_from_baseline
            if (dayFromBase < 460) {
              if (filteredData[filteredDP].partner_au === "Yes"){
                draw(d3.symbolDiamond, dayFromBase,  pidToOrderedNum, '#a633ff', 1) // change back to one
              }
            }
          }
        }
      }
      if (variableSelected === "Partner Drug Use"){
        for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
          var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
          //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
          //for each of the filtered data points  -- draw specific variable shape
          for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
            pid = filteredData[filteredDP].participant_id
            pidToOrderedNum = participantIDDict[pid]
            dayFromBase = filteredData[filteredDP].days_from_baseline
            if (dayFromBase < 460) {
              if (filteredData[filteredDP].partner_du === "Yes"){
                draw(d3.symbolSquare, dayFromBase, pidToOrderedNum,'#ff338d', 1);
              }
            }
          }
      }
    }
      if (variableSelected === "Self Alcohol Use"){
        for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
          var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
          //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
          //for each of the filtered data points  -- draw specific variable shape
          for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
            pid = filteredData[filteredDP].participant_id
            pidToOrderedNum = participantIDDict[pid]
            dayFromBase = filteredData[filteredDP].days_from_baseline
            if (dayFromBase < 460) {
              if (filteredData[filteredDP].self_au === "Yes"){
                draw(d3.symbolStar, dayFromBase, pidToOrderedNum,'#33ff8c', 1);
              }
            }
          }
      }
    }
      if (variableSelected === "Self Drug Use"){
        console.log(listOfSelectedDSPoints)
        for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
          var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
          console.log(filteredData)
          //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
          //for each of the filtered data points  -- draw specific variable shape
          for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
            pid = filteredData[filteredDP].participant_id
            pidToOrderedNum = participantIDDict[pid]
            dayFromBase = filteredData[filteredDP].days_from_baseline
            if (dayFromBase < 460) {
              if (filteredData[filteredDP].self_du === "Yes"){
                draw(d3.symbolWye, dayFromBase, pidToOrderedNum,'#9495e2', 1);
              }
            }
          }

      }
    }

      if (variableSelected === 'Sex') {
        for(var tp = 0; tp < listOfSelectedDSPoints.length; tp++){
          var filteredData = dateSMART.filter(function(d) { return d.timepoint_code === listOfSelectedDSPoints[tp]})
          //filter data by (control vs datesmart) and (listOfSelectedControlPoints[tp])
          //for each of the filtered data points  -- draw specific variable shape
          for(var filteredDP = 0; filteredDP < filteredData.length; filteredDP++){
            pid = filteredData[filteredDP].participant_id
            pidToOrderedNum = participantIDDict[pid]
            dayFromBase = filteredData[filteredDP].days_from_baseline
            var s = svg3.append("rect")
            .attr("class", "rectangle");
            if (dayFromBase < 460) {
              if (filteredData[filteredDP].va_sex === "Yes"){
                drawRect(s, dayFromBase, pidToOrderedNum)
              }
            }
          }
      }
    }
      });




      //console.log(dict)

      var rollupControlVAs = d3.rollup(data, v => d3.sum(v, d => d.va_sex === 'Yes'), d => d.timepoint_code, d => d.condition)
      var l = ["Control", "DateSMART"]

 // line filter
 // https://www.d3-graph-gallery.com/graph/line_filter.html
 // update selections
 function update(selectedGroup) {

  if (selectedGroup == 'Sex') {
    var dataFilter = data.filter(function(d){return d.va_sex==variablesList[0]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(VASexControl)
    )
    .attr('class', 'dataLine');


    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(VASDS)
    )
    .attr('class', 'dataLine');

    dotControl
        .data(VASexControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])});

    dotDS
        .data(VASDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});


    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Sex'] = true;


  }

  if (selectedGroup == 'Condom Used') {
    var dataFilter = data.filter(function(d){return d.condom_used==variablesList[1]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(CondomControl)
    )



    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(CondomDS)
    )

    dotControl
        .data(CondomControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])})

    dotDS
        .data(CondomDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});


    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Condom Used'] = true;

    }

  if (selectedGroup == 'Forced Sex') {
    var dataFilter = data.filter(function(d){return d.forced_sex==variablesList[2]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(FSControl)
    )

    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(ForcedSexDS)
    )

    dotControl
        .data(FSControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])})

    dotDS
        .data(ForcedSexDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});


    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Forced Sex'] = true;

  }

  if (selectedGroup == 'Self Drug Use') {
    var dataFilter = data.filter(function(d){return d.self_du==variablesList[3]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(SDUControl)
    )

    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(SelfDUDS)
    )

    dotControl
        .data(SDUControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])})


    dotDS
        .data(SelfDUDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});


    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Self Drug Use'] = true;

  }

  if (selectedGroup == 'Self Alcohol Use') {
    var dataFilter = data.filter(function(d){return d.self_au==variablesList[3]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(SAUControl)
    )

    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(SelfAUDS)
    )

    dotControl
        .data(SAUControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])})

    dotDS
        .data(SelfAUDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});


    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Self Alcohol Use'] = true;

    console.log(dict)
  }

  if (selectedGroup == 'Partner Drug Use') {
    var dataFilter = data.filter(function(d){return d.partner_du==variablesList[4]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(PDUControl)
    )

    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(PartnerDUDS)
    )

    dotControl
        .data(PDUControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])})

    dotDS
        .data(PartnerDUDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});


    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Partner Drug Use'] = true;

    console.log(dict)
  }

  if (selectedGroup == 'Partner Alcohol Use') {
    var dataFilter = data.filter(function(d){return d.partner_au==variablesList[5]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(PAUControl)
    )

    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(PartnerAUDS)
    )

    dotControl
        .data(PAUControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])})

    dotDS
        .data(PartnerAUDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});

    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Partner Alcohol Use'] = true;

    console.log(dict)
  }

  if (selectedGroup == 'Dating Violence') {
    var dataFilter = data.filter(function(d){return d.dating_violence==variablesList[6]})

    // Give these new data to update line
    controlLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(DVControl)
    )

    dsLine
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d", line(DVDS)
    )


    dotControl
        .data(DVControl)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0]) })
          .attr("cy", function(d) { return yScale(d[1])})


    dotDS
        .data(DVDS)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xScale(d[0])})
          .attr("cy", function(d) { return yScale(d[1])});

    for (var i in variablesList) {
      dict[variablesList[i]] = false;
    }

    dict['Dating Violence'] = true;

    console.log(dict)
  }

}

// When the button is changed, run the updateChart function
d3.select("#selectButton").on("change", function(d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    update(selectedOption)
})

// VISUALIZATION # 3
// declare svg
let svg3 = d3.select('#vis-svg-3')
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of the page.
    .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
    .style('background-color', '#ccc') // change the background color to white
    .attr('viewBox', [-30, 600, width*4 + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

    //declare chart group
    var chartGroup = svg3
    .append('g')
    .attr('transform','translate(' + margin.left +',' + margin.top + ')');

    // declare width and heights for viewbox and legend correction factors
    var w = width*4.1 + margin.left + margin.right - 100;
    var h = height*.75 + margin.top + margin.bottom + 300;
    var legMove = 70;
    var legMoveH = legMove + h;

  //PREPARE SCALES
    var xScale3 = d3.scaleLinear()
    //accepts
    .domain([0, 460])
    //outputs
    .range([0, w]);

    var yScale3 = d3.scaleLinear()
    //accepts
    .domain([0, totalParticipants.length])
    //outputs
    .range([legMove, h + legMove]);

    var yScale4 = d3.scaleLinear()
    //accepts
    .domain([0, totalParticipants.length])
    //outputs
    .range([0, h + legMove]);

    //PREPARE AXES
    var xAxisBottom = d3.axisBottom(xScale3).ticks(92);
    var xAxisTop = d3.axisTop(xScale3).ticks(92);
    var yAxisLeft = d3.axisLeft(yScale3).ticks(50);
    var yAxisRight = d3.axisRight(yScale3).ticks(50);

    //DRAW AXES
    svg3.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + legMoveH + ")")
    .call(xAxisBottom);

    svg3.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + legMove + ")")
    .call(xAxisTop);

    svg3.append("g")
    .attr("class", "axis")
    .call(yAxisLeft);

    svg3.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + w + ",0)")
    .call(yAxisRight);

    var xgridlines = d3.axisLeft()
                 .tickFormat("")
                 .tickSize(-w)
                 .ticks(20)
                 .scale(yScale3);

    svg3.append("g")
    .attr("class", "main-grid")
    .call(xgridlines);

  // declare object with values for legend
  var ordinal = d3.scaleOrdinal()
    .domain(["Vaginal sex", "Condom used", "Forced sex", "Dating violence", "Partner alcohol use", "Partner drug use", "Self alcohol use", "Self drug use", " "])
    .range(["#f4f1f0", "#000000", "#69a3b2", "#40e0d0", "#ffc0cb", "#a633ff", "#ff338d", "#33ff8c", "#9495e2"]);
  // declare legend svg
  var svgLeg = d3.select("#vis-svg-3");

  // draw legend
  svgLeg.append("g")
    .style("font", "3px arial")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(10, 5)");

  // make legend object
  var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolCircle).size(2)())
    .shapePadding(1)
    .labelOffset(2)
    .labelAlign("start")
    .title("Legend:")
    .scale(ordinal);

  // call drawing of legend
  svgLeg.select(".legendOrdinal")
    .call(legendOrdinal);

    //console.log(totalData)
    //This places shapes on the svg according to particular variable categories by participantID (Y)
    // and day from baseline(X).
    for(var i = 0; i < totalData.length; i++){
      //console.log(totalData[i])
      //gets participant ID
      pid = totalData[i].participant_id
      //translates participant ID to numbered ID from 0 to length -1 of participant IDs
      pidToOrderedNum = participantIDDict[pid]
      //gets days from baseline
      dayFromBase = totalData[i].days_from_baseline
      //console.log(dayFromBase)
      if (dayFromBase < 460) {
        //placeAllShapes(pid, dayFromBase, objectNum)
        if (totalData[i].condom_used === "Yes"){
          var tri = draw(d3.symbolTriangle, dayFromBase, pidToOrderedNum,'#69a3b2', 1);
        }
        if (totalData[i].dating_violence === "Yes"){
          var tri = draw(d3.symbolCircle, dayFromBase, pidToOrderedNum,'#ffc0cb', 1);
        }
        if (totalData[i].forced_sex === "Yes"){
          var tri = draw(d3.symbolCross, dayFromBase, pidToOrderedNum,'#40e0d0', 1);
        }
        if (totalData[i].partner_au === "Yes"){
          var tri = draw(d3.symbolDiamond, dayFromBase, pidToOrderedNum,'#a633ff', 1);
        }
        if (totalData[i].partner_du === "Yes"){
          var tri = draw(d3.symbolSquare, dayFromBase, pidToOrderedNum,'#ff338d', 1);
        }
        if (totalData[i].self_au === "Yes"){
          var tri = draw(d3.symbolStar, dayFromBase, pidToOrderedNum,'#33ff8c', 1);
        }
        if (totalData[i].self_du === "Yes"){
          var tri = draw(d3.symbolWye, dayFromBase, pidToOrderedNum,'#9495e2', 1);
        }
        if (totalData[i].va_sex === "Yes"){
          var s = svg3.append("rect")
          .attr("class", "rectangle");
          drawRect(s, dayFromBase, pidToOrderedNum)
        }
      }
    }

       // draws from these shape options: d3.symbolCirlce, d3.symbolCross,
    //   d3.symbolDiamond, d3.symbolSquare, d3.symbolStar, d3.symbolTriangle,
    //   d3.symbolWye
    // code help from
    //   https://chewett.co.uk/blog/1485/drawing-shapes-in-d3-js-version-5/
    //   https://chewett.co.uk/blog/1483/d3-js-version-5-scatterplot-with-shapes/
    function draw(shape, x, y, color, size) {
      var shape = svg3.append("path")
        .attr("class", "point")
        .attr("d", d3.symbol().type(shape).size(size * 5))
        .attr("transform", function(d){
          return "translate(" + xScale3(x) + "," + yScale3(y) + ")"; })
        .attr('fill', color);
      return shape;
    }

    //select shape
    var s = svg3.append("rect")
    .attr("class", "rectangle");

    function drawRect(shape, xPos, yPos) {
      var yScaleVal = .8
      var xScaleVal = .4
      shape.attr("height",function(d){
        return yScale4(yScaleVal);})
      .attr("width", function(d){
         return xScale3(xScaleVal);})
      .attr("y",function(d){
         return yScale3(yPos - (yScaleVal/2));})
      .attr("x",function(d){
         return xScale3(xPos - (xScaleVal/2));});
    }
}
