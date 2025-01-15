'use client';

import { useState, useEffect } from 'react';

interface MenuItem {
    id?: number;
    item_name: string;
    item_desc: string;
    price: number | string | null;
    item_pic?: string;
    category?: string;
}

async function getAllItems(): Promise<MenuItem[]> {
    const API_BASE = 'https://alexanderthenotsobad.us/api/items';
    try {
        const response = await fetch(`${API_BASE}/items`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const items = Array.isArray(data.item) ? data.item.flat() : [];
        // Filter out invalid items
        return items.filter((item: unknown): item is MenuItem =>
            !!item &&
            typeof item === 'object' &&
            'item_name' in item &&
            'item_desc' in item &&
            'price' in item
        );
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
}

export default function MenuList() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const data = await getAllItems();
                console.log('Raw API response:', data);
                data.forEach((item, index) => {
                    console.log(`Item ${index}:`, {
                        name: item.item_name,
                        desc: item.item_desc,
                        price: item.price,
                        hasImage: !!item.item_pic
                    });
                });
                setItems(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch menu items');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div className="flex justify-center p-4">Loading menu items...</div>;
    }

    if (error) {
        return (
            <div className="p-4 text-red-500 border border-red-300 rounded">
                {error}
            </div>
        );
    }

    const itemsByCategory: Record<string, MenuItem[]> = {};
    items.forEach((item) => {
        const category = item.category || 'Uncategorized';
        if (!itemsByCategory[category]) {
            itemsByCategory[category] = [];
        }
        itemsByCategory[category].push(item);
    });

    const formatPrice = (price: number | string | null | undefined) => {
        if (price === null || price === undefined) return 'Price unavailable';
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        return !isNaN(numericPrice) ? `$${numericPrice.toFixed(2)}` : 'Price unavailable';
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
            {Object.entries(itemsByCategory).map(([category, categoryItems], categoryIndex) => (
                <div key={`category-${category}-${categoryIndex}`} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryItems.map((item, itemIndex) => (
                            <div
                                key={item.id || `item-${category}-${itemIndex}`}
                                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {item.item_pic && (
                                    <img
                                        src={`data:image/jpeg;base64,${item.item_pic}`}
                                        alt={item.item_name}
                                        className="w-full h-48 object-cover rounded-md mb-2"
                                    />
                                )}
                                <h3 className="text-xl font-semibold">{item.item_name}</h3>
                                <p className="text-gray-600 mt-1">{item.item_desc}</p>
                                <p className="text-lg font-bold mt-2">{formatPrice(item.price)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}