// Valentine's Day Interactive Journey for Rose
let canvas;
let ctx;
let characters = [];
let currentScene = 1;
let scrollProgress = 0;

// Character positions and properties
const me = { x: 100, y: 300, size: 40 };
const rose = { x: 150, y: 300, size: 40 };

// Scene messages
const sceneMessages = [
    { text: "For Rose, With Love", x: 0.5, y: 0.3 },
    { text: "Our Amazing South American Adventure", x: 0.5, y: 0.3 },
    { text: "How Much I Love You... Including Your Beautiful Butt! 😘", x: 0.5, y: 0.3 },
    { text: "Your Beautiful Passions - Art, Birds & Crocheting", x: 0.5, y: 0.3 },
    { text: "Looking Forward to Our Future Adventures", x: 0.5, y: 0.3 },
    { text: "Happy Valentine's Day, Rose ❤️", x: 0.5, y: 0.3 }
];

function setup() {
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size to match window
    resizeCanvas();
    
    // Initialize characters
    characters.push(me, rose);
    
    // Start animation loop
    animate();
    
    // Setup scroll event listener
    window.addEventListener('scroll', handleScroll);
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
    // Calculate base position based on scroll
    const baseX = 100 + (scrollProgress * 200);
    const baseY = 300 + Math.sin(scrollProgress * 10) * 20; // Gentle vertical movement
    
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
        case 6: // End
            gradient.addColorStop(0, '#ede7f6');
            gradient.addColorStop(1, '#fbe9e7');
            break;
        default:
            gradient.addColorStop(0, '#e0f7fa');
            gradient.addColorStop(1, '#fce4ec');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw scene-specific elements
    drawSceneElements();
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
            
            // Draw colorful houses
            for (let i = 0; i < 5; i++) {
                const x = 100 + i * 150;
                const height = 60 + Math.random() * 40;
                const colors = ['#ef5350', '#ab47bc', '#5c6bc0', '#66bb6a', '#ffca28'];
                ctx.fillStyle = colors[i % colors.length];
                ctx.fillRect(x, canvas.height * 0.7 - height, 40, height);
                
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
            
            // Draw crochet elements
            ctx.fillStyle = '#ff9800';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(350 + i * 30, 150, 10, 0, Math.PI * 2);
                ctx.fill();
            }
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