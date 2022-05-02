// BEGIN-SNIPPET animated-value-basic-rules.ts
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { toUp, toDown } from 'ember-animated/transitions/move-over';

interface RulesContext {
    newItems: number[];
    oldItems: number[];
}

export default class AnimatedValueBasic extends Component {
    @tracked notificationCount = 0;

    rules({ newItems, oldItems }: RulesContext) {
        if (oldItems[0] < newItems[0]) {
            return toDown;
        } else {
            return toUp;
        }
    }

    @action
    addNotification() {
        this.notificationCount += 1;
    }

    @action
    removeNotification() {
        this.notificationCount -= 1;
    }
}
//END-SNIPPET
