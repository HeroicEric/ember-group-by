import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    var car1 = { name: 'Carrera', color: 'red' };
    var car2 = { name: 'Veyron', color: 'red' };
    var car3 = { name: 'Corvette', color: 'blue' };
    var car4 = { name: 'Viper', color: 'blue' };
    var car5 = { name: 'Cobra', color: 'green' };

    var cars = [car1, car2, car3, car4, car5];

    return cars;
  }
}
