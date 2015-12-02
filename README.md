# ember-group-by

ember-group-by provides a computed property macro for grouping objects by a
given property.

## Installation

`ember install ember-group-by`

## Usage

```javascript
import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({
  carsByColor: groupBy('model', 'color')
});
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

{{#each carsByColor as |group|}}
  <h3>Cars that have {{group.property}} {{group.value}}</h3>

  <ul>
    {{#each group.items as |car|}}
      <li>{{car.name}}</li>
    {{/each}}
  </ul>
{{/each}}
```


You can also pass additional keys in for the computed property to watch. This
will cause it to re-compute when any of those keys change.

```javascript
import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({
  carsByColor: groupBy('model', 'color', { additionalKeysToWatch: ['price', 'name'] })
});


**There is also an example in [test/dummy](tests/dummy).**
