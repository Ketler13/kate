import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function OrderKanbanCard({ item }) {
  const { t } = useTranslation();
  return <Card sx={{ mt: 1 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {t('order.customer')}: {item.customer}
      </Typography>
      <Typography>
        {t('order.createdAt')}: {new Intl.DateTimeFormat("en-GB").format(item.createdAt)}
      </Typography>
      <Typography>
        {t('order.dueTo')}: {new Intl.DateTimeFormat("en-GB").format(item.dueTo)}
      </Typography>
    </CardContent>
    <CardActions>
      <Link to={`/orders/${item.id}`}>{t('orders.viewDetails')}</Link>
    </CardActions>
  </Card>
}

export default OrderKanbanCard;