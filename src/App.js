import './App.css';
import axios from 'axios'
import { useEffect,useState } from 'react';
import SummaryBox from './components/summary-box';
import ShiftTable from './components/shift-table';






function App() {

  const [viewDate, setViewDate] = useState(new Date())

  const [update,setUpdate]= useState(false)
  const [formData, setFormData] = useState({
    timeIn:'',
    timeOut:'',
    creditCardTips:'',
    svcCharge:'',
    tipOut:'',
    holliday:false,
  })


  const firstDate = new Date(viewDate); // Create a new Date object to avoid mutating viewDate

  // Calculate the first day of the week (Sunday)
  const firstDayOfWeek = new Date(firstDate.setDate(viewDate.getDate() - viewDate.getDay()));
  
  // Calculate the last day of the week (Saturday)
  const lastDateOfWeek = new Date(firstDayOfWeek); // Start from the first day of the week
  lastDateOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Add 6 days to get Saturday

  

  const handleDateChange = (delta) => {
    setViewDate((prev) => {
      const newDate = new Date(prev); // Create a new Date object to avoid mutating state directly
      newDate.setDate(newDate.getDate() + (delta * 7)); // Adjust by delta * 7 days (weekly shift)
      return newDate; // Return the new date to update the state
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transform timeIn and timeOut to ISO format
    const formattedData = {
      ...formData,
      timeIn: new Date(formData.timeIn).toISOString(),
      timeOut: new Date(formData.timeOut).toISOString(),
      creditCardTips: parseFloat(formData.creditCardTips),
      svcCharge: parseFloat(formData.svcCharge),
      tipOut: parseFloat(formData.tipOut),
    };

    // Send POST request
    axios.post('https://tip-tracker-dashboard-backend.vercel.app/api/daily', formattedData)
      .then((response) => {
        setFormData({
          timeIn:'',
          timeOut:'',
          creditCardTips:'',
          svcCharge:'',
          tipOut:'',
          holliday:false,
        })
        setUpdate(prev=>!prev)
        console.log('Data posted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };


  return (
      <div className="App">
      <button onClick={()=>handleDateChange(-1)}> Back</button><button onClick={()=>handleDateChange(1)}> Next</button><h1>{formatDate(viewDate)}</h1>
      <button onClick={()=>setViewDate(new Date())}> Today</button>
      <h2 style={{marginTop:10}}>Week: {formatDate(firstDayOfWeek)} * {formatDate(lastDateOfWeek)}</h2>
      <SummaryBox  date={viewDate} update={update} setUpdate={setUpdate}/>
      <ShiftTable   date={viewDate} update={update} setUpdate={setUpdate}/>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Time In:</label>
        <input
          type="datetime-local"
          name="timeIn"
          value={formData.timeIn}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Time Out:</label>
        <input
          type="datetime-local"
          name="timeOut"
          value={formData.timeOut}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Credit Card Tips:</label>
        <input
          type="number"
          name="creditCardTips"
          value={formData.creditCardTips}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Svc Charge Tips:</label>
        <input
          type="number"
          name="svcCharge"
          value={formData.svcCharge}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Tip Out:</label>
        <input
          type="number"
          name="tipOut"
          value={formData.tipOut}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Holiday:</label>
        <input
          type="checkbox"
          name="holliday"
          checked={formData.holliday}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
    
      
      </div>
    );
    

}

export default App;


