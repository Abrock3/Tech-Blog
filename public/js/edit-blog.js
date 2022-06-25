const updatePostHandler = async (evt) => {
  evt.preventDefault();
  const content = document.querySelector('#edit-blog-textarea').value;
  const id = evt.target.getAttribute('data-id');
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to edit the post!');
  }
};

document
  .querySelector('#edit-blog-form')
  .addEventListener('submit', updatePostHandler);
