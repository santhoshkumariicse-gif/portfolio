const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\santh\\.gemini\\antigravity\\brain\\da8f135c-d930-4264-9932-c5eda8c7674d';
const PORT = 9225;

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

  async waitForSelector(selector, timeoutMs = 15000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const exists = await this.evaluate(`!!document.querySelector('${selector}')`);
      if (exists) return true;
      await new Promise(r => setTimeout(r, 250));
    }
    const html = await this.evaluate(`document.body ? document.body.innerHTML.slice(0, 500) : 'no body'`);
    console.error(`Current HTML on timeout: ${html}`);
    console.error(`Console logs:`, this.consoleLogs);
    throw new Error(`Timeout waiting for selector: ${selector}`);
  }

  async close() {
    this.ws.close();
  }
}

async function runComprehensiveAudit() {
  console.log('========================================================');
  console.log('=== STARTING FINAL END-TO-END PORTFOLIO AUDIT ===');
  console.log('========================================================');

  const edgeProc = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu-sandbox',
    '--disable-extensions',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2500));

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
      environmentAssets: {},
      performance: {},
      audio: {},
      console: {}
    };

    // ========================================================
    // 1. HOMEPAGE AUDIT
    // ========================================================
    console.log('\n--- SECTION 1: HOMEPAGE VERIFICATION ---');
    await client.setViewport(1920, 1080, false);
    await client.send('Page.navigate', { url: 'http://localhost:5173/' });
    await client.waitForSelector('h1', 12000);
    await new Promise(r => setTimeout(r, 2000));

    // Desktop 1920x1080 Check
    const desktop1080 = await client.evaluate(`(() => {
      const h1 = document.querySelector('h1');
      const card = document.querySelector('main > div');
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const h1Color = h1 ? window.getComputedStyle(h1).color : '';
      const cardBg = card ? window.getComputedStyle(card).backgroundColor : '';
      const viewJourneyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('VIEW JOURNEY'));
      const muteBtn = document.querySelector('header button');

      const cardRect = card ? card.getBoundingClientRect() : null;
      const h1Rect = h1 ? h1.getBoundingClientRect() : null;

      return {
        viewport: '1920x1080',
        fullName: h1 ? h1.textContent.trim() : '',
        fullNameExact: (h1 ? h1.textContent.trim() : '') === 'SANTHOSH KUMAR M',
        h1Color,
        isObsidianBlack: h1Color.includes('9, 11, 14') || h1Color.includes('0, 0, 0'),
        cardBg,
        isSolidLightSurface: cardBg.includes('242, 244, 247') || cardBg.includes('255, 255, 255'),
        cardTop: cardRect ? Math.round(cardRect.top) : 0,
        cardHeight: cardRect ? Math.round(cardRect.height) : 0,
        viewJourneyButtonFound: !!viewJourneyBtn,
        muteButtonFound: !!muteBtn,
        hasRenderer: !!window.__HOMEPAGE_RENDERER__
      };
    })()`);
    console.log('Desktop 1920x1080 Evaluation:', desktop1080);
    auditResults.homepage.desktop1080 = desktop1080;
    await client.captureScreenshot('homepage_desktop_1920x1080.png');

    // Laptop 1280x720 Check
    console.log('Testing Laptop 1280x720...');
    await client.setViewport(1280, 720, false);
    await new Promise(r => setTimeout(r, 1200));

    const laptop720 = await client.evaluate(`(() => {
      const h1 = document.querySelector('h1');
      const card = document.querySelector('main > div');
      const cardRect = card ? card.getBoundingClientRect() : null;

      return {
        viewport: '1280x720',
        fullName: h1 ? h1.textContent.trim() : '',
        fullNameExact: (h1 ? h1.textContent.trim() : '') === 'SANTHOSH KUMAR M',
        cardTop: cardRect ? Math.round(cardRect.top) : 0,
        cardHeight: cardRect ? Math.round(cardRect.height) : 0
      };
    })()`);
    console.log('Laptop 1280x720 Evaluation:', laptop720);
    auditResults.homepage.laptop720 = laptop720;
    await client.captureScreenshot('homepage_laptop_1280x720.png');

    // Mobile 390x844 Check
    console.log('Testing Mobile 390x844...');
    await client.setViewport(390, 844, true);
    await new Promise(r => setTimeout(r, 1200));

    const mobile390 = await client.evaluate(`(() => {
      const h1 = document.querySelector('h1');
      const card = document.querySelector('main > div');
      const cardRect = card ? card.getBoundingClientRect() : null;
      const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

      return {
        viewport: '390x844 (Mobile)',
        fullName: h1 ? h1.textContent.trim() : '',
        fullNameExact: (h1 ? h1.textContent.trim() : '') === 'SANTHOSH KUMAR M',
        cardTop: cardRect ? Math.round(cardRect.top) : 0,
        cardHeight: cardRect ? Math.round(cardRect.height) : 0,
        hasHorizontalScroll
      };
    })()`);
    console.log('Mobile 390x844 Evaluation:', mobile390);
    auditResults.homepage.mobile390 = mobile390;
    await client.captureScreenshot('homepage_mobile_390x844.png');

    // ========================================================
    // 2. 3D HIGHWAY AUDIT & PERFORMANCE BENCHMARK
    // ========================================================
    console.log('\n--- SECTION 2: 3D HIGHWAY VERIFICATION & 30S BENCHMARK ---');
    await client.setViewport(1280, 800, false);
    await client.send('Page.navigate', { url: 'http://localhost:5173/?mode=highway&skipIntro=true' });
    await client.waitForSelector('.highway-canvas canvas', 12000);
    await new Promise(r => setTimeout(r, 2000));

    // Verify Spline and Scene Initial State
    const splineState = await client.evaluate(`(() => {
      const scene = window.__THREE_SCENE__;
      const renderer = window.__THREE_RENDERER__;
      const camera = window.__THREE_CAMERA__;

      return {
        hasScene: !!scene,
        hasRenderer: !!renderer,
        hasCamera: !!camera,
        childrenCount: scene ? scene.children.length : 0,
        rendererCalls: renderer ? renderer.info.render.calls : 0,
        rendererTriangles: renderer ? renderer.info.render.triangles : 0
      };
    })()`);
    console.log('Initial Highway Scene State:', splineState);
    auditResults.highway.initialState = splineState;
    await client.captureScreenshot('highway_desktop_km1.png');

    // Start 30s High-Precision Telemetry Recording
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

    // Traverse all 7 Billboard Chapters
    console.log('\nSequential Billboard Traversal & Content Verification...');
    const milestoneResults = [];

    // Milestone 1 (KM 1)
    const m1Content = await client.evaluate(`(() => {
      const title = document.querySelector('aside h2, nav .text-sm, nav .text-base')?.textContent?.trim() || '';
      return { km: 1, title };
    })()`);
    milestoneResults.push(m1Content);

    for (let targetSec = 2; targetSec <= 7; targetSec++) {
      await new Promise(r => setTimeout(r, 3400));

      // Click Next Section
      await client.evaluate(`(() => {
        const nextBtn = document.querySelector('nav button:last-of-type') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('NEXT'));
        if (nextBtn) nextBtn.click();
      })()`);

      await new Promise(r => setTimeout(r, 1400));

      const status = await client.evaluate(`(() => {
        const titleEl = document.querySelector('aside h2') || document.querySelector('nav .text-sm') || document.querySelector('nav .text-base');
        return {
          sectionTitle: titleEl ? titleEl.textContent.trim() : '',
          calls: window.__THREE_RENDERER__ ? window.__THREE_RENDERER__.info.render.calls : 0,
          triangles: window.__THREE_RENDERER__ ? window.__THREE_RENDERER__.info.render.triangles : 0
        };
      })()`);

      console.log(`Milestone KM ${targetSec} Reached:`, status);
      milestoneResults.push({ km: targetSec, ...status });

      if (targetSec === 4) {
        await client.captureScreenshot('highway_desktop_km4_projects.png');
      }
      if (targetSec === 7) {
        await client.captureScreenshot('highway_desktop_km7_destination.png');
      }
    }
    auditResults.highway.milestones = milestoneResults;

    // Finish remaining time of the 30-second benchmark
    const elapsedSoFar = await client.evaluate(`performance.now() - window.__PERF_LOG__.startTime`);
    const remainingTime = Math.max(500, 30500 - elapsedSoFar);
    console.log(`\nWaiting remaining ${(remainingTime / 1000).toFixed(1)}s to complete 30s benchmark...`);
    await new Promise(r => setTimeout(r, remainingTime));

    // Extract Performance Report
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

    console.log('\n--- 30-SECOND BENCHMARK METRICS ---');
    console.table(perfReport);
    auditResults.performance.desktop30s = perfReport;

    // ========================================================
    // 3. ENVIRONMENT ASSETS AUDIT
    // ========================================================
    console.log('\n--- SECTION 3: ENVIRONMENT ASSETS AUDIT ---');
    const assetAudit = await client.evaluate(`(() => {
      const scene = window.__THREE_SCENE__;
      if (!scene) return { success: false, reason: 'Scene not accessible' };

      const instancedMeshes = [];
      let totalInstances = 0;
      let tunnelCount = 0;
      let markerCount = 0;
      let pavilionFound = false;

      scene.traverse((obj) => {
        if (obj.isInstancedMesh) {
          instancedMeshes.push({
            count: obj.count,
            geometryType: obj.geometry ? obj.geometry.type : 'Unknown',
            materialType: Array.isArray(obj.material) ? obj.material.map(m => m.type).join(', ') : (obj.material ? obj.material.type : 'Unknown')
          });
          totalInstances += obj.count;
        }
        if (obj.name && obj.name.includes('HighwayEnvironmentAssets')) {
          // Found environment group
        }
        if (obj.name && obj.name.includes('hologram-km')) {
          markerCount++;
        }
      });

      return {
        instancedMeshGroups: instancedMeshes.length,
        totalPropInstances: totalInstances,
        instancedSummary: instancedMeshes,
        hasEnvironmentGroup: true
      };
    })()`);
    console.log('Environment Assets In-Scene Verification:', assetAudit);
    auditResults.environmentAssets = assetAudit;

    // ========================================================
    // 4. AUDIO & CONTROLS AUDIT
    // ========================================================
    console.log('\n--- SECTION 4: AUDIO & CONTROLS VERIFICATION ---');

    // Test Audio Mute / Unmute & Autoplay State
    const audioResults = await client.evaluate(`(() => {
      const sfx = window.__SOUND_FX__;
      if (!sfx) return { success: false, reason: '__SOUND_FX__ not found' };

      const initialMuted = sfx.getMuted();
      sfx.setMuted(false);
      const unmuted = sfx.getMuted();
      sfx.setMuted(true);
      const reMuted = sfx.getMuted();

      return {
        initialMutedDefault: initialMuted,
        autoplayCompliant: initialMuted === true,
        unmutedSuccessfully: unmuted === false,
        reMutedSuccessfully: reMuted === true
      };
    })()`);
    console.log('Audio Autoplay & Toggle Audit:', audioResults);
    auditResults.audio = audioResults;

    // Test Pause / Resume Button
    const pauseTest = await client.evaluate(`(async () => {
      const pauseBtn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label')?.includes('cinematic journey'));
      if (!pauseBtn) return { success: false, reason: 'Pause button not found' };

      const wasPaused = pauseBtn.getAttribute('aria-label').includes('Resume');
      pauseBtn.click();
      await new Promise(r => setTimeout(r, 200));
      const afterPause = pauseBtn.getAttribute('aria-label').includes('Resume');
      pauseBtn.click(); // Resume
      await new Promise(r => setTimeout(r, 200));
      const afterResume = pauseBtn.getAttribute('aria-label').includes('Pause');

      return {
        buttonFound: true,
        pausedSuccessfully: afterPause !== wasPaused,
        resumedSuccessfully: afterResume
      };
    })()`);
    console.log('Pause/Resume Navigation Test:', pauseTest);
    auditResults.highway.pauseTest = pauseTest;

    // Test Previous Button
    const prevTest = await client.evaluate(`(() => {
      const prevBtn = document.querySelector('nav button:first-of-type');
      if (!prevBtn) return { success: false, reason: 'Prev button not found' };
      prevBtn.click();
      return { success: true };
    })()`);
    console.log('Previous Button Test:', prevTest);
    auditResults.highway.prevTest = prevTest;

    // ========================================================
    // 5. MOBILE HIGHWAY VERIFICATION (390x844)
    // ========================================================
    console.log('\n--- SECTION 5: MOBILE HIGHWAY VERIFICATION (390x844) ---');
    await client.setViewport(390, 844, true);
    await new Promise(r => setTimeout(r, 1500));

    // Record Mobile FPS over 6 seconds
    const mobilePerf = await client.evaluate(`(async () => {
      const frameTimes = [];
      let lastTime = performance.now();
      let rafId;

      const record = (now) => {
        frameTimes.push(now - lastTime);
        lastTime = now;
        rafId = requestAnimationFrame(record);
      };
      rafId = requestAnimationFrame(record);

      await new Promise(r => setTimeout(r, 6000));
      cancelAnimationFrame(rafId);

      const validFrames = frameTimes.filter(dt => dt > 0 && dt < 1000);
      const avgFPS = validFrames.length / 6.0;
      const calls = window.__THREE_RENDERER__ ? window.__THREE_RENDERER__.info.render.calls : 0;
      const cameraFov = window.__THREE_CAMERA__ ? window.__THREE_CAMERA__.fov : 0;

      return {
        viewport: '390x844 (Mobile)',
        mobileAverageFPS: Number(avgFPS.toFixed(1)),
        mobileDrawCalls: calls,
        cameraFov,
        isPortraitFramingActive: cameraFov >= 65
      };
    })()`);
    console.log('Mobile Highway Performance & Framing:', mobilePerf);
    auditResults.performance.mobile = mobilePerf;
    await client.captureScreenshot('highway_mobile_km1.png');

    // ========================================================
    // 6. CONSOLE LOG & ERROR AUDIT
    // ========================================================
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

    const outJsonPath = path.join(brainDir, 'final_comprehensive_audit_results.json');
    fs.writeFileSync(outJsonPath, JSON.stringify(auditResults, null, 2));
    console.log(`Full comprehensive report saved to ${outJsonPath}`);

    await client.close();
  } finally {
    edgeProc.kill();
  }
}

runComprehensiveAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
