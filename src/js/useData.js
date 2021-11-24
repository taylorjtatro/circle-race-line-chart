import React, {useState, useEffect} from 'react';
import {csv, autoType} from 'd3'

const csvUrl = 'https://gist.githubusercontent.com/taylorjtatro/e97db0a9abeb996e236640e0448622c9/raw/a73b164ee9899f8b3e5713881d8f9e5757b1c242/line-chart-with-three-lines.csv'

// const initialData = `Date,OrderTaker,TicketCount,Month
// 01/01/2021,Rick,145,Jan
// 02/01/2021,Rick,137,Feb
// 03/01/2021,Rick,120,Mar
// 04/01/2021,Rick,115,Apr
// 05/01/2021,Rick,142,May
// 06/01/2021,Rick,179,Jun
// 07/01/2021,Rick,200,Jul
// 08/01/2021,Rick,194,Aug
// 09/01/2021,Rick,172,Sep
// 10/01/2021,Rick,107,Oct
// 11/01/2021,Rick,111,Nov
// 12/01/2021,Rick,98,Dec
// 01/01/2021,Josh,100,Jan
// 02/01/2021,Josh,122,Feb
// 03/01/2021,Josh,105,Mar
// 04/01/2021,Josh,120,Apr
// 05/01/2021,Josh,134,May
// 06/01/2021,Josh,180,Jun
// 07/01/2021,Josh,190,Jul
// 08/01/2021,Josh,176,Aug
// 09/01/2021,Josh,150,Sep
// 10/01/2021,Josh,112,Oct
// 11/01/2021,Josh,120,Nov
// 12/01/2021,Josh,90,Dec
// 01/01/2021,Wayne,10,Jan
// 02/01/2021,Wayne,180,Feb
// 03/01/2021,Wayne,30,Mar
// 04/01/2021,Wayne,98,Apr
// 05/01/2021,Wayne,100,May
// 06/01/2021,Wayne,124,Jun
// 07/01/2021,Wayne,156,Jul
// 08/01/2021,Wayne,179,Aug
// 09/01/2021,Wayne,103,Sep
// 10/01/2021,Wayne,99,Oct
// 11/01/2021,Wayne,97,Nov
// 12/01/2021,Wayne,100,Dec`






const initialData = `Date,OrderTaker,TicketCount,CumTicketCount,Revenue,CumRevenue,Month
01/01/2021,Rick,145,145,15000,15000,Jan
02/01/2021,Rick,137,282,23000,38000,Feb
03/01/2021,Rick,120,402,13500,51500,Mar
04/01/2021,Rick,115,517,17952,69452,Apr
05/01/2021,Rick,142,659,15798,85251,May
06/01/2021,Rick,179,838,13570,98821,Jun
07/01/2021,Rick,200,1038,16691,115513,Jul
08/01/2021,Rick,194,1232,13837,129351,Aug
09/01/2021,Rick,172,1404,15175,144526,Sep
10/01/2021,Rick,107,1511,10182,154708,Oct
11/01/2021,Rick,111,1622,10457,165166,Nov
12/01/2021,Rick,98,1720,14909,180116,Dec
01/01/2021,Josh,100,100,11971,26880,Jan
02/01/2021,Josh,122,222,18211,45092,Feb
03/01/2021,Josh,105,327,15540,60632,Mar
04/01/2021,Josh,120,447,12471,73104,Apr
05/01/2021,Josh,134,581,16278,89382,May
06/01/2021,Josh,180,761,17408,106791,Jun
07/01/2021,Josh,190,951,15586,122377,Jul
08/01/2021,Josh,176,1127,19257,141634,Aug
09/01/2021,Josh,150,1277,15472,157107,Sep
10/01/2021,Josh,112,1389,18510,175618,Oct
11/01/2021,Josh,120,1509,14864,190482,Nov
12/01/2021,Josh,90,1599,16749,207231,Dec
01/01/2021,Wayne,100,100,13233,13233,Jan
02/01/2021,Wayne,117,217,11216,24449,Feb
03/01/2021,Wayne,109,326,16205,40655,Mar
04/01/2021,Wayne,98,424,10559,51214,Apr
05/01/2021,Wayne,100,524,13497,64711,May
06/01/2021,Wayne,124,648,10552,75263,Jun
07/01/2021,Wayne,156,804,10055,85319,Jul
08/01/2021,Wayne,179,983,10794,96114,Aug
09/01/2021,Wayne,103,1086,18436,114550,Sep
10/01/2021,Wayne,99,1185,12819,127370,Oct
11/01/2021,Wayne,97,1282,11754,139124,Nov
12/01/2021,Wayne,100,1382,14472,153597,Dec`

const cl = el => console.log(el)

export const useData = () => {
    const [data, setData] = useState(null);

 

    useEffect(() => {

        const headers = initialData.slice(0, initialData.indexOf('\n')).split(',')
        // cl(headers)

        const rows = initialData.slice(initialData.indexOf('\n') + 1).split('\n')
        // cl(rows)

        const preData = rows.map(r => {
            const rowArrs = r.split(',')
            const grouped = headers.reduce((accum, currPos, currIndex) => {
                accum[currPos] = rowArrs[currIndex]
                return accum
            },{})
            // cl(grouped)

            
            return grouped
        })

        const rawData = preData.map(d => {
            d.Date = new Date(d.Date)
            d.TicketCount = +d.TicketCount
            d.CumTicketCount = +d.CumTicketCount
            d.Revenue = +d.Revenue
            d.CumRevenue = +d.CumRevenue
            return d
        })
        // cl(rawData)

    

        //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
        //https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/
        //https://codeburst.io/javascript-array-distinct-5edc93501dc4

        const ordTakers = Array.from(new Set(rawData.map(d => d.OrderTaker)));
        // cl(ordTakers)



        const dataByOrderTaker = ordTakers.map(d => {

            let arr = []
            rawData.forEach(el => {
                if (el.OrderTaker === d) arr.push(el);
            })
            return arr
        })
        // cl(dataByOrderTaker)


        //HAVE ACTUALLY MOVED THE FUNCTIONALITY OF THIS CODE BLOCK INTO MARKS.JS SO AS TO ACTIVELY UPDATE DATA BASED ON DROPDOWN
        const months = [... new Set(rawData.map(d => d.Month))]
        // cl(months)

        const dataByMonths = months.map(d => {
            let arr = [];
            rawData.forEach(el => {
                if (el.Month === d) arr.push(el)
            })

            return arr.sort((a,b) => b.TicketCount - a.TicketCount)
        })
        // cl(dataByMonths)





        setData({rawData, dataByOrderTaker, dataByMonths})


        // const test = [... new Set(rawData.map(d => d.OrderTaker))]
        // cl(test)
        
        // const row = d => {
        //     d.Date = new Date(d.Date)
        //     d.TicketCount = +d.TicketCount
        //     return d
        // }

        // csv(csvUrl, row).then(setData)
    }, [])

    // cl(data) 
    return data
}