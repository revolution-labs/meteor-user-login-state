Package.describe({
    name: "revolutionlabs:user-login-state",
    summary: "Monitor current user log in and log out activity and provide callback hooks for these events.",
    version: "1.0.1",
    git: "https://github.com/revolution-labs/meteor-user-login-state.git"
});

Package.onUse( function(api) {
    api.versionsFrom("METEOR@0.9.0");
    api.use('accounts-base');
    api.use(['tracker'], 'client');
    api.add_files(['client.js'], 'client');
    api.add_files(['server.js'], 'server');
    api.export('UserLoginState');
});