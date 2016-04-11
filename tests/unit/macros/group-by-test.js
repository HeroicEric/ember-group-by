import Ember from 'ember';
import { module, test } from 'qunit';
import groupBy from 'ember-group-by/macros/group-by';

module('Unit - groupBy');

test('it groups cars by color', function(assert) {
  assert.expect(1);
  var car1 = { name: 'Carrera', color: 'red' };
  var car2 = { name: 'Veyron', color: 'red' };
  var car3 = { name: 'Corvette', color: 'blue' };
  var car4 = { name: 'Viper', color: 'blue' };
  var car5 = { name: 'Cobra', color: 'green' };
  var dealership = Ember.Object.extend({
    cars: [car1, car2, car3, car4, car5],
    carsGroupedByColor: groupBy('cars', 'color')
  }).create();

  var redGroup = { property: 'color', value: 'red', items: [car1, car2] };
  var blueGroup = { property: 'color', value: 'blue', items: [car3, car4] };
  var greenGroup = { property: 'color', value: 'green', items: [car5] };

  var expected = [redGroup, blueGroup, greenGroup];
  var result = dealership.get('carsGroupedByColor');

  assert.deepEqual(result, expected);
});
