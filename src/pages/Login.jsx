import React from 'react'
import {
   Avatar,
   Box,
   Button,
   Checkbox,
   Container,
   createTheme,
   CssBaseline,
   FormControlLabel,
   Grid,
   Link,
   TextField,
   ThemeProvider,
   Typography
} from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import apiClient from '../config/api';
import store from '../store/store';
import { loadUser, setAuth, } from '../store/tasksSlice';

const theme = createTheme();

export default function Login() {

   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let obj = {
         email: data.get('email'),
         password: data.get('password'),
      }
      apiClient.post("/login", obj)
         .then(res => {
            console.log(res.data)
            if (res.data) {
               store.dispatch(setAuth(res.data))
               store.dispatch(loadUser()).then((r) => {
                  if (r.payload.role == "USER") {
                     navigate("/userhome")
                  } else if (r.payload.role == "ADMIN") {
                     navigate("/adminhome")
                  }

               })
            }
         }).catch(e => {
            console.log("login api " + e)
         })
   };

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlined />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Login
               </Typography>
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                  />
                  <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="Remember me"
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Login
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link href={""} onClick={() => {
                           navigate("/forgot-password")
                        }} variant="body2">
                           Forgot password?
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link href={""} onClick={() => {
                           navigate("/signup")
                        }} variant="body2">
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   )
}
