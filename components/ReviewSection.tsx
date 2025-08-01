"use client";

import React, { useEffect, useState } from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  tmdbId: number;
  createdAt: string;
  updatedAt: string;
};

const ReviewForm = ({ tmdbId }: { tmdbId: number | string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/reviews?tmdbId=${tmdbId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, [tmdbId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    if (!name || !rating || !comment) return;

    setLoading(true);
    const res = await fetch(`/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tmdbId: Number(tmdbId),
        name,
        rating,
        comment,
      }),
    });

    if (res.ok) {
      const newReview = await res.json();
      setName("");
      setRating(0);
      setComment("");
      setReviews((prev) => [newReview, ...prev]);
    } else {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  function getAverageRating() {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = reviews.length > 0 ? total / reviews.length : 0;

    return average.toFixed(1);
  }

  function getRatingPercentage(reviews: Review[], rating: number): string {
    if (reviews.length === 0) return "0%";

    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = (count / reviews.length) * 100;
    return percentage.toFixed(1) + "%";
  }

  function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formatted = new Intl.DateTimeFormat('en-US', options).format(date);
  return formatted.replace(',', '');
}


  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-6">
      <form className="min-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-[#1f2022] border border-[#27282b] text-white text-sm rounded-lg block w-full p-2.5 focus:ring-[#313235] focus:border-[#313235] focus:ring-1 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="rating"
            className="block mb-2 text-sm font-medium text-white"
          >
            Rating
          </label>
          <select
            id="rating"
            className="bg-[#1f2022] border border-[#27282b] text-white text-sm rounded-lg block w-full p-2.5 focus:ring-[#313235] focus:border-[#313235] focus:ring-1 outline-none"
            value={rating}
            onChange={(e) => setRating(+e.target.value)}
          >
            <option value={0}>Choose a rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-white"
          >
            Comment
          </label>
          <textarea
            id="comment"
            className="bg-[#1f2022] border border-[#27282b] text-white text-sm rounded-lg block w-full p-2.5 focus:ring-[#313235] focus:border-[#313235] focus:ring-1 outline-none"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#313235] hover:bg-[#36393c] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      <section className="antialiased md:pl-10 md:border-l border-l-[#1f2022]">
        <div className="mx-auto max-w-screen-xl 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Rating
            </h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({getAverageRating()})
              </p>
              <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                {" "}
                {reviews.length} Reviews{" "}
              </p>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {getAverageRating()} out of 5
              </p>
            </div>

            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              {[5, 4, 3, 2, 1].map((i) => (
                <div className="flex items-center gap-2" key={i}>
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    {i}
                  </p>
                  <svg
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{ width: getRatingPercentage(reviews, i) }}
                    ></div>
                  </div>
                  <span className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 dark:text-primary-500 sm:w-auto sm:text-left">
                    {reviews.filter((r) => r.rating === i).length}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-18 divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.map((review) => (
              <div className="gap-3 py-6 sm:flex sm:items-start" key={review.id}>
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                  <div className="flex items-center gap-0.5">
                    {Array(review.rating).fill(0).map((_, i) => (
                      <svg
                      key={i}
                        className="h-4 w-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                    {Array(5 - review.rating).fill(0).map((_, i) => (
                    <svg
                    key={i}
                      className="h-4 w-4 text-[#313235]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    ))}
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </p>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {formatDate(new Date(review.createdAt))}
                    </p>
                  </div>
                </div>

                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <form className="max-w-sm w-full mx-auto">
      <div className="mb-5">
        <label
          id="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-[#] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          id="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
