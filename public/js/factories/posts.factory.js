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
    },
    getOne: function(postId) {
      return $http({
        method: 'GET',
        url: `/api/post/${postId}`
      });
    },
    deletePost: function(postId) {
      return $http({
        method: 'DELETE',
        url: `/api/post/${postId}`
      });
    }
  };

}
PostsFactory.$inject = ['$http'];

angular
  .module('myApp')
  .factory('PostsFactory', PostsFactory);
