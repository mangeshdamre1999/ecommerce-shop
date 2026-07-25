import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCategories } from "../redux/features/productSlice";
import { Link } from "react-router-dom";
import { updateLoading } from "../redux/features/homeSlice";
import { API_ENDPOINTS } from "../api";
import { filterAffordable } from "../utils/currency";

const AllCategories: FC = () => {
  const dispatch = useAppDispatch();

  const allCategories = useAppSelector(
    (state) => state.productReducer.categories
  );
  const isLoading = useAppSelector((state) => state.homeReducer.isLoading);

  useEffect(() => {
    // The price ceiling empties out a few categories entirely (cars, laptops,
    // furniture...), so list only categories that still have something to sell
    // rather than linking to pages that render nothing.
    const fetchCategories = () => {
      dispatch(updateLoading(true));
      Promise.all([
        fetch(`${API_ENDPOINTS.PRODUCTS_CATEGORIES}`).then((res) => res.json()),
        fetch(`${API_ENDPOINTS.PRODUCTS}?limit=500&select=price,category`).then(
          (res) => res.json()
        ),
      ])
        .then(([categories, { products }]) => {
          const stocked = new Set(
            filterAffordable<{ price: number; category: string }>(
              products
            ).map((p) => p.category)
          );
          dispatch(
            addCategories(
              categories.filter((c: { slug: string }) => stocked.has(c.slug))
            )
          );
          dispatch(updateLoading(false));
        })
        .catch(() => dispatch(updateLoading(false)));
    };
    if (allCategories.length === 0) fetchCategories();
  }, [allCategories, dispatch]);

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <span className="text-lg dark:text-white">Categories</span>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin mt-32 rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 my-2">
          {allCategories &&
            allCategories.map((category) => (
              <div
                key={category.slug}
                className="bg-gray-100 dark:bg-slate-600 dark:text-white px-4 py-4 font-karla mr-2 mb-2"
              >
                <div className="text-lg">{category.name}</div>
                <Link
                  to={{ pathname: `/category/${category.slug}` }}
                  className="hover:underline text-blue-500"
                >
                  VIEW PRODUCTS
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
