import { orderStatuses } from '../../constants';
import * as ordersRepo from '../repository';

export async function createOrder({ date, ...data }) {
  const order = {
    createdAt: new Date().valueOf(),
    dueTo: new Date(date).valueOf(),
    status: orderStatuses.CREATED,
    ...data,
  };

  return ordersRepo.createOrder(order);
}

export async function getAllOrders() {
  return ordersRepo.getAllOrders();
}

export async function getOrder(id) {
  return ordersRepo.getOrder(id);
}

export async function updateOrderStatus(id, status) {
  return updateOrder(id, { status });
}

export async function updateOrder(id, updates) {
  await ordersRepo.updateOrder(id, updates);
}

export async function deleteOrder(id) {
  await ordersRepo.deleteOrder(id);
}