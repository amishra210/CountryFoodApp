# [angular](https://angularjs.org/)-ui-switch2

This is an updated version of [angular-ui-switch](https://github.com/xpepermint/angular-ui-switch) that includes
changes inspired by a forked [repo](https://github.com/goldmane/angular-ui-switch). This version includes
ngDisabled and allows the iOS style switches to to be 'frozen' (aka disabled). When `ngDisabled=true`, a `disabled`
class will be added to the `<switch>` element, which can then be custom styled within your own app.

The following documentation is based on [angular-ui-switch's]( https://github.com/xpepermint/angular-ui-switch) README.

## Overview

This is a simple iOS style switch directive for AngularJS. You can use this module as you would use any HTML checkbox
input element. This is a lightweight module and you can completely change the design using just CSS.

Supported by all modern browsers: Chrome, Firefox, Opera, Safari, IE8+

![YoomJS](https://raw.githubusercontent.com/kpytang/angular-ui-switch/master/logo.png)

Inspired by [switchery](https://github.com/abpetkov/switchery) - in an angular way.

## Installation

Download the package from `github`. The package is also available over `npm install angular-ui-switch2` or
`bower install angular-ui-switch2`.

Include the `javascript` and `css` files into your page to begin using the directive in your app.

```html
<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
  ...
  <link rel="stylesheet" href="/ui-switch.min.css"/>
</head>
<body>
  ...
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.3/angular.min.js"></script>
  <script src="/ui-switch.min.js"></script>
</body>
</html>
```

Declare a dependency on the module.

```js
angular.module( 'myModule', ['uiSwitch'] );
```

Insert the switch in your html template.

```html
<form>
  <switch id="enabled" name="enabled" ng-model="enabled" class="green"></switch>
  <br>{{ enabled }}
</form>
```

Add optional on/off text
```html
<form>
  <switch id="enabled" name="enabled" ng-model="enabled" on="On" off="Off" class="green"></switch>
  <br>{{ enabled }}
</form>
```

Disabled (no state change via click)
```html
<form>
  <switch id="disabledTest" name="disabledTest" ng-model="disabledTestModel" ng-disabled="true"></switch>
  <br>{{ disabledTestModel }}
</form>
```

## Design

You can completely change the design. All the magic is hidden inside a few CSS classes.

```css
.switch {
  /* frame */
}
.switch small {
  /* button */
}
.switch.checked {
  /* frame when enabled */
  /* set background color of switch when switch is checked and enabled */
}
.switch.checked small {
  /* button when checked */
  /* set button position when switch is checked */
}
.switch.disabled {
  /* frame when disabled */
}
.switch.disabled.checked {
  /* button when disabled */
  /* set background color of switch when switch is checked and disabled */
}
```

## Publishing

1. Update version in `package.json` and `bower.json`.

2. Run `make compile` to minify files.

3. Run `make publish` to publish.
