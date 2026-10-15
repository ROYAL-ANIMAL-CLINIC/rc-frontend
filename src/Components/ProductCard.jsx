import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";

const StarIcon = ({ filled }) => (
  <svg
    className={`w-3.5 h-3.5 ${
      filled ? "text-amber-400" : "text-slate-200"
    } fill-current`}
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.642 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const {
    currency,
    addtoCart,
    removeFromcart,
    cartitems,
    navigate,
  } = useAppContext();

  const [wishlisted, setWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const quantity = cartitems?.[product._id] ?? 0;
  const rating = Number(product.rating ?? 4);
  const reviewsCount = product.reviewsCount ?? null;
  const badge = product.badge ?? null;
  const originalPrice = product.originalPrice ?? null;

  const discount =
    originalPrice && originalPrice > product.price
      ? Math.round(
          ((originalPrice - product.price) / originalPrice) * 100
        )
      : null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";

  const imgSrc = imageError
    ? fallbackImage
    : product.image?.startsWith("http")
      ? product.image
      : product.image
        ? `http://localhost:4000${product.image}`
        : fallbackImage;

  return (
    <div
      onClick={() => {
        if (product.category) {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group relative flex flex-col w-full bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden select-none"
    >
      {/* Top Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {badge && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full shadow-sm">
              {badge}
            </span>
          )}

          {discount !== null && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={
            wishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={wishlisted}
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((previous) => !previous);
          }}
          className={`shrink-0 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-slate-200/50 active:scale-90 transition-all duration-200 ${
            wishlisted
              ? "text-rose-500 bg-rose-50"
              : "text-slate-400 hover:text-rose-500 hover:bg-white"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
            />
          </svg>
        </button>
      </div>

      {/* Image Showcase */}
      <div className="relative h-52 w-full shrink-0 bg-gradient-to-b from-slate-50/80 to-slate-100/30 flex items-center justify-center overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200/50 animate-pulse" />
        )}

        <img
          className={`w-auto h-40 object-contain transition-all duration-700 ease-out group-hover:scale-105 drop-shadow-md ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={imgSrc}
          alt={product.name || "Product"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (!imageError) {
              setImageError(true);
              setImageLoaded(false);
            } else {
              setImageLoaded(true);
            }
          }}
        />

        {/* Subtle Ambient Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Main Details Body */}
      <div className="flex flex-col flex-1 min-h-0 p-5 pt-4">
        {/* Category */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1.5">
          {product.category || "General"}
        </span>

        {/* Title */}
        <h3 className="text-slate-900 font-bold text-base leading-snug mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name || "Untitled Product"}
        </h3>

        {/* Short Description */}
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3 h-8">
          {product.description || "No product description available."}
        </p>

        {/* Rating & Review Summary */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                filled={index < Math.round(rating)}
              />
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {rating.toFixed(1)}
          </span>

          {reviewsCount !== null && (
            <span className="text-[10px] text-slate-400 font-medium">
              ({reviewsCount})
            </span>
          )}
        </div>

        {/* Bottom Section: Price & Cart Action */}
        <div className="mt-auto pt-3 border-t border-slate-100/80 flex items-center justify-between gap-3">
          {/* Price */}
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Price
            </span>

            <p className="text-lg font-black text-slate-900 tracking-tight leading-none mt-1">
              <span className="text-xs font-bold text-indigo-600 mr-0.5">
                {currency}
              </span>
              {product.price}
            </p>

            {originalPrice !== null && (
              <span className="text-[10px] text-slate-400 line-through mt-1">
                {currency}
                {originalPrice}
              </span>
            )}
          </div>

          {/* Dynamic Quantity / Add Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 w-[124px]"
          >
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => addtoCart(product._id)}
                className="w-full h-9 flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl shadow-md hover:shadow-indigo-200 transition-all duration-300 active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>

                <span className="text-xs font-bold tracking-wide">
                  Add to Cart
                </span>
              </button>
            ) : (
              <div className="flex items-center justify-between w-full h-9 bg-slate-900 text-white rounded-xl overflow-hidden shadow-md">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => removeFromcart(product._id)}
                  className="w-8 h-full flex items-center justify-center hover:bg-slate-800 active:bg-slate-700 transition-colors text-slate-300 hover:text-white"
                >
                  <span className="text-sm font-bold">−</span>
                </button>

                <span className="text-xs font-bold tracking-wider">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => addtoCart(product._id)}
                  className="w-8 h-full flex items-center justify-center hover:bg-slate-800 active:bg-slate-700 transition-colors text-slate-300 hover:text-white"
                >
                  <span className="text-sm font-bold">+</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;