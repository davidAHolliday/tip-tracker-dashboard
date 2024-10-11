import React, {useEffect,useState} from "react";
import axios from "axios";

  const SummaryBox = () =>{
    const [summaryData, setSummaryData] = useState([])
  
    useEffect(()=>{
      axios.get('http://localhost:3000/api/summary')
      .then(function(response){
        console.log(response)
        setSummaryData(response.data)
      })
      .catch(function(error){
        console.error(error)
      })
  
    },[])
    return(
        <div className='summary-box'>
        <table>
          <tr>
            <th colSpan={2}>Avg Hourly</th>
            <th>Avg Daily</th>
          </tr>
          <tr>
            <td colSpan={2}>{summaryData?.avgHourlyRate?.toFixed(2) || 'N/A'}</td>
            <td>{summaryData?.avgTipsPerShift?.toFixed(2) || 'N/A'}</td>
          </tr>
          <tr>
            <th>Hours Worked This week</th>
            <th>Amount Remaining to Goal</th>
            <th>Days Left in Week</th>
          </tr>
          <tr>
            <td>{summaryData?.summary?.hoursWorkedThisPeriod.toFixed(2) || 'N/A'}</td>
            <td>{summaryData?.amountNeededToGoal || 'N/A'}</td>
            <td>{summaryData?.daysLeftInWeek || 'N/A'}</td>
          </tr>
          <tr>
            <th>Total Credit Cards</th>
            <th>Total Hourly Earned</th>
            <th>Total Earning CC + Hr</th>
          </tr>
          <tr>
            <td>{summaryData?.summary?.creditCardTipsThisPeriod || 'N/A'}</td>
            <td>{summaryData?.hourlyPayEarned || 'N/A'}</td>
            <td>{(summaryData?.summary?.creditCardTipsThisPeriod + summaryData?.hourlyPayEarned) || 'N/A'}</td>
          </tr>
        </table>
      </div>
    )
}

 export default SummaryBox;

