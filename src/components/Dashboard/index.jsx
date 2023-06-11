import { useEffect, useState, useCallback, useMemo } from "react";
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

import KanbanBoard from "../KanbanBoard";
import { getAllOrders } from "../../services/order";
import { orderStatuses, orderStatusesList } from "../../constants";

export default function Dashboard() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const loadAllOrders = useCallback(async () => {
    const allOrders = await getAllOrders();

    setOrders(allOrders);
  }, []);

  const ordersByCategory = useMemo(() => {
    return orders.reduce((acc, order) => {
      if (!acc[order.status]) {
        acc.other.push(order);
      } else {
        acc[order.status].push(order);
      }

      return acc;
    }, {
      [orderStatuses.CREATED]: [],
      [orderStatuses.PREPARATION]: [],
      [orderStatuses.PENDING]: [],
      [orderStatuses.IN_PROGRESS]: [],
      [orderStatuses.DONE]: [],
      other: []
    });
  }, [orders]);

  const orderLanes = useMemo(() => orderStatusesList.map(status => ({
    id: status,
    label: t(`order.statuses.${status}`)
  })), [t]);

  useEffect(() => {
    loadAllOrders();
  }, [loadAllOrders]);

  return (
    <Box variant="outlined" xs={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, width: 1 }}>
      <KanbanBoard lanes={orderLanes} itemsByLanes={ordersByCategory} />
    </Box>
  );
}