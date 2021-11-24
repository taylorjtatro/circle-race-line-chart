import React from 'react';
import {bisector} from 'd3'
// export const ColorLegend = ({colorScale, circleRadius, tickOffset, tickNameSpacing, setHover, hoverValue, fadeOpacity}) =>
//     colorScale.domain().map((domainValue, i) => (
//         <g 
//             className='tick'
//             transform={`translate(0, ${i * tickOffset})`}
//             onMouseEnter={() => {setHover(domainValue)}}
//             onMouseOut={() => {setHover(null)}}
//             //opacity={hoverValue && domainValue === hoverValue ? 1 : fadeOpacity}
//             opacity={hoverValue && domainValue !== hoverValue ? fadeOpacity : 1}
//         >
//             <circle
//                 r={circleRadius}
//                 fill={colorScale(domainValue)}

//             />
//             <text
//                 x={tickNameSpacing}
//                 dy={'.32em'}
//             >
//                 {domainValue}
//             </text>
//         </g>
//     ))
const cl = el => console.log(el)
export const ColorLegend = ({colorScale, data, xScale, mousePos, op}) =>{

    const mouseDate = xScale.invert(mousePos);
    const bisect = bisector(d=> d.Date).right;
    let compareResult = bisect(data.dataByMonths, mouseDate) - 1;

    if (compareResult >= 0) {
        op = 1;
    } else {

        compareResult = 0;

        op=0;

    }
    cl(compareResult)
return <pre></pre>
    // return data.dataByMonths[monthNum].map((el, index) => {
    //     // console.log(monthNum)
    //     // cl(monthNum)
    //     // cl(el)

    //     return <g transform={`translate(0, ${index * 25})`}>
    //         <circle
    //             r={10}
    //             fill={colorScale(el)}
    //         />
    //     </g>
    // })

}