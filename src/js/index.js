import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom'
import { scaleLinear, scaleTime, scaleOrdinal, min, max, extent, format, transpose, timeFormat, axisLeft, line , group} from 'd3';
import Dropdown from 'react-dropdown'

//React Modules
import { useData } from './useData';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import { Marks } from './Marks';
import {Overlay} from './Overlay'
import { over } from 'lodash';
import { ColorLegend } from './ColorLegend';
// import { ColorLegend } from './ColorLegend';


if (module.hot) module.hot.accept()



//General Measurements

const width = 1150;
const height = 500;
const margin = {
    top: 20,
    right: 200,
    bottom: 66,
    left: 95
}


const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const attributes = [
    {value: 'TicketCount', label: 'Ticket Count'},
    {value: 'CumTicketCount', label: 'Cummulative Ticket Count'},
    {value: 'Revenue', label: 'Revenue'},
    {value: 'CumRevenue', label: 'Cummulative Revenue'}
]

const App = () => {

    //React Hooks
    const data = useData()
    const [mousePos, setMousePos] = useState(innerWidth)
    const [op, setOp] =useState(0)
    const initialYAttribute = 'TicketCount'
    const [yAttribute, setYAttribute] = useState(initialYAttribute)

    


    //Refs
    const mainSvgWindow = useRef(null)
    // console.log(mainSvgWindow.current)
    const overlayRect = useRef(null)

     

    //console.log(lineCoords)
    if (!data) {
        return <pre>Loading...</pre>
    }



    // const rep = [data[0].Rep]
    // //console.log(rep)
    // const sortedData = rep.map(d => {
    //     return {
    //         name: d,
    //         values: data.map(dd => {
    //         return {
    //             date: dd.Date,
    //             count: dd.TicketCount
    //             }
    //         })
    //     }
    // })
    //console.log(sortedData)

    //X
    const xFormat = timeFormat('%b')
    const xValue = d => d.Date
    const xScale = scaleTime()
        .domain(extent(data.rawData, xValue))
        .range([0, innerWidth])
       
    //Y
    // const yValue = d => d.TicketCount;
    const yValue = d => d[yAttribute]
    const yScale = scaleLinear()
        .domain([0, max(data.rawData, yValue)])
        .range([innerHeight, 0])
        .nice()
       console.log(yScale.domain())

    const colorValue = d => d.OrderTaker
    const colorScale = scaleOrdinal()
        .domain(data.rawData.map(colorValue))
        .range(['#E6842A', '#137B80', '#8E6C8A'])


    //X & Y
    const tickOffset = 5;



    return (<>
        <div className='menus-container'>
           <span className='dropdonw-label' htmlFor='x-select'>Y-Axis</span>
           <Dropdown
                options={attributes}
                value={yAttribute}
                onChange={option => setYAttribute(option.value)}
           />
        </div>


        <svg ref={mainSvgWindow} width={width} height={height} >
            {/* Going to need to transform this but first need to see if it is breaking my scales for movement */}
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom 
                    xScale={xScale}
                    xValue={xValue}
                    innerHeight={innerHeight}
                    tickFormat={xFormat}
                    tickOffset={tickOffset}
                />

                <AxisLeft
                    yScale={yScale}
                    innerWidth={innerWidth}
                    tickOffset={tickOffset}
                />

                <Marks
                    data={data}
                    xScale={xScale}
                    xValue={xValue}
                    yScale={yScale}
                    yValue={yValue}
                    mousePos={mousePos}
                    colorScale={colorScale}
                    colorValue={colorValue}
                    innerWidth={innerWidth}
                    op={op}
                    yAttribute={yAttribute}
                />

                {/* <ColorLegend
                    data={data}
                    colorScale={colorScale}
                    monthNum={monthNum}
                    xScale={xScale}
                    mousePos={mousePos}
                    op={op}
                /> */}

                

                <Overlay 
                    innerHeight={innerHeight}
                    innerWidth={innerWidth}
                    overlayRect={overlayRect}
                    mainSvgWindow={mainSvgWindow}
                    mousePos={mousePos}
                    setMousePos={setMousePos}
                    op={op}
                    setOp={setOp}
                />
            </g>
        </svg>
        </>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

