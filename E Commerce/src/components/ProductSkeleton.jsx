import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 animate-pulse shadow-sm">
      <div className="w-full h-48 bg-slate-200 rounded-xl" />
      <div className="space-y-2">
        <div className="w-1/3 h-3 bg-slate-200 rounded" />
        <div className="w-4/5 h-5 bg-slate-200 rounded" />
        <div className="w-full h-3 bg-slate-200 rounded" />
        <div className="w-2/3 h-3 bg-slate-200 rounded" />
      </div>
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="w-20 h-6 bg-slate-200 rounded" />
        <div className="w-24 h-9 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
};

export const ProductSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductSkeletonGrid;
