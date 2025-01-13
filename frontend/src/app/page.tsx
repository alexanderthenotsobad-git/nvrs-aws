import MenuItemCard from '../components/MenuItemCard'

// Sample menu items data
const menuItems = [
  {
    name: "Classic Cheeseburger",
    price: 12.99,
    description: "A juicy beef patty with melted cheddar, lettuce, tomato, and our special sauce on a toasted brioche bun",
    category: "Burgers",
    available: true
  },
  {
    name: "Caesar Salad",
    price: 9.99,
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and our house-made Caesar dressing",
    category: "Salads",
    available: true
  },
  {
    name: "Margherita Pizza",
    price: 14.99,
    description: "Fresh mozzarella, tomatoes, and basil on our signature thin crust",
    category: "Pizza",
    available: false
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            NVRS Menu Management
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu Categories */}
        <nav className="flex space-x-4 mb-8">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700">
            All Items
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Burgers
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Salads
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Pizza
          </button>
        </nav>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <MenuItemCard key={index} {...item} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 NVRS - Virtual Restaurant Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}