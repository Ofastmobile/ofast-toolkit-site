const OFAST_CONFIG = {
    // Update this single line to change the download link globally
    toolkitDownloadUrl: "https://dl.ofastshop.com/ofastshop/web/2026/06/02125029/ofast-toolkit.zip"
};

document.addEventListener('DOMContentLoaded', () => {
    // Update any link containing "ofast-toolkit.zip" to the configured URL
    document.querySelectorAll('a[href*="ofast-toolkit.zip"]').forEach(link => {
        link.href = OFAST_CONFIG.toolkitDownloadUrl;
    });
});
