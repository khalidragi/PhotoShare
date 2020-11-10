import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { useAuth } from '../hooks/useAuth';
import SuccessToast from './SuccessToast';
import { useStorage } from '../hooks/useStorage';
import { makeStyles } from '@material-ui/core';
import { colors } from '../constants/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  title: {
    background: colors.dark,
    color: colors.gray,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputLabel: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '10px',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 20,
    marginLeft: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default function UploadImage({ setOpenUpload, openUpload }) {
  const { user } = useAuth();
  const { uploadPhoto, progress, error, setError, setProgress } = useStorage();
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({});
  const [success, setSuccess] = useState(false);
  const [btn, setBtn] = useState(false);
  const inputRef = useRef();
  const classes = useStyles();

  const reset = () => {
    setProgress(0);
    setInput({ title: '', desc: '' });
    setFile(null);
    inputRef.current.value = '';
    setSuccess(true);
    setOpenUpload(false);
    setError('');
    setBtn(false);
  };

  const handleFile = ({ target }) => {
    setError('');
    setBtn(false);
    setFile(target.files[0]);
  };

  const handleInput = ({ target: { value, name } }) => {
    setError('');
    setBtn(false);
    setInput({ ...input, [name]: value });
  };

  const uploadImage = () => {
    setBtn(true);
    let uid = user.uid;
    let author = user.displayName;
    uploadPhoto(file, input.title, input.desc, uid, author, reset);
  };

  const handleClose = () => {
    setError('');
    setBtn(false);
    setInput({ title: '', desc: '' });
    setFile(null);
    inputRef.current.value = '';
    setOpenUpload(false);
  };

  return (
    <>
      <Dialog
        fullWidth
        open={openUpload}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenUpload(false)}>
        <DialogTitle className={classes.title}>Upload an Image</DialogTitle>
        <DialogContent dividers className={classes.content}>
          <label className={classes.inputLabel}>
            <input type="file" hidden onChange={handleFile} ref={inputRef} />
            <CloudUploadOutlinedIcon />{' '}
            <span className={classes.inputText}> Choose your Image</span>
          </label>
          <p>{file && file.name}</p>

          <TextField
            margin="dense"
            label="Title"
            type="text"
            variant="outlined"
            value={input.title}
            name="title"
            onChange={handleInput}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            multiline
            rows={2}
            variant="outlined"
            value={input.desc}
            name="desc"
            onChange={handleInput}
            required
          />

          {!!progress && (
            <LinearProgress variant="determinate" value={progress} />
          )}
          {error && <p className={classes.error}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={uploadImage} color="primary" disabled={btn}>
            Upload
          </Button>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessToast setSuccess={setSuccess} success={success} />
    </>
  );
}
