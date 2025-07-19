import { MenuItem } from "@/types/MenuItem";
import image1 from '@/assets/1.jpeg'
import image2 from '@/assets/2.jpeg'
import image3 from '@/assets/3.jpeg'
import image4 from '@/assets/4.jpeg'

export const menuData: MenuItem[] = [
  // Appetizers
  {
    id: "1",
    name: "Truffle Arancini",
    description: "Crispy risotto balls with truffle oil and parmesan",
    price: 18,
    category: "appetizers",
     image:image1,
  },
  {
    id: "2",
    name: "Burrata Caprese",
    description: "Fresh burrata with heirloom tomatoes and basil",
    price: 22,
    category: "appetizers",
     image:image2,
  },
  {
    id: "3",
    name: "Tuna Tartare",
    description: "Fresh tuna with avocado and citrus dressing",
    price: 26,
    category: "appetizers",
     image:image3,
  },
  // Main Courses
  {
    id: "4",
    name: "Wagyu Ribeye",
    description: "Premium wagyu beef with roasted vegetables",
    price: 85,
    category: "mains",
     image:image4,
  },
  {
    id: "5",
    name: "Pan-Seared Salmon",
    description: "Atlantic salmon with lemon herb butter",
    price: 32,
    category: "mains",
     image:image1,
  },
  {
    id: "6",
    name: "Lobster Risotto",
    description: "Creamy risotto with fresh lobster and herbs",
    price: 45,
    category: "mains",
     image:image2,
  },
  // Desserts
  {
    id: "7",
    name: "Chocolate Soufflé",
    description: "Warm chocolate soufflé with vanilla ice cream",
    price: 16,
    category: "desserts",
     image:image3,
  },
  {
    id: "8",
    name: "Tiramisu",
    description: "Classic Italian tiramisu with espresso",
    price: 14,
    category: "desserts",
     image:image4,
  },
  {
    id: "9",
    name: "Crème Brûlée",
    description: "Vanilla custard with caramelized sugar",
    price: 12,
    category: "desserts",
     image:image1,
  },
  // Beverages
  {
    id: "10",
    name: "House Wine Selection",
    description: "Curated selection of red and white wines",
    price: 12,
    category: "beverages",
     image:image1,
  },
  {
    id: "11",
    name: "Craft Cocktails",
    description: "Signature cocktails made with premium spirits",
    price: 15,
    category: "beverages",
     image:image1,
  },
  {
    id: "12",
    name: "Fresh Juices",
    description: "Freshly squeezed seasonal fruit juices",
    price: 8,
    category: "beverages",
     image:image1,
  },
]