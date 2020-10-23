import { Injectable } from '@angular/core';

import libmoji from 'libmoji';

import { Gender, Trait, Outfit, Brand } from '../models';

@Injectable()
export class AvatarService {

  constructor() { }

  getRandAvatar(g: number = libmoji.randInt(2)): string {
    const gender: Gender = libmoji.genders[g];
    const traits: Trait[] = libmoji.randTraits(libmoji.getTraits(gender[0], 'bitstrips'));
    const outfit: Brand[] = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));

    return libmoji.buildPreviewUrl('fashion', 3, gender[1], 1, 0, traits, outfit);
  }

  getTraits(gender: number, style: number): Trait[] {
    return libmoji.getTraits(libmoji.genders[gender][0], libmoji.styles[style][0]);
  }

  getBrands(gender: number): Brand[] {
    return libmoji.getBrands(libmoji.genders[gender][0]);
  }

  getOutfit(brand: Brand): Outfit[] {
    return libmoji.getOutfits(brand);
  }

}
