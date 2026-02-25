import React from "react";
import { IoStarOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const ReviewSection = ({ reviews }) => {

    return (
        <section className="w-full h-full  pb-12">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-20">
                    Lo Que Dice Nuestra Comunidad
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <img
                                    alt={`Avatar ${index}`}
                                    className="rounded-full"
                                    height="40"
                                    width="40"
                                    src={review.avatar}
                                    style={{
                                        aspectRatio: "1/1",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="ml-4">
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <div className="flex">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <IoStarOutline
                                                key={starIndex}
                                                className={`w-4 h-4 ${starIndex < review.rating ? "fill-current text-yellow-500" : "fill-current text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-subtitle">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;