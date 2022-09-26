# Animated-Each

## Basic Example

Removed sprites are faded out to the left. Kept sprites are smoothly moved to their final positions.

{{animated-each/basic}}

## iOS Reordering Example

Fade out the clicked "icon" -> move each icon in a staggered fashion to its new position.

Makes use of Ember-Animated's builtin `wait()` method.

Notice that the sum of each `yielded` animations' duration is the total duration.

{{animated-each/ios-reorder}}
