import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fade from 'ember-animated/transitions/fade';

export default class AnimatedIfBasic extends Component {
    @tracked itemVisible = false;

    fade = fade;

    @action
    toggleItemVisible() {
        this.itemVisible = !this.itemVisible;
    }
}
