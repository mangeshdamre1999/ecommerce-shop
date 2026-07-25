import { FC, useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { ReviewItem } from "../models/ReviewItem";

const reviews: ReviewItem[] = [
  {
    username: "Ananya S.",
    rating: 5,
    review:
      "Product is genuine and the packaging was solid. Delivered a day earlier than promised. Using it for four months now with no complaints.",
  },
  {
    username: "Rohit K.",
    rating: 4,
    review:
      "Good value for the price. Everything works as described, only the delivery took a couple of days longer than the estimate.",
  },
  {
    username: "Priya M.",
    rating: 3,
    review:
      "Did not last as long as I expected. The quality feels a step below what the photos suggest, so not quite value for money.",
  },
  {
    username: "Vikram R.",
    rating: 4,
    review:
      "Exactly what was listed and it arrived on time. Happy with the purchase overall, would order from here again.",
  },
  {
    username: "Sneha P.",
    rating: 3,
    review:
      "The quality could have been better for this price. I should have compared a few more options before buying.",
  },
  {
    username: "Arjun N.",
    rating: 5,
    review:
      "Excellent quality and quick delivery. Customer support answered my query the same day, which I did not expect.",
  },
  {
    username: "Meera J.",
    rating: 4,
    review:
      "Satisfied with the value for money. Everything seems nice, though the delivery was slightly delayed on my pincode.",
  },
  {
    username: "Karthik V.",
    rating: 3,
    review:
      "Average product. It does the job but I found the finish a bit rough compared to what I was expecting.",
  },
  {
    username: "Divya A.",
    rating: 4,
    review:
      "Good buy at this price. Arrived well packed and on schedule, and it has held up fine so far.",
  },
  {
    username: "Sanjay T.",
    rating: 3,
    review:
      "It is okay for occasional use. Not the most durable, so keep expectations in line with the price.",
  },
];

const getShuffledArr = () => {
  const arr: ReviewItem[] = [];
  const start = Math.floor(Math.random() * 4);
  for (let index = start; index < start + 5; index++) {
    arr.push(reviews[index]);
  }
  return arr;
};

const Reviews: FC<{ id: number }> = ({ id }) => {
  const [items, setItems] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const _arr = getShuffledArr();
    setItems(_arr);
  }, [id]);

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
      <div className="space-y-2">
        {items?.map(({ username, rating, review }) => (
          <div key={username} className="leading-4" data-test="review-item">
            <h3 className="font-semibold text-md">{username}</h3>
            <RatingStar rating={rating} />
            <p className="text-sm leading-4">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reviews;
