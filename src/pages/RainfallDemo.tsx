import RainfallProbability from "@/components/RainfallProbability";

const RainfallDemo = () => {
  const handleGetAdvisory = () => {
    console.log('Redirecting to AI Crop Advisory...');
    window.location.href = '/farmer-input';
  };

  const handleCompareHistory = () => {
    console.log('Opening historical comparison...');
    // This could open a modal or navigate to a historical data page
    alert('Historical comparison feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Rainfall Probability Demo
          </h1>
          <p className="text-gray-600">
            Test the new rainfall forecasting feature for farmers
          </p>
        </div>
        
        <RainfallProbability 
          onGetAdvisory={handleGetAdvisory}
          onCompareHistory={handleCompareHistory}
        />
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RainfallDemo;
