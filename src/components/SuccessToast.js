import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function SimpleSnackbar({ success, setSuccess }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={success}
      autoHideDuration={3000}
      onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity="success">
        Image Uploaded
      </MuiAlert>
    </Snackbar>
  );
}
