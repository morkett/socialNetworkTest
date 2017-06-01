function MainRouter ($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/states/home.html'
    })
    .state('show', {
      url: '/post/:postId',
      templateUrl: '/states/show.html'
    });

  $urlRouterProvider.otherwise('/');

}

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];



angular
  .module('myApp', ['ui.router'])
  .constant('API_URL', 'http://localhost:3000')
  .config(MainRouter);
