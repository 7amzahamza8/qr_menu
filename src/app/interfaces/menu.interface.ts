export interface RestaurantInfo {
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  phone: string;
  address: string;
  locationUrl?: string; // Google Maps location button if it exists
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface RestaurantMenu {
  restaurant: RestaurantInfo;
  categories: MenuCategory[];
}
