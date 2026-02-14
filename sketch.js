// Valentine's Day Interactive Journey for Rose
let canvas;
let ctx;
let characters = [];
let currentScene = 1;
let scrollProgress = 0;
let particles = [];

// Character positions and properties
const me = { x: 100, y: 300, size: 40 };
const rose = { x: 150, y: 300, size: 40 };

// Scene messages
const sceneMessages = [
    { text: "For Rose, With Love", x: 0.5, y: 0.3 },
    { text: "Our Amazing South American Adventure", x: 0.5, y: 0.3 },
    { text: "How Much I Love You... Including Your Beautiful Butt! \ud83d\ude18", x: 0.5, y: 0.3 },
    { text: "Your Beautiful Passions - Art, Birds & Crocheting", x: 0.5, y: 0.3 },
    { text: "Looking Forward to Our Future Adventures", x: 0.5, y: 0.3 },
    { text: "Happy Valentine's Day, Rose \u2764\ufe0f", x: 0.5, y: 0.3 }
];

function setup() {
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');

    // Set canvas size to match window
    resizeCanvas();

    // Initialize characters
    characters.push(me, rose);

    // Initialize particles
    initParticles();

    // Start animation loop
    animate();

    // Setup scroll event listener
    window.addEventListener('scroll', handleScroll);
}

function initParticles() {
    // Create heart particles that follow characters
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 0.5 + 0.2,
            alpha: Math.random() * 0.5 + 0.3,
            type: 'heart'
        });
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function handleScroll() {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    scrollProgress = scrollY / totalHeight;

    // Determine current scene based on scroll position
    currentScene = Math.floor(scrollProgress * 6) + 1;
    if (currentScene > 6) currentScene = 6;

    // Update character positions based on scroll
    updateCharacterPositions();
}

function updateCharacterPositions() {
    // Calculate base position based on scroll with smoother movement
    const baseX = 100 + (scrollProgress * 400);
    // Gentle vertical movement with slower oscillation
    const baseY = 300 + Math.sin(scrollProgress * 5) * 15;

    // Update both characters' positions
    me.x = baseX;
    me.y = baseY;
    rose.x = baseX + 50;
    rose.y = baseY;
}

function drawCharacter(x, y, size, color, isRose = false) {
    // Draw body (simple circle)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Draw face features
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x - size/3, y - size/4, size/8, 0, Math.PI * 2); // Left eye
    ctx.arc(x + size/3, y - size/4, size/8, 0, Math.PI * 2); // Right eye
    ctx.fill();

    // Smile
    ctx.beginPath();
    ctx.arc(x, y + size/6, size/4, 0, Math.PI);
    ctx.stroke();

    // Add name tag if needed
    if (isRose) {
        ctx.fillStyle = '#5d4037';
        ctx.font = '12px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('Rose', x, y + size + 15);
    } else {
        ctx.fillStyle = '#5d4037';
        ctx.font = '12px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('Me', x, y + size + 15);
    }
    
    // Subtle bouncing effect for characters
    const bounceOffset = Math.sin(Date.now() * 0.005) * 3;
    ctx.translate(x, y + bounceOffset);
    ctx.translate(-x, -(y + bounceOffset));
}

function drawBackground() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background based on current scene
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    switch(currentScene) {
        case 1: // Beginning
            gradient.addColorStop(0, '#e0f7fa');
            gradient.addColorStop(1, '#fce4ec');
            break;
        case 2: // South American Adventure
            gradient.addColorStop(0, '#ffcc80');
            gradient.addColorStop(1, '#80deea');
            break;
        case 3: // Why I Love You
            gradient.addColorStop(0, '#f8bbd0');
            gradient.addColorStop(1, '#e1bee7');
            break;
        case 4: // Passions
            gradient.addColorStop(0, '#c8e6c9');
            gradient.addColorStop(1, '#fff9c4');
            break;
        case 5: // Future
            gradient.addColorStop(0, '#b3e5fc');
            gradient.addColorStop(1, '#dcedc8');
            break;
        case 6: // End - Starry night
            gradient.addColorStop(0, '#0d47a1');
            gradient.addColorStop(1, '#283593');
            break;
        default:
            gradient.addColorStop(0, '#e0f7fa');
            gradient.addColorStop(1, '#fce4ec');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw scene-specific elements
    drawSceneElements();
    
    // Draw particles
    drawParticles();
}

function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles slightly
        p.y -= p.speed;
        
        // Reset particles that go off screen
        if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
        }
        
        // Draw particle
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#e91e63';
        
        if (p.type === 'heart') {
            // Draw heart shape
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.bezierCurveTo(
                p.x, p.y - p.size/2,
                p.x - p.size/2, p.y - p.size,
                p.x, p.y - p.size
            );
            ctx.bezierCurveTo(
                p.x + p.size/2, p.y - p.size,
                p.x, p.y - p.size/2,
                p.x, p.y
            );
            ctx.fill();
        }
        
        ctx.globalAlpha = 1.0;
    }
}

function drawSceneElements() {
    switch(currentScene) {
        case 2: // South American Adventure
            // Draw mountains
            ctx.fillStyle = '#8d6e63';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * 0.7);
            for (let i = 0; i < canvas.width; i += 100) {
                ctx.lineTo(i, canvas.height * (0.5 + Math.sin(i * 0.01) * 0.2));
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();

            // Draw additional mountains in the background
            ctx.fillStyle = '#6d4c41';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * 0.6);
            for (let i = 0; i < canvas.width; i += 150) {
                ctx.lineTo(i, canvas.height * (0.4 + Math.sin(i * 0.007) * 0.15));
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();

            // Draw clouds
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            for (let i = 0; i < 5; i++) {
                const x = i * 200 + 50;
                const y = 50 + Math.sin(i) * 20;
                
                // Draw cloud shape
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.arc(x + 15, y - 10, 15, 0, Math.PI * 2);
                ctx.arc(x + 30, y, 20, 0, Math.PI * 2);
                ctx.arc(x + 15, y + 10, 15, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw colorful houses with windows
            for (let i = 0; i < 5; i++) {
                const x = 100 + i * 150;
                const height = 60 + Math.random() * 40;
                const colors = ['#ef5350', '#ab47bc', '#5c6bc0', '#66bb6a', '#ffca28'];
                ctx.fillStyle = colors[i % colors.length];
                ctx.fillRect(x, canvas.height * 0.7 - height, 40, height);

                // Windows
                ctx.fillStyle = '#fffde7';
                ctx.fillRect(x + 5, canvas.height * 0.7 - height + 10, 10, 10);
                ctx.fillRect(x + 25, canvas.height * 0.7 - height + 25, 10, 10);

                // Door
                ctx.fillStyle = '#5d4037';
                ctx.fillRect(x + 15, canvas.height * 0.7 - 15, 10, 15);

                // Roof
                ctx.fillStyle = '#795548';
                ctx.beginPath();
                ctx.moveTo(x - 5, canvas.height * 0.7 - height);
                ctx.lineTo(x + 20, canvas.height * 0.7 - height - 20);
                ctx.lineTo(x + 45, canvas.height * 0.7 - height);
                ctx.closePath();
                ctx.fill();
            }
            break;

        case 4: // Passions
            // Draw art elements
            ctx.fillStyle = '#e91e63';
            ctx.fillRect(50, 50, 10, 40); // Paint brush
            ctx.beginPath();
            ctx.arc(55, 50, 8, 0, Math.PI * 2);
            ctx.fill();

            // Draw palette
            ctx.fillStyle = '#795548';
            ctx.beginPath();
            ctx.arc(70, 40, 15, 0, Math.PI * 2);
            ctx.fill();

            // Draw paint spots on palette
            ctx.fillStyle = '#f44336';
            ctx.beginPath();
            ctx.arc(65, 35, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#4caf50';
            ctx.beginPath();
            ctx.arc(75, 45, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#2196f3';
            ctx.beginPath();
            ctx.arc(70, 50, 5, 0, Math.PI * 2);
            ctx.fill();

            // Draw bird
            ctx.fillStyle = '#4caf50';
            ctx.beginPath();
            ctx.arc(200, 100, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(215, 100);
            ctx.lineTo(230, 90);
            ctx.lineTo(230, 110);
            ctx.closePath();
            ctx.fill();

            // Draw additional birds
            ctx.fillStyle = '#8bc34a';
            ctx.beginPath();
            ctx.arc(250, 70, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(262, 70);
            ctx.lineTo(275, 65);
            ctx.lineTo(275, 75);
            ctx.closePath();
            ctx.fill();

            // Draw crochet elements
            ctx.fillStyle = '#ff9800';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(350 + i * 30, 150, 10, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw crochet hook
            ctx.strokeStyle = '#795548';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(450, 130);
            ctx.lineTo(450, 170);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(450, 130, 8, 0, Math.PI);
            ctx.stroke();

            // Draw yarn ball
            ctx.fillStyle = '#ffc107';
            ctx.beginPath();
            ctx.arc(420, 150, 12, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case 6: // End - Starry night
            // Draw stars
            ctx.fillStyle = 'white';
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.5;
                const radius = Math.random() * 1.5;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw moon
            ctx.fillStyle = '#fffde7';
            ctx.beginPath();
            ctx.arc(canvas.width - 100, 100, 30, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw crescent shadow
            ctx.fillStyle = '#283593';
            ctx.beginPath();
            ctx.arc(canvas.width - 90, 100, 25, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
}

function animate() {
    drawBackground();

    // Draw characters
    drawCharacter(me.x, me.y, me.size, '#2196f3');
    drawCharacter(rose.x, rose.y, rose.size, '#f44336', true);

    // Draw scene message
    drawSceneMessage();

    // Continue animation loop
    requestAnimationFrame(animate);
}

function drawSceneMessage() {
    // Get the current scene message
    const message = sceneMessages[currentScene - 1].text;

    // Set text styles
    ctx.fillStyle = 'rgba(93, 64, 55, 0.85)';
    ctx.font = 'bold 24px Georgia, serif';
    ctx.textAlign = 'center';

    // Draw text background for better readability
    const textWidth = ctx.measureText(message).width;
    const textX = canvas.width / 2;
    const textY = canvas.height * 0.2;

    // Background rectangle for text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(textX - textWidth/2 - 20, textY - 20, textWidth + 40, 50);

    // Draw the message text
    ctx.fillStyle = '#5d4037';
    ctx.fillText(message, textX, textY);
}

// Initialize when page loads
window.onload = setup;

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
});
