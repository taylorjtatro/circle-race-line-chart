import { line, bisector, curveMonotoneX } from 'd3';
import React from 'react';

const cl = (el) => console.log(el)

export const Marks = ({xScale, yScale, xValue, yValue, colorScale, colorValue, data, mousePos, innerWidth, op, yAttribute}) => {
  


    const months = [... new Set(data.rawData.map(d => d.Month))]
        // cl(months)

        const dataByMonths = months.map(d => {
            let arr = [];
            data.rawData.forEach(el => {
                if (el.Month === d) arr.push(el)
            })
            //NOTE WE ARE GOING TO PASS IN THE Y ATTRIBUTE HERE
            return arr.sort((a,b) => b[yAttribute] - a[yAttribute])
        })






  return data.dataByOrderTaker.map((d, i) => {

    
    const mouseDate = xScale.invert(mousePos);
    const bisect = bisector(d=> d.Date).right;
    let compareResult = bisect(d, mouseDate) - 1;

    if (compareResult >= 0) {
        op = 1;
    } else {
        compareResult = 0;
        op=0;
    }


    return  <>
            <g>
                {/* Lines */}
                <path
                    stroke={colorScale(colorValue(d[i]))}
                    fill='none'
                    strokeWidth={3}
                    d={line()
                        .x(d => xScale(xValue(d)))
                        .y(d => yScale(yValue(d)))
                        .curve(curveMonotoneX)
                        (d)    
                    }
                />

                
                {/* Moving Circles */}
                <circle
                    className='mark'
                    cx={xScale(xValue(d[compareResult]))}
                    cy={yScale(yValue(d[compareResult]))}
                    stroke={colorScale(colorValue(d[i]))}
                    r={10}
                    fill='none'
                    strokeWidth={2}
                    opacity={op}
                />
            </g>

            {/* Dots on the Line */}
            {
                d.map(dd => (
                    <circle
                        cx={xScale(xValue(dd))}
                        cy={yScale(yValue(dd))}
                        r={4}
                        fill={colorScale(colorValue(dd))}
                    />
                ))
            }
          


            {/* ColorLegend */}
            <g transform={`translate(${innerWidth+50}, ${i * 27 +100})`}>
                <circle
                    // key={dataByMonths[compareResult].TicketCount}
                    // className='mark'
                    cx={10}
                    cy={0}
                    stroke={colorScale(colorValue(dataByMonths[compareResult][i]))}
                    r={10}
                    // fill='none'
                    fill={colorScale(colorValue(dataByMonths[compareResult][i]))}
                    strokeWidth={2}
                    opacity={op}
                />

                <text
                    // key={dataByMonths[compareResult].Month}
                    x={25}
                    dy='.32em'
                    opacity={op}
                >
                    {`${colorValue(dataByMonths[compareResult][i])} ${dataByMonths[compareResult][i][yAttribute]}`}
                </text>
            </g>
            </>
    

})
    

}





