import Controller from '@ember/controller';
import groupBy from 'ember-group-by';

export default class IndexController extends Controller {
  @groupBy('model', 'color')
  carsByColor;
}
