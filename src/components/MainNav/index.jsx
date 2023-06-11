import { Fragment } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function MainNav() {
  const { t } = useTranslation();
  return  (
    <Fragment>
      <Link to="dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
            <ListItemText primary={t('titles.dashboard')} />
        </ListItemButton>
      </Link>
      <Link to="orders">
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={t('titles.orders')} />
        </ListItemButton>
      </Link>
      <Link to="create-order">
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={t('titles.createOrder')} />
        </ListItemButton>
      </Link>
    </Fragment>
  );
}

export default MainNav;