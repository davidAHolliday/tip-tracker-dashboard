import React, {useEffect,useState} from "react";
import axios from "axios";

  const ShiftTable = ({formData}) =>{
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
  
    },[formData])

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
          {shiftData.map((record, index) => {
            return (
              <tr className='record-row' key={index}>
                <td>{record.timeStamp}</td>
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

