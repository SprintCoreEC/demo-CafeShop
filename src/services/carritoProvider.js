import React, { createContext, useState, useContext, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const iniciarEdicionProducto = (producto) => {
    if (producto && producto.slug) {
      setProductoAEditar(producto);  // Almacena el producto a editar con slug
    } else {
      console.error("El producto a editar no tiene un slug");
    }
  };

  const limpiarEdicionProducto = () => {
    setProductoAEditar(null);
  };

  useEffect(() => {
    const carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage) {
      setCarrito(JSON.parse(carritoStorage));
    }
  }, []);

  // Guardar o eliminar carrito de localStorage según el contenido
  useEffect(() => {
    if (carrito.length > 0) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      localStorage.removeItem("carrito"); // Borra el carrito si está vacío
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      // Busca un producto existente que coincida en slug y color
      const productoExistente = prevCarrito.find(
        (item) =>
          item.slug === producto.slug && item.color === producto.color
      );

      if (productoAEditar && productoAEditar.slug === producto.slug) {
        // Si se está editando, elimina el producto original y agrega el actualizado
        const carritoFiltrado = prevCarrito.filter(
          (item) =>
            !(item.slug === productoAEditar.slug && item.color === productoAEditar.color)
        );
        return [...carritoFiltrado, producto];
      }

      if (productoExistente) {
        // Si el producto ya existe, suma la cantidad
        return prevCarrito.map((item) =>
          item.slug === producto.slug && item.color === producto.color
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }

      // Si el producto no existe, agrégalo
      return [...prevCarrito, { ...producto }];
    });
  };


  const actualizarCantidad = (slug, cambio) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.slug === slug
          ? { ...producto, cantidad: Math.max(1, producto.cantidad + cambio) }
          : producto
      )
    );
  };

  const eliminarProducto = (slug, color) => {
    console.log("Eliminando producto con slug:", slug, "y color:", color); // Depuración

    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.filter(
        (producto) => !(producto.slug === slug && producto.color === color) // Elimina solo si coincide el slug y el color
      );

      console.log("Nuevo carrito después de eliminar:", nuevoCarrito); // Depuración

      // Actualizar localStorage después de eliminar el producto
      if (nuevoCarrito.length > 0) {
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      } else {
        localStorage.removeItem("carrito"); // Elimina el carrito del localStorage si está vacío
      }

      return nuevoCarrito;
    });
  };


  const editarProducto = (productoEditado) => {
    setCarrito((prevCarrito) => {
      // Filtra el producto original basado en el slug y el color original
      const carritoFiltrado = prevCarrito.filter(
        (producto) =>
          !(producto.slug === productoEditado.slug && producto.color === productoEditado.colorOriginal)
      );

      // Agrega el producto editado con los cambios
      return [...carritoFiltrado, productoEditado];
    });
  };


  const cantidadProductos = carrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarProducto,
        editarProducto,
        cantidadProductos,
        productoAEditar,
        iniciarEdicionProducto,
        limpiarEdicionProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
