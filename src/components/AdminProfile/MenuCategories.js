import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { getMenuIndex } from "../../services/apiService";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";
import { createCategory, deleteItem } from "../../services/categoryService";

const MenuCategories = () => {
  const [menuIndex, setMenuIndex] = useState([]);
  const [newItemData, setNewItemData] = useState({
    type: null,
    parentId: null,
    name: "",
  });

  const handleDeleteItem = async (itemId, itemType) => {
    try {
      const confirmed = window.confirm(
        `¿Estás seguro de que deseas eliminar este ${itemType}?`
      );

      if (!confirmed) return;

      const response = await deleteItem(itemId, itemType);

      if (response.ok) {
        alert(`${itemType} eliminado con éxito.`);
        fetchProducts();
      } else {
        fetchProducts();
        throw new Error(response.message || "Error eliminando el ítem");
      }
    } catch (error) {
      console.error("Error al eliminar el ítem:", error);
    }
  };



  const handleAddNewItem = (itemType, parentId = null, parentName = "") => {
    setNewItemData({ type: itemType, parentId, name: "", parentName });
  };

  const handleCategoryClick = (parentId, parentName) => {
    setNewItemData({ ...newItemData, parentId, parentName });
  };

  const handleConfirmNewItem = async (itemType) => {
    try {
      await createCategory(itemType, newItemData); 
      fetchProducts(); 
      handleCancelNewItem(); 
    } catch (error) {
      console.error("Error al crear el nuevo ítem:", error);
      alert("No se pudo crear el ítem. Intenta nuevamente.");
    }
  };


  const handleCancelNewItem = () => {
    setNewItemData({ type: null, parentId: null, name: "" });
  };

  const handleInputChange = (e) => {
    setNewItemData({ ...newItemData, name: e.target.value });
  };

  const fetchProducts = async () => {
    try {
      const data = await getMenuIndex();
      setMenuIndex(data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">Menu Dashboard</h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Secciones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {menuIndex.map((category) => (
              <div
                key={category.id}
                className={`relative w-full p-4 bg-white rounded-lg shadow-md flex flex-col justify-between items-start ${newItemData.type === "subcategories"
                    ? "cursor-pointer"
                    : "cursor-default"
                  }`}
                onClick={() => handleCategoryClick(category.id, category.name)}
              >
                <h3 className="text-gray-700 font-semibold">{category.name}</h3>
                <FaTrash
                  className="absolute right-2 mt-1 text-red-400 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDeleteItem(category.id, "categories");
                  }}
                />
              </div>
            ))}
            {newItemData.type === "categories" && (
              <div className="bg-white rounded-lg w-full h-full shadow-md flex justify-between items-center">
                <input
                  type="text"
                  className="rounded w-full p-2 mx-2"
                  placeholder="Nombre"
                  value={newItemData.name}
                  onChange={handleInputChange}
                />
                <div className="relative h-full flex flex-col w-1/6">
                  <button
                    className="w-full h-1/2 rounded-tr-lg text-teal-500 flex items-center justify-center transition-colors duration-300 hover:bg-teal-500 hover:text-white"
                    onClick={() => handleConfirmNewItem("categories")}
                  >
                    <FaRegCheckCircle className="text-lg" />
                  </button>
                  <button
                    className="w-full h-1/2 rounded-br-lg text-red-400 flex items-center justify-center transition-colors duration-300 hover:bg-red-400 hover:text-white"
                    onClick={handleCancelNewItem}
                  >
                    <GiCancel className="text-lg" />
                  </button>
                </div>
              </div>
            )}
            <div
              className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-center items-center cursor-pointer"
              onClick={() => handleAddNewItem("categories")}
            >
              <FaPlus className="text-content text-2xl" />
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-semibold">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {menuIndex.map((category) =>
              category.subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className={`relative w-full p-4 bg-white rounded-lg shadow-md flex flex-col justify-between items-start ${newItemData.type === "subcategories"
                      ? "cursor-pointer"
                      : "cursor-default"
                    }`}
                  onClick={() =>
                    handleCategoryClick(subcategory.id, subcategory.name)
                  }
                >
                  <h3 className="text-gray-700 font-semibold">
                    {subcategory.name}
                  </h3>
                  <p className="text-sm text-content flex flex-row">
                    <MdOutlineSubdirectoryArrowRight /> {category.name}
                  </p>
                  <FaTrash
                    className="absolute h-full top-0 right-4 text-red-400 hover:text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(subcategory.id, "subcategories");
                    }}
                  />
                </div>
              ))
            )}
            {newItemData.type === "subcategories" && (
              <div className="w-full h-full relative flex flex-row bg-white rounded-lg shadow-md justify-between items-center">
                <div className="flex flex-col w-5/6 px-2 py-2">
                  <input
                    type="text"
                    className="font-semibold text-gray-700 px-2 rounded w-full"
                    placeholder="Nombre"
                    value={newItemData.name}
                    onChange={handleInputChange}
                  />
                  <div className="flex items-center pl-2 rounded w-full mt-[2px]">
                    <MdOutlineSubdirectoryArrowRight className="text-content" />
                    <input
                      type="text"
                      className="text-sm text-content rounded w-full"
                      placeholder="Seleccione una categ"
                      value={newItemData.parentName || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="relative h-full flex flex-col w-1/6">
                  <button
                    className="w-full h-1/2 rounded-tr-lg text-teal-500 flex items-center justify-center transition-colors duration-300 hover:bg-teal-500 hover:text-white"
                    onClick={() => handleConfirmNewItem("subcategories")}
                  >
                    <FaRegCheckCircle className="text-xl" />
                  </button>
                  <button
                    className="w-full h-1/2 rounded-br-lg text-red-400 flex items-center justify-center transition-colors duration-300 hover:bg-red-400 hover:text-white"
                    onClick={handleCancelNewItem}
                  >
                    <GiCancel className="text-xl" />
                  </button>
                </div>
              </div>
            )}
            <div
              className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-center items-center cursor-pointer"
              onClick={() => handleAddNewItem("subcategories")}
            >
              <FaPlus className="text-content text-2xl" />
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-semibold">Subcategorías</h2>
          <div className="space-y-6 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {menuIndex.map((category) =>
                category.subcategories.map((subcategory) =>
                  subcategory.subsubcategories.map((subsub) => (
                    <div
                      key={subsub.id}
                      className={`relative w-full p-4 bg-white rounded-lg shadow-md flex flex-col justify-between items-start ${newItemData.type === "subsubcategories"
                          ? "cursor-pointer"
                          : "cursor-default"
                        }`}
                      onClick={() =>
                        handleCategoryClick(subsub.id, subsub.name)
                      }
                    >
                      <h3 className="text-gray-700 font-semibold">
                        {subsub.name}
                      </h3>
                      <p className="text-sm text-content flex flex-row">
                        <MdOutlineSubdirectoryArrowRight /> {subcategory.name}
                      </p>
                      <FaTrash
                        className="absolute h-full top-0 right-4 text-red-400 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(subsub.id, "subsubcategories");
                        }}
                      />
                    </div>
                  ))
                )
              )}
              {newItemData.type === "subsubcategories" && (
                <div className="w-full h-full relative flex flex-row bg-white rounded-lg shadow-md justify-between items-center">
                  <div className="flex flex-col w-5/6 px-2 py-2">
                    <input
                      type="text"
                      className="font-semibold text-gray-700 px-2 rounded w-full"
                      placeholder="Nombre"
                      value={newItemData.name}
                      onChange={handleInputChange}
                    />
                    <div className="flex items-center pl-2 rounded w-full mt-[2px]">
                      <MdOutlineSubdirectoryArrowRight className="text-content mr-2" />
                      <input
                        type="text"
                        className="text-sm text-content rounded w-full"
                        placeholder="Seleccione una subca"
                        value={newItemData.parentName || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="relative h-full flex flex-col w-1/6">
                    <button
                      className="w-full h-1/2 rounded-tr-lg text-teal-500 flex items-center justify-center transition-colors duration-300 hover:bg-teal-500 hover:text-white"
                      onClick={() => handleConfirmNewItem("subsubcategories")}
                    >
                      <FaRegCheckCircle className="text-xl" />
                    </button>
                    <button
                      className="w-full h-1/2 rounded-br-lg text-red-400 flex items-center justify-center transition-colors duration-300 hover:bg-red-400 hover:text-white"
                      onClick={handleCancelNewItem}
                    >
                      <GiCancel className="text-xl" />
                    </button>
                  </div>
                </div>
              )}
              <div
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-center items-center cursor-pointer"
                onClick={() => handleAddNewItem("subsubcategories")}
              >
                <FaPlus className="text-content text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-semibold">Tipos de Productos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {menuIndex.map((category) =>
              category.subcategories.map((subcategory) =>
                subcategory.subsubcategories.map((subsub) =>
                  subsub.productTypes.map((type) => (
                    <div
                      key={type.id}
                      className="relative w-full p-4 bg-white rounded-lg shadow-md flex flex-col justify-between items-start"
                    >
                      <h3 className="text-gray-700 font-semibold">
                        {type.name}
                      </h3>
                      <p className="text-sm text-content flex flex-row">
                        <MdOutlineSubdirectoryArrowRight /> {subsub.name}
                      </p>
                      <FaTrash
                        className="absolute h-full top-0 right-4 text-red-400 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDeleteItem(type.id, "productTypes");
                        }}
                      />
                    </div>
                  ))
                )
              )
            )}
            {newItemData.type === "productTypes" && (
              <div className="w-full h-full relative flex flex-row bg-white rounded-lg shadow-md justify-between items-center">
                <div className="flex flex-col w-5/6 px-4 py-2">
                  <input
                    type="text"
                    className="font-semibold text-gray-700 px-2 rounded w-full"
                    placeholder="Nombre"
                    value={newItemData.name}
                    onChange={handleInputChange}
                  />
                  <div className="flex items-center pl-2 rounded w-full mt-[2px]">
                    <MdOutlineSubdirectoryArrowRight className="text-content" />
                    <input
                      type="text"
                      className="text-sm text-content rounded w-full"
                      placeholder="Seleccione una subca"
                      value={newItemData.parentName || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="relative h-full flex flex-col w-1/6">
                  <button
                    className="w-full h-1/2 rounded-tr-lg text-teal-500 flex items-center justify-center transition-colors duration-300 hover:bg-teal-500 hover:text-white"
                    onClick={() => handleConfirmNewItem("producttypes")}
                  >
                    <FaRegCheckCircle className="text-xl" />
                  </button>
                  <button
                    className="w-full h-1/2 rounded-br-lg text-red-400 flex items-center justify-center transition-colors duration-300 hover:bg-red-400 hover:text-white"
                    onClick={handleCancelNewItem}
                  >
                    <GiCancel className="text-xl" />
                  </button>
                </div>
              </div>
            )}
            <div
              className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-center items-center cursor-pointer"
              onClick={() => handleAddNewItem("productTypes")}
            >
              <FaPlus className="text-content text-2xl" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default MenuCategories;
