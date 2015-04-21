import Ember from 'ember';
import { module, test } from 'qunit';
import groupBy from 'ember-group-by/macros/group-by';

var cars, car1, car2, car3, car4, car5, dealership;

module('Unit - groupBy', {
  setup: function() {
    car1 = { name: 'Carrera', color: 'red' };
    car2 = { name: 'Veyron', color: 'red' };
    car3 = { name: 'Corvette', color: 'blue' };
    car4 = { name: 'Viper', color: 'blue' };
    car5 = { name: 'Cobra', color: 'green' };

    cars = [car1, car2, car3, car4, car5];

    dealership = Ember.Object.extend({
      cars: cars,
      carsGroupedByColor: groupBy('cars', 'color')
    }).create();
  }
});

test('it groups cars by color', function(assert) {
  assert.expect(1);
  var redGroup = { property: 'color', value: 'red', items: [car1, car2] };
  var blueGroup = { property: 'color', value: 'blue', items: [car3, car4] };
  var greenGroup = { property: 'color', value: 'green', items: [car5] };

  var result = dealership.get('carsGroupedByColor');
  var expected = [redGroup, blueGroup, greenGroup];

  assert.deepEqual(result, expected);
});
