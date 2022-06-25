const posts = document.querySelectorAll('#delete-post-button');

posts.forEach((post) => {
  post.addEventListener('click', async (event) => {
    event.stopPropagation();
    const userResponse = confirm('Are you sure you want to delete this post?');
    if (userResponse) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete the post');
      }
    }
  });
});
