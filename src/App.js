import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import PrivateRoute from './config/PrivateRoute';
import Header from './components/Header';
import UploadImage from './components/UploadImage';
import Login from './pages/Login';
import PhotoGrid from './pages/PhotoGrid';
import { Container } from '@material-ui/core';
import SignUp from './pages/SignUp';

function App() {
  const [openUpload, setOpenUpload] = useState(false);

  return (
    <div className="App">
      <CssBaseline />
      <Header setOpenUpload={setOpenUpload} />
      <Container>
        <Switch>
          <PrivateRoute exact path="/" component={PhotoGrid} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
        <UploadImage openUpload={openUpload} setOpenUpload={setOpenUpload} />
      </Container>
    </div>
  );
}

export default App;
