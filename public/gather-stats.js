#!/usr/bin/env node
/**
 * Clawdy Live Stats - Gathers real-time data for the dashboard
 * Run this script to update dashboard data
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = '/Users/natyvai/.openclaw/workspace/dashboard/stats.json';

// Paths to check
const PATHS = {
    memory: '/Users/natyvai/.openclaw/workspace/memory/',
    sessions: '/Users/natyvai/.clawdbot/agents/main/sessions/',
    cron: '/Users/natyvai/.clawdbot/cron/jobs.json',
    skills: '/Users/natyvai/Library/Application Support/OpenClaw/skills/',
    gateway: '/Users/natyvai/.openclaw/gateway/'
};

function getDirectoryStats(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) return { count: 0, size: 0, files: [] };
        
        const files = fs.readdirSync(dirPath);
        let totalSize = 0;
        const fileList = [];
        
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            try {
                const stats = fs.statSync(fullPath);
                totalSize += stats.size;
                if (stats.isFile()) {
                    fileList.push({
                        name: file,
                        size: stats.size,
                        mtime: stats.mtime
                    });
                }
            } catch (e) {}
        });
        
        return { count: files.length, size: totalSize, files: fileList.slice(0, 10) };
    } catch (e) {
        return { count: 0, size: 0, files: [] };
    }
}

function getCronJobs() {
    try {
        if (!fs.existsSync(PATHS.cron)) return { jobs: [], active: 0 };
        const data = JSON.parse(fs.readFileSync(PATHS.cron, 'utf8'));
        return {
            jobs: data.jobs || [],
            active: data.jobs?.filter(j => j.enabled).length || 0
        };
    } catch (e) {
        return { jobs: [], active: 0 };
    }
}

function getSkills() {
    const skillsDir = '/Users/natyvai/Library/Application Support/OpenClaw/skills/';
    try {
        if (!fs.existsSync(skillsDir)) return [];
        return fs.readdirSync(skillsDir).filter(s => !s.startsWith('.'));
    } catch (e) {
        return [];
    }
}

function gatherStats() {
    const memory = getDirectoryStats(PATHS.memory);
    const sessions = getDirectoryStats(PATHS.sessions);
    const cron = getCronJobs();
    const skills = getSkills();
    
    const stats = {
        timestamp: new Date().toISOString(),
        session: {
            id: 'main',
            start: new Date().toISOString(),
            messageCount: '∞'
        },
        memory: {
            files: memory.count,
            size: formatSize(memory.size),
            synced: true,
            recentFiles: memory.files.map(f => ({
                name: f.name,
                mtime: f.mtime
            }))
        },
        cron: {
            jobs: cron.jobs.map(j => ({
                name: j.name,
                nextRun: j.state?.nextRunAtMs ? new Date(j.state.nextRunAtMs).toISOString() : null,
                lastRun: j.state?.lastRunAtMs ? new Date(j.state.lastRunAtMs).toISOString() : null,
                status: j.state?.lastStatus || 'unknown'
            })),
            active: cron.active
        },
        skills: {
            list: skills,
            count: skills.length
        },
        gateway: {
            status: 'online',
            uptime: process.uptime()
        }
    };
    
    return stats;
}

function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
}

function main() {
    const stats = gatherStats();
    fs.writeFileSync(DATA_FILE, JSON.stringify(stats, null, 2));
    console.log('✅ Stats updated:', stats.timestamp);
    console.log(`   Memory: ${stats.memory.files} files (${stats.memory.size})`);
    console.log(`   Skills: ${stats.skills.count} loaded`);
    console.log(`   Cron: ${stats.cron.active} active jobs`);
}

main();
