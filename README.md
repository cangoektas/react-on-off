<p align="center">
  <img src="https://cdn.rawgit.com/cangoektas/react-on-off/master/assets/logo.svg" alt="react-on-off" height="48">
  <h3 align="center">react-on-off</h3>
  <p align="center">
    Flexible React components to manage on/off states
  </p>
  <p align="center">
    <a href="https://travis-ci.org/cangoektas/react-on-off" alt="Build status"><img src="https://img.shields.io/travis/cangoektas/react-on-off.svg?style=flat-square"></a>
  <a href="https://codecov.io/gh/cangoektas/react-on-off" alt="Code coverage"><img src="https://img.shields.io/codecov/c/github/cangoektas/react-on-off.svg?style=flat-square"></a>
  <a href="https://unpkg.com/react-on-off@^1/lib/" alt="Build size"><img src="http://img.badgesize.io/https://unpkg.com/react-on-off@^1/lib/react-on-off.min.js?label=size&style=flat-square"></a>
  <a href="https://unpkg.com/react-on-off@^1/lib/" alt="Build size gzipped"><img src="http://img.badgesize.io/https://unpkg.com/react-on-off@^1/lib/react-on-off.min.js?compression=gzip&label=gzip%20size&style=flat-square"></a>
  <a href="https://www.npmjs.com/package/react-on-off" alt="npm version"><img src="https://img.shields.io/npm/v/react-on-off.svg?style=flat-square"></a>
  </p>
</p>

## Table of contents

* [Motivation](#motivation)
* [Inspiration](#inspiration)
* [Installation](#installation)
* [Components](#components)
  * [OnOff](#onoff)
  * [OnOffCollection](#onoffcollection)
  * [OnOffItem](#onoffitem)
* [LICENSE](#license)

## Motivation

Many UI components either have a single or multiple on/off states and require
you to write the same type of stateful React components over and over again.
It's not hard, but it takes time and duplicates code. Instead, we can extract
common state requirements into generic, flexible and well-tested components
and reuse them to save time and bandwidth.

## Inspiration

All credit for the design and API should go to
[`react-toggled`](https://github.com/kentcdodds/react-toggled). If you only need
to render a toggle component, go with `react-toggled` since it comes with
functions that help with accessibility. If you're handling accessibility by
yourself or you need to manage multiple on/off states, `react-on-off` is for
you.

## Installation

```sh
npm install --save react-on-off
# or
yarn add react-on-off
```

You can also use UMD builds from unpkg:

```html
<script crossorigin src="https://unpkg.com/react-on-off/lib/react-on-off.js"></script>
<script crossorigin src="https://unpkg.com/react-on-off/lib/react-on-off.min.js"></script>
```

## Components

### `OnOff`

Manages a single, independent on/off state. Useful whenever you need to render
something with two states.

#### Usage

```js
import React from "react";
import { render } from "react-dom";
import { OnOff } from "react-on-off";

render(
  <OnOff>
    {({ on, toggle }) => (
      <>
        <h1>{on ? "Red" : "Blue"}</h1>
        <button onClick={toggle}>Switch pill</button>
      </>
    )}
  </OnOff>,
  document.getElementById("root")
);
```

#### Props

| Prop                        | Type       | Default | Description                                                                              |
| --------------------------- | ---------- | ------- | ---------------------------------------------------------------------------------------- |
| `defaultOn` <br> _optional_ | `boolean`  | `false` | The initial `on` state.                                                                  |
| `on` <br> _optional_        | `boolean`  | –       | Control prop if you want to control the state by yourself.                               |
| `onChange` <br> _optional_  | `function` | –       | Called whenever the state changes with the new `on` state.                               |
| `children` <br> _required_  | `function` | –       | A render prop. This is where you render whatever you want based on the state of `OnOff`. |

#### Render object

`OnOff` expects the `children` prop to be a function. It is called with a
single argument, an object with the following properties:

| Property | Type       | Description                                                            |
| -------- | ---------- | ---------------------------------------------------------------------- |
| `on`     | `boolean`  | `true` if the state is on, `false` otherwise.                          |
| `off`    | `boolean`  | Convenience property if you need `!on`.                                |
| `setOn`  | `function` | Sets the state to on.                                                  |
| `setOff` | `function` | Sets the state to off.                                                 |
| `toggle` | `function` | Toggles the state (i.e. when it's on, will set to off and vice versa). |

### `OnOffCollection`

Manages multiple on/off states where only one state can be on at all times. To
render the indivial on/off states, use `OnOffItem` anywhere inside an
`OnOffCollection` parent.

#### Usage

```js
import React from "react";
import { render } from "react-dom";
import { OnOffCollection, OnOffItem } from "react-on-off";

render(
  <OnOffCollection defaultOn="Home">
    <ul>
      {["Home", "About", "Contact"].map(stateId => (
        <OnOffItem id={stateId} key={stateId}>
          {({ id, on, setOn }) => (
            <li onClick={setOn} className={on ? "active" : null}>
              {id}
            </li>
          )}
        </OnOffItem>
      ))}
    </ul>
  </OnOffCollection>,
  document.getElementById("root")
);
```

#### Props

| Prop                        | Type       | Default | Description                                                                                                  |
| --------------------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `defaultOn` <br> _optional_ | `string`   | –       | The item id that should be on initially.                                                                     |
| `on` <br> _optional_        | `string`   | –       | Control prop if you want to control which item should be on. Either an id or `null` if no item should be on. |
| `onChange` <br> _optional_  | `function` | –       | Called whenever the state changes with the item id that is on.                                               |

### `OnOffItem`

Represents a single on/off state that is coupled to other on/off states. Doesn't
do anything without an `OnOffCollection` parent.

#### Usage

See [`OnOffCollection` Usage](#usage-1)

#### Props

| Prop                       | Type       | Default     | Description                                                                                                         |
| -------------------------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `id` <br> _optional_       | `string`   | a unique id | Only useful in combination with the `defaultOn` or `onChange` prop from `OnOffCollection`. Defaults to a unique id. |
| `children` <br> _required_ | `function` | –           | A render prop. This is where you render whatever you want based on the state of the `OnOffItem`.                    |

#### Render object

`OnOffItem` expects the `children` prop to be a function. It is called with a
single argument, an object with the following properties:

| Property | Type       | Description                                                                        |
| -------- | ---------- | ---------------------------------------------------------------------------------- |
| `id`     | `string`   | The state id you set yourself or a generated unique id.                            |
| `on`     | `boolean`  | `true` if the state is on, `false` otherwise.                                      |
| `off`    | `boolean`  | Convenience property if you need `!on`.                                            |
| `setOn`  | `function` | Sets the state of the item to on.                                                  |
| `setOff` | `function` | Sets the state of the item to off.                                                 |
| `toggle` | `function` | Toggles the state of the item (i.e. when it's on, will set to off and vice versa). |

## LICENSE

MIT
