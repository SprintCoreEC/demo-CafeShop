import React from "react";

const BrandsSection = ({ brands }) => {
    return (
        <section className="w-full h-full pb-12">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                    Marcas con las que Trabajamos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {brands.map((brand, index) => (
                        <img
                            key={index}
                            src={brand.image}
                            alt={brand.name}
                            className="h-16 md:h-24 object-contain"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandsSection;
