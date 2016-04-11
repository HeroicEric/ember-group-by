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

test('it groups transactions by date', function(assert) {
  assert.expect(1);
  var today = new Date();
  today.setUTCHours(0,0,0,0);
  var today2 = new Date();
  today2.setUTCHours(0,0,0,0);
  var yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  var yesterday2 = new Date(today);
  yesterday2.setUTCDate(yesterday2.getUTCDate() - 1);
  var twoDaysAgo = new Date(yesterday);
  twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 1);

  var transaction1 = { name: 'Carrera', date: today };
  var transaction2 = { name: 'Veyron', date: today2 };
  var transaction3 = { name: 'Corvette', date: yesterday };
  var transaction4 = { name: 'Viper', date: yesterday2 };
  var transaction5 = { name: 'Cobra', date: twoDaysAgo };
  var dealership = Ember.Object.extend({
    transactions: [transaction1, transaction2, transaction3, transaction4, transaction5],
    transactionsGroupedByDate: groupBy('transactions', 'date', function(previousValue, currentValue) {
      return previousValue.getTime() === currentValue.getTime();
    })
  }).create();

  var todayGroup = { property: 'date', value: today, items: [transaction1, transaction2] };
  var yesterdayGroup = { property: 'date', value: yesterday, items: [transaction3, transaction4] };
  var twoDaysAgoGroup = { property: 'date', value: twoDaysAgo, items: [transaction5] };

  var expected = [todayGroup, yesterdayGroup, twoDaysAgoGroup];
  var result = dealership.get('transactionsGroupedByDate');

  assert.deepEqual(result, expected);
});
