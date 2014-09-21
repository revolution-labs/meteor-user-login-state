meteor-user-login-state
=======================

## Description
Monitors the current user log in and log out activity and provides callbacks for these events.

## Install

```sh
$ meteor add revolutionlabs:user-login-state
```

## Usage
Place `UserLoginState.init();` within a `Meteor.startup` call under your /client directory.

## Examples
If you want to catch your user logging out and route the user to a pretty "you are logged out" view you could create a logout controller using something similar to this:

```javascript
Meteor.startup(function () {
    UserLoginState.onLogout = function () {
        //If you log out anywhere in the app this call will catch you.
        Router.go('logout');
    };
});
```
In this example we are using the popular [Iron Router](https://github.com/EventedMind/iron-router) routing package.

If you want to use this package API to toggle the display of a Spacebars template block you could add a UI helper such as this under /client
```javascript
UI.registerHelper('isLoggedIn',function() {
    return UserLoginState.getState();
});
```
And then in your Spacebars template you could do this

```html
{{#if isLoggedIn}}
    <div class="logged-in">Logged in</div>
{{/if}}
```
