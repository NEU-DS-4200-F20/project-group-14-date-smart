// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  //console.log('Hello, world!');

})());

var parseDate = d3.timeParse('%Y-%d-%m %I:%M:%S');

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
    timepoint_code: +d.TimePoint_Code
  };
}).then(lineChart);

function lineChart(data){
  var dateSMART = data.filter(function(d){ return d.condition === 'DateSMART'})
  var control = data.filter(function(d) { return d.condition === 'Control'})
  var totalParticipants = data.filter(function(d) { return d.participant_id === 'PARTICIPANT_ID'})
  var p = data.filter(function(d) { return d.participant_id})
  var p2 = new Set(p)
  //var p = d3.map(data, function(d){return(d.participant_id)}).keys()
  //console.log(p);

  ///////////////////////// CONTROL //////////////////////////////
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
  ForcedSexDS.set(4, rollupForcedSexDS.get(4))

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
  /* .domain([0, d3.max([yesVASexCountControl, yesCondomUsedCountControl, yesForcedSexCountControl, yesSelfAUCountControl, yesSelfDUCountControl, yesSelfAUCountControl,
  yesPartnerAUCountControl, yesPartnerDUCountControl, yesDVCountControl])]) */ //I think instead it should maybe use yes____, or maybe keep the axis the same?
  .domain([0, 2500])
  .range([height - margin.bottom - margin.top, 0]);

  let svg = d3.select('#vis-svg-1')
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of the page.
    .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
    .style('background-color', '#ccc') // change the background color to white
    .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

  var chartGroup = svg
    .append('g')
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
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Control Group 'Yes' Responses");

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


 //create the line
 var line = d3.line()
 .x(function(d){
   return xScale(d[0]);
  })    
 .y(function(d){
   return yScale(d[1])
 })

 //draw the line -- CONTROL GROUP
 chartGroup.append('path')
 .attr('d', line(VASexControl))
 .attr('class', 'dataLine'); 

 //draw the line
 chartGroup.append('path')
 .attr('d', line(CondomControl))
 .attr('class', 'dataLine1'); 

 chartGroup.append('path')
 .attr('d', line(FSControl))
 .attr('class', 'dataLine2'); 

 chartGroup.append('path')
 .attr('d', line(SDUControl))
 .attr('class', 'dataLine3');

 chartGroup.append('path')
 .attr('d', line(SAUControl))
 .attr('class', 'dataLine4');

 chartGroup.append('path')
 .attr('d', line(PDUControl))
 .attr('class', 'dataLine5');

 chartGroup.append('path')
 .attr('d', line(PAUControl))
 .attr('class', 'dataLine6');

 chartGroup.append('path')
 .attr('d', line(DVControl))
 .attr('class', 'dataLine7');





// VISUALIZATION #2
let svg2 = d3.select('#vis-svg-2')
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of the page.
    .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
    .style('background-color', '#ccc') // change the background color to white
    .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

    var chartGroup = svg2
    .append('g')
    .attr('transform','translate(' + margin.left +',' + margin.top + ')');

  //create the xAxis
  var xAxis = d3.axisBottom(xScale);
  chartGroup.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(-42, ' + (height - margin.bottom - margin.top) + ')')
  .call(xAxis);

   // text label for the x axis
   // https://stackoverflow.com/questions/11189284/d3-axis-labeling
   svg2.append("text")
   .attr("class", "xlabel")
   .attr("text-anchor", "end")
   .attr("x", width - 150)
   .attr("y", height - 6)
   .text("Timepoint");

   // title
   // http://www.d3noob.org/2013/01/adding-title-to-your-d3js-graph.html
   svg2.append("text")
        .attr("x", width - 150)             
        .attr("y", 30 )
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Date SMART Group 'Yes' Responses");

  //create the yAxis
  var yAxis = d3.axisLeft(yScale);
  chartGroup.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(0, 0)')
  .call(yAxis); 
  
  // text label for the y axis
  // https://stackoverflow.com/questions/11189284/d3-axis-labeling
  svg2.append("text")
  .attr("class", "ylabel")
  .attr("text-anchor", "end")
  .attr("x", -200)
  .attr("y", 6)
  .attr("dy", ".20em")
  .attr("transform", "rotate(-90)")
  .text("# of Yes Responses");   


  //draw the line
  chartGroup.append('path')
  .attr('d', line(VASDS))
  .attr('class', 'dataLine'); 

  chartGroup.append('path')
  .attr('d', line(CondomDS))
  .attr('class', 'dataLine1'); 
 
  chartGroup.append('path')
  .attr('d', line(ForcedSexDS))
  .attr('class', 'dataLine2'); 
 
  chartGroup.append('path')
  .attr('d', line(SelfDUDS))
  .attr('class', 'dataLine3');
 
  chartGroup.append('path')
  .attr('d', line(SelfAUDS))
  .attr('class', 'dataLine4');
 
  chartGroup.append('path')
  .attr('d', line(PartnerDUDS))
  .attr('class', 'dataLine5');
 
  chartGroup.append('path')
  .attr('d', line(PartnerAUDS))
  .attr('class', 'dataLine6');
 
  chartGroup.append('path')
  .attr('d', line(DVDS))
  .attr('class', 'dataLine7');




// VISUALIZATION # 3
let svg3 = d3.select('#vis-svg-3')
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of the page.
    .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
    .style('background-color', '#ccc') // change the background color to white
    .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

    var chartGroup = svg3
    .append('g')
    .attr('transform','translate(' + margin.left +',' + margin.top + ')');

    //create the scale for the xAxis
  var xScale3 = d3.scaleBand() // ordinal??
  .domain(['0', '1', '2', '3', '4'])
  .range([0, width]);

  //create the scale for the yAxis
  var yScale3 = d3.scaleLinear()
  /* .domain([0, d3.max([yesVASexCountControl, yesCondomUsedCountControl, yesForcedSexCountControl, yesSelfAUCountControl, yesSelfDUCountControl, yesSelfAUCountControl,
  yesPartnerAUCountControl, yesPartnerDUCountControl, yesDVCountControl])]) */ //I think instead it should maybe use yes____, or maybe keep the axis the same?
  .domain([0, 2500])
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




}
  
  