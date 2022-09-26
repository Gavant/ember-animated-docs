import { Sprite } from 'ember-animated/.';

declare module 'ember-animated/easings/cosine' {
    export function easeIn(sprite: Sprite, options: any): any;
    export function easeOut(sprite: Sprite, options: any): any;
}
