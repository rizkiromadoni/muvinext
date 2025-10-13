"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

type PaginationButtonProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationButtons = ({
  currentPage,
  totalPages,
}: PaginationButtonProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Page{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages}
        </span>{" "}
        Total Pages
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <Link
          href={createPageUrl(currentPage - 1)}
          className={cn(
            "flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1f2022] hover:bg-[#36393c] rounded-s",
            currentPage === 1 && "opacity-50 pointer-events-none"
          )}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </Link>
        <Link
          href={createPageUrl(currentPage + 1)}
          className={cn(
            "flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#1f2022] hover:bg-[#36393c] rounded-s",
            currentPage >= totalPages && "opacity-50 pointer-events-none"
          )}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PaginationButtons;
