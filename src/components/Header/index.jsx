import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from "react-i18next";

import { signOut, useAuthDispatch } from '../Auth';

function Header({ toggleDrawer }) {
  const { t } = useTranslation();
  const dispatch = useAuthDispatch();
  const handleSignOut = () => {
    signOut(dispatch);
  };
  return (<MUIToolbar
    sx={{
      pr: '24px',
    }}
  >
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      onClick={toggleDrawer}
      sx={{
        marginRight: '36px',
        ...(open && { display: 'none' }),
      }}
    >
      <MenuIcon />
    </IconButton>
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1 }}
    >
      Dashboard
    </Typography>
    <IconButton color="inherit">
      <Badge badgeContent={4} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <Button
      type="button"
      color="secondary"
      variant="contained"
      sx={{ mt: 2, mb: 2, ml: 2 }}
      onClick={handleSignOut}
    >
      {t('actions.signOut')}
    </Button>
  </MUIToolbar>);
}

export default Header;