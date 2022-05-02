# Overview

To explain how `ember-animated` works it's probably best to use an example. We'll begin by using `{{#animated-if}}`, the most simple code block.

## Animated if

The `{{#animated-if}}` block is a replacement for Ember's `{{#if}}` block that allows for data to be animated as things changes.

## Basic Usage

Let's start with the most basic example of the `animated-if`:

{{animated-if/basic}}

To explain,

-   The `{{#animated-if}}` takes three main arguments:

    -   The property that will change and cause the `if` block to re-render
        -   Here we're using `itemVisible`, but this can be any property that's truthy/falsy.
    -   The `transition` you'd like to use.
        -   In this instance, we're using one of ember-animated's built in transitions, `fade`.
    -   The `duration` of the animation.
        -   This argument isn't required but it allows us to control the time it takes for the animation to complete in `ms`.
        -   The default value is `500ms`.

-   The `<AnimatedContainer>` surrounding the `{{#animated-if}}` provides a boundary between the animating content and the rest of the document to allow the content to smoothly resize as things appear, disappear and move around.

## Custom Transition

Now let's take a look at writing a custom transition.

Transitions in ember-animated are generator functions. (If you've never worked with generator functions before, check out some docs here [MDN Function\*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*))

This transition function is passed 1 argument, the `TransitionContext`. This is an object with several important properties that allow us to control how things are animated. The usable properties include:

-   insertedSprites
-   removedSprites
-   keptSprites
-   receivedSprites
-   sentSprites
-   duration
-   beacons

Each of the "sprite" properties is a `Sprite[]` that can be manipulated. A `Sprite` is an object that includes a reference to a DOM element, in addition to other useful properties to help with animation.

> When dealing with ember-animated blocks, it's important to remember that every top-level element inside the block becomes a `Sprite`.

These sprites are animated using motions. A `motion` is function that takes in a `Sprite` and changes its properties in some way. There are several built-in motions for ember-animated. You can also write your own motions.

{{animated-if/custom-transition}}

The first thing you might notice here is that the templates look almost identical. The only things that changed was our transition argument `use=this.customTransition` and adding in an `{{else}}` block to our template. Let's break these changes down:

-   Inside the `script.ts`, the generator function `customTransition` is passed the `TransitionContext` object as an argument.
    -   Here we're destructuring that object to just get the `insertedSprites` and `removedSprites` because that's all we need for this animaton.
-   We're then iterating over all of the sprites that were inserted, and all of the removed sprites, to animate them how we'd like.
-   For the `insertedSprites` we're using the built-in `fadeIn` method
-   For the `removedSprites` we're using the built-in `fadeOut` method
-   As you can see, this is _almost_ what we want, but the texts fade through eachother, let's look at how we can change that.

{{animated-if/custom-transition/fixed}}

Here's what we need to understand about our updated `customTransition`:

-   The first change is the initial setting of our `insertedSprites` opacity to 0.
    -   Unfortunately this is currently needed due to a bug in `ember-animated` which will hopefully be resolved. See [Github Issue](https://github.com/ember-animation/ember-animated/issues/111)
-   The second change is how our `removedSprites` are handled.

    -   Remember that we're in a generator function, so we can `yield` promises that will be awaited within our function.
    -   Here we're yielding an array of promises over all of our `removedSprites` to ensure their animations finish before inserting our new content.

        > It's important that we `yield` an array of promises here rather than just iterating over the `removedSprites` and yielding their `fadeOut` individually. If we were to just iterate over the sprites, the `removedSprites` would fade out one-by-one (if we had more sprite elements present) rather than altogether.
        > The staggered fadeout could be the desired animation so make sure to keep this concept in mind when making animations.

-   The last thing you should be aware of is setting each animations' (fadeIn/fadeOut) duration to half of our desired animation length with the passed in option `{duration: duration / 2}`.
    -   If we didn't do this, our `customTransition` would wait for the `removedSprites` to fade-out using the entire animation's duration (750ms) before animating the `insertedSprites` which would also take 750ms. This would end up with an animation length of 1500ms which isn't what we want here.
    -   We're grabbing our animation's `duration` from the destructuring of the `TransitionContext`

## Interrupted Transitions

The last general topic we'll discuss is the interruption of animations.

Let's take a look at an example of improper interruption handling. Click the button below, and before all of the elements have faded out, click it again.

{{animated-if/interrupted}}

You should notice that in when the animation is interrupted, it doesn't look too good. This is because sprites that were originally `removedSprites`, become `keptSprites`
once the animation is interrupted, and there's no logic to handle the animating of these sprites.

To fix this, we just need to add some logic to handle the `keptSprites`, which should be animated as if they were `insertedSprites` in this case.

{{animated-if/interrupted/fixed}}

Some additional things to be aware of here:

-   We're not yielding a `Promise.all` for our animations like we did before, which causes each `Sprite` (element) to finish animating before the next animation starts.
-   The `keptSprites` array is reversed in our logic so that the list animates back up to the initial state. If we didn't reverse the array, the elements would fade in top-down starting with the initial element.

That's all for the general overview of Ember-Animated! This page should be referenced whenever you run into issues or have questions on how Ember-Animated actually works. The rest of the documentation goes over examples of the different types of animated components.
