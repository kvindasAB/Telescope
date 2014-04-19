Template.signup.events({
    'click input[type=submit]': function(event){
      event.preventDefault();
      var username = $('#username').val();
      var email = $('#email').val();
      var password = $('#password').val();
      if(!username || !email || !password){
        throwError(i18n.t('Please fill in all fields'));
        return false;
      }

      var createUser = function(){
          Accounts.createUser({
              username: username
            , email: email
            , password: password
          }, function(err){
            if(err){
              console.log(err);
            }else{
              Router.go('/');
            }
          });
      }

      var tmpIsCaptchaActive = getSetting('useCaptchaOnSignup', false);
      if(!tmpIsCaptchaActive){
        createUser();
      }else {
        VisualCaptcha.validateCaptcha(function(){
            // Callback on validate success
            createUser();
        });
      }

  },

  'click #signin': function(){
      Router.go('/signin');
  },

  'click .twitter-button': function(){
    Meteor.loginWithTwitter(function(){
      Router.go('/');
    });
  }
});