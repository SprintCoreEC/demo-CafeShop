import React from 'react';
import { Range } from 'react-range';

const PriceRange = ({ priceRange, setPriceRange }) => {
    const minPrice = 0;
    const maxPrice = 500;

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };

    const handleManualChange = (e, index) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            const newRange = [...priceRange];
            newRange[index] = '';
            setPriceRange(newRange);
            return;
        }

        const newValue = parseInt(inputValue, 10);
        if (!isNaN(newValue)) {
            const adjustedValue = Math.min(Math.max(newValue, minPrice), maxPrice);
            const newRange = [...priceRange];
            newRange[index] = adjustedValue;

            if (index === 0 && newRange[0] > newRange[1]) {
                newRange[1] = newRange[0];
            }
            if (index === 1 && newRange[1] < newRange[0]) {
                newRange[0] = newRange[1];
            }
            setPriceRange(newRange);
        }
    };

    const handleBlur = (index) => {
        const newRange = [...priceRange];
        if (newRange[index] === '') {
            newRange[index] = index === 0 ? minPrice : maxPrice;
            setPriceRange(newRange);
        }
    };

    return (
        <div className="w-[90%] relative z-10">
            <h4 className="font-semibold mb-4">Rango de precio</h4>
            <Range
                step={1}
                min={minPrice}
                max={maxPrice}
                values={priceRange}
                onChange={(values) => handlePriceChange(values)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-1 w-full bg-slate-300 rounded relative"
                    >
                        <div
                            style={{
                                position: 'absolute',
                                height: '100%',
                                background: '#E5A578',
                                outline: 'none',
                                left: `${(priceRange[0] / maxPrice) * 100}%`,
                                right: `${100 - (priceRange[1] / maxPrice) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="w-[14px] h-[14px] bg-button rounded-full"
                    />
                )}
            />
            <div className="flex justify-between mt-4 text-sm text-slate-500">
                <div className="flex items-center border rounded-md bg-gray-200">
                    <span className="pl-2">$</span>
                    <input
                        type="number"
                        value={priceRange[0] === '' ? '' : priceRange[0]}
                        onChange={(e) => handleManualChange(e, 0)}
                        onBlur={() => handleBlur(0)}
                        className="w-[100%] p-1 border-none rounded-md text-center -ml-2 bg-transparent outline-none"
                        min={minPrice}
                        max={maxPrice}
                    />
                </div>
                <span className="mx-2 font-bold">-</span>
                <div className="flex items-center border rounded-md bg-gray-200">
                    <span className="px-2">$</span>
                    <input
                        type="number"
                        value={priceRange[1] === '' ? '' : priceRange[1]}
                        onChange={(e) => handleManualChange(e, 1)}
                        onBlur={() => handleBlur(1)}
                        className="w-[100%] p-1 border-none rounded-md text-center -ml-2 bg-transparent outline-none"
                        min={minPrice}
                        max={maxPrice}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceRange;
