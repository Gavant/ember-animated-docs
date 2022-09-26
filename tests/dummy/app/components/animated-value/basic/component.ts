// BEGIN-SNIPPET animated-value-basic.ts
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import TransitionContext from 'ember-animated/-private/transition-context';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

export default class AnimatedValueBasic extends Component {
    @tracked word = 'Somebody';
    @tracked index = 0;

    words = [
        'Somebody',
        'once',
        'told',
        'me',
        'the',
        'world',
        'is',
        'gonna',
        'roll',
        'me',
        'I',
        "ain't",
        'the',
        'sharpest',
        'tool',
        'in',
        'the',
        'shed',
        'She',
        'was',
        'looking',
        'kind',
        'of',
        'dumb',
        'with',
        'her',
        'finger',
        'and',
        'her',
        'thumb',
        'In',
        'the',
        'shape',
        'of',
        'an',
        '"L"',
        'on',
        'her',
        'forehead'
    ];

    transition = function* ({ insertedSprites, removedSprites }: TransitionContext) {
        for (let sprite of removedSprites) {
            sprite.endTranslatedBy(200, 0);
            move(sprite);
            fadeOut(sprite);
        }

        for (let sprite of insertedSprites) {
            sprite.startTranslatedBy(-200, 0);
            move(sprite);
            fadeIn(sprite);
        }
    };

    @action
    animate() {
        this.index = this.index === this.words.length - 1 ? 0 : this.index + 1;
        this.word = this.words[this.index];
    }
}
//END-SNIPPET
