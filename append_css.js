const fs = require('fs');
const css = `
/* =============================================
   VIDEO GUIDE (STATIC)
============================================= */
.video-guide {
    margin: 32px 0 40px;
    background: #0f172a;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: var(--transition);
}

.video-guide:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
    border-color: var(--primary);
}

.video-guide-play {
    width: 64px;
    height: 64px;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: var(--transition);
    z-index: 2;
}

.video-guide:hover .video-guide-play {
    transform: scale(1.1);
    background: var(--primary-dark);
}

.video-guide-play svg {
    width: 24px;
    height: 24px;
    margin-left: 4px;
    fill: currentColor;
}
`;

fs.appendFileSync('assets/css/docs.css', css);
console.log('CSS appended.');
