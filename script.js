const glow = document.getElementById('cursor-glow');
const cursor = document.getElementById('custom-cursor');
const dot = document.getElementById('cursor-dot');

if (window.matchMedia("(pointer: fine)").matches) {
    cursor.style.display = 'block';
    dot.style.display = 'block';

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows mouse exactly
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        glow.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Smooth movement for the outer ring
    function lerpCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(lerpCursor);
    }
    lerpCursor();

    // Interaction states
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}