import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ImageSelector = ({ setImage, initialImage }) => {
  const [preview, setPreview] = useState(initialImage || "");

  // 🔹 Actualiza la vista previa solo si `initialImage` cambia y no hay una imagen nueva seleccionada
  useEffect(() => {
    if (initialImage && !preview) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      setPreview(imageDataUrl); // Actualiza la vista previa con la nueva imagen
      setImage(file); // Pasa el archivo al componente padre
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="w-40 h-40 object-cover rounded border mb-2"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="imageUpload"
      />
      <label
        htmlFor="imageUpload"
        className="px-4 py-2 bg-button hover:bg-button-on transition-all duration-300 hover:scale-[102%] rounded-lg text-white"
      >
        Seleccionar Imagen
      </label>
    </div>
  );
};

export default ImageSelector;