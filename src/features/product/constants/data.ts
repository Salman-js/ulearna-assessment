import { IProduct } from '../interface/interface.product';

export const productsSeedData: IProduct[] = [
  {
    id: '1',
    name: 'Hoodie',
    category: 'hoodie',
    views: ['front', 'back', 'left', 'right'],
    shortDescription: 'Unisex ECO Raglan Hoodie',
    defaultVariant: {
      color: 'white',
      size: 'm',
      price: 7.99,
      quantity: 100,
    },
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit.',
    variants: [
      {
        color: 'white',
        size: 'sm',
        price: 5.99,
        quantity: 100,
      },
      {
        color: 'white',
        size: 'm',
        price: 7.99,
        quantity: 100,
      },
      {
        color: 'white',
        size: 'lg',
        price: 9.99,
        quantity: 100,
      },
      {
        color: 'black',
        size: 'sm',
        price: 5.99,
        quantity: 100,
      },
      {
        color: 'black',
        size: 'm',
        price: 7.99,
        quantity: 100,
      },
      {
        color: 'black',
        size: 'lg',
        price: 9.99,
        quantity: 100,
      },
      {
        color: 'gray',
        size: 'sm',
        price: 5.99,
        quantity: 100,
      },
      {
        color: 'gray',
        size: 'm',
        price: 7.99,
        quantity: 100,
      },
      {
        color: 'gray',
        size: 'lg',
        price: 9.99,
        quantity: 100,
      },
    ],
  },
  {
    id: '2',
    name: 'T-shirt',
    category: 'tshirt',
    views: ['front', 'back', 'left', 'right'],
    defaultVariant: {
      color: 'white',
      size: 'm',
      price: 4.99,
      quantity: 150,
    },
    shortDescription: 'Unisex Classic Cotton T-shirt',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit.',
    variants: [
      {
        color: 'black',
        size: 'sm',
        price: 3.99,
        quantity: 150,
      },
      {
        color: 'black',
        size: 'm',
        price: 4.99,
        quantity: 150,
      },
      {
        color: 'black',
        size: 'lg',
        price: 4.99,
        quantity: 150,
      },
      {
        color: 'gray',
        size: 'sm',
        price: 3.99,
        quantity: 150,
      },
      {
        color: 'gray',
        size: 'm',
        price: 4.99,
        quantity: 150,
      },
      {
        color: 'gray',
        size: 'lg',
        price: 5.99,
        quantity: 150,
      },
      {
        color: 'white',
        size: 'sm',
        price: 3.99,
        quantity: 150,
      },
      {
        color: 'white',
        size: 'm',
        price: 4.99,
        quantity: 150,
      },
      {
        color: 'white',
        size: 'lg',
        price: 5.99,
        quantity: 150,
      },
    ],
  },
  {
    id: '3',
    name: 'Hat',
    category: 'hat',
    views: ['front', 'back'],
    defaultVariant: {
      color: 'white',
      size: 'm',
      price: 2.99,
      quantity: 200,
    },
    shortDescription: 'Adjustable Cotton Baseball Cap',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Comfortable and durable, this classic t-shirt is perfect for everyday wear. Made with high-quality cotton for a soft feel and lasting fit.',
    variants: [
      {
        color: 'white',
        size: 'sm',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'white',
        size: 'm',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'white',
        size: 'lg',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'black',
        size: 'sm',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'black',
        size: 'm',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'black',
        size: 'lg',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'gray',
        size: 'sm',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'gray',
        size: 'm',
        price: 2.99,
        quantity: 200,
      },
      {
        color: 'gray',
        size: 'lg',
        price: 2.99,
        quantity: 200,
      },
    ],
  },
];
