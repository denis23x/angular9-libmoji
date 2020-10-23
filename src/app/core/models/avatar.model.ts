export interface Gender {
  [index: number]: string | number;
}

export interface Style {
  [index: number]: string | number;
}

export interface Trait {
  key: string;
  options: {
    value: number
  }[];
}

export interface Outfit {
  description: string;
  has_custom_head: boolean;
  id: number;
  image: string;
  outfit: string;
  sublogo: string;
}

export interface Brand {
  bg_color: string;
  fg_color: string;
  header_background: string;
  id: number;
  logo: string;
  name: string;
  outfits: Outfit[];
  store_background: string;
  theme: string;
  visible_in_snapchat: boolean;
}
