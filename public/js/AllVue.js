const vm = new Vue({
    el: "#app",
    data: {
        posts: [],
        replies: [],
        currentUser: {},
    },
    methods: {
        showloginsignup() {
            $("#loginModal").modal("show");
        },
        showReplyModal(id) {
            $("#replyModal").modal("show");
            $.ajax({
                url: "/post/" + id,
                type: "GET",
                success: (post) => {
                    $("#post-id").html(post.postID);
                    $("#post-author").html(post.username);
                    $("#post-title").html(post.title);
                    $("#post-body").html(post.body);
                    $.ajax({
                        url: "/reply/" + id,
                        type: "GET",
                        success: (reply) => {
                            this.replies = reply;
                        },
                    });
                },
            });
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
        startTopic() {
            let post = {
                title: $("#postTitle").val(),
                body: $("#postBody").val(),
                category: $("#postCategory").val(),
            };
            $.ajax({
                url: "/post",
                type: "POST",
                data: post,
            });
        },
        makeReply() {
            let reply = {
                postID: $("#post-id").html(),
                reply: $(".reply-body").val(),
            };
            $.ajax({
                url: "/reply",
                type: "POST",
                data: reply,
            });
        },
        likePost(postID) {
            $.ajax({
                url: "/postLike/" + postID,
                type: "POST",
                success: () => {
                    this.getLikes(postID);
                },
            });
        },
        getLikes(postID) {
            $.ajax({
                url: "/post/" + postID,
                type: "GET",
                success: (postLikes) => {
                    $("#postLikes").html(postLikes.likes);
                },
            });
        },
        dislikePost(postID) {
            $.ajax({
                url: "/postdislike/" + postID,
                type: "GET",
                success: () => {
                    this.getLikes(postID);
                },
            });
        },
        likeReply(replyID) {
            $.ajax({
                url: "/replylike/" + replyID,
                type: "POST",
                success: () => {
                    this.getReplyLikes(replyID);
                },
            });
        },
        getReplyLikes(replyID) {
            $.ajax({
                url: "/replies/" + replyID,
                type: "GET",
                success: (replyLikes) => {
                    $("#replyLikes").html(replyLikes.likes);
                },
            });
        },
        dislikeReply(replyID) {
            $.ajax({
                url: "/replydislike/" + replyID,
                type: "GET",
                success: () => {
                    this.getReplyLikes(replyID);
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
            $.ajax({
                url: "/updatePostByID/" + postEdit.postID,
                type: "PUT",
                data: postEdit,
                success: (post) => {
                    $("#postTitleSpan").html(post.postTitle);
                    $("#postBodySpan").html(post.postBody);
                    $("#postCategory").val(post.category);
                },
            });
        },
        removePost() {
            const id = $("#postID").html();
            $.ajax({
                url: "/removePost/" + id,
                type: "DELETE",
                success: () => {
                    $.getJSON("/posts", function (jsondata) {
                        this.posts = jsondata;
                    });
                },
            });
            $("#editModal").modal("hide");
        },
        removeReply(id) {
            $.ajax({
                url: "/removeReply/" + id,
                type: "DELETE",
            });
        },
        // TODO: Edit reply
        sortByCategory(category) {
            $.ajax({
                url: "/sortByCategory/" + category,
                type: "GET",
                success: (jsondata) => {
                    this.posts = jsondata;
                },
            });
        },
        sortByUser() {
            $.ajax({
                url: "/userPost",
                type: "GET",
                success: (jsondata) => {
                    this.posts = jsondata;
                },
            });
        },
    },
    mounted() {
        var self = this;
        $.getJSON("/posts", function (jsondata) {
            self.posts = jsondata;
        });
        $.getJSON("/user_data", function (userdata) {
            self.currentUser = userdata;
        });
    },
});
