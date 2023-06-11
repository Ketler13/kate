import { useEffect, useState, useCallback } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import { getAllOrders } from "../../services/order";

export default function Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const loadAllOrders = useCallback(async () => {
    const allOrders = await getAllOrders();

    setOrders(allOrders);
  }, []);
  useEffect(() => {
    loadAllOrders();
  }, [loadAllOrders]);

  return (
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Orders</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{new Intl.DateTimeFormat("en-GB").format(order.createdAt)}</TableCell>
              <TableCell>{new Intl.DateTimeFormat("en-GB").format(order.dueTo)}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.notes}</TableCell>
              <TableCell><Link to={`${order.id}`}>{t('orders.viewDetails')}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}