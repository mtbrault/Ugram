import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/2671-sound-visualizer.json';

const LoaderLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <Lottie
      options={defaultOptions}
      height={400}
      width={400}
    />
  );
};
export default LoaderLottie;
