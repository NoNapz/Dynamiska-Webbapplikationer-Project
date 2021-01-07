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
    var $actionForm = $('#actionForm');
    var $replyForm = $('#replyForm');
    var $createPostForm = $('#createPost');
    var $editPostForm = $('#editPostForm');
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
                    pattern: "REGEX HIT YOU",
                },
                name: {
                    required: "Please enter your name",
                    lettersonly: "Your name can only include A-Z and \'"
                },
                password: {
                    require: "Please enter your password",
                    minlength: "Your password is too short (min 6)"
                }
            },
        });
    }
    if ($actionForm.length) {
        $actionForm.validate({
            rules: {

            },
            messages: {

            },
        });
    }
    if ($replyForm.length) {
        $replyForm.validate({
            rules: {

            },
            messages: {

            },
        });
    }
    if ($createPostForm.length) {
        $createPostForm.validate({
            rules: {

            },
            messages: {

            },
        });
    }
    if ($editPostForm.length) {
        $editPostForm.validate({
            rules: {

            },
            messages: {

            },
        });
    }
});