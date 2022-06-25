const newCommentHandler = async (evt) => {
  evt.preventDefault();
  const content = document.querySelector('#comment-text-area').value;
  const post_id = evt.target.getAttribute('data-id');
  console.log(content);
  console.log(post_id);
  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({
      post_id,
      content,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Comment failed to post!');
  }
};

document
  .querySelector('#comment-form')
  .addEventListener('submit', newCommentHandler);
