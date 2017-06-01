function PostsController(PostsFactory, $state, $stateParams){
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
    controller.postBody.username = 'fred';
    PostsFactory.createPost(controller.postBody).then(
        function success(response) {
       //redirects to another state
          console.log('Created new post: ', response);
          $state.reload();
        },
     function error(error) {
       console.warn('Error creating post:',error);
     }
    );
  };

  controller.getPost = function(){
    var postId = $stateParams.postId;
    PostsFactory.getOne(postId).then(
      function success(res) {
        console.log('getPost:',res);
        controller.selectedPost = res.data;
      },
      function error(err){
        console.log('Error getting post, front', err);
      }
    );
  };

  controller.deletePost = function(postId){
    PostsFactory.deletePost(postId).then(
      function success(res) {
        console.log('deleted',res);
        $state.go('home');

      },
      function error(err){
        console.warn('Error deleting post',err);
      }
    );
  };

}



PostsController.$inject = ['PostsFactory', '$state', '$stateParams'];
angular
  .module('myApp')
  .controller('PostsController', PostsController);
