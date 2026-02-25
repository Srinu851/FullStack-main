import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    gmail: '',
    password: ''
  })

  const [passwordErrors, setPasswordErrors] = useState([])

  const validatePassword = (password) => {
    const errors = []

    // Check if starts with capital letter
    if (!/^[A-Z]/.test(password)) {
      errors.push('Must start with a capital letter')
    }

    // Check if has at least one number
    if (!/\d/.test(password)) {
      errors.push('Must contain at least one number')
    }

    // Check if has at least one special character
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/]/.test(password)) {
      errors.push('Must contain at least one special character')
    }

    // Check if has at least 5 characters
    if (password.length < 5) {
      errors.push('Must be at least 5 characters long')
    }

    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Validate password in real-time
    if (name === 'password') {
      const errors = validatePassword(value)
      setPasswordErrors(errors)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Final validation before submission
    const errors = validatePassword(formData.password)
    if (errors.length > 0) {
      setPasswordErrors(errors)
      return
    }

    alert(`Login Attempt:\nGmail: ${formData.gmail}\nPassword: ${'*'.repeat(formData.password.length)}`)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="gmail">Gmail:</label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
            placeholder="Enter your Gmail"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={passwordErrors.length > 0 ? 'error' : ''}
          />
          {passwordErrors.length > 0 && (
            <div className="error-messages">
              {passwordErrors.map((error, index) => (
                <div key={index} className="error-message">• {error}</div>
              ))}
            </div>
          )}
          <div className="password-requirements">
            <small>Password must:</small>
            <ul>
              <li>Start with a capital letter</li>
              <li>Contain at least one number</li>
              <li>Contain at least one special character</li>
              <li>Be at least 5 characters long</li>
            </ul>
          </div>
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  )
}

export default App
