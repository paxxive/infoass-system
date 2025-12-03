import express from 'express';

const router = express.Router();

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "Call of Duty: Modern Warfare",
    description: "The ultimate online gaming experience",
    price: 59.99,
    category: "physical",
    platform: "playstation",
    imageUrl: "/images/cod.jpg",
    stock: 15
  },
  {
    id: 2,
    name: "Valorant Points",
    description: "1000 Valorant Points for in-game purchases",
    price: 9.99,
    category: "digital",
    platform: "pc",
    imageUrl: "/images/valorant.jpg",
    stock: 999
  },
  {
    id: 3,
    name: "Mobile Legends Diamonds",
    description: "500 Diamonds for heroes and skins",
    price: 7.99,
    category: "digital",
    platform: "mobile",
    imageUrl: "/images/mlbb.jpg",
    stock: 999
  },
  {
    id: 4,
    name: "The Legend of Zelda: Tears of the Kingdom",
    description: "Epic adventure on Nintendo Switch",
    price: 69.99,
    category: "physical",
    platform: "nintendo",
    imageUrl: "/images/zelda.jpg",
    stock: 8
  },
  {
    id: 5,
    name: "Genshin Impact Crystals",
    description: "6480 Genesis Crystals for characters and weapons",
    price: 99.99,
    category: "digital",
    platform: "cross-platform",
    imageUrl: "/images/genshin.jpg",
    stock: 999
  },
  {
    id: 6,
    name: "FIFA 24",
    description: "Latest soccer simulation game",
    price: 49.99,
    category: "physical",
    platform: "xbox",
    imageUrl: "/images/fifa.jpg",
    stock: 12
  },
  {
    id: 7,
    name: "Roblox Robux",
    description: "800 Robux for virtual items and experiences",
    price: 9.99,
    category: "digital",
    platform: "cross-platform",
    imageUrl: "/images/roblox.jpg",
    stock: 999
  },
  {
    id: 8,
    name: "Cyberpunk 2077: Phantom Liberty",
    description: "Expansion for the acclaimed RPG",
    price: 29.99,
    category: "physical",
    platform: "pc",
    imageUrl: "/images/cyberpunk.jpg",
    stock: 20
  }
];

// Get all products
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: sampleProducts,
    count: sampleProducts.length
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = sampleProducts.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Get detailed product information with reviews
router.get('/:id/details', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = sampleProducts.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      user: 'GamerPro99',
      rating: 5,
      date: '2024-11-25',
      comment: 'Instant delivery! Got my Valorant points in seconds. Best price I found online!',
      helpful: 24
    },
    {
      id: 2,
      user: 'MLPlayer123',
      rating: 4,
      date: '2024-11-20',
      comment: 'Good service, but took about 5 minutes to deliver. Price was great though!',
      helpful: 12
    },
    {
      id: 3,
      user: 'FPSLegend',
      rating: 5,
      date: '2024-11-18',
      comment: 'Been using GamePoint for all my gaming needs. Never had an issue!',
      helpful: 45
    },
    {
      id: 4,
      user: 'NewGamer',
      rating: 3,
      date: '2024-11-15',
      comment: 'Worked fine, but the website could be faster.',
      helpful: 2
    }
  ];

  // Sample similar products
  const similarProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({
    success: true,
    data: {
      product,
      reviews,
      similarProducts,
      averageRating: 4.3,
      totalReviews: reviews.length
    }
  });
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredProducts = sampleProducts.filter(p => p.category === category);
  res.json({ 
    success: true, 
    data: filteredProducts,
    count: filteredProducts.length
  });
});

// Get products by platform
router.get('/platform/:platform', (req, res) => {
  const platform = req.params.platform;
  const filteredProducts = sampleProducts.filter(p => p.platform === platform);
  res.json({ 
    success: true, 
    data: filteredProducts,
    count: filteredProducts.length
  });
});

export default router;