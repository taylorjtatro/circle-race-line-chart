import { tickFormat } from 'd3';
import React from 'react';


export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset}) => 
    xScale.ticks().map(tickValue => (
        <g className='tick' transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight}/>
            <text
                textAnchor='middle'
                dy='.71em'
                y={innerHeight + tickOffset}
            >
                {tickFormat(tickValue)}
            </text>
        </g>
    ))