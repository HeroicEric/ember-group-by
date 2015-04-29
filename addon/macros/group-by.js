import Ember from 'ember';

var A = Ember.A;
var computed = Ember.computed;
var get = Ember.get;
var isPresent = Ember.isPresent;

// Standard group object is an Ember object, so we can
// use get() and set() for properties
var groupedList = Ember.Object.extend({
  property: "",
  items: [],
  value: ""
});

export default function groupBy(collection, property, additionalProperties) {
  var dependentKey = collection + '.@each.' + property;

  return computed(dependentKey, function() {
    var groups = new A();
    var items = get(this, collection);

    items.forEach(function(item) {
      var value = get(item, property);
      var group = groups.findBy('value', value);

      if (isPresent(group)) {
        get(group, 'items').push(item);
      } else {
        group = groupedList.create({
          property: property,
          value: value,
          items: [item]
        });
        // Merge the additional properties in the group object
        Ember.merge(group, additionalProperties);
        groups.push(group);
      }
    });

    return groups;
  }).readOnly();
}
