const apiUrl = 'http://localhost:5000/api/notes';

// 🧠 Load notes on index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('notes-container');
      container.innerHTML = '';

      if (data.length === 0) {
        container.innerHTML = '<p>No notes uploaded yet.</p>';
        return;
      }

      data.forEach(note => {
        const card = document.createElement('div');
        card.classList.add('note-card');
        card.innerHTML = `
          <h3>${note.title}</h3>
          <p><strong>Subject:</strong> ${note.subject}</p>
          <p><strong>Uploaded by:</strong> ${note.uploader}</p>
          <a href="http://localhost:5000/${note.fileUrl}" target="_blank">📥 Download</a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error(err));
}

// 📤 Handle upload on upload.html
if (window.location.pathname.endsWith('upload.html')) {
  const form = document.getElementById('uploadForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      message.textContent = result.message || 'Upload successful!';
      form.reset();
    } catch (err) {
      message.textContent = 'Error uploading note.';
      console.error(err);
    }
  });
}
