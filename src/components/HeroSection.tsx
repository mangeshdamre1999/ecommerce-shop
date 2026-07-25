import { FC } from "react";
import { Link } from "react-router-dom";
import { formatINR, MAX_PRICE_INR } from "../utils/currency";

const HeroSection: FC = () => {
  return (
    <div className="bg-[#e3edf6] dark:bg-slate-600 font-lora">
      <div className="container px-4 grid md:grid-cols-2 py-8 mx-auto">
        <div className="flex items-center">
          <div className="max-w-[450px] space-y-4">
            <p className="text-black dark:text-white">
              Starting At <span className="font-bold">₹65</span>
            </p>
            <h2 className="text-black font-bold text-4xl md:text-5xl dark:text-white">
              Everyday essentials, every day
            </h2>
            <h3 className="text-2xl dark:text-white">
              Nothing over{" "}
              <span className="text-red-600">
                {formatINR(MAX_PRICE_INR)}
              </span>{" "}
              — shop the whole store
            </h3>
            <Link
              to="/category/kitchen-accessories"
              data-test="hero-btn"
              className="inline-block bg-white rounded-md px-6 py-3 hover:bg-blue-500 hover:text-white"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <div>
          <img src="/hero.png" alt="hero" className="ml-auto" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
