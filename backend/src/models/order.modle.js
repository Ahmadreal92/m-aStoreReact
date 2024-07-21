import { model, Schema } from 'mongoose';
import { OrderStatus } from '../constants/orderStatus.js';
import { ParfumModel } from './parfum.model.js';

export const OrderItemSchema = new Schema(
    {
      parfum: { type: ParfumModel.schema, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    {
      _id: false,
    }
  );
  
  OrderItemSchema.pre('validate', function (next) {
    this.price = this.parfum.price * this.quantity;
    next();
  });
  
  const orderSchema = new Schema(
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
      paymentId: { type: String },
      totalPrice: { type: Number, required: true },
      items: { type: [OrderItemSchema], required: true },
      status: { type: String, default: OrderStatus.NEW },
      user: { type: Schema.Types.ObjectId, required: true },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
    }
  );
  
  export const OrderModel = model('order', orderSchema);
