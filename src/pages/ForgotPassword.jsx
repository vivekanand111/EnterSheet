import { Grid, Link } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../config/api';

function ForgotPassword() {
   const [email, setEmail] = useState('');
   const [isLoading, setisLoading] = useState(false)
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setisLoading(true)
      setError("")
      setSuccess("")
      try {
         const response = await apiClient.post('/mail/forgotPassword', { email });
         setSuccess(response.data.message);
         setError("")
      } catch (error) {
         setError(error.response.data.message);
         setSuccess("")
      }
      setisLoading(false)
   };
   const navigate = useNavigate();

   return (
      <div className="container mt-5">
         <h1 className="text-center mb-4">Forgot Password</h1>
         <div className="row justify-content-center">
            <div className="col-md-6">
               <form className="card p-4" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                     <label htmlFor="email">Email address</label>
                     <input type="email" className="form-control mt-2"
                        id="email" placeholder="Enter email"
                        value={email} onChange={(e) => setEmail(e.target.value)} required
                     />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                     {isLoading ? (
                        <div className="spinner-border text-light" role="status">

                        </div>
                     ) : "Reset Password"}
                  </button>
                  <div className="mt-3">

                     {error && <div className="alert alert-danger">{error}</div>}
                     {success && <div className="alert alert-success">{success}</div>}
                  </div>
               </form>
            </div>
         </div>
         <Grid container sx={{p:1}}>
            <Grid item xs>
               <Link href={""} 
               onClick={() => {
                  navigate("/login")
               }}
               variant="body2"> Go to Login</Link>
            </Grid>
            <Grid item>
               <Link href={""} onClick={() => {
                  navigate("/signup")
               }} variant="body2">{"Don't have an account? Sign Up"}</Link>
            </Grid>
         </Grid>
      </div>
   );
}

export default ForgotPassword;
