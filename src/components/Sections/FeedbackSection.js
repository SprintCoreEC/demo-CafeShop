import React, { useState } from "react";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";
import ActionButton from "../General/ActionButton";

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar los datos a tu backend
    console.log({ rating, comment });
    setSubmitted(true);
  };

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div
          className={`bg-box p-8 md:p-10 rounded-xl shadow-md border h-[28rem] border-lines ${
            submitted ? "flex flex-col items-center justify-center " : ""
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-title mb-2 text-center">
            {submitted ? "Gracias por tu comentario!" : "Cómo podemos ayudarte? Déjanos un mensaje!"}
          </h2>
          <p className="text-content text-center mb-8">
            {submitted
              ? "Tu opinión es importante para nosotros."
              : "Déjanos saber tu experiencia"}
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none mx-1"
                  >
                    {star <= rating ? (
                      <FaStar className="w-8 h-8 text-yellow-500" />
                    ) : (
                      <FaRegStar className="w-8 h-8 text-yellow-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <textarea
                  className="w-full px-4 py-3 border border-lines rounded-lg focus:ring-2 focus:ring-button focus:border-transparent"
                  rows="4"
                  placeholder="Escribe tus sugerencias o una idea..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-button text-white rounded-lg border border-border font-medium hover:bg-button-on transition-colors flex items-center justify-center mx-auto"
                  disabled={!rating && !comment}
                >
                  <FaPaperPlane className="mr-2" />
                  Envía un comentario
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => {
                  setRating(0);
                  setComment("");
                  setSubmitted(false);
                }}
                className="px-6 py-3 bg-blank text-button border border-button rounded-lg font-medium hover:bg-button hover:text-white transition-colors"
              >
                Envía otro comentario
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
