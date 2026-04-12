import type { Product } from '@/store/cartStore';

import productPeanutButter from '@/assets/product-peanut-butter.png';
import productCocoaFudge from '@/assets/product-cocoa-fudge.png';
import img1 from '@/assets/1.png';
import img3 from '@/assets/3.png';
import img9 from '@/assets/9.png';
import img11 from '@/assets/11.png';
import img12 from '@/assets/12.png';

export const products: Product[] = [
  {
    id: 'tiramisu-peanut-butter',
    name: 'Tiramisu Peanut Butter',
    flavor: 'Rich tiramisu layers with creamy peanut butter',
    price: 299,
    image: productPeanutButter,
    images: [productPeanutButter, img1, img3, img9],
    theme: 'red',
    description: 'A decadent fusion of Italian tiramisu and American peanut butter. 20g protein, zero guilt.',
    protein: '20g',
    calories: '210',
  },
  {
    id: 'double-cocoa-fudge',
    name: 'Double Cocoa Fudge',
    flavor: 'Intense double chocolate with fudge center',
    price: 299,
    image: productCocoaFudge,
    images: [productCocoaFudge, img11, img12],
    theme: 'purple',
    description: 'Double the cocoa, double the indulgence. Rich fudge center meets premium whey protein.',
    protein: '22g',
    calories: '195',
  },
];
