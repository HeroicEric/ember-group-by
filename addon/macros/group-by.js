import Ember from 'ember';

var computed = Ember.computed;
var get = Ember.get;
var isPresent = Ember.isPresent;

export default function groupBy(collection, property) {
  var dependentKey = collection + '.@each.' + property;

  return computed(dependentKey, function() {
    var groups = [];
    var items = get(this, collection);

    items.forEach(function(item) {
      var value = get(item, property);
      var group = groups.findBy('value', value);

      if (isPresent(group)) {
        get(group, 'items').push(item);
      } else {
        group = { property: property, value: value, items: [item] };
        groups.push(group);
      }
    });

    return groups;
  }).readOnly();
}
