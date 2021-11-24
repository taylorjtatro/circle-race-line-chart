import React from 'react';

export const AxisLeft = ({yScale, innerWidth, tickOffset}) => (
    yScale.ticks().map(tickValue => (
        <g className='tick' transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text
                textAnchor='end'
                x={-10}
                dy='.32em'
            >{tickValue}</text>
        </g>
    ))
)