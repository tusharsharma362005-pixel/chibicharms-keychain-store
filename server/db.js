import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'chibicharms.db');

export const db = new DatabaseSync(dbPath);

// Initialize Tables
export function initDatabase() {
  // 1. Products Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      category_name TEXT,
      price REAL NOT NULL,
      original_price REAL,
      rating REAL DEFAULT 5.0,
      reviews_count INTEGER DEFAULT 0,
      badge TEXT,
      in_stock INTEGER DEFAULT 1,
      customizable INTEGER DEFAULT 0,
      tagline TEXT,
      description TEXT,
      materials TEXT,
      dimensions TEXT,
      colors TEXT,
      default_color TEXT,
      image_type TEXT,
      featured INTEGER DEFAULT 0,
      is_new INTEGER DEFAULT 0
    );
  `);

  // 2. Custom Keychains / Presets Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS custom_keychains (
      id TEXT PRIMARY KEY,
      shape TEXT NOT NULL,
      shape_name TEXT,
      color_name TEXT,
      color_hex TEXT,
      finish TEXT,
      finish_name TEXT,
      text TEXT,
      font TEXT,
      text_color TEXT,
      hardware TEXT,
      hardware_name TEXT,
      charms TEXT,
      gift_box INTEGER DEFAULT 0,
      total_price REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Orders Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_address TEXT NOT NULL,
      customer_city TEXT NOT NULL,
      customer_state TEXT NOT NULL,
      customer_zip TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      discount REAL DEFAULT 0,
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'In Production',
      items TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed Products if empty
  seedProducts();

  // Seed Sample Orders if empty
  seedSampleOrders();
}

function seedProducts() {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (countRow.count > 0) return;

  console.log('🌱 Seeding initial products to SQLite database...');

  const initialProducts = [
    {
      id: 'mochi-boba-bear',
      name: 'Mochi Boba Bear Shaker',
      category: 'cute-characters',
      category_name: 'Cute Characters',
      price: 14.99,
      original_price: 18.99,
      rating: 4.9,
      reviews_count: 142,
      badge: 'Bestseller 🔥',
      in_stock: 1,
      customizable: 1,
      tagline: 'Liquid quicksand shaker filled with tiny boba pearls and sparkle stars!',
      description: 'Our viral Mochi Boba Bear is crafted with dual-layered scratch-proof acrylic. Inside, floating micro-pearls and holographic star glitter gently drift as you move. Fitted with an 18K gold-plated star clasp and a silicone beaded pastel wristlet.',
      materials: 'Dual-layer optical acrylic, mineral oil liquid shaker, 18k gold-plated brass clasp',
      dimensions: '6.5cm x 5.2cm (charm) + 4.5cm chain',
      colors: JSON.stringify([
        { name: 'Brown Sugar Milk', hex: '#E6BA95' },
        { name: 'Taro Dream', hex: '#D7C0E8' },
        { name: 'Matcha Cream', hex: '#C1E1C1' },
        { name: 'Strawberry Latte', hex: '#FFCAD4' }
      ]),
      default_color: 'Strawberry Latte',
      image_type: 'boba-bear',
      featured: 1,
      is_new: 0
    },
    {
      id: 'pastel-resin-initial',
      name: 'Blush Floral Initial Tag',
      category: 'initial-name',
      category_name: 'Initial/Name Keychains',
      price: 15.50,
      original_price: 19.00,
      rating: 5.0,
      reviews_count: 98,
      badge: 'Customizable ✨',
      in_stock: 1,
      customizable: 1,
      tagline: 'Hand-poured crystal resin with genuine pressed baby hydrangeas & gold leaf.',
      description: 'Each letter is individually hand-poured with eco-resin, preserving delicate pastel dried florals and flakes of 24k gold leaf. Choose any letter from A to Z, plus your custom name foil-embossed along the side.',
      materials: 'Crystal UV-resistant eco-resin, genuine dried flowers, 24k gold foil leaf',
      dimensions: '4.5cm x 4.0cm x 0.8cm thickness',
      colors: JSON.stringify([
        { name: 'Sakura Blush', hex: '#FFCAD4' },
        { name: 'Lavender Mist', hex: '#D8B4F8' },
        { name: 'Forget-Me-Not Blue', hex: '#BAE6FD' },
        { name: 'Buttercup Bloom', hex: '#FEF08A' }
      ]),
      default_color: 'Sakura Blush',
      image_type: 'resin-initial',
      featured: 1,
      is_new: 0
    },
    {
      id: 'magical-wand-star',
      name: 'Chibi Magical Girl Wand',
      category: 'anime-inspired',
      category_name: 'Anime-Inspired',
      price: 16.99,
      original_price: 21.00,
      rating: 4.9,
      reviews_count: 215,
      badge: 'Trending 🌟',
      in_stock: 1,
      customizable: 0,
      tagline: 'Channel your inner anime heroine with iridescent pastel wings and crystal heart.',
      description: 'Inspired by beloved 90s magical anime, this statement wand keychain features holographic wings that shift between pink and gold depending on the light angle. Adorned with a jingle bell charm and dainty ribbon bow.',
      materials: 'Holographic acrylic with epoxy dome, satin ribbon, golden bell',
      dimensions: '8.0cm x 3.8cm',
      colors: JSON.stringify([
        { name: 'Moon Prism Pink', hex: '#FDA4AF' },
        { name: 'Cosmic Violet', hex: '#C4B5FD' }
      ]),
      default_color: 'Moon Prism Pink',
      image_type: 'magical-wand',
      featured: 1,
      is_new: 0
    },
    {
      id: 'corgi-peach-butt',
      name: 'Squishy Corgi Peach Bun',
      category: 'animals',
      category_name: 'Animals',
      price: 13.99,
      original_price: 16.50,
      rating: 4.8,
      reviews_count: 88,
      badge: 'Cute Pick 🍑',
      in_stock: 1,
      customizable: 1,
      tagline: 'The happiest round corgi booty wearing a ripe juicy peach costume!',
      description: 'Irresistibly adorable! Features double-sided art so your corgi looks happy from both sides. Coated in high-gloss sparkle resin that keeps it immune to keys scratching in your purse.',
      materials: 'High-gloss acrylic with glitter topcoat, rose gold heart clip',
      dimensions: '5.5cm x 5.0cm',
      colors: JSON.stringify([
        { name: 'Golden Corgi', hex: '#FDBA74' },
        { name: 'Tricolor Pup', hex: '#94A3B8' }
      ]),
      default_color: 'Golden Corgi',
      image_type: 'corgi-butt',
      featured: 1,
      is_new: 0
    },
    {
      id: 'daisy-spinner-bloom',
      name: 'Pastel Daisy Fidget Spinner',
      category: 'flowers',
      category_name: 'Flowers',
      price: 14.50,
      original_price: 18.00,
      rating: 4.9,
      reviews_count: 164,
      badge: 'Stress Relief 🌼',
      in_stock: 1,
      customizable: 0,
      tagline: 'Spin the smiling petals smoothly when feeling anxious or bored.',
      description: 'A functional, soothing fidget keychain disguised as an adorable sunny daisy! Built around an ultra-smooth miniature ball bearing that lets the smiling petals spin silently for up to 60 seconds per flick.',
      materials: 'Smooth matte polycarbonate, silent miniature bearing, gold swivel hook',
      dimensions: '5.8cm diameter',
      colors: JSON.stringify([
        { name: 'Pastel Yellow', hex: '#FEF08A' },
        { name: 'Cherry Blossom', hex: '#FBCFE8' },
        { name: 'Mint Meadow', hex: '#A7F3D0' }
      ]),
      default_color: 'Pastel Yellow',
      image_type: 'daisy-spinner',
      featured: 1,
      is_new: 0
    },
    {
      id: 'magnetic-couple-avocado',
      name: 'Magnetic Avocado Besties Set (Pair)',
      category: 'couple-friendship',
      category_name: 'Couple/Friendship',
      price: 22.99,
      original_price: 28.00,
      rating: 5.0,
      reviews_count: 310,
      badge: 'Set of 2 🥑',
      in_stock: 1,
      customizable: 1,
      tagline: 'Two keychains that snap together with hidden neodymium magnets!',
      description: 'Keep one, give one to your favorite person! One side holds the happy pit, the other has the cozy hollow. When they get close, they gently snap together into one complete avocado. Includes two separate keyrings.',
      materials: 'Matte acrylic with embedded neodymium micro-magnets, enamel leaf charm',
      dimensions: '5.2cm x 4.0cm each',
      colors: JSON.stringify([
        { name: 'Creamy Guac Pair', hex: '#BBF7D0' }
      ]),
      default_color: 'Creamy Guac Pair',
      image_type: 'couple-avocado',
      featured: 1,
      is_new: 0
    },
    {
      id: 'custom-retro-motel-tag',
      name: 'Vintage Hotel / Motel Acrylic Tag',
      category: 'personalized',
      category_name: 'Personalized',
      price: 15.99,
      original_price: 19.99,
      rating: 4.9,
      reviews_count: 177,
      badge: 'Best Custom 🏷️',
      in_stock: 1,
      customizable: 1,
      tagline: 'Personalize with your room number, lucky digits, and custom slogan.',
      description: 'Our iconic pastel motel tag gives nostalgic retro vibes with a modern kawaii twist. Laser-engraved with your chosen custom name, date, or hotel room number in shiny gold, white, or silver infill.',
      materials: '3mm thick premium pastel cast acrylic, gold ball chain + clasp',
      dimensions: '9.0cm x 4.5cm classic diamond motel shape',
      colors: JSON.stringify([
        { name: 'Lilac Dream 777', hex: '#DDD6FE' },
        { name: 'Peachy Sunrise', hex: '#FFEDD5' },
        { name: 'Sakura Suite', hex: '#FCE7F3' },
        { name: 'Mint Oasis', hex: '#CCFBF1' }
      ]),
      default_color: 'Lilac Dream 777',
      image_type: 'motel-tag',
      featured: 1,
      is_new: 0
    },
    {
      id: 'sleepy-cloud-kitten',
      name: 'Sleepy Cloud Napping Kitten',
      category: 'cute-characters',
      category_name: 'Cute Characters',
      price: 13.50,
      original_price: 17.00,
      rating: 4.9,
      reviews_count: 76,
      badge: 'New Arrival ☁️',
      in_stock: 1,
      customizable: 1,
      tagline: 'Tucked into a fluffy iridescent cloud with tiny dangling raindrop crystals.',
      description: 'A cozy calico kitty snoozing peacefully on a puffy iridescent cloud. Below the cloud hangs a delicate faceted crystal prism that casts tiny rainbow reflections whenever sunlight hits it.',
      materials: 'Iridescent pearlized acrylic, aurora borealis drop crystal',
      dimensions: '6.0cm x 5.0cm',
      colors: JSON.stringify([
        { name: 'Calico Dream', hex: '#FED7AA' },
        { name: 'Midnight Luna', hex: '#C7D2FE' },
        { name: 'Pure Snow', hex: '#F1F5F9' }
      ]),
      default_color: 'Calico Dream',
      image_type: 'cloud-cat',
      featured: 0,
      is_new: 1
    },
    {
      id: 'bubble-jelly-letter',
      name: '3D Bubble Jelly Initial Charm',
      category: 'initial-name',
      category_name: 'Initial/Name Keychains',
      price: 14.00,
      original_price: 17.50,
      rating: 4.8,
      reviews_count: 64,
      badge: 'New Arrival 🫧',
      in_stock: 1,
      customizable: 1,
      tagline: 'Chunky, gummy-like bubble letter with a translucent candy shine.',
      description: 'Looks just like delicious candy jelly! Soft rounded balloon typography with embedded holographic micro-confetti. Pair it with an initial or nickname for everyday cuteness.',
      materials: 'High-clarity epoxy candy resin, pastel enamel heart clip',
      dimensions: '4.8cm x 4.2cm',
      colors: JSON.stringify([
        { name: 'Bubblegum Pink', hex: '#F472B6' },
        { name: 'Gummy Grape', hex: '#A78BFA' },
        { name: 'Lemon Drop', hex: '#FACC15' },
        { name: 'Blue Raspberry', hex: '#38BDF8' }
      ]),
      default_color: 'Bubblegum Pink',
      image_type: 'bubble-letter',
      featured: 0,
      is_new: 1
    },
    {
      id: 'pixel-tamagotchi-game',
      name: 'Retro Kawaii Tamagotchi Charm',
      category: 'anime-inspired',
      category_name: 'Anime-Inspired',
      price: 16.50,
      original_price: 20.00,
      rating: 5.0,
      reviews_count: 189,
      badge: 'Bestseller 👾',
      in_stock: 1,
      customizable: 1,
      tagline: 'Nostalgic 90s virtual pet egg with liquid floating pixel critters.',
      description: 'Relive your childhood! Shaped like the classic virtual egg with rubbery pastel buttons and a liquid window where a pixel pet and hearts bob up and down when shaken. A real conversation starter!',
      materials: 'Molded pastel acrylic with 3D button details, liquid shaker reservoir',
      dimensions: '6.2cm x 5.0cm',
      colors: JSON.stringify([
        { name: 'Pastel Aqua Pet', hex: '#99F6E4' },
        { name: 'Sweet Pink Pet', hex: '#FBCFE8' },
        { name: 'Lavender Pet', hex: '#E9D5FF' }
      ]),
      default_color: 'Pastel Aqua Pet',
      image_type: 'tamagotchi',
      featured: 1,
      is_new: 0
    },
    {
      id: 'strawberry-milk-box',
      name: 'Ichigo Strawberry Milk Carton',
      category: 'cute-characters',
      category_name: 'Cute Characters',
      price: 12.99,
      original_price: 16.00,
      rating: 4.9,
      reviews_count: 114,
      badge: 'Classic 🍓',
      in_stock: 1,
      customizable: 0,
      tagline: 'Japanese konbini strawberry milk carton with tiny dangling strawberry charm.',
      description: 'Inspired by beloved Japanese convenience store treats, this cute mini milk carton is printed in crisp vibrant pastels with a secondary enamel strawberry charm swinging happily beside it.',
      materials: 'Double-sided glossy acrylic, enamel fruit charm, gold swivel clasp',
      dimensions: '5.5cm x 3.2cm',
      colors: JSON.stringify([
        { name: 'Ichigo Pink', hex: '#FDA4AF' },
        { name: 'Banana Milk Yellow', hex: '#FEF08A' },
        { name: 'Melon Soda Green', hex: '#A7F3D0' }
      ]),
      default_color: 'Ichigo Pink',
      image_type: 'milk-carton',
      featured: 0,
      is_new: 0
    },
    {
      id: 'sakura-blossom-shimmer',
      name: 'Sakura Blossom Twinkle Charm',
      category: 'flowers',
      category_name: 'Flowers',
      price: 13.99,
      original_price: 17.00,
      rating: 4.9,
      reviews_count: 92,
      badge: 'Seasonal 🌸',
      in_stock: 1,
      customizable: 1,
      tagline: 'Frosted cherry blossom petal with tiny pearl core and gold accents.',
      description: 'Delicate yet sturdy! Frosted gradient petals that transition from pure white to soft sakura pink, centered with a tiny faux freshwater pearl and an engraved golden leaf charm.',
      materials: 'Frosted matte cast acrylic, faux pearl, 18k gold-tone hardware',
      dimensions: '5.2cm diameter',
      colors: JSON.stringify([
        { name: 'Sakura Pink', hex: '#FBCFE8' },
        { name: 'Snow Blossom', hex: '#F8FAFC' },
        { name: 'Lilac Bloom', hex: '#DDD6FE' }
      ]),
      default_color: 'Sakura Pink',
      image_type: 'sakura-flower',
      featured: 0,
      is_new: 1
    },
    {
      id: 'sun-moon-magnetic-pair',
      name: 'Celestial Sun & Moon Duo (Pair)',
      category: 'couple-friendship',
      category_name: 'Couple/Friendship',
      price: 24.50,
      original_price: 30.00,
      rating: 5.0,
      reviews_count: 145,
      badge: 'Set of 2 ☀️🌙',
      in_stock: 1,
      customizable: 1,
      tagline: 'Opposites attract! Sun and Crescent Moon connect with magnetic clasp.',
      description: '“You are my sun, my moon, and all my stars.” A set of two matching keychains that interlock perfectly. The sun is finished in warm butterscotch glitter, and the moon in holographic lilac.',
      materials: 'High-grade resin with iridescent flake, dual magnetic core',
      dimensions: '5.0cm x 4.8cm when locked together',
      colors: JSON.stringify([
        { name: 'Celestial Pastel', hex: '#E0E7FF' }
      ]),
      default_color: 'Celestial Pastel',
      image_type: 'sun-moon',
      featured: 0,
      is_new: 1
    },
    {
      id: 'custom-photo-mini-polaroid',
      name: 'Custom Mini Polaroid Shaker Tag',
      category: 'personalized',
      category_name: 'Personalized',
      price: 17.50,
      original_price: 22.00,
      rating: 5.0,
      reviews_count: 203,
      badge: 'Popular Custom 📷',
      in_stock: 1,
      customizable: 1,
      tagline: 'Upload your photo, pet portrait, or k-pop bias into a cute mini frame.',
      description: 'Turn your favorite memory into an everyday keepsake! A tiny acrylic instant photo frame with holographic sparkle overlay, printed with your personalized caption and date along the bottom tab.',
      materials: 'Scratch-proof optical grade acrylic with glitter film overlay',
      dimensions: '6.5cm x 4.8cm',
      colors: JSON.stringify([
        { name: 'Pastel Pink Frame', hex: '#FFE4E6' },
        { name: 'Cloud White Frame', hex: '#F8FAFC' },
        { name: 'Mint Frame', hex: '#CCFBF1' }
      ]),
      default_color: 'Pastel Pink Frame',
      image_type: 'mini-polaroid',
      featured: 0,
      is_new: 0
    },
    {
      id: 'baby-axolotl-bobble',
      name: 'Blushing Baby Axolotl Charm',
      category: 'animals',
      category_name: 'Animals',
      price: 13.99,
      original_price: 17.00,
      rating: 4.9,
      reviews_count: 132,
      badge: 'Community Favorite 🫧',
      in_stock: 1,
      customizable: 0,
      tagline: 'Smiling little aquatic cutie with translucent pink frilly gills!',
      description: 'Our most requested animal charm! This friendly little axolotl has rosy blushing cheeks, smiling face, and translucent gills that catch the light like real sea glass.',
      materials: 'Translucent pastel acrylic, gold star clasp',
      dimensions: '5.8cm x 5.2cm',
      colors: JSON.stringify([
        { name: 'Bubblegum Axolotl', hex: '#F472B6' },
        { name: 'Golden Albino', hex: '#FDE047' },
        { name: 'Lavender Sparkle', hex: '#C084FC' }
      ]),
      default_color: 'Bubblegum Axolotl',
      image_type: 'axolotl',
      featured: 0,
      is_new: 1
    }
  ];

  const insert = db.prepare(`
    INSERT INTO products (
      id, name, category, category_name, price, original_price, rating, reviews_count,
      badge, in_stock, customizable, tagline, description, materials, dimensions,
      colors, default_color, image_type, featured, is_new
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  for (const p of initialProducts) {
    insert.run(
      p.id, p.name, p.category, p.category_name, p.price, p.original_price,
      p.rating, p.reviews_count, p.badge, p.in_stock, p.customizable,
      p.tagline, p.description, p.materials, p.dimensions,
      p.colors, p.default_color, p.image_type, p.featured, p.is_new
    );
  }

  console.log(`✅ Seeded ${initialProducts.length} products successfully.`);
}

function seedSampleOrders() {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM orders').get();
  if (countRow.count > 0) return;

  console.log('🌱 Seeding initial sample orders for Admin review...');

  const sampleOrders = [
    {
      order_id: 'CC-839201',
      customer_name: 'Chloe Morrison',
      customer_email: 'chloe.m@example.com',
      customer_address: '742 Evergreen Terrace',
      customer_city: 'Portland',
      customer_state: 'OR',
      customer_zip: '97201',
      payment_method: 'card',
      subtotal: 33.48,
      shipping: 0.00,
      discount: 3.35,
      total_price: 30.13,
      status: 'Shipped',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: JSON.stringify([
        {
          id: 'mochi-boba-bear',
          name: 'Mochi Boba Bear Shaker',
          price: 14.99,
          quantity: 1,
          isCustom: false,
          imageType: 'boba-bear',
          selectedOptions: { color: 'Strawberry Latte', colorHex: '#FFCAD4', hardware: 'gold-star' }
        },
        {
          id: 'custom-sample-1',
          name: 'Custom Fluffy Cloud',
          price: 18.49,
          quantity: 1,
          isCustom: true,
          imageType: 'cloud',
          customDetails: {
            shape: 'cloud',
            shapeName: 'Fluffy Cloud',
            colorName: 'Sakura Pink',
            colorHex: '#FFCAD4',
            finishName: 'Glitter Resin Shimmer',
            finish: 'glitter',
            text: 'CHLOE ✨',
            font: 'bubble',
            textColor: '#FFFFFF',
            hardware: 'rose-heart',
            hardwareName: 'Rose Gold Heart Clasp',
            charms: ['strawberry', 'star'],
            giftBox: true
          }
        }
      ])
    },
    {
      order_id: 'CC-512940',
      customer_name: 'Hana Takahashi',
      customer_email: 'hana.t@example.com',
      customer_address: '108 Cherry Blossom Way',
      customer_city: 'Seattle',
      customer_state: 'WA',
      customer_zip: '98101',
      payment_method: 'apple-pay',
      subtotal: 22.99,
      shipping: 4.99,
      discount: 0.00,
      total_price: 27.98,
      status: 'In Production',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      items: JSON.stringify([
        {
          id: 'magnetic-couple-avocado',
          name: 'Magnetic Avocado Besties Set (Pair)',
          price: 22.99,
          quantity: 1,
          isCustom: false,
          imageType: 'couple-avocado',
          selectedOptions: { color: 'Creamy Guac Pair', colorHex: '#BBF7D0', hardware: 'gold-star' }
        }
      ])
    }
  ];

  const insertOrder = db.prepare(`
    INSERT INTO orders (
      order_id, customer_name, customer_email, customer_address, customer_city,
      customer_state, customer_zip, payment_method, subtotal, shipping,
      discount, total_price, status, items, created_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  for (const o of sampleOrders) {
    insertOrder.run(
      o.order_id, o.customer_name, o.customer_email, o.customer_address, o.customer_city,
      o.customer_state, o.customer_zip, o.payment_method, o.subtotal, o.shipping,
      o.discount, o.total_price, o.status, o.items, o.created_at
    );
  }

  console.log(`✅ Seeded ${sampleOrders.length} initial orders.`);
}
