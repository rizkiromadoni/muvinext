"use client";

import MultiSearchPage from "@/components/pages/MultiSearchPage";
import React, { Suspense } from "react";

const SearchPage = () => {
  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <MultiSearchPage />
      </Suspense>
    </div>
  );
};

export default SearchPage;
