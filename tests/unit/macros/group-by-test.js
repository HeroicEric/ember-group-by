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
  assert.expect(9);
  var redGroup = { property: 'color', value: 'red', items: [car1, car2] };
  var blueGroup = { property: 'color', value: 'blue', items: [car3, car4] };
  var greenGroup = { property: 'color', value: 'green', items: [car5] };

  var result = dealership.get('carsGroupedByColor');
  var expected = [redGroup, blueGroup, greenGroup];
  assert.equal(result[0].property, expected[0].property);
  assert.equal(result[0].value, expected[0].value);
  assert.deepEqual(result[0].items, expected[0].items);

  assert.equal(result[1].property, expected[1].property);
  assert.equal(result[1].value, expected[1].value);
  assert.deepEqual(result[1].items, expected[1].items);

  assert.equal(result[2].property, expected[2].property);
  assert.equal(result[2].value, expected[2].value);
  assert.deepEqual(result[2].items, expected[2].items);
});

test('it applies custom attributes to the group', function(assert) {
  assert.expect(12);
  dealership = Ember.Object.extend({
    cars: cars,
    carsGroupedByColor: groupBy('cars', 'color', { originalColor: true })
  }).create();

  var redGroup = { property: 'color', value: 'red', items: [car1, car2], originalColor: true };
  var blueGroup = { property: 'color', value: 'blue', items: [car3, car4], originalColor: true };
  var greenGroup = { property: 'color', value: 'green', items: [car5], originalColor: false };

  var greenCars = dealership.get('carsGroupedByColor').objectAt(2);
  greenCars.set('originalColor', false);

  var result = dealership.get('carsGroupedByColor');
  var expected = [redGroup, blueGroup, greenGroup];

  assert.equal(result[0].property, expected[0].property);
  assert.equal(result[0].value, expected[0].value);
  assert.equal(result[0].originalColor, expected[0].originalColor);
  assert.deepEqual(result[0].items, expected[0].items);

  assert.equal(result[1].property, expected[1].property);
  assert.equal(result[1].value, expected[1].value);
  assert.equal(result[1].originalColor, expected[1].originalColor);
  assert.deepEqual(result[1].items, expected[1].items);

  assert.equal(result[2].property, expected[2].property);
  assert.equal(result[2].value, expected[2].value);
  assert.equal(result[2].originalColor, expected[2].originalColor);
  assert.deepEqual(result[2].items, expected[2].items);
});