import React, {useEffect,useState} from "react";
import axios from "axios";

  const ShiftTable = ({date}) =>{
    const [shiftData,setShiftData] = useState([])



    const formatDate = (date) => {
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };

    useEffect(()=>{
      const formattedDate = formatDate(date);

      //Make Date Dynamic
      axios.get(`https://tip-tracker-dashboard-backend.vercel.app/api/payPeriod/${formattedDate}`)
      .then(function(response){
        console.log(response)
        setShiftData(response.data)
      })
      .catch(function(error){
        console.error(error)
      })
  
    },[date])

    return(
      <div className='shift-table'>
      <table>
        <thead>
          <th>Date</th>
          <th>Time Worked</th>
          <th>Credit Cards Tips</th>
          <th>Tip Out</th>
          <th>Holiday</th>
        </thead>
        <tbody>
          {shiftData.sort((a, b) => new Date(a.timeIn) - new Date(b.timeIn)).map((record, index) => {
            const formatDateTime = `${new Date(record.timeIn).getMonth()+1}/${new Date(record.timeIn).getDate()}/${new Date(record.timeIn).getFullYear()}`
            console.log(formatDateTime, 'findme')
            return (
              <tr className='record-row' key={index}>
                <td>{formatDateTime}</td>
                <td>{record.hoursWorked}</td>
                <td>{record.creditCardTips}</td>
                <td>{record.tipOut}</td>
                <td>{record.holliday? "True":""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
}

 export default ShiftTable;

