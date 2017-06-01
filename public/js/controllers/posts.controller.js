function PostsController(PostsFactory){
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

  controller.hello = 'hello';
}

PostsController.$inject = ['PostsFactory'];
angular
  .module('myApp')
  .controller('PostsController', PostsController);
