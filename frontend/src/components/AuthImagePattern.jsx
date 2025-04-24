import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  // Array of PNG image URLs
  const images = [
    'https://i.pinimg.com/474x/a3/7d/61/a37d610cbe4720d664704ebf06a94167.jpg',
    'https://i.pinimg.com/474x/93/43/b1/9343b16a289ec36cb297dc2365ce46c2.jpg',
    'https://i.pinimg.com/736x/01/a0/0e/01a00e6cd21d4ebe43603922ec92da4d.jpg',
    'https://i.pinimg.com/736x/31/4c/d3/314cd335170bd8a8f4e3142b1d7326c5.jpg',
    'https://i.pinimg.com/736x/ef/0c/19/ef0c19df86ebd3fd36df90f8d664ead6.jpg',
    'https://i.pinimg.com/474x/20/66/99/206699b44b5cbe16450c19da611d73c7.jpg',
    'https://i.pinimg.com/474x/c3/91/3d/c3913dc52d35241596ade71e69d29ab0.jpg',
    'https://i.pinimg.com/736x/87/64/e1/8764e1985693aafad178b0997816d77d.jpg',
    'https://i.pinimg.com/474x/1c/c8/20/1cc820411255e1e751a20955c8089eaf.jpg',
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {images.map((image, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-primary/10 overflow-hidden"
            >
              <img
                src={image}
                alt={`Profile ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
