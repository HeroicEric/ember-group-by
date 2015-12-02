import Ember from 'ember';

var A = Ember.A;
var computed = Ember.computed;
var get = Ember.get;
var isPresent = Ember.isPresent;

export default function groupBy(collection, groupingProperty, options = {}) {
  var dependentKey;

  if(options.additionalPropertiesToWatch) {
    options.additionalPropertiesToWatch.push(groupingProperty);
    var propertyString = '{' + options.additionalPropertiesToWatch + '}';
    dependentKey = collection + '.@each.' + propertyString;
  } else {
    dependentKey = collection + '.@each.' + groupingProperty;
  }

  return computed(dependentKey, function() {
    var groups = new A();
    var items = get(this, collection);

    items.forEach(function(item) {
      var value = get(item, groupingProperty);
      var group = groups.findBy('value', value);

      if (isPresent(group)) {
        get(group, 'items').push(item);
      } else {
        group = { property: groupingProperty, value: value, items: [item] };
        groups.push(group);
      }
    });

    return groups;
  }).readOnly();
}
