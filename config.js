// Configuration for content loading
const config = {
    // Static header banner (single image, no rotation).
    // If you don't have an image yet, set enabled: false.
    headerImage: {
        enabled: true,
        animation: { enabled: false },
        images: [
            { path: 'images/header.jpg', altText: 'Header image' },
        ],
    },

    // Each section is loaded from a Markdown file in content/
    files: {
        about: 'content/about.md',
        research: 'content/research.md',
        publications: 'content/publications.md',
    },
};
