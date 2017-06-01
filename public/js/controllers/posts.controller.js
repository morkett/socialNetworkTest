function PostsController(PostsFactory, $state){
  var controller = this;
  // controller.posts = [];

  controller.getPosts = function() {
    PostsFactory.getPosts().then(
      function(success) {
        console.log('getPosts: controller.posts:', success);
        controller.posts = success.data;
      },
      function (error) {
        console.warn('getPosts: no results', error);
      }
    );
  };
  controller.createPost = function() {
    console.log('createPost()');

    PostsFactory.createPost(controller.postBody).then(
        function success(response) {
       //redirects to another state
          console.log('Created new post: ', response);
          $state.go('home');
        },
     function error(error) {
       console.warn('Error creating post:',error);
     }
    );
  };
}

PostsController.$inject = ['PostsFactory'];
angular
  .module('myApp')
  .controller('PostsController', PostsController);
