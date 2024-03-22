document.addEventListener('DOMContentLoaded', function() {
    var likeCount = document.querySelector('.like-count .like-text');
    var commentCount = document.querySelector('.comment-count .comment-text');

    document.querySelector('.like-count').addEventListener('click', function() {
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });

    document.querySelector('.comment-count').addEventListener('click', function() {
        commentCount.textContent = parseInt(commentCount.textContent) + 1;
    });
});
document.addEventListener('DOMContentLoaded', function() {
var likeCountReply = document.querySelector('.like-count-reply .like-text-reply');
var commentCountReply = document.querySelector('.comment-count-reply .comment-text-reply');

document.querySelector('.like-count-reply').addEventListener('click', function() {
    likeCountReply.textContent = parseInt(likeCountReply.textContent) + 1;
});

document.querySelector('.comment-count-reply').addEventListener('click', function() {
    commentCountReply.textContent = parseInt(commentCountReply.textContent) + 1;
});
});
