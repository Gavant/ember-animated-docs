// BEGIN-SNIPPET animated-each-basic.ts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import TransitionContext from 'ember-animated/-private/transition-context';
import move from 'ember-animated/motions/move';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';

export default class AnimatedEachBasic extends Component {
    @tracked items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    transition = function* ({ removedSprites, keptSprites, duration, insertedSprites }: TransitionContext) {
        for (let sprite of insertedSprites) {
            sprite.applyStyles({ opacity: '0' });
        }
        for (let sprite of removedSprites) {
            // Set the sprites ending translation. Here the sprite will animate out to the left by 50px.
            sprite.endTranslatedBy(-50, 0);
            // Move the sprite which follows the `endTranslatedBy` above.
            move(sprite);
            // Also fade the sprite out.
            fadeOut(sprite, { duration: duration * 0.25 });
        }
        for (let sprite of insertedSprites) {
            fadeIn(sprite, { duration });
        }
        for (let sprite of keptSprites) {
            // Ensure moving sprites are above the removed sprites.
            sprite.applyStyles({ 'z-index': '2' });
            move(sprite, { duration: duration * 0.75 });
        }
    };

    @action
    removeItem(item: string) {
        const indexOfItem = this.items.indexOf(item);
        const items = this.items.concat([]);
        if (indexOfItem !== -1) {
            items.splice(indexOfItem, 1);
            this.items = items;
        }
    }

    @action
    resetItems() {
        this.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    }
}
// END-SNIPPET
