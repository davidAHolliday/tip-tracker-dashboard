import React, {useEffect,useState} from "react";
import axios from "axios";

  const SummaryBox = ({date,update}) =>{
    const [summaryData, setSummaryData] = useState([])

    const formatDate = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
      };
  
    useEffect(()=>{
        const formattedDate = formatDate(date);

      axios.get(`https://tip-tracker-dashboard-backend.vercel.app/api/summary/${formattedDate}`)
      .then(function(response){
        console.log(response)
        setSummaryData(response.data)
      })
      .catch(function(error){
        console.error(error)
      })
  
      //force commiet
    },[date,update])
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
            <th>Svc Charge Earned</th>
          </tr>
          <tr>
            <td>{summaryData?.summary?.hoursWorkedThisPeriod.toFixed(2) || 'N/A'}</td>
            <td>{summaryData?.amountNeededToGoal || 'N/A'}</td>
            <td>{summaryData?.summary?.svcChargeThisPeriod || 'N/A'}</td>
          </tr>
          <tr>
            <th>Total Credit Cards</th>
            <th>Hours Worked @ $5.45</th>
            <th>Total Earning CC + Hr</th>
          </tr>
          <tr>
            <td>{summaryData?.summary?.creditCardTipsThisPeriod || 'N/A'}</td>
            <td>{summaryData?.hourlyPayEarned.toFixed(2) || 'N/A'}</td>
            <td>{(summaryData?.summary?.creditCardTipsThisPeriod + summaryData?.hourlyPayEarned + summaryData?.summary?.svcChargeThisPeriod) || 'N/A'}</td>
          </tr>
        </table>
      </div>
    )
}

 export default SummaryBox;

