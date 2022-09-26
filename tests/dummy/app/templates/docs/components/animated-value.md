# Animated-Value

## Basic Example

A few notes about our setup:

We're using a `transition` here, there is another option using `rules` (allowing you to compare old vs new values easily) which is shown below.

First, note that we've wrapped the `p` tag in `animated-value`, rather than the bare word itself. Animators always operate on their immediate child elements, so make sure the immediate child of your animated-value is a DOM element rather than plain text. Otherwise you'll see a warning in your console, and your animation won't work.

Second, note how we pass in our dynamic word property in as the first positional argument to `{{#animated-value}}`, and then we yield out a local variable called `value`. We then replace our original usage of `this.word` in our template with `value`. This is because when `this.word` changes and we transition from the old value to the new, we'll actually be rendering two versions of our template. The yielded property will let us do that.

{{animated-value/basic}}

## Basic Example Using Rules

Here instead of using `use=this.transition` we pass in `rules`, which are just a normal function using `rules=this.rules`.
Then we use the built in `toUp` and `toDown` methods based on the new and old value.

{{animated-value/basic/rules}}
