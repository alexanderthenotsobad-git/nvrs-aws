interface MenuItemProps {
    name: string
    price: number
    description: string
    imageUrl?: string
    category: string
    available?: boolean
}

export default function MenuItemCard({
    name,
    price,
    description,
    imageUrl,
    category,
    available = true
}: MenuItemProps) {
    return (
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image or Placeholder */}
            <div className="h-48 bg-gray-200 relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image available</span>
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                    <span className="text-lg font-bold text-green-600">
                        ${price.toFixed(2)}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                    {description}
                </p>

                {/* Action Button */}
                <div className="flex justify-between items-center">
                    <span className={available ? 'text-green-600' : 'text-red-500'}>
                        {available ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <button
                        disabled={!available}
                        className={`px-4 py-2 rounded-lg transition-colors
                ${available
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    )
}