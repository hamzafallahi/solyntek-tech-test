import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsPart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to control "View More"

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/products/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to toggle "View More"
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleFavorite = async (productId, isFavorite) => {
  try {
    const token = localStorage.getItem("token");

    // Optimistically update the local state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, is_favorite: !isFavorite } // Toggle the is_favorite field
          : product
      )
    );

    // Send the request to the backend to toggle the favorite status
    await axios.put(
      `http://localhost:8000/products/productsfav/${productId}`,
      {}, // No need to send data since the backend toggles the value
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Fetch the latest data from the backend to ensure consistency
    const response = await axios.get("http://localhost:8000/products/products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(response.data);
  } catch (error) {
    console.error("Error toggling favorite:", error);

    // Revert the local state if the request fails
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, is_favorite: isFavorite } // Revert the is_favorite field
          : product
      )
    );
  }
};

  // Determine which products to display
  const displayedProducts = showAll ? products : products.slice(0, 6);

  // Filter pinned products
  const pinnedProducts = products.filter((product) => product.is_favorite);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pinned Products Section */}
        {pinnedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Pinned Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pinnedProducts.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id, product.is_favorite)}
                      className={`absolute top-2 right-2 px-3 py-1 text-sm rounded-md ${
                        product.is_favorite
                          ? "bg-pink-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {product.is_favorite ? "Unpin" : "Pin"}
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="mt-2 text-pink-600 font-medium">{product.price} DT</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products Section */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Discover Our Products</h2>
          {products.length > 6 && (
            <button
              onClick={toggleShowAll}
              className="text-pink-600 border border-pink-600 px-4 py-2 rounded-md hover:bg-pink-50"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          )}
        </div>
        {loading ? (
          <div className="text-center">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id, product.is_favorite)}
                    className={`absolute top-2 right-2 px-3 py-1 text-sm rounded-md ${
                      product.is_favorite
                        ? "bg-pink-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {product.is_favorite ? "Unpin" : "Pin"}
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="mt-2 text-pink-600 font-medium">{product.price} DT</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPart;