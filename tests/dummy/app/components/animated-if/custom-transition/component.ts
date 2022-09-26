// BEGIN-SNIPPET animated-if-custom-transition.ts
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import TransitionContext from 'ember-animated/-private/transition-context';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

export default class AnimatedIfCustomTransition extends Component {
    @tracked itemVisible = false;

    customTransition = function* ({ insertedSprites, removedSprites }: TransitionContext) {
        for (let sprite of removedSprites) {
            fadeOut(sprite);
        }
        for (let sprite of insertedSprites) {
            fadeIn(sprite);
        }
    };

    @action
    toggleItemVisible() {
        this.itemVisible = !this.itemVisible;
    }
}
//END-SNIPPET
