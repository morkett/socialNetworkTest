function PostsFactory($http) {
  return {
    getPosts: function() {
      return $http({
        method: 'GET',
        url: '/api/posts'
      });
    }
  };
}
PostsFactory.$inject = ['$http'];

angular
  .module('myApp')
  .factory('PostsFactory', PostsFactory);
