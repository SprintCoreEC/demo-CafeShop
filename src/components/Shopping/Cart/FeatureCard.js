import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="aspect-[4/3] w-full h-full min-h-52 max-w-xs max-h-80 border-2 border-solid border-button-off border/10 bg-bg2 shadow-xs p-6 rounded-xl relative overflow-hidden group transition-all duration-700">
      {/* Fondo que se expande desde el centro - más lento */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-button-on/5 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out group-hover:w-[400%] group-hover:h-[400%]"></div>
      </div>
      
      {/* Contenido de la card */}
      <div className="flex flex-col items-center justify-center h-full w-full text-center relative z-10">
        {/* Icono con shake */}
        <div className="flex items-center justify-center w-16 h-16 mb-4 group-hover:animate-shake">
          <Icon className="text-primary text-4xl transition-all duration-500 group-hover:text-icons-on" />
        </div>
        
        {/* Título que se ilumina */}
        <h3 className="text-lg font-bold text-title mb-2 transition-all duration-500 group-hover:text-title/90 group-hover:drop-shadow-sm">
          {title}
        </h3>
        
        {/* Descripción que se ilumina */}
        <p className="text-base text-subtitle transition-all duration-500 group-hover:text-subtitle-on/90 group-hover:drop-shadow-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;