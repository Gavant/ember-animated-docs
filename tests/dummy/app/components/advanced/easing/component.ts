import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import TransitionContext from 'ember-animated/-private/transition-context';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

interface AdvancedEasingArgs {}

interface EaseOption {
    label: string;
    in?: (x: number) => number;
    out?: (x: number) => number;
}

// BEGIN-SNIPPET advanced-easing-functions.ts
// Shamelessly taken from d3-ease library

// tpmt is two power minus ten times t scaled to [0,1]
function tpmt(x: number) {
    return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}

var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function linear(t: number) {
    return t;
}

function expIn(t: number) {
    return tpmt(1 - +t);
}

function expOut(t: number) {
    return 1 - tpmt(t);
}

function cubicIn(t: number) {
    return t * t * t;
}

function cubicOut(t: number) {
    return --t * t * t + 1;
}

export function quadIn(t: number) {
    return t * t;
}

export function quadOut(t: number) {
    return t * (2 - t);
}

function sinIn(t: number) {
    return +t === 1 ? 1 : 1 - Math.cos(t * (Math.PI / 2));
}

function sinOut(t: number) {
    return Math.sin(t * (Math.PI / 2));
}

function bounceIn(t: number) {
    return 1 - bounceOut(1 - t);
}

function bounceOut(t: number) {
    return (t = +t) < b1
        ? b0 * t * t
        : t < b3
        ? b0 * (t -= b2) * t + b4
        : t < b6
        ? b0 * (t -= b5) * t + b7
        : b0 * (t -= b8) * t + b9;
}
// END-SNIPPET

export default class AdvancedEasing extends Component<AdvancedEasingArgs> {
    @tracked word = 'Animation';
    @tracked index = 0;

    words = ['Animation', 'Station'];

    constructor(owner: unknown, args: AdvancedEasingArgs) {
        super(owner, args);
        this.transition = this.transition.bind(this);
    }

    // BEGIN-SNIPPET advanced-easing.ts
    easingOptions: EaseOption[] = [
        {
            label: 'Built-in'
        },
        {
            label: 'Linear',
            in: linear,
            out: linear
        },
        {
            label: 'Exponential',
            in: expIn,
            out: expOut
        },
        {
            label: 'Cubic',
            in: cubicIn,
            out: cubicOut
        },
        {
            label: 'Quad',
            in: quadIn,
            out: quadOut
        },
        {
            label: 'Sin',
            in: sinIn,
            out: sinOut
        },
        {
            label: 'Bounce',
            in: bounceIn,
            out: bounceOut
        }
    ];

    @tracked easeOption: EaseOption = {
        label: 'Built-in'
    };

    @action
    selectEasing(easeOption: EaseOption) {
        this.easeOption = easeOption;
    }

    get easingIn() {
        return this.easeOption.in ?? null;
    }

    get easingOut() {
        return this.easeOption.out ?? null;
    }

    transition = function* (this: AdvancedEasing, { insertedSprites, removedSprites }: TransitionContext) {
        for (let sprite of removedSprites) {
            sprite.endTranslatedBy(200, 0);
            fadeOut(sprite);
            const moveOutOptions = this.easingOut ? { easing: this.easingOut } : {};
            move(sprite, moveOutOptions);
        }

        for (let sprite of insertedSprites) {
            sprite.startTranslatedBy(-200, 0);
            fadeIn(sprite);
            const moveInOptions = this.easingIn ? { easing: this.easingIn } : {};
            move(sprite, moveInOptions);
        }
    };
    // END-SNIPPET

    @action
    animate() {
        this.index = this.index === this.words.length - 1 ? 0 : this.index + 1;
        this.word = this.words[this.index];
    }
}
