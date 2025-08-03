import React from 'react';

const Sparkle = ({ style, size = "small" }) => {
  const sparkleClass = size === "large" ? "sparkle-float" : "sparkle";
  
  return (
    <div 
      className={sparkleClass}
      style={{
        ...style,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1.5 + Math.random() * 1}s`
      }}
    />
  );
};

const SparkleContainer = ({ children, sparkleCount = 8 }) => {
  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push(
        <Sparkle
          key={i}
          size={i % 3 === 0 ? "large" : "small"}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      );
    }
    return sparkles;
  };

  return (
    <div className="sparkle-container">
      {generateSparkles()}
      {children}
    </div>
  );
};

export { Sparkle, SparkleContainer }; 