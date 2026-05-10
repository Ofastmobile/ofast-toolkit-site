const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.html') && f !== 'docs-shell.html');

const videoHtml = `
<h2 id="video-guide" style="margin-top: 0; padding-top: 0;">Video Guide</h2>
<div class="video-guide">
    <div class="video-guide-play">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    </div>
</div>
`;

files.forEach(file => {
    const filePath = path.join(docsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any leftover video fragments just to be 100% sure
    content = content.replace(/<h2 id="video-guide"[\s\S]*?<\/div>\s*<\/div>/g, '');

    // Inject video at the start of content-body
    content = content.replace('<div class="content-body">', '<div class="content-body">\n' + videoHtml);

    // Add Video Guide to the TOC
    const tocLink = '<li><a href="#video-guide" class="toc-link">Video Guide</a></li>\n';
    
    // First, remove it if it exists to avoid duplicates
    content = content.replace(/<li><a href="#video-guide".*?<\/li>\n?/g, '');
    
    // Then add it right after <ul class="toc-list">
    content = content.replace('<ul class="toc-list">', '<ul class="toc-list">\n' + tocLink);

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Static video guide injected into all files.');
