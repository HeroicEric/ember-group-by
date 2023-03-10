# ember-group-by
![Download count all time](https://img.shields.io/npm/dt/ember-group-by.svg) [![Build Status](https://travis-ci.org/HeroicEric/ember-group-by.svg?branch=master)](https://travis-ci.org/HeroicEric/ember-group-by) [![npm version](https://badge.fury.io/js/ember-group-by.svg)](http://badge.fury.io/js/ember-group-by) [![Ember Observer Score](http://emberobserver.com/badges/ember-group-by.svg)](http://emberobserver.com/addons/ember-group-by) [![Dependencies up to date](https://david-dm.org/HeroicEric/ember-group-by.svg)](https://david-dm.org/HeroicEric/ember-group-by)



ember-group-by provides a computed property macro for grouping objects by a
given property.

## Installation

`ember install ember-group-by`

## Usage

```javascript
import Controller from '@ember/controller';
import groupBy from 'ember-group-by';

export default class IndexController extends Controller {
  @groupBy('model', 'color')
  carsByColor;
}
```

This will return an array of POJOs with the following properties:

```javascript
[
  { property: 'color', value: 'red', items: [car1, car2] },
  { property: 'color', value: 'blue', items: [car3, car4] },
  { property: 'color', value: 'green', items: [car5] }
]
```

Each group object will have the following properties:

- `property` The name of the property that you grouped the items by
- `value` The value for the property that you grouped the items by
- `items` All of the objects with the matching value for that property

You can then use this in your templates to do cool things like:

```handlebars
<h1>Cars grouped by color</h1>

{{#each this.carsByColor as |group|}}
  <h3>Cars that have {{group.property}} {{group.value}}</h3>

  <ul>
    {{#each group.items as |car|}}
      <li>{{car.name}}</li>
    {{/each}}
  </ul>
{{/each}}
```

**There is also an example in [test/dummy](tests/dummy).**

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
