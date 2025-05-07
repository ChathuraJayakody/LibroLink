export interface OrderItem {
    title: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    id: number;
    status: string;
    createdAt: string;
    total: number;
    items: OrderItem[];
  }
  