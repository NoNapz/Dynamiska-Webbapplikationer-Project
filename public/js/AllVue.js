const vm = new Vue({
    el: "#app",
    data: {
        posts: [],
        replies: [],
        currentUser: {},
        editMode: false,
        postLikes: 0,
    },
    methods: {
        // * START OF USER VUE
        showloginsignup() {
            $("#loginModal").modal("show");
        },
        showActionModal(username) {
            $("#actionModal").modal("show");
            $.ajax({
                url: "/user_data/" + username,
                type: "GET",
                success: (user) => {
                    $("#username").val(user.username);
                    $("#email").val(user.email);
                    $("#name").val(user.name);
                    $("#status").val(user.status);
                    $("#userType").html(user.type);
                    $("#spanUsername").html(user.username);
                },
            });
        },
        updateUser() {
            let username = $("#spanUsername").html();
            let user = {
                username: $("#username").val(),
                email: $("#email").val(),
                name: $("#name").val(),
                status: $("#status").val(),
                userType: $("#userType").val(),
            };
            $("#actionModal").modal("hide");
            $.ajax({
                url: "/user_data/" + username,
                type: "PUT",
                data: user,
                success: () => {
                    this.getPosts();
                },
            });
        },
        // * END OF USER VUE
        // * POST VUE START
        showAll() {
            this.getPosts();
        },
        getPosts() {
            var self = this;
            $.getJSON("/post", function (jsondata) {
                self.posts = jsondata;
            });
        },
        createPost() {
            let post = {
                title: $("#postTitle").val(),
                body: $("#postBody").val(),
                category: $("#postCategory").val(),
            };
            $.ajax({
                url: "/post/add",
                type: "POST",
                data: post,
                success: () => {
                    this.getPosts();
                },
            });
        },
        removePost() {
            const id = $("#postID").html();
            $.ajax({
                url: "/post/remove/" + id,
                type: "DELETE",
                success: () => {
                    this.getPosts();
                },
            });
            $("#editModal").modal("hide");
        },
        showEditModal(id) {
            $("#editModal").modal("show");
            $.ajax({
                url: "/post/" + id,
                type: "GET",
                success: (post) => {
                    $("#postID").html(post.postID);
                    $(".editTitle").val(post.title);
                    $("#bodyEdit").html(post.body);
                },
            });
        },
        updatePost() {
            const postEdit = {
                postID: $("#postID").html(),
                postTitle: $(".editTitle").val(),
                postBody: $("#bodyEdit").val(),
                postCategory: $("#editCategory").val(),
            };
            $("#editModal").modal("hide");
            $.ajax({
                url: "/post/update/" + postEdit.postID,
                type: "PUT",
                data: postEdit,
                success: (post) => {
                    $("#postTitleSpan").html(post.postTitle);
                    $("#postBodySpan").html(post.postBody);
                    $("#postCategory").val(post.category);
                    this.getPosts();
                },
            });
        },
        markAsDuplicate(postID) {
            $.ajax({
                url: "/post/duplicate/" + postID,
                type: "PUT",
                success: () => {
                    this.getPosts();
                },
            });
        },
        likePost(postID) {
            user = this.currentUser;
            $.ajax({
                url: "/post/like/" + postID,
                type: "POST",
                data: user,
                success: () => {
                    this.getPosts();
                },
            });
        },
        dislikePost(postID) {
            user = this.currentUser;
            $.ajax({
                url: "/post/dislike/" + postID,
                type: "DELETE",
                data: user,
                success: () => {
                    this.getPosts();
                },
            });
        },
        sortByUser(username) {
            $.ajax({
                url: "/sort/user/" + username,
                type: "GET",
                success: (jsondata) => {
                    this.posts = jsondata;
                },
            });
        },
        sortByCategory(category) {
            $.ajax({
                url: "/sort/category/" + category,
                type: "GET",
                success: (jsondata) => {
                    this.posts = jsondata;
                },
            });
        },
        // * END OF POST VUE
        // * START OF REPLY VUE
        getReplies(postID) {
            var self = this;
            $.getJSON("/reply/post/" + postID, function (jsondata) {
                self.replies = jsondata;
            });
        },
        showReplyModal(postID) {
            $("#replyModal").modal("show");
            $.ajax({
                url: "/post/" + postID,
                type: "GET",
                success: (post) => {
                    $("#post-id").html(post.postID);
                    $("#post-author").html(post.username);
                    $("#post-title").html(post.title);
                    $("#post-body").html(post.body);
                    $.ajax({
                        url: "/reply/post/" + postID,
                        type: "GET",
                        success: (reply) => {
                            this.replies = reply;
                        },
                    });
                },
            });
        },
        toggleEdit(id) {
            this.editMode = id;
            $.ajax({
                url: "/reply/" + id,
                type: "GET",
                success: (reply) => {
                    $("#editReply").attr("Value", reply.reply);
                    $("#editReply").html();
                },
            });
        },
        createReply() {
            let reply = {
                postID: $("#post-id").html(),
                reply: $(".reply-body").val(),
            };
            $.ajax({
                url: "/reply/add",
                type: "POST",
                data: reply,
                success: () => {
                    this.getReplies(reply.postID);
                },
            });
        },
        removeReply(id) {
            const postID = $("#post-id").html();
            $.ajax({
                url: "/reply/remove/" + id,
                type: "DELETE",
                success: () => {
                    this.getReplies(postID);
                },
            });
        },
        updateReply(id) {
            const postID = $("#post-id").html();
            let reply = {
                replyID: id,
                reply: $("#editReply").val(),
            };
            $.ajax({
                url: "/reply/edit/" + id,
                type: "PUT",
                data: reply,
                success: () => {
                    this.getReplies(postID);
                },
            });
            if (this.editMode) {
                this.editMode = false;
            } else {
                this.editMode = true;
            }
        },
        likeReply(replyID) {
            const postID = $("#post-id").html();
            user = this.currentUser;
            $.ajax({
                url: "/reply/like/" + replyID,
                type: "POST",
                data: user,
                success: () => {
                    this.getReplies(postID);
                },
            });
        },
        dislikeReply(replyID) {
            const postID = $("#post-id").html();
            user = this.currentUser;
            $.ajax({
                url: "/reply/dislike/" + replyID,
                type: "DELETE",
                data: user,
                success: () => {
                    this.getReplies(postID);
                },
            });
        },
        // * END OF REPLIES VUE
    },
    mounted() {
        var self = this;
        $.getJSON("/post", function (jsondata) {
            self.posts = jsondata;
        });
        $.getJSON("/user_data", function (userdata) {
            self.currentUser = userdata;
        });
    },
});
