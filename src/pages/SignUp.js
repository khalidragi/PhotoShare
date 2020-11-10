import {
  Paper,
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
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
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

const SignUp = () => {
  const { signUp, error } = useAuth();
  const [creds, setCreds] = useState({});
  const classes = useStyles();

  const handleChange = ({ target: { value, name } }) => {
    setCreds({ ...creds, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = `${creds.firstName} ${creds.lastName}`;
    signUp(creds.email, creds.password, displayName);
  };
  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={4}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            autoComplete={null}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            autoComplete="off"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
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
            Sign Up
          </Button>
          <div className={classes.link}>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </div>
          {error && <p className={classes.error}>{error}</p>}
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
