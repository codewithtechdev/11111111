import Link from 'next/link'
import { useCart } from '../lib/cart-context'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    // Redirect to checkout would happen in a real implementation
    toast.success('Added to cart! Redirecting to checkout...')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.is_featured && (
            <span className="bg-accent text-white px-2 py-1 rounded text-xs font-semibold">
              Featured
            </span>
          )}
          {product.price === 0 && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
              FREE
            </span>
          )}
          {product.original_price && product.original_price > product.price && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Save ${(product.original_price - product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button 
              onClick={handleBuyNow}
              className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-warning transition transform hover:scale-105 text-sm"
            >
              Buy Now
            </button>
            <button 
              onClick={handleAddToCart}
              className="bg-white text-dark px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-dark line-clamp-1 group-hover:text-secondary transition font-montserrat">
            {product.name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.short_description || product.description.substring(0, 100)}...
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-accent font-bold text-lg">${product.price}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-gray-400 line-through text-sm">${product.original_price}</span>
            )}
          </div>
          
          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-500 text-sm">({product.review_count})</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {product.features?.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-primary bg-opacity-20 text-primary px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link 
            href={`/products/${product.id}`}
            className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition text-center"
          >
            View Details
          </Link>
          {product.has_live_demo && (
            <a 
              href={product.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
            >
              Demo
            </a>
          )}
        </div>

        {/* Real-time update indicator */}
        {product.last_updated && (
          <div className="mt-3 flex items-center text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Updated {new Date(product.last_updated).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  )
}