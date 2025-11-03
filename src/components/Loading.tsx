export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#0ead69] rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700">در حال بارگذاری...</p>
      <div className="mt-4 flex space-x-2 space-x-reverse">
        <div className="w-2 h-2 bg-[#0ead69] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-[#0ead69] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-[#0ead69] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

