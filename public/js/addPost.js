async function newFormHandler(event) {
      event.preventDefault();
  
      // Get the post title and post text from the form
      const title = document.querySelector('input[name="blog-title"]').value;
      const content = document.querySelector('textarea[name="blogContent"]').value;
  
      // use the add a new post POST route to add the post 
      // user id is added from the session information in the route
      const response = await fetch(`/blogs`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // if the response is okay, reload the page, showing the newest post now in the user's post list
      if (response.ok) {
        document.location.replace('/dashboard');
        // otherwise, display the error
      } else {
        alert(response.statusText);
      }
    }
    
    // Event Listener for the new post submit button
    document.querySelector('#blog-form').addEventListener('submit', newFormHandler);