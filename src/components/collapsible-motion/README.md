# CollapsibleMotion

#### Description

A component which allows building collapsible elements with an arbitrary height.

#### Details

Animating a div from `height: 0` to `height: auto` is something the browser will refuse to do out of the box, because calculations of this animation would be expensive.
There are [many existing workaround](https://css-tricks.com/using-css-transitions-auto-dimensions/) which all have their different tradeoffs.

`CollapsibleMotion` uses a nice workaround which allows the browser to run this animation. `CollapsibleMotion` measures the resulting since and then animates between `height: 0` and the resulting size (at 99% of the animation). At the end of the animation, it sets the `height` back to `auto`.

This component also supports passing in a `minHeight` prop. By default this is 0.

Technically, we need to dynamically create the keyframes for this animation.
