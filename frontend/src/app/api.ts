// src/lib/api.ts

// Types for our menu items
export interface MenuItem {
    id?: number;
    item_name: string;
    item_desc: string;
    price: number;
    item_pic?: string;
}

// API base URL - should come from environment variable
const API_BASE = process.env.PUBLIC_API_URL || 'http://localhost:5000/api';

// API service class
export class MenuService {
    // Get all menu items
    static async getAllItems(): Promise<MenuItem[]> {
        try {
            const response = await fetch(`${API_BASE}/items`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.item;
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    }

    // Get single menu item by ID
    static async getItem(id: number): Promise<MenuItem> {
        try {
            const response = await fetch(`${API_BASE}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching menu item ${id}:`, error);
            throw error;
        }
    }

    // Create new menu item
    static async createItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
        try {
            const response = await fetch(`${API_BASE}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating menu item:', error);
            throw error;
        }
    }

    // Update menu item
    static async updateItem(id: number, item: Partial<MenuItem>): Promise<MenuItem> {
        try {
            const response = await fetch(`${API_BASE}/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating menu item ${id}:`, error);
            throw error;
        }
    }

    // Delete menu item
    static async deleteItem(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_BASE}/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error deleting menu item ${id}:`, error);
            throw error;
        }
    }
}