import { FC, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TrendingProducts from "../components/TrendingProducts";
import { useAppDispatch } from "../redux/hooks";
import {
  updateNewList,
  updateFeaturedList,
} from "../redux/features/productSlice";
import { Product } from "../models/Product";
import LatestProducts from "../components/LatestProducts";
import Banner from "../components/Banner";
import { API_ENDPOINTS } from "../api";
import { filterAffordable } from "../utils/currency";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = () => {
      // Fetch wider than the 16 slots below, because the price ceiling filters
      // a chunk of the catalog out before we slice.
      fetch(`${API_ENDPOINTS.PRODUCTS}?limit=100`)
        .then((res) => res.json())
        .then(({ products }) => {
          const productList: Product[] = [];
          filterAffordable<Product>(products).forEach((product: Product) => {
            productList.push({
              id: product.id,
              title: product.title,
              images: product.images,
              price: product.price,
              rating: product.rating,
              thumbnail: product.thumbnail,
              description: product.description,
              category: product.category,
              discountPercentage: product.discountPercentage,
            });
          });
          dispatch(updateFeaturedList(productList.slice(0, 8)));
          dispatch(updateNewList(productList.slice(8, 16)));
        });
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="dark:bg-slate-800">
      <HeroSection />
      <Features />
      <TrendingProducts />
      <Banner />
      <LatestProducts />
      <br />
    </div>
  );
};

export default Home;
