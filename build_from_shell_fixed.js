const fs = require('fs');
const path = require('path');

const shellHtml = fs.readFileSync(path.join(__dirname, 'docs', 'docs-shell.html'), 'utf8');

const modules = [
    { id: 'index', title: 'Overview', tag: 'Documentation', prev: null, next: 'getting-started' },
    { id: 'getting-started', title: 'Getting Started', tag: 'Documentation', prev: 'index', next: 'dashboard' },
    { id: 'dashboard', title: 'Dashboard', tag: 'Core', prev: 'getting-started', next: 'email' },
    { id: 'email', title: 'Email Module', tag: 'Communication', prev: 'dashboard', next: 'smtp' },
    { id: 'smtp', title: 'SMTP Configuration', tag: 'Communication', prev: 'email', next: 'sms' },
    { id: 'sms', title: 'SMS Channel', tag: 'Communication', prev: 'smtp', next: 'spam-protection' },
    { id: 'spam-protection', title: 'Spam Protection', tag: 'Security', prev: 'sms', next: 'admin-studio' },
    { id: 'admin-studio', title: 'Admin Studio', tag: 'Customization', prev: 'spam-protection', next: 'login-redesign' },
    { id: 'login-redesign', title: 'Login Redesign', tag: 'Customization', prev: 'admin-studio', next: 'code-snippets' },
    { id: 'code-snippets', title: 'Code Snippets', tag: 'Utility', prev: 'login-redesign', next: 'redirects' },
    { id: 'redirects', title: 'Redirects Manager', tag: 'Utility', prev: 'code-snippets', next: 'contact-forms' },
    { id: 'contact-forms', title: 'Contact Forms', tag: 'Communication', prev: 'redirects', next: 'social-login' },
    { id: 'social-login', title: 'Social Login', tag: 'Security', prev: 'contact-forms', next: 'debug-indicator' },
    { id: 'debug-indicator', title: 'Debug Indicator', tag: 'Security', prev: 'social-login', next: null }
];

// Extract sidebar
const sidebarStart = shellHtml.indexOf('<aside class="docs-sidebar" id="docsSidebar">');
const sidebarEnd = shellHtml.indexOf('</aside>', sidebarStart) + 8;
let sidebar = shellHtml.substring(sidebarStart, sidebarEnd);

// Clean up sidebar: remove categories, emojis, badges
sidebar = sidebar.replace(/<div class="sidebar-section-title">.*?<\/div>/g, '');
sidebar = sidebar.replace(/<span class="sidebar-link-icon">.*?<\/span>/g, '');
sidebar = sidebar.replace(/<span class="sidebar-badge.*?<\/span>/g, '');
sidebar = sidebar.replace(/\s*class="sidebar-link active"/g, ' class="sidebar-link"');

function generateContent(mod) {
    if (mod.id === 'email') {
        // Use the exact content from docs-shell.html for Email Module
        const contentStart = shellHtml.indexOf('<div class="content-body">');
        const contentEnd = shellHtml.indexOf('<!-- Prev / Next -->');
        if (contentStart > -1 && contentEnd > -1) {
            return shellHtml.substring(contentStart + 26, contentEnd).trim();
        }
    }
    
    // Placeholder content for other modules based on prompt.md structure
    return '<h2 id="overview">Overview</h2><p>This is the ' + mod.title + '. It provides essential functionality for your WordPress site. Please configure it according to your needs.</p><h2 id="requirements">Requirements</h2><ul><li>WordPress 5.8 or higher</li><li>PHP 7.4 or higher</li><li>Ofast Toolkit plugin activated</li><li>Module toggled <strong>ON</strong> in the dashboard</li></ul><h2 id="setup">Setup</h2><div class="steps"><div class="step"><div class="step-number">1</div><div class="step-content"><h4>Enable the module</h4><p>Go to <strong>Ofast Toolkit → Dashboard</strong> and toggle to <strong>ON</strong>.</p></div></div><div class="step"><div class="step-number">2</div><div class="step-content"><h4>Configure Settings</h4><p>Go to the module settings page to adjust configuration.</p></div></div></div><h2 id="settings">Settings</h2><table class="settings-table"><thead><tr><th>Setting</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><span class="setting-name">Enable Feature</span></td><td>Turns the main functionality on or off.</td><td>Disabled</td></tr></tbody></table><h2 id="how-it-works">How it works</h2><p>The module hooks into core WordPress functions to provide seamless integration without modifying core files.</p><h2 id="faq">FAQ</h2><div class="faq-item"><div class="faq-question">Is this module free?<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg></div><div class="faq-answer"><p>Check the module tags above to see if it is part of the Free or Pro version.</p></div></div>';
}

modules.forEach(m => {
    let html = shellHtml;

    // 1. Replace Sidebar
    const activeLink = 'href="/docs/' + m.id + '.html" class="sidebar-link"';
    const newActiveLink = 'href="/docs/' + m.id + '.html" class="sidebar-link active"';
    let currentSidebar = sidebar.replace(activeLink, newActiveLink);
    html = html.substring(0, sidebarStart) + currentSidebar + html.substring(sidebarEnd);

    // 2. Replace Breadcrumb
    const bcStart = html.indexOf('<nav class="breadcrumb">');
    const bcEnd = html.indexOf('</nav>', bcStart) + 6;
    let breadcrumb = '<nav class="breadcrumb"><a href="/docs">Docs</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg><a href="#">' + m.tag + '</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg><span>' + m.title + '</span></nav>';
    html = html.substring(0, bcStart) + breadcrumb + html.substring(bcEnd);

    // 3. Replace Module Header
    const headerStart = html.indexOf('<div class="module-header">');
    const headerEnd = html.indexOf('</div>', html.indexOf('</div>', html.indexOf('</div>', headerStart) + 1) + 1) + 6; // Rough extraction of meta div
    
    // Let's use a regex for header since it's cleaner to replace the whole block
    html = html.replace(/<div class="module-header">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, ''); // remove the old one (it had 3 nested divs)
    
    // Re-insert right before content-body
    let moduleHeader = '<div class="module-header"><div class="module-tag">' + m.tag + '</div><h1 class="module-title">' + m.title + '</h1><p class="module-description">Learn how to configure and use the ' + m.title + '.</p></div>';
    html = html.replace('<div class="content-body">', moduleHeader + '\n<div class="content-body">');

    // 4. Replace Content Body
    const contentStart = html.indexOf('<div class="content-body">');
    const contentEnd = html.indexOf('<!-- Prev / Next -->');
    html = html.substring(0, contentStart) + '<div class="content-body">\n' + generateContent(m) + '\n</div>\n\n<!-- Prev / Next -->' + html.substring(contentEnd + 20);

    // 5. Replace Pagination
    const pgStart = html.indexOf('<nav class="docs-pagination">');
    const pgEnd = html.indexOf('</nav>', pgStart) + 6;
    let prevHtml = m.prev ? '<a href="/docs/' + m.prev + '.html"><span class="pagination-label">← Previous</span><span class="pagination-title">' + modules.find(x => x.id === m.prev).title + '</span></a>' : '<div></div>';
    let nextHtml = m.next ? '<a href="/docs/' + m.next + '.html"><span class="pagination-label">Next →</span><span class="pagination-title">' + modules.find(x => x.id === m.next).title + '</span></a>' : '<div></div>';
    let pagination = '<nav class="docs-pagination">' + prevHtml + nextHtml + '</nav>';
    html = html.substring(0, pgStart) + pagination + html.substring(pgEnd);

    // 6. Fix links - make sure they are relative
    html = html.replace(/href="\/docs\//g, 'href="./');
    html = html.replace(/href="\/docs"/g, 'href="./index.html"');

    // Remove video and footer just in case docs-shell had them
    html = html.replace(/<footer[\s\S]*?<\/footer>/, '');
    html = html.replace(/<div class="video-guide-wrapper"[\s\S]*?<\/div>\s*<\/div>/g, '');
    html = html.replace(/<h2 id="video-guide">.*?<\/h2>/g, '');

    // Convert CSS and JS to external links if they are inline
    html = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="../assets/css/docs.css">');
    html = html.replace(/<script>[\s\S]*?<\/script>/, '<script src="../assets/js/docs.js"><\/script>');

    // Write file
    fs.writeFileSync(path.join(__dirname, 'docs', m.id + '.html'), html, 'utf8');
});

console.log('Successfully rebuilt all 14 files from docs-shell.html without categories, badges, emojis, and video code.');
