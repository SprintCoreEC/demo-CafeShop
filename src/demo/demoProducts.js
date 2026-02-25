// src/demo/demoProducts.js
// Productos DEMO para ecommerce (sin backend)

export const DEMO_PRODUCTS = [
  /* =========================
     TECNOLOGÍA
     ========================= */
  {
    id: "tech-001",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description:
      "El iPhone 15 Pro incorpora un diseño en titanio, chip A17 Pro y un sistema de cámaras profesional.",
    tags: ["Apple", "iPhone", "Tecnología", "Smartphone"],
    category: "Tecnología",
    type: "phones",
    oldPrice: "1299",
    newPrice: "1199",
    stock: "15",
    rating: 4.8,
    votes: 1240,
    sizes: null,
    colors: {
      Negro: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
        "https://images.unsplash.com/photo-1695048133052-bad53c8fa1c1",
      ],
      Titanio: [
        "https://images.unsplash.com/photo-1695048132877-5d59f82bc5e8",
      ],
    },
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    ],
    discount: 10,
  },

  {
    id: "tech-002",
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Galaxy S24 Ultra con inteligencia artificial integrada, pantalla Dynamic AMOLED y cámara de 200MP.",
    tags: ["Samsung", "Android", "Tecnología"],
    category: "Tecnología",
    type: "phones",
    oldPrice: "1399",
    newPrice: "1249",
    stock: "9",
    rating: 4.7,
    votes: 980,
    sizes: null,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      "https://images.unsplash.com/photo-1610945264555-cb4f5e74f0b4",
    ],
  },

  {
    id: "tech-003",
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    description:
      "Audífonos inalámbricos con cancelación de ruido líder en la industria.",
    tags: ["Sony", "Audio", "Tecnología"],
    category: "Tecnología",
    type: "audio",
    oldPrice: "399",
    newPrice: "349",
    stock: "22",
    rating: 4.9,
    votes: 2100,
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
      "https://images.unsplash.com/photo-1585386959984-a41552231693",
    ],
  },

  /* =========================
     VESTIMENTA
     ========================= */
  {
    id: "cloth-001",
    slug: "nike-air-max-270",
    name: "Nike Air Max 270",
    description:
      "Zapatillas Nike Air Max 270 con amortiguación visible para máxima comodidad.",
    tags: ["Nike", "Zapatillas", "Vestimenta"],
    category: "Vestimenta",
    type: "shoes",
    oldPrice: "180",
    newPrice: "149",
    stock: "30",
    rating: 4.6,
    votes: 860,
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: {
      Negro: [
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
      ],
      Blanco: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      ],
    },
    images: [
      "https://images.unsplash.com/photo-1613070120286-98b11cdb9ae2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },

  {
    id: "cloth-002",
    slug: "adidas-hoodie-classic",
    name: "Adidas Hoodie Classic",
    description:
      "Hoodie Adidas clásico, ideal para clima frío y uso diario.",
    tags: ["Adidas", "Hoodie", "Vestimenta"],
    category: "Vestimenta",
    type: "hoodies",
    oldPrice: "85",
    newPrice: "69",
    stock: "18",
    rating: 4.4,
    votes: 430,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
      "https://images.unsplash.com/photo-1618354691540-99f9b1b49f7e",
    ],
  },

  {
    id: "cloth-003",
    slug: "levis-501-original",
    name: "Levi’s 501 Original",
    description:
      "El jean clásico de Levi’s con corte recto y estilo atemporal.",
    tags: ["Levis", "Jeans", "Vestimenta"],
    category: "Vestimenta",
    type: "pants",
    oldPrice: "120",
    newPrice: "99",
    stock: "25",
    rating: 4.5,
    votes: 670,
    sizes: ["30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    ],
  },

  /* =========================
     SUPLEMENTOS
     ========================= */
  {
    id: "supp-001",
    slug: "whey-protein-gold-standard",
    name: "Whey Protein Gold Standard 2lb",
    description:
      "Proteína de suero premium para recuperación y ganancia muscular.",
    tags: ["Suplementos", "Proteína", "Gym"],
    category: "Suplementos",
    type: "nutrition",
    oldPrice: "65",
    newPrice: "54",
    stock: "40",
    rating: 4.8,
    votes: 1500,
    images: [
      "https://images.unsplash.com/photo-1693996045300-521e9d08cabc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },

  {
    id: "supp-002",
    slug: "creatina-monohidratada",
    name: "Creatina Monohidratada",
    description:
      "Creatina micronizada para mejorar fuerza y rendimiento.",
    tags: ["Creatina", "Suplementos", "Deporte"],
    category: "Suplementos",
    type: "nutrition",
    oldPrice: "35",
    newPrice: "29",
    stock: "60",
    rating: 4.7,
    votes: 980,
    images: [
      "https://images.unsplash.com/photo-1683394572742-1e471f60fc2a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },

  /* =========================
     GLASEADAS / FOOD
     ========================= */
  {
    id: "food-001",
    slug: "donas-glaseadas-pack-6",
    name: "Donas Glaseadas (Pack x6)",
    description:
      "Donas glaseadas artesanales, suaves y recién horneadas.",
    tags: ["Donas", "Dulces", "Glaseadas"],
    category: "Glaseadas",
    type: "food",
    oldPrice: "18",
    newPrice: "14",
    stock: "50",
    rating: 4.9,
    votes: 320,
    images: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    ],
  },

  {
    id: "food-002",
    slug: "cafe-artesanal-premium",
    name: "Café Artesanal Premium",
    description:
      "Café de origen seleccionado con notas achocolatadas.",
    tags: ["Café", "Bebidas", "Premium"],
    category: "Glaseadas",
    type: "food",
    oldPrice: "22",
    newPrice: "19",
    stock: "35",
    rating: 4.6,
    votes: 410,
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    ],
  },
];

/* =========================
   Helpers DEMO
   ========================= */

export function getDemoProducts() {
  return DEMO_PRODUCTS;
}

export function getDemoProductByIdOrSlug(idOrSlug) {
  return (
    DEMO_PRODUCTS.find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    ) || null
  );
}
