import mongoose, { Document, Model } from 'mongoose';

export interface IMenuItem {
  label: string;
  url: string;
  order?: number;
  parentId?: string;
  icon?: string;
  isActive?: boolean;
}

export interface IMenu {
  title: string;
  slug: string;
  items: IMenuItem[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

const MenuItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number },
  parentId: { type: String },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
}, { _id: false });

const MenuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  items: { type: [MenuItemSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

export type MenuDocument = IMenu & Document;
export const MenuModel: Model<MenuDocument> = mongoose.model<MenuDocument>('menu', MenuSchema);
