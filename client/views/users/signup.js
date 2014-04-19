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



      VisualCaptcha.validateCaptcha(function(){
            //callback called only on success; if it fails captcha will display a message informing the user why validation has failed
            //do your form parsing, meteor calls, whatever you would normaly have done

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

      });

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