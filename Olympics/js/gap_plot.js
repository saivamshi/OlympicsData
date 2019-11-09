/** Data structure for the data associated with an individual country. */
class PlotData {
    /**
     *
     * @param country country name from the x data object
     * @param xVal value from the data object chosen for x at the active year
     * @param yVal value from the data object chosen for y at the active year
     * @param id country id
     * @param region country region
     * @param circleSize value for r from data object chosen for circleSizeIndicator
     */
    constructor(country, xVal, yVal, num) {
        this.country = country;
        this.xVal = xVal;
        this.yVal = yVal;
        //this.id = id;
        //this.region = region;
        this.circleSize = num;
    }
}

/** Class representing the scatter plot view. */
class GapPlot {

    /**
     * Creates an new GapPlot Object
     *
     * For part 2 of the homework, you only need to worry about the first parameter.
     * You will be updating the plot with the data in updatePlot,
     * but first you need to draw the plot structure that you will be updating.
     *
     * Set the data as a variable that will be accessible to you in updatePlot()
     * Call the drawplot() function after you set it up to draw the plot structure on GapPlot load
     *
     * We have provided the dimensions for you!
     *
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     * @param updateYear a callback function used to notify other parts of the program when a year was updated
     * @param activeYear the year for which the data should be drawn initially
     */
    constructor(medals_data, gdp_data, participants_data, updateYear) {

        // ******* TODO: PART 2 *******

        this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 810 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        //this.activeYear = activeYear;

        this.medals_data = medals_data;
        this.gdp_data = gdp_data;
        this.participants_data= participants_data;
        this.activeYear = 2000;
        this.updateYear = updateYear;

        //YOUR CODE HERE
        //this.drawDropDown("population", "gdp", "life-expectancy");


        // ******* TODO: PART 3 *******
        /**
         For part 4 of the homework, you will be using the other 3 parameters.
         * assign the highlightUpdate function as a variable that will be accessible to you in updatePlot()
         * assign the dragUpdate function as a variable that will be accessible to you in updatePlot()
         */

        //YOUR CODE HERE
        //this.rebuild_population();
        //this.updateYear = updateYear;
        //this.updateCountry = updateCountry;
        //this.selectedCountry = [];


    }

    rebuild_population() {


    }

    /**
     * Sets up the plot, axes, and slider,
     */

    drawPlot() {
        // ******* TODO: PART 2 *******
        /**
         You will be setting up the plot for the scatterplot.
         Here you will create axes for the x and y data that you will be selecting and calling in updatePlot
         (hint): class them.

         Main things you should set up here:
         1). Create the x and y axes
         2). Create the activeYear background text


         The dropdown menus have been created for you!

         */

        d3.select('#scatter-plot')
            .append('div').attr('id', 'chart-view');

        d3.select('#scatter-plot')
            .append('div').attr('id', 'activeYear-bar');

        d3.select('#chart-view')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);

        d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        let svgGroup = d3.select('#chart-view').select('.plot-svg').append('g').classed('wrapper-group', true);

        let tag = svgGroup.append('text')
                          .attr("class", "label");

        tag.text(d=> this.activeYear)
           .attr("x", 300)
           .attr("y", 100);

        let svgXAxis = svgGroup.append('g')
                               .attr("id", "xaxis");
        let svgYAxis = svgGroup.append('g')
                               .attr("id", "yaxis");


        //YOUR CODE HERE
        let x_axis_scale = d3.scaleLinear()
                             .domain([0, 9])
                             .range([0, 700]);

        let y_axis_scale = d3.scaleLinear()
                             .domain([0, 180000])
                             .range([420,0]);

        let x_axis = d3.axisBottom(x_axis_scale);
                      // .scale(x_axis_scale);

        let y_axis = d3.axisLeft(y_axis_scale);
                      // .scale(y_axis_scale);

        svgYAxis.attr("transform", "translate(50, 10)")
                .call(y_axis)
                .append('text');

        //let xAxisTranslate = height/2 + 10;

        svgXAxis.attr("transform", "translate(50, 430)")
                .call(x_axis)
                .append('text');

        // ################################################################
        /* This is the setup for the dropdown menu- no need to change this */

        let dropdownWrap = d3.select('#chart-view').append('div').classed('dropdown-wrapper', true);

        let cWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        cWrap.append('div').classed('c-label', true)
            .append('text')
            .text('Circle Size');

        cWrap.append('div').attr('id', 'dropdown_c').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let xWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        xWrap.append('div').classed('x-label', true)
            .append('text')
            .text('X Axis Data');

        xWrap.append('div').attr('id', 'dropdown_x').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let yWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        yWrap.append('div').classed('y-label', true)
            .append('text')
            .text('Y Axis Data');

        yWrap.append('div').attr('id', 'dropdown_y').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');



        d3.select('#chart-view')
            .append('div')
            .classed('circle-legend', true)
            .append('svg')
            .append('g')
            .attr('transform', 'translate(10, 0)');

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1980)
            .attr('max', 2016)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.activeYear);

        this.updatePlot(2000, "gdp", "medals", "participants");

    }

    FindMax(indicator)
    {
        if (indicator === "gdp") {
            return 120000;
        }
        else if (indicator === "medals") {
            return 400;
        }
        else {
            return 2000;
        }

    }


    FindMin(indicator)
    {
        let min = Number.MAX_VALUE;
        let temp_min = Number.MAX_VALUE;

        for (let i=0; i< this.data[indicator].length; i++)
        {

                if(this.data[indicator][i] === null)
                {
                    continue;
                }
                let temp =  Object.values(this.data[indicator][i]);
                temp.splice(221,4);
                temp_min = d3.min(temp);

                if(temp_min == 0)
                    continue;

                if (temp_min < min)
                {
                    min = temp_min;
                }
        }
        return min;
    }

    getValues(currentYear, indicator, countryId)
    {
        if (this.data[indicator][countryId] != null)
        {
            return this.data[indicator][countryId][currentYear];
        }
        else {
            return 0;
        }
    }

    /**
     * Renders the plot for the parameters specified
     *
     * @param activeYear the year for which to render
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    updatePlot(activeYear, xIndicator, yIndicator, circleSizeIndicator) {
      //  console.log(xIndicator, yIndicator, circleSizeIndicator);


        let year_list = [1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016]

        if (!year_list.includes(parseInt(activeYear)))
               return

        this.updateYear(activeYear);
        // ******* TODO: PART 2 *******

        /*
        You will be updating the scatterplot from the data. hint: use the #chart-view div

        *** Structuring your PlotData objects ***
        You need to start by mapping the data specified by the parameters to the PlotData Object
        Your PlotData object is specified at the top of the file
        You will need get the data specified by the x, y and circle size parameters from the data passed
        to the GapPlot constructor

        *** Setting the scales for your x, y, and circle data ***
        For x and y data, you should get the overall max of the whole data set for that data category,
        not just for the activeYear.

        ***draw circles***
        draw the circles with a scaled area from the circle data, with cx from your x data and cy from y data
        You need to size the circles from your circleSize data, we have provided a function for you to do this
        called circleSizer. Use this when you assign the 'r' attribute.

        ***Tooltip for the bubbles***
        You need to assign a tooltip to appear on mouse-over of a country bubble to show the name of the country.
        We have provided the mouse-over for you, but you have to set it up
        Hint: you will need to call the tooltipRender function for this.

        *** call the drawLegend() and drawDropDown()
        These will draw the legend and the drop down menus in your data
        Pay attention to the parameters needed in each of the functions

        */

      //  console.log("dobbali");
        // Scales

        let X_max = this.FindMax(xIndicator);
        let Y_max = this.FindMax(yIndicator);
        let Circle_max = this.FindMax(circleSizeIndicator);
        // let Circle_min = 3;

        let x_axis_scale = d3.scaleLinear()
                             .domain([0, X_max])
                             .range([0, 750]);

        let y_axis_scale = d3.scaleLinear()
                             .domain([0, Y_max])
                             .range([470,0]);

        let x_axis = d3.axisBottom(x_axis_scale);
        let y_axis = d3.axisLeft(y_axis_scale);
        let svgGroup = d3.select('#chart-view').select('.plot-svg').selectAll('.wrapper-group');

        let X_axis = svgGroup.select("#xaxis")
                             .join('g')
                             .attr("transform", "translate(50, 480)")
                             .call(x_axis);

        let Y_axis = svgGroup.select("#yaxis")
                             .join('g')
                             .attr("transform", "translate(50, 10)")
                             .call(y_axis);

        let list_of_plot_data = [];

        let Data = {}
        Data["medals"] = {}
        Data["gdp"] = {}
        Data["participants"] = {}

      //  console.log(this.medals_data)

        for (let i = 0; i < this.medals_data.length ; i++)
        {
             for (let j = 0; j < this.medals_data[i].values.length; j++)
             {
                             //console.log(this.medals_data[i].values.length);
                if (parseInt(this.medals_data[i].values[j].key) === parseInt(activeYear))
                {
                    //console.log("dobbalivam")
                    Data["medals"][this.medals_data[i].key] = this.medals_data[i].values[j].values.length;
                }
             }

        }

      //  console.log(this.gdp_data);
        for (let i = 1; i < this.gdp_data.length; i++)
        {

               let field_num = activeYear -1975;
               let field_string = "field_"+field_num;
              // console.log(field_string);

               Data["gdp"][this.gdp_data[i]["field_3"].toUpperCase()] = this.gdp_data[i][field_string]

        }



        //Data["participants"] = {"AUS": 0, "BAN": 0, "CAN": 0, "CHN": 0, "FRA": 0, "GBR": 0, "GER": 0, "HUN": 0, "IND": 0,
        //                         "ITA": 0, "JAM": 0, "JPN": 0, "PAK": 0, "POR": 0, "PRK": 0, "QAT": 0, "RUS": 0, "USA": 0 }


      //  console.log(this.participants_data)
      //  console.log(this.medals_data)
        for (let i = 0; i < this.participants_data.length; i++)
        {

             for (let j = 0; j < this.participants_data[i].values.length; j++)
             {
                             //console.log(this.medals_data[i].values.length);

                if (parseInt(this.participants_data[i].values[j].key) === parseInt(activeYear))
                {
                    //console.log("dobdsadbalivam")
                    Data["participants"][this.participants_data[i].key] = this.participants_data[i].values[j].values.length;
                }
             }
        }

      //  console.log(Data)

        /*
        let Data = {}
        Data["medals"] = {};

        for (let i = 0; i < this.data[activeYear].length ; i++)
        {
                if (this.data[activeYear][i].noc in Data["medals"]) {
                   Data["medals"][this.data[activeYear][i].noc] += 1
                } else {
                   Data["medals"][this.data[activeYear][i].noc] = 1
            }
        }

        Data["gdp"] = {};
        console.log(this.gdp_data);
        for (let i = 1; i < this.gdp_data.length; i++)
        {

               let field_num = activeYear -1975;
               let field_string = "field_"+field_num;
               console.log(field_string);

               Data["gdp"][this.gdp_data[i]["field_3"].toUpperCase()] = this.gdp_data[i][field_string]

        }

        console.log(Data["gdp"]);
        console.log(Data["medals"]);

        Data["participants"] = {"AUS": 0, "BAN": 0, "CAN": 0, "CHN": 0, "FRA": 0, "GBR": 0, "GER": 0, "HUN": 0, "IND": 0,
                                 "ITA": 0, "JAM": 0, "JPN": 0, "PAK": 0, "POR": 0, "PRK": 0, "QAT": 0, "RUS": 0, "USA": 0 }



        for (let i = 0; i < this.participants_data[activeYear].length; i++)
        {

             Data["participants"][this.participants_data[activeYear][i]["noc"].toUpperCase()] += 1;
        }


*/

        for (let country in Data["medals"])   {
            list_of_plot_data.push(new PlotData(country,Data[xIndicator][country] , Data[yIndicator][country], Data[circleSizeIndicator][country]))
        }

      //  console.log(list_of_plot_data)

        let  maxSize = this.FindMax(circleSizeIndicator);
        let  minSize = 0;


        /**
         *  Function to determine the circle radius by circle size
         *  This is the function to size your circles, you don't need to do anything to this
         *  but you will call it and pass the circle data as the parameter.
         *
         * @param d the data value to encode
         * @returns {number} the radius
         */

        let circleSizer = function(d) {
            let cScale = d3.scaleSqrt()
                           .range([3, 25])
                           .domain([minSize, maxSize]);
            return cScale(d.circleSize);
        };


        //for ( let i = 0; i < list_of_plot_data.length; i++)
        //{
        //      list_of_plot_data[i].circleSize = circleSizer(list_of_plot_data[i]);
        //}

      //  console.log(X_max, Y_max)

        let circle_x_scale = d3.scaleLinear()
                             .domain([0, X_max])
                             .range([0, 750]);

        let circle_y_scale = d3.scaleLinear()
                             .domain([0, Y_max])
                             .range([470,0]);

        svgGroup = d3.select('#chart-view').select('.plot-svg').selectAll('.wrapper-group');

        const circles = svgGroup.selectAll('circle').data(list_of_plot_data).join('circle');

        circles.attr('cx', function(d) {
                                   console.log(d);
                                   return circle_x_scale(d.xVal);
                                   })
               .attr('cy', d => circle_y_scale(d.yVal))
               .attr('r', d=> circleSizer(d))
               .attr("transform", "translate(50, 0 )")
               .attr("class",  d=> d.country)
               .on('mouseover', function(d){
                     circles.html("<title>" + d.country + "</title>")
               });

/*

               .attr("class",  d=> d.region)
               .attr("id", d=> d.id)
               .on('click', this.updateCountry)
               .on('mouseover', function(d){
                     circles.html("<title>" + d.country + "</title>")
               });
*/

        ///////////////////////////////////////////////////////////////////
//        xIndicator = xIndicator === 'new_population' ? 'population' : xIndicator;
//        yIndicator = yIndicator === 'new_population' ? 'population' : yIndicator;
//        circleSizeIndicator = circleSizeIndicator === 'new_population' ? 'population' : circleSizeIndicator;

          //YOUR CODE HERE
          this.drawDropDown(xIndicator, yIndicator, circleSizeIndicator);
          this.drawYearBar();

//        this.drawLegend(Circle_min, Circle_max);


    }


    /**
     * Returns html that can be used to render the tooltip.
     * @param data
     * @returns {string}
     */
    tooltipRender(data) {
        let text = "<h2>" + data['country'] + "</h2>";
        return text;
    }


    /**
     * Setting up the drop-downs
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    drawDropDown(xIndicator, yIndicator, circleSizeIndicator) {


        let that = this;
        let dropDownWrapper = d3.select('.dropdown-wrapper');
        let dropData = ["gdp", "medals", "participants"];



        /* CIRCLE DROPDOWN */
        let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');

        let optionsC = dropC.selectAll('option')
            .data(dropData);


        optionsC.exit().remove();

        let optionsCEnter = optionsC.enter()
            .append('option')
            .attr('value', d => d);

        optionsCEnter.append('text')
            .text(d => d);

        optionsC = optionsCEnter.merge(optionsC);

        let selectedC = optionsC.filter(d => d === circleSizeIndicator)
            .attr('selected', true);

        dropC.on('change', function(d, i) {
            let cValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let yValue = dropY.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

        /* X DROPDOWN */
        let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');

        let optionsX = dropX.selectAll('option')
            .data(dropData);

        optionsX.exit().remove();

        let optionsXEnter = optionsX.enter()
            .append('option')
            .attr('value', d => d);

        optionsXEnter.append('text')
            .text(d => d);

        optionsX = optionsXEnter.merge(optionsX);

        let selectedX = optionsX.filter(d => d === xIndicator)
            .attr('selected', true);

        dropX.on('change', function(d, i) {
            let xValue = this.options[this.selectedIndex].value;
            let yValue = dropY.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

        /* Y DROPDOWN */
        let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');

        let optionsY = dropY.selectAll('option')
            .data(dropData);

        optionsY.exit().remove();

        let optionsYEnter = optionsY.enter()
            .append('option')
            .attr('value', d => d);

        optionsY = optionsYEnter.merge(optionsY);

        optionsYEnter.append('text')
            .text(d => d);

        let selectedY = optionsY.filter(d => d === yIndicator)
            .attr('selected', true);

        dropY.on('change', function(d, i) {
            let yValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

    }

    /**
     * Draws the year bar and hooks up the events of a year change
     */
    drawYearBar() {

        // ******* TODO: PART 2 *******
        //The drop-down boxes are set up for you, but you have to set the slider to updatePlot() on activeYear change

        // Create the x scale for the activeYear;
        // hint: the domain should be max and min of the years (1800 - 2020); it's OK to set it as numbers
        // the plot needs to update on move of the slider

        /* ******* TODO: PART 3 *******
        You will need to call the updateYear() function passed from script.js in your activeYear slider
        */
        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([1980, 2016]).range([30, 730]);
        let yearSlider = d3.select('.slider');

        let tag = d3.select('.label')
                    .attr("class", "activeYear-background");

        yearSlider.on('input', function() {

        //YOUR CODE HERE
        let year = yearSlider.node().value;
        let dropDownWrapper = d3.select('.dropdown-wrapper');
        let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');
        let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');
        let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');

        //let svgGroup = d3.select('#chart-view').select('.plot-svg').('g').classed('wrapper-group', true);
        let tag = d3.select('.activeYear-background');
        tag.text(year);
        //   .attr("class", "activeYear-background");

        let sliderLabel = d3.select('.slider-wrap');
        let sliderText = sliderLabel.select('text').text(year);
        sliderText.attr('x', yearScale(year));
        sliderText.attr('y', 25)
                  .attr('font-size', "large")
                  .attr('font-weight', 'bold');


        //that.updateYear(year);
        that.updatePlot(year, dropX.node().value , dropY.node().value, dropC.node().value);

        });
    }

    /**
     * Draws the legend for the circle sizes
     *
     * @param min minimum value for the sizeData
     * @param max maximum value for the sizeData
     */
    drawLegend(min, max) {
        // ******* TODO: PART 2*******
        //This has been done for you but you need to call it in updatePlot()!
        //Draws the circle legend to show size based on health data
        let scale = d3.scaleSqrt().range([3, 20]).domain([min, max]);

        let circleData = [min, max];

        let svg = d3.select('.circle-legend').select('svg').select('g');

        let circleGroup = svg.selectAll('g').data(circleData);
        circleGroup.exit().remove();

        let circleEnter = circleGroup.enter().append('g');
        circleEnter.append('circle').classed('neutral', true);
        circleEnter.append('text').classed('circle-size-text', true);

        circleGroup = circleEnter.merge(circleGroup);

        circleGroup.attr('transform', (d, i) => 'translate(' + ((i * (5 * scale(d))) + 20) + ', 25)');

        circleGroup.select('circle').attr('r', (d) => scale(d));
        circleGroup.select('circle').attr('cx', '0');
        circleGroup.select('circle').attr('cy', '0');
        let numText = circleGroup.select('text').text(d => new Intl.NumberFormat().format(d));

        numText.attr('transform', (d) => 'translate(' + ((scale(d)) + 10) + ', 0)');
    }

    /**
     * Reacts to a highlight/click event for a country; draws that country darker
     * and fades countries on other continents out
     * @param activeCountry
     */
    updateHighlightClick(activeCountry) {
        /* ******* TODO: PART 3*******
        //You need to assign selected class to the target country and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        // You will not be calling this directly in the gapPlot class,
        // you will need to call it from the updateHighlight function in script.js
        */
        //YOUR CODE HERE

        let countryData = activeCountry;
        activeCountry = activeCountry.id;

        // selection
        let svgGroup = d3.select('#chart-view')
                         .select('.plot-svg')
                         .selectAll('.wrapper-group');

        // Graying out other stuff
        const circles = svgGroup.selectAll('circle');
        circles.classed('hidden', true);


        // highlight
        activeCountry = activeCountry.toLowerCase();
        activeCountry = "#"+activeCountry;

        svgGroup.select(activeCountry)
                .classed("hidden", false)
                .classed("selected-country",true);

        this.selectedCountry.push(activeCountry);

        //.attr('class', 'i '+activeCountry.region);
    }

    /**
     * Clears any highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //YOUR CODE HERE
        //let svg = d3.select(activeCountry);
        let svgGroup = d3.select('#chart-view')
                         .select('.plot-svg')
                         .selectAll('.wrapper-group');

        // Clear highlighting
        for (let i=0; i< this.selectedCountry.length; i++)
        {
            svgGroup.select(this.selectedCountry[i])
                    .classed("selected-country",false);
        }

        // clear graying
        const circles = svgGroup.selectAll('circle');
        circles.classed('hidden', false);

        this.selectedCountry.pop();

    }

}
