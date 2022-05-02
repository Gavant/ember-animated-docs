// BEGIN-SNIPPET animated-if-interrupted-fixed.ts
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import TransitionContext from 'ember-animated/-private/transition-context';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

export default class AnimatedIfInterruptedFixed extends Component {
    @tracked itemVisible = false;

    customTransition = function* ({ insertedSprites, removedSprites, duration, keptSprites }: TransitionContext) {
        for (let sprite of insertedSprites) {
            sprite.applyStyles({ opacity: '0' });
        }
        for (let sprite of removedSprites) {
            yield fadeOut(sprite, { duration: duration / 8 });
        }
        for (let sprite of insertedSprites.concat(keptSprites.reverse())) {
            yield fadeIn(sprite, { duration: duration / 8 });
        }
    };

    @action
    toggleItemVisible() {
        this.itemVisible = !this.itemVisible;
    }
}
// END-SNIPPET
