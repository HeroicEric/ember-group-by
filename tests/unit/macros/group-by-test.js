import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import groupBy from 'ember-group-by/macros/group-by';

module('Unit | Macros | group-by', function () {
  let car1 = { name: 'Carrera', color: 'red' };
  let car2 = { name: 'Veyron', color: 'red' };
  let car3 = { name: 'Corvette', color: 'blue' };
  let car4 = { name: 'Viper', color: 'blue' };
  let car5 = { name: 'Cobra', color: 'green' };

  let cars = [car1, car2, car3, car4, car5];

  let dealership = class extends EmberObject {
    cars = cars;

    @groupBy('cars', 'color')
    carsGroupedByColor;
  }.create();

  test('it groups cars by color', function (assert) {
    assert.expect(1);
    let redGroup = { property: 'color', value: 'red', items: [car1, car2] };
    let blueGroup = { property: 'color', value: 'blue', items: [car3, car4] };
    let greenGroup = { property: 'color', value: 'green', items: [car5] };

    let result = dealership.get('carsGroupedByColor');
    let expected = [redGroup, blueGroup, greenGroup];

    assert.deepEqual(result, expected);
  });

  test('it not fails with empty array', function (assert) {
    dealership = class extends EmberObject {
      cars = [];

      @groupBy('cars', 'color')
      carsGroupedByColor;
    }.create();

    let result = dealership.get('carsGroupedByColor');
    assert.deepEqual(result, []);
  });

  test('it not fails with null', function (assert) {
    dealership = class extends EmberObject {
      cars = null;

      @groupBy('cars', 'color')
      carsGroupedByColor;
    }.create();

    let result = dealership.get('carsGroupedByColor');
    assert.deepEqual(result, []);
  });
});
