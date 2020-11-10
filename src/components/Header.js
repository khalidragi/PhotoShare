import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../constants/colors';
import { ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles({
  icon: {
    marginRight: '1rem',
  },
  avatar: {
    marginLeft: '1rem',
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.dark,
    color: colors.white,
  },
  menu: {
    background: colors.light,
    color: colors.white,
  },
});

const Header = ({ setOpenUpload }) => {
  const { signOut, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openUpload = () => {
    setOpenUpload(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    setAnchorEl(null);
    signOut();
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.root}>
        <div className={classes.root}>
          <PhotoLibraryOutlinedIcon className={classes.icon} />
          <Typography
            variant="h5"
            component="h1"
            color="inherit"
            className={classes.brandLogo}>
            PhotoShare
          </Typography>
        </div>
        <div>
          <IconButton onClick={handleMenu}>
            <Avatar
              src={!user ? '/assets/user_icon.png' : user.photoURL}
              variant="circle"
            />
          </IconButton>
          {user && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorReference="anchorEl"
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <MenuItem onClick={openUpload}>
                <ListItemIcon>
                  <BackupOutlinedIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Upload Image" />
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <ExitToAppOutlinedIcon fontSize="small" color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </MenuItem>
            </Menu>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
