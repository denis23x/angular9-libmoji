import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import libmoji from 'libmoji';

interface Preview {
  gender: number;
  style: number;
  pose: string;
  traits: string[] | number[];
  outfit: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular9-libmoji';

  preview$ = new BehaviorSubject<Preview>({
    gender: 0,
    style: 0,
    pose: 'fashion',
    traits: libmoji.randTraits(this.pickTraits(0, 0)),
    outfit: libmoji.randOutfit(this.pickOutfit(0))
  } as Preview);

  traits: string[] | number[];
  outfit: string[] | number[];

  loader = false;
  previewUrl: string;

  ngOnInit() {
    this.preview$.pipe(
      tap(() => this.loader = true)
    ).subscribe(preview => {
      const { pose, traits, outfit } = preview;

      const gender = libmoji.genders[preview.gender];
      const style = libmoji.styles[preview.style];

      this.traits = this.pickTraits(preview.gender, preview.style);
      this.outfit = this.pickOutfit(preview.gender);

      this.previewUrl = libmoji.buildPreviewUrl(pose, 3, gender[1], style[1], 0, traits, outfit);
    });
  }

  ngOnDestroy() {
    this.preview$.unsubscribe();
  }

  pickTraits(gender: number, style: number): string[] | number[] {
    return libmoji.getTraits(libmoji.genders[gender][0], libmoji.styles[style][0]);
  }

  pickOutfit(gender: number): string[] | number[] {
    return libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(libmoji.genders[gender][0])));
  }

  setGender(gender: number) {
    const { style } = this.preview$.getValue();
    const traits = libmoji.randTraits(this.pickTraits(gender, style));

    this.preview$.next({ ...this.preview$.getValue(), gender, traits });
  }

  setStyle(style: number) {
    const { gender } = this.preview$.getValue();
    const traits = libmoji.randTraits(this.pickTraits(gender, style));

    this.preview$.next({ ...this.preview$.getValue(), style, traits });
  }

  setPose(pose: string) {
    this.preview$.next({ ...this.preview$.getValue(), pose });
  }

  setTrait(trait: string, id: string) {
    const { traits } = this.preview$.getValue();

    traits[traits.findIndex(t => t[0] === trait)][1] = parseInt(id, 10);

    this.preview$.next({ ...this.preview$.getValue(), traits });
  }

  setOutfit(id: string) {
    const outfit = parseInt(id, 10);

    this.preview$.next({ ...this.preview$.getValue(), outfit });
  }
}
