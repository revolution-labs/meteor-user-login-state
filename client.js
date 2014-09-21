/*
* Creates the client-side object and API methods
*/
UserLoginState = {
    loggedIn: false,
    currentUser: null,
    loggedInDep: new Tracker.Dependency,
    init: function (options) {
        /*
        * Login monitoring
        */
        Deps.autorun(function () {
            if (Meteor.userId()) {
                /*
                * Meteor.userId() exists, thus we are logged in.
                * Store the user id so we can pass it to the server and then trigger the events.
                */
                UserLoginState.currentUser = Meteor.userId();
                if (UserLoginState.loggedIn === false) {
                    /*
                    * Trigger onLoggedIn event
                    */
                    if (typeof UserLoginState.onLogin !== undefined) {
                        /*
                        * Trigger client event
                        */
                        UserLoginState.onLogin(); 
                    }
                    /*
                    * Trigger server event
                    */
                    Meteor.call('userOnLogin');
                }
                /*
                * Update object loggedIn state
                */
                UserLoginState.setState(true); 
            } else {
                /*
                * No user is currently logged in
                */
                if (UserLoginState.loggedIn === true) {
                    /*
                    * User was previously logged in, triggering onLogout event
                    */
                    if (typeof UserLoginState.onLogout !== undefined) {
                        /*
                        * Trigger client event
                        */
                        UserLoginState.onLogout(UserLoginState.currentUser);
                    }
                    /*
                    * Trigger server event
                    */
                    Meteor.call('userOnLogout', UserLoginState.currentUser);
                }
                /*
                * Update object loggedIn state
                */
                UserLoginState.setState(false);
            }
        });
    },
    onLogin: function(){},
    onLogout: function(){},
    getState: function() {
        UserLoginState.loggedInDep.depend();
        return UserLoginState.loggedIn;
    },
    setState: function(value) {
        UserLoginState.loggedIn = value;
        UserLoginState.loggedInDep.changed();
        return UserLoginState.loggedIn;
    },
};