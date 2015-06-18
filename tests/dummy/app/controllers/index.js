import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Controller.extend({
  carsByColor: groupBy('model', 'color', {
    originalColor: 'black',
    isBigGroup: function() {
        return this.get('items').length > 2;
    }
  })
});

