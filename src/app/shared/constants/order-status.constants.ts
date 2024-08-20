import { OrderStatus } from '../interfaces/interfaces'; // Вказати правильний шлях до інтерфейсу

export const ORDER_STATUSES: OrderStatus[] = [
  { id: 1, name: 'New', title: 'Нове', description: 'Замовлення ще не оброблене або ще не почалось оброблятися.' },
  { id: 2, name: 'In Progress', title: 'У процесі', description: 'Замовлення обробляється або знаходиться у стадії виконання.' },
  { id: 3, name: 'Payment Pending', title: 'Очікується оплата', description: 'Замовлення готове до оплати, але оплата ще не надійшла.' },
  { id: 4, name: 'Paid', title: 'Оплачено', description: 'Оплата замовлення отримана та перевірена.' },
  { id: 5, name: 'Shipped', title: 'Відправлено', description: 'Товар був відправлений клієнту.' },
  { id: 6, name: 'Delivered', title: 'Доставлено', description: 'Товар був успішно доставлений клієнту.' },
  { id: 7, name: 'Cancelled', title: 'Скасовано', description: 'Замовлення було скасоване або відмінене або неприйняте.' },
];
