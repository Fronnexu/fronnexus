import React from "react";

export default function Hero() {
  return (
    <div className="bg-white px-6 md:px-60 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Texto */}
        <div className="text-center  max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Who We Are
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            A digital agency built on passion, precision, and purpose. We blend 
            design, technology, and strategy to create seamless digital 
            experiences for businesses worldwide.
          </p>
          <button className="bg-gray-100 text-sm font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            Get to Know Us
          </button>
        </div>

        {/* Imagem */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <img
            src="/assets/videos/circle.gif"
            alt="Animação de um círculo de pontos"
            className="w-72 md:w-[400px] h-auto"
          />
        </div>

      </div>
    </div>
  );
}
