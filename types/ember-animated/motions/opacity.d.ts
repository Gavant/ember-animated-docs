import { Sprite } from 'ember-animated/.';

declare module 'ember-animated/motions/opacity' {
    export function fadeIn(sprite: Sprite, options?: any): void;
    export function fadeOut(sprite: Sprite, options?: any): void;
}
