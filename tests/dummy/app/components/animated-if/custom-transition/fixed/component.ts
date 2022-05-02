// BEGIN-SNIPPET animated-if-custom-transition-fixed.ts
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import TransitionContext from 'ember-animated/-private/transition-context';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

export default class AnimatedIfCustomTransition extends Component {
    @tracked itemVisible = false;

    customTransition = function* ({ insertedSprites, removedSprites, duration }: TransitionContext) {
        for (let sprite of insertedSprites) {
            sprite.applyStyles({ opacity: '0' });
        }
        yield Promise.all(
            removedSprites.map((sprite) => {
                return fadeOut(sprite, { duration: duration / 2 });
            })
        );
        for (let sprite of insertedSprites) {
            fadeIn(sprite, { duration: duration / 2 });
        }
    };

    @action
    toggleItemVisible() {
        this.itemVisible = !this.itemVisible;
    }
}
//END-SNIPPET
