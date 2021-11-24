import React, { useEffect } from 'react'

export const Overlay = ({innerHeight, innerWidth, mousePos, setMousePos, mainSvgWindow, overlayRect, op, setOp}) => {
    // console.log(mainSvgWindow)
    // const pt = mainSvgWindow.current.createSVGPoint()
        
    
    
    return<g>
        {/* <line 
            y2={innerHeight} 
            transform={`translate(${mousePos}, 0)`} stroke='black' 
            strokeWidth={2} 
            opacity={op}
            className='mark'
        /> */}

        <rect
            ref={overlayRect}
            width={innerWidth}
            height={innerHeight}
            pointerEvents='all'
            fill='none'
            onMouseLeave={e => setOp(0)}
            onMouseMove={e => {

                const pt = mainSvgWindow.current.createSVGPoint()
                    pt.x = e.clientX
                    pt.y = e.clientY
                    // console.log(pt)
               

                 var cursorPt =  pt.matrixTransform(overlayRect.current.getScreenCTM().inverse());
                //  console.log(cursorPt)
                setMousePos(cursorPt.x)
                setOp(1)

            }}
        />

   </g>
      
}




