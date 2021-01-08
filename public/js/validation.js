$().ready(function () {
    // * Creates a new method for the validator to validate names.
    jQuery.validator.addMethod(
        "lettersonly",
        function (value, element) {
            return this.optional(element) || /^[a-z -']+$/i.test(value);
        },
    );
    var $loginForm = $('#loginForm');
    var $signupForm = $('#signupForm');
    // * checks the length of the inputs in the login form, to make sure they are not empty.
    if ($loginForm.length) {
        $loginForm.validate({
            rules: {
                username: {
                    required: true,
                },
                password: {
                    required: true,
                },
            },
            messages: {
                username: {
                    required: "Please enter your username",
                },
                password: {
                    required: "Please enter your password"
                },
            },
        });
    }
    // * Checks the length of inputs in the sign up form,
    // * To make sure they are not too short, or too long. and not empty.
    if ($signupForm.length) {
        $signupForm.validate({
            rules: {
                username: {
                    required: true,
                    minlength: 4,
                    maxlength: 16,
                },
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true,
                    lettersonly: true
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                username: {
                    required: "Please enter a Username",
                    minlength: "Your username is too short (min 4)",
                    maxlength: "Your username is too long (max 16)",
                },
                email: {
                    required: "Please enter an Email",
                    email: "Enter a valid Email",
                },
                name: {
                    required: "Please enter your name",
                    lettersonly: "Your name can only include A-Z and \'"
                },
                password: {
                    required: "Please enter your password",
                    minlength: "Your password is too short (min 6)"
                },
            },
        });
    };
});