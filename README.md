<img src="https://cdn.rawgit.com/cangoektas/react-on-off/master/assets/logo.svg" alt="react-on-off" height="48">

Encapsulates state management for a single, independent on/off state. Useful
whenever you want to render something that has two states. It exposes the
current state and functions to update the state through a render prop.

[![Travis](https://img.shields.io/travis/cangoektas/react-on-off.svg?style=flat-square)](https://travis-ci.org/cangoektas/react-on-off)
[![Codecov](https://img.shields.io/codecov/c/github/cangoektas/react-on-off.svg?style=flat-square)](https://codecov.io/gh/cangoektas/react-on-off)
[![npm version](https://img.shields.io/npm/v/react-on-off.svg?style=flat-square)](https://www.npmjs.com/package/react-on-off)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [Props](#props)
* [Render object](#render-object)
* [Inspiration](#inspiration)
* [LICENSE](#license)

## Installation

```sh
npm install --save react-on-off
# or
yarn add react-on-off
```

## Usage

```js
import React from "react";
import { render } from "react-dom";
import OnOff from "react-on-off";

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

## Props

| Prop                        | Type       | Default | Description                                                                              |
| --------------------------- | ---------- | ------- | ---------------------------------------------------------------------------------------- |
| `defaultOn` <br> _optional_ | `boolean`  | `false` | The initial `on` state.                                                                  |
| `on` <br> _optional_        | `boolean`  | –       | Control prop if you want to control the state by yourself.                               |
| `onChange` <br> _optional_  | `function` | –       | Called whenever the state changes with the new `on` state.                               |
| `children` <br> _required_  | `function` | –       | A render prop. This is where you render whatever you want based on the state of `OnOff`. |

## Render object

`OnOff` expects the `children` prop to be a render prop. It is invoked with a
single argument, an object with the following properties:

| Property | Type       | Description                                                            |
| -------- | ---------- | ---------------------------------------------------------------------- |
| `on`     | `boolean`  | `true` if the state is on, `false` otherwise.                          |
| `off`    | `boolean`  | Convenience property if you need `!on`.                                |
| `setOn`  | `function` | Sets the state to on.                                                  |
| `setOff` | `function` | Sets the state to off.                                                 |
| `toggle` | `function` | Toggles the state (i.e. when it's on, will set to off and vice versa). |

## Inspiration

// TODO

## LICENSE

MIT
