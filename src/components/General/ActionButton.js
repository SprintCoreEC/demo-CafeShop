import React from "react";

const ActionButton = ({
  children,
  href,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses = "group relative inline-block px-6 py-3 rounded-lg overflow-hidden transition-all cursor-pointer duration-300 font-medium";

  const variants = {
    default: "bg-white text-black border border-border hover:bg-gray-100",
    primary: "bg-blank text-subtitle border border-title hover:bg-title hover:text-blank flex-row",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-blank text-delete border border-delete hover:bg-delete-on hover:text-blank",
    success: "bg-green-600 text-white hover:bg-green-700",
    outline: "bg-transparent text-black border border-gray-300 hover:bg-gray-50",
    
    // Efectos especiales
    right: `
      bg-button-off border border-border hover:text-blank text-subtitle
      before:absolute before:left-0 before:top-0 before:h-full before:w-0 
      before:bg-button-on before:transition-all before:duration-300 before:ease-in-out
      hover:before:w-full
    `,

    left: `
      bg-button-off border border-border hover:text-blank text-subtitle
      before:absolute before:right-0 before:top-0 before:h-full before:w-0 
      before:bg-button-on before:transition-all before:duration-300 before:ease-in-out
      hover:before:w-full
    `,
    
    up: `
      bg-button-off text-subtitle border border-border
      before:absolute before:left-0 before:bottom-0 before:h-0 before:w-full 
      before:bg-button-on before:transition-all before:duration-500 before:ease-in-out
      hover:before:h-full
      hover:text-white
    `,
    
    expand: `
      bg-button-off text-subtitle border border-border
      before:absolute before:top-[200%] before:right-[50%] before:w-96 before:h-96 
      before:bg-button before:rounded-full before:scale-0 
      before:translate-x-1/2 before:-translate-y-1/2 
      before:transition-transform before:duration-500 before:ease-in-out
      hover:before:scale-100
      hover:text-white
    `,
    
    down: `
      bg-button-off text-subtitle border border-border
      before:absolute before:left-0 before:top-0 before:h-0 before:w-full 
      before:bg-gradient-to-b before:from-button-on before:to-button-degree
      before:transition-all before:duration-500 before:ease-in-out
      hover:before:h-full
      hover:text-white
    `,
    
    shake: `
      bg-button-off text-subtitle border border-border hover:bg-button-on hover:text-white
      hover:animate-shake
    `,
    
    neon: `
      bg-black text-neon-cyan border border-neon-cyan 
      hover:shadow-lg hover:shadow-neon-cyan/50
      transition-all duration-300
    `,
    
    gradient: `
      bg-button-off text-subtitle border border-border
      hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white
    `,
    
    grow: `
      text-subtitle border-[1px] border-border bg-button-off
      hover:bg-button-on hover:border-transparent hover:text-blank
      transition-all duration-300
    `,

    light: `
      bg-[#d4c1af] text-subtitle 
      hover:bg-gradient-to-b hover:from-[#d4c1af] hover:to-[#e2d6ca]
      hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]
      transition-all duration-300
    `,
  };

  const variantClasses = variants[variant] || variants.default;

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      <span className="relative">{children}</span>
    </a>
  );
};

export default ActionButton;