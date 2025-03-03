import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/Menu-items';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getMenuItems(): MenuItem[] {
    return [
      {
        _id: 1,
        name: 'Espresso',
        price: 100,
        category: 'Espresso-based',
        description:
          'A strong and bold coffee made by forcing hot water under pressure through finely ground coffee beans.',
        image: 'assets/coffee-menu/Espresso.jpg',
      },
      {
        _id: 2,
        name: 'Americano',
        price: 120,
        category: 'Espresso-based',
        description:
          'Espresso diluted with hot water for a smooth and mellow flavor.',
        image: 'assets/coffee-menu/Americano.jpg',
      },
      {
        _id: 3,
        name: 'Cappuccino',
        price: 130,
        category: 'Espresso-based',
        description:
          'Espresso topped with steamed milk and foam for a creamy, rich taste.',
        image: 'assets/coffee-menu/Cappuccino.jpg',
      },
      {
        _id: 4,
        name: 'Latte',
        price: 140,
        category: 'Espresso-based',
        description:
          'A smooth combination of espresso and steamed milk, topped with a small amount of foam.',
        image: 'assets/coffee-menu/Latte.jpg',
      },
      {
        _id: 5,
        name: 'Macchiato',
        price: 110,
        category: 'Espresso-based',
        description:
          'Espresso with a small amount of steamed milk, offering a stronger coffee flavor.',
        image: 'assets/coffee-menu/Macchiato.jpg',
      },
      {
        _id: 6,
        name: 'Flat White',
        price: 150,
        category: 'Espresso-based',
        description:
          'Espresso with steamed milk, similar to a latte but with a thinner layer of foam.',
        image: 'assets/coffee-menu/Flat-White.jpg',
      },
      {
        _id: 7,
        name: 'Mocha',
        price: 160,
        category: 'Espresso-based',
        description:
          'A delightful blend of espresso, chocolate syrup, and steamed milk, topped with whipped cream.',
        image: 'assets/coffee-menu/Mocha.jpg',
      },
      {
        _id: 8,
        name: 'Cold Brew',
        price: 140,
        category: 'Cold Coffee',
        description:
          'Coffee brewed slowly over cold water for a smooth and less acidic flavor.',
        image: 'assets/coffee-menu/Cold-Brew.jpg',
      },
      {
        _id: 9,
        name: 'Iced Latte',
        price: 150,
        category: 'Cold Coffee',
        description:
          'A refreshing iced drink made with espresso and cold milk over ice.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 10,
        name: 'Iced Americano',
        price: 130,
        category: 'Cold Coffee',
        description:
          'Espresso diluted with cold water and ice, perfect for a refreshing coffee break.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 11,
        name: 'Affogato',
        price: 180,
        category: 'Dessert',
        description:
          'Espresso poured over a scoop of vanilla ice cream for a decadent treat.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 12,
        name: 'Nitro Cold Brew',
        price: 170,
        category: 'Cold Coffee',
        description:
          'Cold brew coffee infused with nitrogen for a creamy and frothy texture.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 13,
        name: 'Turkish Coffee',
        price: 120,
        category: 'Specialty',
        description:
          'A strong, thick coffee served with sugar and spices, brewed in a cezve.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 14,
        name: 'Irish Coffee',
        price: 200,
        category: 'Specialty',
        description:
          'A warm cocktail made with coffee, whiskey, sugar, and topped with cream.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 15,
        name: 'Vietnamese Coffee',
        price: 130,
        category: 'Specialty',
        description:
          'Strong coffee served with sweetened condensed milk, offering a rich and bold flavor.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 16,
        name: 'Cortado',
        price: 110,
        category: 'Espresso-based',
        description:
          'Espresso balanced with equal parts of steamed milk, creating a smooth and strong taste.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 17,
        name: 'Doppio',
        price: 120,
        category: 'Espresso-based',
        description:
          'A double shot of espresso, perfect for a strong coffee kick.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 18,
        name: 'Cafe au Lait',
        price: 140,
        category: 'Espresso-based',
        description:
          'A French-style coffee made with equal parts brewed coffee and steamed milk.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 19,
        name: 'Café Breve',
        price: 160,
        category: 'Espresso-based',
        description:
          'Espresso with steamed half-and-half milk, creating a rich and creamy flavor.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
      {
        _id: 20,
        name: 'Ristretto',
        price: 100,
        category: 'Espresso-based',
        description:
          'A short shot of espresso made with less water for a more intense coffee flavor.',
        image: 'assets/coffee-menu/Coffee-Mock.png',
      },
    ];
  }
}
