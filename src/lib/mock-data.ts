import { Item } from './types';

// In a real app, this would come from Firebase.
const mockItems: Item[] = [
  {
    uid: 'prod_1',
    itemType: 'product',
    name: 'Premium Grain-Free Dog Food',
    description: 'A high-protein, grain-free formula for dogs of all ages. Made with real chicken and sweet potatoes.',
    price: 59.99,
    category: 'Food',
    imageUrl: 'https://picsum.photos/seed/101/400/300',
    stock: 120,
    brand: 'Pawsome Eats',
    tags: ['dog', 'food', 'grain-free', 'healthy'],
    rating: 4.8,
    dataAiHint: 'healthy dog food'
  },
  {
    uid: 'serv_1',
    itemType: 'service',
    name: 'Professional Dog Grooming',
    description: 'Full-service grooming including bath, haircut, nail trim, and ear cleaning. For a happy and clean pup!',
    category: 'Grooming',
    imageUrl: 'https://picsum.photos/seed/105/400/300',
    location: '123 Pet Lane, Dogtown, USA',
    contact: 'contact@pawsomegrooming.com',
    rating: 4.9,
    dataAiHint: 'dog grooming service'
  },
  {
    uid: 'prod_2',
    itemType: 'product',
    name: 'Interactive Cat Laser Toy',
    description: 'Keep your cat entertained for hours with this automatic, rotating laser toy. Features multiple speed settings.',
    price: 24.50,
    category: 'Toys',
    imageUrl: 'https://picsum.photos/seed/102/400/300',
    stock: 250,
    brand: 'Feline Fun',
    tags: ['cat', 'toy', 'interactive', 'laser'],
    rating: 4.6,
    dataAiHint: 'interactive cat toy'
  },
  {
    uid: 'serv_2',
    itemType: 'service',
    name: 'Veterinary Wellness Check',
    description: 'Comprehensive annual wellness exam for your pet, including vaccinations and a general health assessment.',
    category: 'Veterinary',
    imageUrl: 'https://picsum.photos/seed/106/400/300',
    location: '456 Heal Street, Catville, USA',
    contact: '555-123-4567',
    rating: 5.0,
    dataAiHint: 'pet wellness exam'
  },
  {
    uid: 'prod_3',
    itemType: 'product',
    name: 'Stylish Leather Dog Collar',
    description: 'Handcrafted genuine leather collar with a durable metal buckle. Available in multiple sizes and colors.',
    price: 35.00,
    category: 'Accessories',
    imageUrl: 'https://picsum.photos/seed/103/400/300',
    stock: 80,
    brand: 'Canine Couture',
    tags: ['dog', 'collar', 'leather', 'accessory'],
    rating: 4.7,
    dataAiHint: 'leather dog collar'
  },
  {
    uid: 'serv_3',
    itemType: 'service',
    name: 'Basic Obedience Dog Training',
    description: '6-week group class covering basic commands like sit, stay, come, and leash manners. Positive reinforcement methods.',
    category: 'Training',
    imageUrl: 'https://picsum.photos/seed/107/400/300',
    location: 'Online Classes Available',
    contact: 'training@goodboyacademy.com',
    rating: 4.8,
    dataAiHint: 'dog obedience training'
  }
];

// Simulate fetching data. In a real app, you'd use the Firebase Admin SDK.
export async function getMockItems(): Promise<Item[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockItems;
}
