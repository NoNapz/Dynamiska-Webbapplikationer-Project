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
        getPosts() {
            var self = this;
            $.getJSON("/posts", function (jsondata) {
                self.posts = jsondata;
            });
        },
        getReplies(postID) {
            var self = this;
            $.getJSON("/reply/" + postID, function (jsondata) {
                self.replies = jsondata;
            });
        },
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
        showActionModal(username) {
            $("#actionModal").modal("show");
            $.ajax({
                url: "/getUser/" + username,
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
                success: () => {
                    this.getPosts();
                },
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
                success: () => {
                    this.getReplies(reply.postID);
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
                url: "/updatePostByID/" + postEdit.postID,
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
        removePost() {
            const id = $("#postID").html();
            $.ajax({
                url: "/removePost/" + id,
                type: "DELETE",
                success: () => {
                    this.getPosts();
                },
            });
            $("#editModal").modal("hide");
        },
        toggleEdit(id) {
            this.editMode = id;
            $.ajax({
                url: "/getReplyByID/" + id,
                type: "GET",
                success: (reply) => {
                    $("#editReply").attr("Value", reply.reply);
                    $("#editReply").html("Fuck no");
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
                url: "/editReply/" + id,
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
        removeReply(id) {
            const postID = $("#post-id").html();
            $.ajax({
                url: "/removeReply/" + id,
                type: "DELETE",
                success: () => {
                    this.getReplies(postID);
                },
            });
        },
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
        showAll() {
            this.getPosts();
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
                url: "/updateUser/" + username,
                type: "PUT",
                data: user,
                success: () => {
                    this.getPosts();
                },
            });
        },
        markAsDuplicate(id) {
            $.ajax({
                url: "/isDuplicate/" + id,
                type: "PUT",
                success: () => {
                    this.getPosts();
                },
            });
        },
        likePost(postID) {
            user = this.currentUser;
            $.ajax({
                url: "/likePost/" + postID,
                type: "POST",
                data: user,
                success: () =>{
                    this.getPosts();
                }
            })
        },
        dislikePost(postID){
            user = this.currentUser;

            $.ajax({
                url: "/dislikePost/" + postID,
                type: "DELETE",
                data: user,
                success:() =>{
                    this.getPosts();
                }
                
            })
        },
        likeReply(replyID) {
            const postID = $("#post-id").html();
            user = this.currentUser;
            $.ajax({
                url: "/likeReply/" + replyID,
                type: "POST",
                data: user,
                success: ()=>{
                    this.getReplies(postID);
                }
            })
        },
        dislikeReply(replyID){
            const postID = $("#post-id").html();
            user = this.currentUser;
            $.ajax({
                url: "/dislikeReply/" + replyID,
                type: "DELETE",
                data: user,
                success: () =>{
                    this.getReplies(postID);
                }
            });
        }
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
