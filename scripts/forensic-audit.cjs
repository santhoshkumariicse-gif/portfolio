const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\santh\\.gemini\\antigravity\\brain\\da8f135c-d930-4264-9932-c5eda8c7674d';
const PORT = 9222;

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
    this.consoleLogs = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(new Error(msg.error.message));
          else cb.resolve(msg.result);
        }
        if (msg.method === 'Console.messageAdded') {
          this.consoleLogs.push(msg.params.message);
        }
        if (msg.method === 'Runtime.consoleAPICalled') {
          const text = msg.params.args.map(a => a.value !== undefined ? String(a.value) : JSON.stringify(a)).join(' ');
          this.consoleLogs.push({ type: msg.params.type, text });
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          const details = msg.params.exceptionDetails;
          const text = details.exception?.description || details.text || 'Unknown exception';
          this.consoleLogs.push({ type: 'error', text, line: details.lineNumber, col: details.columnNumber, url: details.url });
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text);
    }
    return res.result ? res.result.value : undefined;
  }

  async setViewport(width, height, mobile = false) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: mobile ? 2 : 1,
      mobile,
      screenOrientation: mobile ? { angle: 0, type: 'portraitPrimary' } : { angle: 0, type: 'landscapePrimary' }
    });
  }

  async captureScreenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(brainDir, filename);
    fs.writeFileSync(outPath, buffer);
    console.log(`[Screenshot Saved] ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return outPath;
  }

  async waitForSelector(selector, timeoutMs = 8000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const exists = await this.evaluate(`!!document.querySelector('${selector}')`);
      if (exists) return true;
      await new Promise(r => setTimeout(r, 200));
    }
    throw new Error(`Timeout waiting for selector: ${selector}`);
  }

  async close() {
    this.ws.close();
  }
}

async function runAudit() {
  console.log('=== STARTING FINAL RUNTIME FORENSIC AUDIT ===');

  const edgeProc = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu-sandbox',
    '--disable-extensions',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch(`http://localhost:${PORT}/json/list`);
    const pages = await listRes.json();
    const page = pages.find(p => p.type === 'page') || pages[0];
    if (!page) throw new Error('No page found on remote debugger');

    const client = new CDPClient(page.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Console.enable');

    const auditResults = {
      timestamp: new Date().toISOString(),
      homepage: {},
      highway: {},
      performance: {},
      audio: {},
      console: {}
    };

    // ==========================================
    // PHASE 1: HOMEPAGE VERIFICATION
    // ==========================================
    console.log('\n--- PHASE 1: HOMEPAGE VERIFICATION ---');
    await client.setViewport(1280, 800, false);
    await client.send('Page.navigate', { url: 'http://localhost:5173/' });

    // Wait for actual heading to appear (bypassing lazy load fallback)
    await client.waitForSelector('h1', 10000);
    await new Promise(r => setTimeout(r, 1500)); // Allow 3D canvas to render first frames

    const desktopData = await client.evaluate(`(() => {
      const h1 = document.querySelector('h1');
      const text = h1 ? h1.textContent.trim() : '';
      const rect = h1 ? h1.getBoundingClientRect() : null;
      const card = document.querySelector('main > div');
      const cardRect = card ? card.getBoundingClientRect() : null;
      const subtitle = document.querySelector('main .font-mono');
      const hasRenderer = !!window.__HOMEPAGE_RENDERER__;

      return {
        fullName: text,
        exactMatch: text === 'SANTHOSH KUMAR M',
        h1Top: rect ? rect.top : 0,
        h1Height: rect ? rect.height : 0,
        cardTop: cardRect ? cardRect.top : 0,
        cardHeight: cardRect ? cardRect.height : 0,
        subtitle: subtitle ? subtitle.textContent.trim() : '',
        hasRenderer,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      };
    })()`);

    console.log('Homepage Desktop Telemetry:', desktopData);
    auditResults.homepage.desktop = desktopData;
    await client.captureScreenshot('homepage_verified.png');

    // Mobile Homepage Viewport (390x844)
    console.log('\nTesting Mobile Viewport (390x844)...');
    await client.setViewport(390, 844, true);
    await new Promise(r => setTimeout(r, 1500));

    const mobileData = await client.evaluate(`(() => {
      const h1 = document.querySelector('h1');
      const text = h1 ? h1.textContent.trim() : '';
      const rect = h1 ? h1.getBoundingClientRect() : null;
      const card = document.querySelector('main > div');
      const cardRect = card ? card.getBoundingClientRect() : null;
      const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

      return {
        fullName: text,
        exactMatch: text === 'SANTHOSH KUMAR M',
        h1Height: rect ? rect.height : 0,
        cardTop: cardRect ? cardRect.top : 0,
        hasHorizontalScroll,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      };
    })()`);

    console.log('Homepage Mobile Telemetry:', mobileData);
    auditResults.homepage.mobile = mobileData;
    await client.captureScreenshot('homepage_mobile_verified.png');

    // ==========================================
    // PHASE 2: HIGHWAY RUNTIME & 30-SECOND BENCHMARK
    // ==========================================
    console.log('\n--- PHASE 2: HIGHWAY RUNTIME & 30-SECOND PERFORMANCE BENCHMARK ---');
    await client.setViewport(1280, 800, false);
    await client.send('Page.navigate', { url: 'http://localhost:5173/?mode=highway&skipIntro=true' });

    await client.waitForSelector('.highway-canvas canvas', 10000);
    await new Promise(r => setTimeout(r, 2000));

    // Start in-browser RAF telemetry recording
    await client.evaluate(`(() => {
      window.__PERF_LOG__ = {
        frameTimes: [],
        drawCalls: [],
        triangles: [],
        heapSizes: [],
        startTime: performance.now()
      };

      let lastFrame = performance.now();
      function recordFrame(now) {
        const delta = now - lastFrame;
        lastFrame = now;
        window.__PERF_LOG__.frameTimes.push(delta);

        if (window.__THREE_RENDERER__) {
          window.__PERF_LOG__.drawCalls.push(window.__THREE_RENDERER__.info.render.calls);
          window.__PERF_LOG__.triangles.push(window.__THREE_RENDERER__.info.render.triangles);
        }
        if (performance.memory) {
          window.__PERF_LOG__.heapSizes.push(performance.memory.usedJSHeapSize);
        }
        window.__RAF_ID__ = requestAnimationFrame(recordFrame);
      }
      window.__RAF_ID__ = requestAnimationFrame(recordFrame);
    })()`);

    // Capture KM 1 (About Me)
    await client.captureScreenshot('highway_verified.png');

    // Traverse all 7 milestone stops
    console.log('\nNavigating sequentially through all 7 milestones...');
    const milestones = [];

    for (let targetSec = 2; targetSec <= 7; targetSec++) {
      await new Promise(r => setTimeout(r, 3500));

      // Click Next Section
      await client.evaluate(`(() => {
        const nextBtn = document.querySelector('nav button:last-of-type') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('NEXT'));
        if (nextBtn) nextBtn.click();
      })()`);

      await new Promise(r => setTimeout(r, 1200));

      const status = await client.evaluate(`(() => {
        return {
          sectionIndicator: document.querySelector('nav .text-sm, nav .text-base')?.textContent?.trim() || '',
          calls: window.__THREE_RENDERER__ ? window.__THREE_RENDERER__.info.render.calls : 0,
          triangles: window.__THREE_RENDERER__ ? window.__THREE_RENDERER__.info.render.triangles : 0
        };
      })()`);

      console.log(`Milestone ${targetSec} Reached:`, status);
      milestones.push({ km: targetSec, status });

      if (targetSec === 4) {
        await client.captureScreenshot('highway_km4_projects_verified.png');
      }
      if (targetSec === 7) {
        await client.captureScreenshot('highway_km7_destination_verified.png');
      }
    }
    auditResults.highway.milestones = milestones;

    // Await full 30 seconds
    const elapsedSoFar = await client.evaluate(`performance.now() - window.__PERF_LOG__.startTime`);
    const remainingTime = Math.max(500, 30500 - elapsedSoFar);
    console.log(`Waiting remaining ${(remainingTime / 1000).toFixed(1)}s to complete 30s benchmark...`);
    await new Promise(r => setTimeout(r, remainingTime));

    // Extract performance report
    const perfReport = await client.evaluate(`(() => {
      cancelAnimationFrame(window.__RAF_ID__);
      const log = window.__PERF_LOG__;
      const totalDuration = performance.now() - log.startTime;
      const frameDeltas = log.frameTimes.filter(dt => dt > 0 && dt < 1000);
      const totalFrames = frameDeltas.length;

      const fpsValues = frameDeltas.map(dt => 1000 / dt).sort((a, b) => a - b);
      const avgFPS = totalFrames / (totalDuration / 1000);
      const minFPS = fpsValues[0] || 0;
      const maxFPS = fpsValues[fpsValues.length - 1] || 0;
      const p1Low = fpsValues[Math.floor(fpsValues.length * 0.01)] || 0;
      const p5Low = fpsValues[Math.floor(fpsValues.length * 0.05)] || 0;

      const avgCalls = log.drawCalls.length > 0 ? (log.drawCalls.reduce((a, b) => a + b, 0) / log.drawCalls.length) : 0;
      const maxCalls = log.drawCalls.length > 0 ? Math.max(...log.drawCalls) : 0;
      const avgTriangles = log.triangles.length > 0 ? (log.triangles.reduce((a, b) => a + b, 0) / log.triangles.length) : 0;
      const maxTriangles = log.triangles.length > 0 ? Math.max(...log.triangles) : 0;

      const loadDuration = performance.getEntriesByType('navigation')[0]?.duration || 0;
      const heapMB = log.heapSizes.length > 0 ? (log.heapSizes[log.heapSizes.length - 1] / (1024 * 1024)).toFixed(2) : 'N/A';

      return {
        sessionDurationSec: Number((totalDuration / 1000).toFixed(2)),
        totalFramesRendered: totalFrames,
        averageFPS: Number(avgFPS.toFixed(1)),
        minFPS: Number(minFPS.toFixed(1)),
        maxFPS: Number(maxFPS.toFixed(1)),
        onePercentLowFPS: Number(p1Low.toFixed(1)),
        fivePercentLowFPS: Number(p5Low.toFixed(1)),
        avgDrawCalls: Math.round(avgCalls),
        maxDrawCalls: Math.round(maxCalls),
        avgTriangles: Math.round(avgTriangles),
        maxTriangles: Math.round(maxTriangles),
        initialLoadDurationMs: Math.round(loadDuration),
        jsHeapUsedMB: heapMB
      };
    })()`);

    console.log('\n--- 30-SECOND PERFORMANCE BENCHMARK ---');
    console.table(perfReport);
    auditResults.performance = perfReport;

    // ==========================================
    // PHASE 3: CONTROLS & AUDIO TESTING
    // ==========================================
    console.log('\n--- PHASE 3: CONTROLS & AUDIO ---');
    const audioTest = await client.evaluate(`(() => {
      const sfx = window.__SOUND_FX__;
      if (!sfx) return { success: false, reason: '__SOUND_FX__ missing' };

      const initial = sfx.getMuted();
      sfx.setMuted(false);
      const unmuted = sfx.getMuted();
      sfx.setMuted(true);
      const mutedAgain = sfx.getMuted();

      return {
        initialMuted: initial,
        unmutedState: unmuted === false,
        reMutedState: mutedAgain === true
      };
    })()`);
    console.log('Audio Test:', audioTest);
    auditResults.audio = audioTest;

    // Test Pause / Resume
    const pauseTest = await client.evaluate(`(async () => {
      const pauseBtn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label')?.includes('cinematic journey'));
      if (!pauseBtn) return { success: false, reason: 'Pause button not found' };

      const wasPaused = pauseBtn.getAttribute('aria-label').includes('Resume');
      pauseBtn.click();
      await new Promise(r => setTimeout(r, 200));
      const afterClick = pauseBtn.getAttribute('aria-label').includes('Resume');
      pauseBtn.click(); // resume
      await new Promise(r => setTimeout(r, 200));
      const afterResume = pauseBtn.getAttribute('aria-label').includes('Pause');

      return {
        buttonFound: true,
        toggledToPaused: afterClick !== wasPaused,
        resumedSuccessfully: afterResume
      };
    })()`);
    console.log('Pause/Resume Test:', pauseTest);
    auditResults.highway.pauseTest = pauseTest;

    // Test Previous button
    const prevTest = await client.evaluate(`(() => {
      const prevBtn = document.querySelector('nav button:first-of-type');
      if (!prevBtn) return { success: false, reason: 'Prev button not found' };
      prevBtn.click();
      return { success: true };
    })()`);
    console.log('Previous Section Button Test:', prevTest);
    auditResults.highway.prevTest = prevTest;

    // ==========================================
    // PHASE 4: MOBILE HIGHWAY VERIFICATION
    // ==========================================
    console.log('\n--- PHASE 4: MOBILE HIGHWAY VERIFICATION (390x844) ---');
    await client.setViewport(390, 844, true);
    await new Promise(r => setTimeout(r, 2000));
    await client.captureScreenshot('highway_mobile_verified.png');

    // ==========================================
    // CONSOLE ERROR AUDIT
    // ==========================================
    const errors = client.consoleLogs.filter(l => l.type === 'error');
    const warnings = client.consoleLogs.filter(l => l.type === 'warning' || l.level === 'warning');
    auditResults.console = {
      totalLogs: client.consoleLogs.length,
      errorsCount: errors.length,
      warningsCount: warnings.length,
      errors,
      warnings: warnings.slice(0, 5)
    };

    console.log(`\nConsole Audit: ${errors.length} errors, ${warnings.length} warnings.`);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }

    const outJsonPath = path.join(brainDir, 'final_runtime_forensic_results.json');
    fs.writeFileSync(outJsonPath, JSON.stringify(auditResults, null, 2));
    console.log(`Full forensic report saved to ${outJsonPath}`);

    await client.close();
  } finally {
    edgeProc.kill();
  }
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
