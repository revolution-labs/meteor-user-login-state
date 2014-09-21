/*
* User state server side methods
*/
UserLoginState = {
    onLogin:     function(){},
    onLogout:    function(){}
};
Meteor.methods({
    userOnLogin: function () {
        /*
        * Trigger the onLoggedIn event
        */
        UserLoginState.onLogin(this.userId);
    },
    userOnLogout: function (userId) {
        /*
        * Trigger the onLoggedOut event
        */
        UserLoginState.onLogout(userId);
    }
});