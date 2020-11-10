import {
  Avatar,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useAuth } from '../hooks/useAuth';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { colors } from '../constants/colors';
import { useState } from 'react';

const useStyles = makeStyles({
  container: {
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    height: '80%',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '50%',
    marginBottom: '30px',
  },
  divider: {
    marginBottom: '40px',
    fontWeight: 400,
    fontSize: 50,
    color: '#aaa',
  },
  submit: {
    marginTop: '25px',
    background: colors.darkGray,
  },
  link: {
    marginTop: '25px',
    color: colors.darkGray,
  },
  googleBtn: { background: '#4285F4', color: '#fff' },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

const Login = () => {
  const { signInWithGoogle, signInWithEmail, error } = useAuth();
  const [creds, setCreds] = useState({});
  const classes = useStyles();

  const handleChange = ({ target: { value, name } }) => {
    setCreds({ ...creds, [name]: value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmail(creds.email, creds.password);
  };

  const handleGoogle = () => {
    signInWithGoogle();
  };
  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={4}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" gutterBottom>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
          <div className={classes.link}>
            <Link to="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
            {error && <p className={classes.error}>{error}</p>}
          </div>
        </form>
        <div className={classes.divider}>Or</div>
        <Button
          onClick={handleGoogle}
          variant="contained"
          className={classes.googleBtn}>
          Sign in With Google
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
