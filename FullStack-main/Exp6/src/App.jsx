import { useState } from 'react'
import './App.css'

function App() {
  const [age, setAge] = useState('')

  const calculateAge = (birthDate) => {
    if (!birthDate) return ''
    
    const today = new Date()
    const birth = new Date(birthDate)
    let calculatedAge = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      calculatedAge--
    }
    
    return calculatedAge.toString()
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    const calculatedAge = calculateAge(selectedDate)
    setAge(calculatedAge)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }
    
    alert('Form Data Submitted:\n' + JSON.stringify(data, null, 2));
  }

  return (
    <div className="App">
      <form action="" method="get" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>
        
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" placeholder="Enter your first name" required />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" id="last_name" name="last_name" placeholder="Enter your last name" required />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <input type="radio" id="male" name="gender" value="Male" required />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" required />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input type="date" id="date_of_birth" name="date_of_birth" max={new Date().toISOString().split('T')[0]} onChange={handleDateChange} required />
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <div className="skills-group">
            <div className="skill-item">
              <input type="checkbox" id="java" name="Skills" value="Java" />
              <label htmlFor="java">Java</label>
            </div>
            <div className="skill-item">
              <input type="checkbox" id="python" name="Skills" value="Python" />
              <label htmlFor="python">Python</label>
            </div>
            <div className="skill-item">
              <input type="checkbox" id="javascript" name="Skills" value="JavaScript" />
              <label htmlFor="javascript">JavaScript</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="description" placeholder="Enter your address" required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select id="state" name="State" required>
            <option value="">Select a state</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="Age" value={age} readOnly placeholder="Auto-filled based on date of birth" />
        </div>
      
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  )
}

export default App
