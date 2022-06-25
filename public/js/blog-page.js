const newCommentHandler = async (evt) => {
  evt.preventDefault();
  const content = document.querySelector('#comment-text-area').value;
  const post_id = evt.target.getAttribute('data-id');
  if (content) {
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
  } else {
    alert('Use your words!');
  }
};

document
  .querySelector('#comment-form')
  .addEventListener('submit', newCommentHandler);
