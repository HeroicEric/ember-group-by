import Ember from 'ember';

var A = Ember.A;
var computed = Ember.computed;
var get = Ember.get;
var isPresent = Ember.isPresent;

export default function groupBy(collection, property, comparator) {
  var dependentKey = collection + '.@each.' + property;

  return computed(dependentKey, function() {
    var groups = new A();
    var items = get(this, collection);

    items.forEach(function(item) {
      var value = get(item, property);
      var correctGroup;
      if (comparator) {
        correctGroup = groups.find(function(group) {
          return comparator(...[get(group, 'value'), value]);
        });
      } else {
        correctGroup = groups.findBy('value', value);
      }

      if (isPresent(correctGroup)) {
        get(correctGroup, 'items').push(item);
      } else {
        correctGroup = { property: property, value: value, items: [item] };
        groups.push(correctGroup);
      }
    });

    return groups;
  }).readOnly();
}
