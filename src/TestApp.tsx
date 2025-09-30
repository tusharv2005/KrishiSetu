import React from 'react';

const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'green' }}>🌾 Smart Crop Recommendation System</h1>
      <p>If you can see this, the React app is working!</p>
      <div style={{ marginTop: '20px' }}>
        <button 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#16a34a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            marginRight: '10px'
          }}
          onClick={() => alert('Farmer Login clicked!')}
        >
          Farmer Login
        </button>
        <button 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#f59e0b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px'
          }}
          onClick={() => alert('Marketplace Login clicked!')}
        >
          Marketplace Login
        </button>
      </div>
    </div>
  );
};

export default TestApp;
