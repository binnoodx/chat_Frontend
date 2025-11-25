import React, { useRef, useState } from 'react';
import { images } from '../constants/images';
import "@/app/forFonts.css"

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 0, 1)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl  h-[55vh] lg:h-screen lg:flex lg:py-[20vh] overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        
      />

        <div className="myDetails flex px-5 relative  flex-col justify-start items-center ">
          <img className='lg:h-[70vh] h-96 -mt-5  absolute' src={images.Zenitshu.src} alt="" />
            <h1 className='lg:text-7xl text-4xl font-extrabold   tracking-wide   normalFont'>Binod's Homepage</h1>
            <h2 className='italic lg:text-lg text-sm normalFont'>React/React Native Full Stack Developer</h2>
            
            

        </div>



      {children}
    </div>
  );
};

export default SpotlightCard;
