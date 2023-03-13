import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import apiClient from '../config/api';

export default function ResetPassword() {
   const [searchParams, setSearchParams] = useSearchParams()
   const [token, settoken] = useState()
   const [verified, setverified] = useState(false)

   const [error, setError] = useState(null);
   const [success, setSuccess] = useState("");
   const [isLoading, setisLoading] = useState(false);
   const [errorMessage, seterrorMessage] = useState('')

   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   useEffect(() => {
      let token = searchParams.get("token")
      settoken(token);
      (async () => {
         try {
            const response = await apiClient.get(`/mail/verifyPasswordToken/${token}`)
            if (response.data == "Token verified") {
               setverified(true)
            }
         } catch (e) {
            setError(e.response.data)
         }
      })();

   }, [token]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setisLoading(true)
      if (password == confirmPassword && password.length > 4) {
         try {
            const res = await apiClient.post('/mail/resetPassword', {
               token,
               password,
            })
            setSuccess(res.data)
         } catch (error) {
            console.log(error)
            seterrorMessage(error.response.data);
         }
      } else {
         seterrorMessage('Passwords do not match. or Length is not more than 4');
      }
      setisLoading(false)
   };

   const navigate = useNavigate();

   if (success) {
      return <div>
         <div className="card p-3 m-3">
            <div className="alert alert-success">{success}</div>
            <button onClick={() => { navigate("/login") }} className="btn btn-primary">Go to Login</button>
         </div>
      </div>
   }

   return (
      <div>
         {verified ? (
            <div className="container mt-5">
               <div className="row justify-content-center">
                  <div className="col-md-6">
                     <h3 className="mb-3">Reset Password</h3>
                     <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                           <label htmlFor="password">New Password</label>
                           <input
                              type="password"
                              className="form-control mt-1"
                              id="password"
                              placeholder="Enter new password"
                              value={password}
                              onChange={(event) => setPassword(event.target.value)}
                              required
                           />
                        </div>
                        <div className="form-group mb-3">
                           <label htmlFor="confirmPassword">Confirm Password</label>
                           <input
                              type="password"
                              className="form-control mt-1"
                              id="confirmPassword"
                              placeholder="Confirm new password"
                              value={confirmPassword}
                              onChange={(event) => setConfirmPassword(event.target.value)}
                              required
                           />
                        </div>
                        {errorMessage && (
                           <div className="alert alert-danger">{errorMessage}</div>
                        )}
                        <button
                           type="submit"
                           className="btn btn-primary"
                           disabled={isLoading}
                        >
                           {isLoading && (
                              <span
                                 className="spinner-border spinner-border-sm mr-2"
                                 role="status"
                                 aria-hidden="true"
                              ></span>
                           )}
                           {isLoading ? 'Loading...' : 'Reset Password'}
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         ) : (
            <div>{
               error && <div className="m-3 alert alert-danger">{error}</div>
               || 'Loading...'
            }</div>
         )}
      </div>
   );
}
