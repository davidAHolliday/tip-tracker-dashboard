import './App.css';
import axios from 'axios'
import { useEffect,useState } from 'react';
import SummaryBox from './components/summary-box';
import ShiftTable from './components/shift-table';






function App() {
  const todayDate = new Date().toISOString();
  const [formData, setFormData] = useState({
    timeIn:'',
    timeOut:'',
    creditCardTips:'',
    tipOut:'',
    holliday:false,
  })


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
      tipOut: parseFloat(formData.tipOut),
    };

    // Send POST request
    axios.post('http://localhost:3000/api/daily', formattedData)
      .then((response) => {
        setFormData({
          timeIn:'',
          timeOut:'',
          creditCardTips:'',
          tipOut:'',
          holliday:false,
        })
        window.location.reload();
        console.log('Data posted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };



  return (
      <div className="App">
      <h1>{todayDate}</h1>
      <SummaryBox  date={todayDate}/>
      <ShiftTable  date={todayDate}/>
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


