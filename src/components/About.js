import React from 'react';

export default function About() {
  return (
    <div>
      <h3 className="mb-3">About iNotebook</h3>
      <p>
        <strong>iNotebook</strong> is a simple yet powerful
        note-taking application designed to help users organize their thoughts securely and efficiently.
      </p>

      <p>
        iNotebook allows users to create, manage, and store their notes online, so their data is accessible
        anytime and from anywhere. The application focuses on usability, security, and performance,
        making it ideal for everyday note management.
      </p>

      <h4 className="mb-3">Key Features</h4>

      <h5>📝 Smart Note Management</h5>
      <ul>
        <li>Create, edit, and delete notes easily</li>
        <li>Organize notes with titles and tags</li>
        <li>Instant updates without page reloads</li>
      </ul>

      <h5>🔐 Secure User Authentication</h5>
      <ul>
        <li>User signup and login functionality</li>
        <li>Authentication handled using secure tokens</li>
        <li>Each user can access only their own notes</li>
      </ul>

      <h5>☁️ Cloud-Based Access</h5>
      <ul>
        <li>Notes are stored securely in the database</li>
        <li>Access your notes from any device after login</li>
      </ul>

      <h5>⚡ Fast &amp; Responsive</h5>
      <ul>
        <li>Built with a modern tech stack for smooth performance</li>
        <li>Clean and intuitive user interface</li>
      </ul>

      <h4 className="mb-3">Why iNotebook?</h4>
      <p>
        iNotebook is built to demonstrate how a real-world notes application works — combining
        frontend usability with backend security. It’s perfect for users who want a simple digital
        notebook and for developers exploring full-stack application architecture.
      </p>

      <hr />

      <p>
        <strong>Built &amp; maintained by:</strong><br />
        Prashant Nigam 🚀
      </p>

    </div>
  )
}