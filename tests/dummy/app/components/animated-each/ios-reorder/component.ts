// BEGIN-SNIPPET animated-each-ios-reorder.ts
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import TransitionContext from 'ember-animated/-private/transition-context';
import move from 'ember-animated/motions/move';
import { fadeOut } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';
import { isEqual } from '@ember/utils';

interface AnimatedEachIosReorderArgs {}

interface Item {
    id: number;
    label: string;
    color: string;
}

export default class AnimatedEachIosReorder extends Component<AnimatedEachIosReorderArgs> {
    colors = ['primary', 'danger', 'warning', 'secondary', 'success'];

    @tracked declare items: Item[];

    constructor(owner: unknown, args: AnimatedEachIosReorderArgs) {
        super(owner, args);
        this.items = [...Array(15)].map((_, i) => ({
            id: i,
            label: `${i + 1}`,
            color: this.colors[i % this.colors.length]
        }));
    }

    transition = function* ({ removedSprites, keptSprites, duration }: TransitionContext) {
        for (let sprite of removedSprites) {
            // Yield the fadeout to allow the removed sprite to be removed first
            yield fadeOut(sprite, { duration: duration * 0.25 });
        }
        // Get all of the sprites that will be moving.
        // If a sprites `initialBounds` are equal to its `finalBounds` it isn't moving
        const movingSprites = keptSprites.filter((sprite) => !isEqual(sprite.initialBounds, sprite.finalBounds));
        for (let sprite of movingSprites) {
            // Move each "moving" sprite to its final position
            move(sprite, { duration: duration * 0.25 });
            // Wait a fraction of the remaining animation duration to create a staggered effect
            yield wait(duration * 0.5 * (1 / movingSprites.length));
        }
    };

    @action
    removeItem(indx: number) {
        const items = this.items.concat([]);
        items.splice(indx, 1);
        this.items = items;
    }
}
// END-SNIPPET
