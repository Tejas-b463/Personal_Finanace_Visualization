import React from "react";


const ShimmerUI = () => {
  return (
    <div className="animate-pulse">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="flex justify-center mb-8">
          <div className="h-10 bg-gray-200 rounded-lg w-3/4 md:w-1/2 max-w-md"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Transaction Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-7 bg-gray-200 rounded w-40 mb-6"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
              <div>
                <div className="h-5 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="h-5 bg-gray-200 rounded w-28 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            
            <div className="mb-4">
              <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            
            <div className="flex justify-end">
              <div className="h-10 bg-blue-200 rounded w-24"></div>
            </div>
          </div>
          
          {/* Monthly Expenses Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-7 bg-gray-200 rounded w-40 mb-6"></div>
            <div className="h-64 flex items-end justify-around space-x-2">
              <div className="h-20 w-16 bg-blue-200 rounded"></div>
              <div className="h-48 w-16 bg-blue-200 rounded"></div>
              <div className="h-32 w-16 bg-blue-200 rounded"></div>
              <div className="h-40 w-16 bg-blue-200 rounded"></div>
            </div>
            <div className="flex justify-around mt-2">
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
            </div>
          </div>
          
          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-7 bg-gray-200 rounded w-56 mb-6"></div>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 pb-2 border-b border-gray-100">
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-100">
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-1"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          
          {/* Category Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-7 bg-gray-200 rounded w-44 mb-6"></div>
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 opacity-50"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-300 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-14"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-200 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
          
          {/* Transactions List */}
          <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
            <div className="h-7 bg-gray-200 rounded w-40 mb-6"></div>
            <div className="w-full overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-5 gap-2 pb-3 border-b border-gray-100">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 py-4 border-b border-gray-100">
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerUI