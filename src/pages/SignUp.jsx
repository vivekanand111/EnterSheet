import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'
import apiClient from '../config/api';

export default function SignUp() {

  const validateForm = values => {

    const errors = {};

    if (!values.username) {
      errors.username = 'Name is required';
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!validator.isEmail(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.mobileNumber) {
      errors.mobileNumber = 'mobileNumber is required';
    } else if (!validator.isMobilePhone(values.mobileNumber, ['en-IN', 'en-US'])) {
      errors.mobileNumber = "Invalid phone number"
    }

    if (!values.password) {
      errors.password = 'password is required';
    } else if (values.password.length < 5) {
      errors.password = 'Cannot be less than 5 characters';
    } else if (values.password != values.confirmPassword) {
      errors.confirmPassword = "Password did not match"
    }

    return errors;
  };

  const [formValues, setformValues] = useState({
    username: '', email: '', mobileNumber: '', password: '', confirmPassword: ''
  })
  const [errors, setformErrors] = useState({})

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setotpVerified] = useState(false)
  const [loading, setloading] = useState(false)

  const navigate = useNavigate()

  const handleChageValue = (val, name) => {
    setformValues({ ...formValues, [name]: val })
  }

  return (

    <div className="card p-3 m-3" >
      <div className='d-flex align-items-center justify-content-center'>
        <p style={{ fontSize: "25px" }}>Sign Up</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          let errors = validateForm(formValues)
          setformErrors(errors)
          if (!otpVerified) {
            alert("Email not verified")
          }
          if (Object.keys(errors).length == 0) {
            //console.log(formValues);
            (async () => {
              try {
                const res = await apiClient.post("/user/addUser", { ...formValues, role: 'USER' })
                if (res.data) {
                  navigate("/login")
                }
              } catch (e) {
                console.log("Signup Api error: ")
                if (e.response.data.errorMessage) {
                  alert(e.response.data.errorMessage)
                } else {
                  alert("Sign Up Failed")
                }
              }
            })()

          }

        }}

      >
        <div className="form-group">
          <label className='formLabel'>Name</label>
          <input
            name="username" type="text"
            value={formValues.username} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
            className={(errors.username) ? 'form-control is-invalid' : 'form-control'} />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="form-group">
          <label className='formLabel'>Email Address</label>
          <input name="email" type="email"
            value={formValues.email} onChange={(e) => {
              setOtpSent(false)
              setotpVerified(false)
              handleChageValue(e.target.value, e.target.name)
            }}
            className={(errors.email) ? 'form-control is-invalid' : 'form-control'} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {validator.isEmail(formValues.email) && !otpVerified && <div className="form-group mt-2">
          <Button style={{ width: "100%", backgroundColor: "red" }} onClick={async () => {
            setloading(true)
            try {
              const res = await apiClient.post("/otp/sendOtp", { email: formValues.email })
              if (res.data.message == "Otp sent") {
                setOtpSent(true)
                setOtp("")
                alert("Otp sent to your mail.")
              }
            } catch (error) {
              console.log(error)
              if (error?.response?.data?.message) {
                alert(error?.response?.data.message)
              } else {
                alert("Network Error")
              }
            }
            setloading(false)

          }} variant="contained" disabled={loading}>
            {loading ? (
              <div className="spinner-border text-light" role="status">

              </div>
            ) : "Send mail OTP"}</Button>
        </div>}

        {otpSent && !otpVerified && <div className="form-group row m-1 mt-2" style={{ backgroundColor: "lightyellow" }}>
          <label className='formLabel col'>Enter Otp</label>
          <input type="text" className='col form-control'
            value={otp} onChange={(e) => { setOtp(e.target.value) }}
          />
          <Button className='col' style={{ marginLeft: "10px" }} onClick={async () => {
            try {
              const res = await apiClient.post("/otp/verifyOtp", { email: formValues.email, otp: otp })
              if (res.data.status) {
                setotpVerified(true)
              }
            } catch (error) {
              console.log(error)
              if (error?.response?.data?.message) {
                alert(error?.response?.data.message)
              } else {
                alert("Network Error")
              }
            }
          }} variant="contained">Verify</Button>
        </div>}

        {otpVerified && <div>
          <Button style={{ width: "100%", marginTop: "10px", backgroundColor: "green", color: "white" }}
            disabled variant="contained" >OTP Verified</Button></div>}

        <div className="form-group">
          <label className='formLabel'>Mobile Number</label>
          <input name="mobileNumber" type="text"
            value={formValues.mobileNumber} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
            className={(errors.mobileNumber) ? 'form-control is-invalid' : 'form-control'} />
          {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
        </div>

        <div className="form-group">
          <label className='formLabel'>Password</label>
          <input name="password" type="password"
            value={formValues.password} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
            className={(errors.password) ? 'form-control is-invalid' : 'form-control'} />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label className='formLabel'>Confirm Password</label>
          <input name="confirmPassword" type="password"
            value={formValues.confirmPassword} onChange={(e) => handleChageValue(e.target.value, e.target.name)}
            className={(errors.confirmPassword) ? 'form-control is-invalid' : 'form-control'} />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <div className="form-group pt-4">
          <Button style={{ width: "100%" }} type="submit" variant="contained">Submit</Button>
        </div>

      </form>
    </div>
  )
}
