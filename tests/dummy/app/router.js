import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from 'dummy/config/environment';

const Router = AddonDocsRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function () {
    docsRoute(this, function () {
        this.route('components', function () {
            this.route('animated-if');
            this.route('animated-each');
            this.route('animated-value');
            this.route('animated-beacon');
        });
        this.route('overview');
        this.route('advanced');
    });
    this.route('not-found', { path: '/*path' });
});

export default Router;
