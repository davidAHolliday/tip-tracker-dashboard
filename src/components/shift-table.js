import React, {useEffect,useState} from "react";
import axios from "axios";

  const ShiftTable = () =>{
    const [shiftData,setShiftData] = useState([])


    useEffect(()=>{
      //Make Date Dynamic
      axios.get('http://localhost:3000/api/payPeriod/10-08-2024')
      .then(function(response){
        console.log(response)
        setShiftData(response.data)
      })
      .catch(function(error){
        console.error(error)
      })
  
    },[])

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

