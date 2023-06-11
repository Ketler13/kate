import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

import { orderStatusesList } from '../../constants';
import { getOrder, updateOrderStatus, deleteOrder } from '../../services/order';
import { calculateDrill } from '../../services/profileDrill';

export default function Order() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [order, setOrder] = useState(null);
  const loadOrder = useCallback(async () => {
    const foundOrder = await getOrder(params.id);

    setOrder(foundOrder);
  }, [params.id]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const orderOptions = useMemo(() => orderStatusesList.map(status => ({
    id: status,
    label: t(`order.statuses.${status}`)
  })), [t]);

  const handleStatusChange = useCallback(async (ev) => {
    await updateOrderStatus(params.id, ev.target.value);
    setOrder({
      ...order,
      status: ev.target.value
    })
  }, [params.id, order]);

  const handleDelete = useCallback(async () => {
    await deleteOrder(params.id);
    navigate('/orders');
  }, [params.id, navigate]);

  if (!order) {
    return 'No order found';
  }

  return <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>Order: {params.id}</Typography>
    <FormControl sx={{ mt: 1 }}>
      <InputLabel id="demo-simple-select-label">{t('order.status')}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="customer"
        name="customer"
        value={order.status}
        label="Customer"
        onChange={handleStatusChange}
      >
        {orderOptions.map((orderOption) => (
          <MenuItem key={orderOption.id} value={orderOption.id}>{orderOption.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <Typography sx={{ mt: 1 }}>
      {t('order.customer')}: {order.customer}
    </Typography>
    <Typography sx={{ mt: 1 }}>
      {t('order.createdAt')}: {new Intl.DateTimeFormat("en-GB").format(order.createdAt)}
    </Typography>
    <Typography sx={{ mt: 1 }}>
      {t('order.dueTo')}: {new Intl.DateTimeFormat("en-GB").format(order.dueTo)}
    </Typography>
    <Typography sx={{ mt: 1 }}>
      {t('order.notes')}: {order.notes}
    </Typography>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>Детали</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Размер</TableCell>
            <TableCell>Цвет</TableCell>
            <TableCell>Система</TableCell>
            <TableCell>Ширина Профиля</TableCell>
            <TableCell>Отверстия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.width} * {item.height}</TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>{item.system}</TableCell>
              <TableCell>{item.width - 3}</TableCell>
              <TableCell>{calculateDrill(item.width - 3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    <Button sx={{ mt: 1 }} variant="outlined" color="error" onClick={handleDelete}>{t('actions.delete')}</Button>
  </Paper>;
}