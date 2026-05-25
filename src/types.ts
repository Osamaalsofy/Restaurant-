/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DishCategory = 'Appetizers' | 'Mains' | 'Desserts' | 'Elixirs';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  category: DishCategory;
  image: string;
  tags: string[];
  ingredients: string[];
  chefSpecial?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customNotes?: string;
}

export interface ReservationDetails {
  name: string;
  email: string;
  phone?: string;
  guests: number;
  date: string;
  time: string;
  dietaryNotes?: string;
}

export interface ElixirIngredient {
  id: string;
  name: string;
  category: 'base' | 'botanical' | 'essence' | 'addon';
  color: string;
  description: string;
  benefits: string;
  emoji?: string;
}
