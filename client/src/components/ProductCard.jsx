import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.thumbnail} alt={product.title} loading="lazy" />
                <span className="product-category">{product.category}</span>
            </div>
            <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description.substring(0, 60)}...</p>
                <div className="product-rating">
                    <span className="star">★</span> {product.rating}
                </div>
                <div className="product-price-row">
                    <span className="product-price">${product.price}</span>
                    {product.discountPercentage > 0 && (
                        <span className="product-discount">-{product.discountPercentage}%</span>
                    )}
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
