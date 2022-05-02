// BEGIN-SNIPPET animated-if-basic.ts
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import fade from 'ember-animated/transitions/fade';

export default class ExampleController extends Controller {
    transition = fade;

    @tracked basicExampleVisible = false;

    @action
    toggleBasicVisible() {
        this.basicExampleVisible = !this.basicExampleVisible;
    }
}
// END-SNIPPET
