function PostsFactory($http) {
  return {
    getPosts: function() {
      return $http({
        method: 'GET',
        url: '/api/posts'
      });
    },
    createPost: function(newPost) {
      return $http({
        method: 'POST',
        url: '/api/posts',
        data: newPost
      });
    }
  };

}
PostsFactory.$inject = ['$http'];

angular
  .module('myApp')
  .factory('PostsFactory', PostsFactory);
