#!/usr/bin/env node
/**
 * Clawdy Dashboard Server
 * Serves the live dashboard and provides real-time API endpoints
 * 
 * Usage: node dashboard-server.js
 * Access: http://localhost:3000/dashboard
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DASHBOARD_DIR = '/Users/natyvai/.openclaw/workspace/dashboard';
const STATS_FILE = `${DASHBOARD_DIR}/stats.json`;

// Gather stats on demand
function gatherStats() {
    const memoryDir = '/Users/natyvai/.openclaw/workspace/memory/';
    const sessionsDir = '/Users/natyvai/.clawdbot/agents/main/sessions/';
    
    let memoryCount = 0, memorySize = 0;
    let sessionCount = 0;
    
    try {
        if (fs.existsSync(memoryDir)) {
            const files = fs.readdirSync(memoryDir);
            memoryCount = files.length;
            files.forEach(f => {
                try {
                    memorySize += fs.statSync(path.join(memoryDir, f)).size;
                } catch (e) {}
            });
        }
        if (fs.existsSync(sessionsDir)) {
            sessionCount = fs.readdirSync(sessionsDir).length;
        }
    } catch (e) {}
    
    return {
        timestamp: new Date().toISOString(),
        memory: {
            files: memoryCount,
            size: memorySize < 1024 ? `${memorySize} B` : `${(memorySize/1024).toFixed(1)} KB`,
            synced: true
        },
        sessions: sessionCount,
        skills: ['weather', 'coding-agent', 'session-logs', 'skill-creator', 'bluebubbles'],
        cron: {
            active: 1,
            nextRun: new Date(Date.now() + 86400000).toISOString()
        },
        gateway: {
            status: 'online',
            uptime: process.uptime()
        }
    };
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🐾 Clawdy Live Dashboard</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 30px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 30px;
        }
        h1 {
            font-size: 2.5em;
            background: linear-gradient(90deg, #00d4ff, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
            padding: 8px 20px;
            background: rgba(0, 212, 255, 0.1);
            border-radius: 20px;
        }
        .pulse {
            width: 10px;
            height: 10px;
            background: #00ff88;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        .card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 24px;
        }
        .card h2 {
            font-size: 1.1em;
            color: #00d4ff;
            margin-bottom: 16px;
        }
        .stat {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .stat:last-child { border-bottom: none; }
        .stat-label { color: #888; }
        .stat-value { font-weight: 600; }
        .stat-value.good { color: #00ff88; }
        .stat-value.warning { color: #ffaa00; }
        .tag {
            display: inline-block;
            padding: 4px 12px;
            margin: 2px;
            background: rgba(0,212,255,0.2);
            border-radius: 12px;
            font-size: 0.85em;
        }
        .timeline-item {
            padding: 12px 0;
            border-left: 2px solid #00d4ff;
            padding-left: 16px;
            margin-left: 8px;
            position: relative;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 16px;
            width: 10px;
            height: 10px;
            background: #00d4ff;
            border-radius: 50%;
        }
        .timestamp {
            text-align: center;
            color: #666;
            font-size: 0.85em;
            margin-top: 30px;
        }
        .refresh-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00d4ff, #7c3aed);
            border: none;
            color: white;
            font-size: 1.5em;
            cursor: pointer;
        }
        @media (max-width: 768px) {
            .grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🐾 Clawdy Live</h1>
        <div class="status-badge">
            <div class="pulse"></div>
            <span>Awake & Learning</span>
        </div>
    </div>

    <div class="grid">
        <div class="card">
            <h2>📊 Core Stats</h2>
            <div class="stat"><span class="stat-label">Gateway</span><span class="stat-value good">Online ✓</span></div>
            <div class="stat"><span class="stat-label">Channel</span><span class="stat-value">Telegram</span></div>
            <div class="stat"><span class="stat-label">Memory</span><span class="stat-value good">Synced ✓</span></div>
            <div class="stat"><span class="stat-label">Uptime</span><span class="stat-value" id="uptime">--</span></div>
        </div>

        <div class="card">
            <h2>🧠 Memory System</h2>
            <div class="stat"><span class="stat-label">Files</span><span class="stat-value" id="memory-files">--</span></div>
            <div class="stat"><span class="stat-label">Size</span><span class="stat-value" id="memory-size">--</span></div>
            <div class="stat"><span class="stat-label">Location</span><span class="stat-value">Google Drive</span></div>
            <div class="stat"><span class="stat-label">Last Update</span><span class="stat-value" id="memory-time">--</span></div>
        </div>

        <div class="card">
            <h2>⚡ Capabilities</h2>
            <div class="stat"><span class="stat-label">Skills</span><span class="stat-value" id="skills-count">--</span></div>
            <div id="skills-list"></div>
        </div>

        <div class="card">
            <h2>⏰ Scheduled</h2>
            <div class="stat"><span class="stat-label">Active Jobs</span><span class="stat-value" id="cron-count">--</span></div>
            <div class="timeline-item">
                <div style="color:#888;font-size:0.85em;">Next Run</div>
                <div id="cron-next">--</div>
            </div>
        </div>

        <div class="card">
            <h2>📚 Learning</h2>
            <div class="stat"><span class="stat-label">Total Lessons</span><span class="stat-value">7</span></div>
            <div class="timeline-item">
                <div style="color:#888;font-size:0.85em;">Latest</div>
                <div>Exhaustive research rule</div>
            </div>
        </div>

        <div class="card">
            <h2>🎯 Focus</h2>
            <div class="stat"><span class="stat-label">Mission</span><span class="stat-value">MyAgent Launch</span></div>
            <div class="stat"><span class="stat-label">Version</span><span class="stat-value warning">v5.7</span></div>
            <div class="stat"><span class="stat-label">Status</span><span class="stat-value">Testing</span></div>
        </div>
    </div>

    <div class="timestamp" id="timestamp">Last updated: --</div>
    <button class="refresh-btn" onclick="fetchData()">↻</button>

    <script>
        async function fetchData() {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                
                document.getElementById('uptime').textContent = formatUptime(data.gateway?.uptime || 0);
                document.getElementById('memory-files').textContent = data.memory?.files || '--';
                document.getElementById('memory-size').textContent = data.memory?.size || '--';
                document.getElementById('memory-time').textContent = new Date(data.timestamp).toLocaleTimeString();
                
                const skills = data.skills?.list || [];
                document.getElementById('skills-count').textContent = skills.length;
                document.getElementById('skills-list').innerHTML = skills.map(s => \`<span class="tag">\${s}</span>\`).join('');
                
                document.getElementById('cron-count').textContent = data.cron?.active || 0;
                document.getElementById('cron-next').textContent = data.cron?.nextRun ? 
                    new Date(data.cron.nextRun).toLocaleString() : '--';
                
                document.getElementById('timestamp').textContent = 'Last updated: ' + new Date().toLocaleTimeString();
            } catch (e) {
                console.error('Fetch error:', e);
            }
        }

        function formatUptime(seconds) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            return h > 0 ? \`\${h}h \${m}m\` : \`\${m}m\`;
        }

        fetchData();
        setInterval(fetchData, 5000);
    </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/dashboard') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML);
    } else if (req.url === '/api/stats') {
        const stats = gatherStats();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(stats, null, 2));
    } else if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(\`🚀 Clawdy Dashboard running at http://localhost:\${PORT}/dashboard\`);
    console.log('   API endpoint: http://localhost:\${PORT}/api/stats');
});
