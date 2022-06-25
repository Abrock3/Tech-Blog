const newPostHandler = async (evt) => {
  evt.preventDefault();
  const title = document.querySelector('#create-post-title').value;
  const content = document.querySelector('#create-post-content').value;
  if (title && content) {
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/dashboard');
  }
  else {
    alert("You need to give your post a title and some content.")
  }
};

document
  .querySelector('#create-post-form')
  .addEventListener('submit', newPostHandler);
