(function() {
    const DESIGN_KEY = 'rx_design';
    const DARKMODE_KEY = 'rx_darkmode';
    const PINKMODE_KEY = 'rx_pinkmode_enabled';
    const DEV_MODE_KEY = 'rx_dev_mode';
    const FEAT_WEATHER_KEY = 'rx_feat_weather';
    const FEAT_LOCATION_KEY = 'rx_feat_location';
    const FEAT_LAUNCHER_KEY = 'rx_feat_launcher';
    const LAUNCHER_CONFIG_KEY = 'rx_launcher_config';
    const LAUNCHER_APPS_KEY = 'rx_launcher_apps';
    const ACCENT_KEY = 'rx_accent';
    const USERNAME_KEY = 'rx_username';

    function applySettings() {
        const isTablet = window.innerWidth >= 768;
        let design = localStorage.getItem(DESIGN_KEY);
        
        if (!design) {
             design = isTablet ? 'tablet' : 'standard';
        }
        const darkMode = localStorage.getItem(DARKMODE_KEY) === 'true';
        const pinkMode = localStorage.getItem(PINKMODE_KEY) === 'true';
        const devMode = localStorage.getItem(DEV_MODE_KEY) === 'true';
        const weatherEnabled = localStorage.getItem(FEAT_WEATHER_KEY) !== 'false'; // Standard: an
        const locationEnabled = localStorage.getItem(FEAT_LOCATION_KEY) !== 'false'; // Standard: an
        const launcherEnabled = localStorage.getItem(FEAT_LAUNCHER_KEY) === 'true'; // Standard: aus
        const accent = localStorage.getItem(ACCENT_KEY) || 'blue';

        // Wenn Pink Mode an ist, überschreibt er das Design
        if (pinkMode) {
            design = 'pink';
        }

        const body = document.body;
        // Alte Design-Klassen entfernen
        body.classList.remove('design-standard', 'design-list', 'design-tiles', 'design-focus', 'design-pink', 'design-tablet');
        // Neues Design setzen
        if (!body.classList.contains('no-layout-change') || design === 'pink' || design === 'tablet') {
            body.classList.add('design-' + design);
        }

        // Akzentfarbe setzen
        body.classList.remove('accent-blue', 'accent-red', 'accent-green', 'accent-orange', 'accent-purple', 'accent-pink');
        // Im Pink Mode wird die Akzentfarbe auf Pink gezwungen
        body.classList.add('accent-' + (pinkMode ? 'pink' : accent));

        // Dark mode
        if (darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        
        // Launcher Mode Class
        if (launcherEnabled) {
            body.classList.add('launcher-mode');
        } else {
            body.classList.remove('launcher-mode');
        }

        // Tablet Theme CSS Injection
        const tabletStyleId = 'rx-tablet-css';
        let tabletStyle = document.getElementById(tabletStyleId);
        
        if (design === 'tablet') {
            if (!tabletStyle) {
                tabletStyle = document.createElement('style');
                tabletStyle.id = tabletStyleId;
                tabletStyle.textContent = `
                    @media (min-width: 768px) {
                        /* Layout Container */
                        body.design-tablet .app {
                            display: grid;
                            grid-template-columns: 280px 1fr;
                            grid-template-rows: 100vh;
                            overflow: hidden;
                        }
                        
                        /* Sidebar (Header) */
                        body.design-tablet .header {
                            flex-direction: column;
                            align-items: flex-start;
                            justify-content: flex-start;
                            padding: 40px 24px;
                            background: var(--card-background);
                            border-right: 1px solid var(--border-color, rgba(128,128,128,0.1));
                            height: 100%;
                            z-index: 50;
                            box-shadow: 2px 0 10px rgba(0,0,0,0.02);
                        }
                        
                        /* Sidebar Elements */
                        body.design-tablet .header h1 {
                            font-size: 28px;
                            margin: 20px 0 8px 0;
                            line-height: 1.2;
                        }
                        body.design-tablet .header p {
                            opacity: 0.6;
                            margin-bottom: 40px;
                            font-size: 15px;
                        }
                        
                        /* Navigation Links in Sidebar */
                        body.design-tablet .header .info-icon {
                            position: static;
                            margin-top: 10px;
                            display: flex;
                            align-items: center;
                            gap: 15px;
                            width: 100%;
                            padding: 14px;
                            border-radius: 14px;
                            color: var(--text-color);
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.2s;
                            background: transparent;
                        }
                        body.design-tablet .header .info-icon:hover {
                            background: var(--background-color);
                            transform: translateX(5px);
                        }
                        body.design-tablet .header .info-icon svg {
                            width: 24px; height: 24px;
                            stroke-width: 2.5;
                        }
                        body.design-tablet .header .info-icon::after {
                            content: attr(aria-label);
                            font-size: 16px;
                        }
                        /* Push first info-icon to bottom */
                        body.design-tablet .header .info-icon:first-of-type {
                            margin-top: auto;
                        }

                        /* Content Area */
                        body.design-tablet .content {
                            height: 100%;
                            overflow-y: auto;
                            padding: 40px 50px;
                        }
                        
                        /* Dashboard Grid Optimization */
                        body.design-tablet .dashboard-grid {
                            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                            gap: 30px;
                        }
                        
                        /* Cards */
                        body.design-tablet .nav-card {
                            aspect-ratio: 1.4;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            padding: 30px;
                            border-radius: 24px;
                            transition: transform 0.2s, box-shadow 0.2s;
                        }
                        body.design-tablet .nav-card:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                        }
                        body.design-tablet .nav-card .icon-box {
                            width: 64px; height: 64px;
                            margin-bottom: 20px;
                            background: var(--background-color);
                            border-radius: 20px;
                        }
                        body.design-tablet .nav-card .icon-box svg {
                            width: 32px; height: 32px;
                        }
                        body.design-tablet .nav-card h3 {
                            font-size: 20px;
                            margin-bottom: 5px;
                        }
                        
                        /* Weather Card */
                        body.design-tablet .weather-card.full-width {
                            grid-column: span 2;
                            aspect-ratio: auto;
                            min-height: 200px;
                        }
                        
                        /* Back Button Handling */
                        body.design-tablet .header .back-icon {
                            margin-bottom: 20px;
                            display: inline-flex;
                            padding: 10px;
                            background: var(--background-color);
                            border-radius: 50%;
                        }
                    }
                `;
                document.head.appendChild(tabletStyle);
            }
        } else {
            if (tabletStyle) tabletStyle.remove();
        }

        // Event feuern für UI-Updates (z.B. in index.html)
        window.dispatchEvent(new CustomEvent('rx-settings-changed', { 
            detail: { design, darkMode, weatherEnabled, locationEnabled, launcherEnabled, accent: (pinkMode ? 'pink' : accent), pinkMode, devMode } 
        }));

        updateDevTrigger(devMode);
    }

    // Expose functions globally
    window.setDesign = function(designName) {
        // 'pink' nicht als Basis-Design speichern
        if (designName !== 'pink') {
            localStorage.setItem(DESIGN_KEY, designName);
        }
        applySettings();
    };

    window.setDarkMode = function(enable) {
        localStorage.setItem(DARKMODE_KEY, enable);
        applySettings();
    };

    window.setPinkMode = function(enable) {
        localStorage.setItem(PINKMODE_KEY, enable);
        applySettings();
    };

    window.setDevMode = function(enable) {
        localStorage.setItem(DEV_MODE_KEY, enable);
        applySettings();
    };

    window.setFeature = function(feature, enable) {
        if (feature === 'weather') localStorage.setItem(FEAT_WEATHER_KEY, enable);
        if (feature === 'location') localStorage.setItem(FEAT_LOCATION_KEY, enable);
        if (feature === 'launcher') localStorage.setItem(FEAT_LAUNCHER_KEY, enable);
        applySettings();
    };

    window.setAccent = function(color) {
        localStorage.setItem(ACCENT_KEY, color);
        applySettings();
    };

    window.setUsername = function(name) {
        localStorage.setItem(USERNAME_KEY, name);
    };
    
    window.setLauncherApps = function(apps) {
        localStorage.setItem(LAUNCHER_APPS_KEY, JSON.stringify(apps));
        // Trigger update without full reload
        applySettings();
    };

    window.setLauncherConfig = function(config) {
        localStorage.setItem(LAUNCHER_CONFIG_KEY, JSON.stringify(config));
        window.dispatchEvent(new CustomEvent('rx-launcher-config-changed', { detail: config }));
    };

    window.resetApp = function() {
        if (confirm('Möchtest du die App wirklich zurücksetzen? Alle Einstellungen und Daten gehen verloren.')) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    };

    window.showDeviceInfo = function() {
        const info = `
User Agent: ${navigator.userAgent}
Platform: ${navigator.platform}
Screen: ${window.screen.width}x${window.screen.height}
Pixel Ratio: ${window.devicePixelRatio}`;
        alert(info);
    };

    window.getLauncherConfig = function() {
        const defaultDock = [
             { label: 'Fahrplan', isInternal: true, type: 'timetable', action: 'main.html' },
             { label: 'Wetter', isInternal: true, type: 'weather', action: 'wetter/index.html' },
             { label: 'Chat', isInternal: true, type: 'chat', action: 'chat.html' },
             { label: 'Apps', isInternal: true, type: 'apps', isDrawerBtn: true }
        ];
        const stored = JSON.parse(localStorage.getItem(LAUNCHER_CONFIG_KEY) || '{}');
        const isTablet = window.innerWidth >= 768;
        return {
            wallpaper: stored.wallpaper || null,
            dockApps: stored.dockApps || defaultDock,
            theme: stored.theme || 'glass',
            // Lawnchair-like Options
            gridCols: stored.gridCols || (isTablet ? 6 : 4),
            gridRows: stored.gridRows || (isTablet ? 4 : 5),
            iconSize: stored.iconSize || (isTablet ? 70 : 60),
            showLabels: stored.showLabels !== false, // Default true
            // Feature Toggles
            featTimetable: stored.featTimetable !== false,
            featWeather: stored.featWeather !== false,
            featChat: stored.featChat !== false,
            featFinder: stored.featFinder !== false,
            featSettings: stored.featSettings !== false,
            featChangelog: stored.featChangelog !== false,
            featSightings: stored.featSightings !== false
        };
    };

    window.getSettings = function() {
        return {
            design: localStorage.getItem(DESIGN_KEY) || 'standard',
            darkMode: localStorage.getItem(DARKMODE_KEY) === 'true',
            pinkMode: localStorage.getItem(PINKMODE_KEY) === 'true',
            devMode: localStorage.getItem(DEV_MODE_KEY) === 'true',
            weatherEnabled: localStorage.getItem(FEAT_WEATHER_KEY) !== 'false',
            locationEnabled: localStorage.getItem(FEAT_LOCATION_KEY) !== 'false',
            launcherEnabled: localStorage.getItem(FEAT_LAUNCHER_KEY) === 'true',
            launcherApps: JSON.parse(localStorage.getItem(LAUNCHER_APPS_KEY) || '[]'),
            accent: localStorage.getItem(ACCENT_KEY) || 'blue',
            username: localStorage.getItem(USERNAME_KEY) || ''
        };
    };

    // OTA Update Logic
    window.checkForOTAUpdates = async function() {
        const btnText = document.querySelector('#update-check-btn span:first-child');
        const originalText = btnText ? btnText.textContent : 'Nach Updates suchen';
        
        // HIER ANPASSEN: Deine GitHub Raw URL
        // Die URL muss auf eine version.json zeigen.
        // Für Plugin-Updates muss 'url' im JSON auf eine ZIP-Datei mit dem 'www'-Ordner zeigen!
        const UPDATE_API_URL = 'https://raw.githubusercontent.com/flowwebdevDE/rx.updates/main/version.json'; 
        const CURRENT_VERSION = '3.2.2'; 
        
        if(btnText) btnText.textContent = 'Prüfe...';

        try {
            // Cache-Busting
            const response = await fetch(UPDATE_API_URL + '?t=' + new Date().getTime());
            
            if (!response.ok) throw new Error('Update-Server nicht erreichbar');
            
            const data = await response.json();
            
            if (data.version > CURRENT_VERSION) {
                const performUpdate = async () => {
                    // Prüfen ob es sich um eine APK handelt (dann immer Browser nutzen)
                    const isApk = data.url && data.url.toLowerCase().endsWith('.apk');
                    
                    // Prüfen ob Plugin verfügbar ist
                    const CapacitorUpdater = (window.Capacitor && window.Capacitor.Plugins) ? window.Capacitor.Plugins.CapacitorUpdater : null;
                    
                    if (CapacitorUpdater && !isApk) {
                        console.log(`Starte Download von: ${data.url}`);
                        if(btnText) btnText.textContent = 'Lade...';
                        try {
                            // Sicherheits-Check: Ist der Link eine Webseite statt einer ZIP?
                            try {
                                const check = await fetch(data.url, { method: 'HEAD' });
                                const type = check.headers.get('content-type');
                                if (type && type.includes('text/html')) {
                                    throw new Error('Die Update-URL liefert eine Webseite (HTML) zurück, keine ZIP-Datei. (Prüfe: Ist das Repo privat? Ist der Link direkt?)');
                                }
                            } catch (e) {
                                console.warn('URL-Check Warnung (CORS?):', e);
                                // Wir machen trotzdem weiter, falls es nur CORS war
                            }

                            // 1. Download
                            const version = await CapacitorUpdater.download({
                                url: data.url,
                                version: data.version
                            });
                            console.log('Download abgeschlossen:', JSON.stringify(version));
                            
                            // DEBUG: Prüfen, ob die Version wirklich da ist
                            const list = await CapacitorUpdater.list();
                            console.log('Verfügbare Versionen:', JSON.stringify(list));
                            
                            if (!version.id || (list.versions && !list.versions.find(v => v.id === version.id))) {
                                throw new Error(`Download ok, aber ID ${version.id} nicht gefunden. (ZIP ungültig? index.html muss im Root liegen!)`);
                            }

                            // 2. Installieren
                            if(btnText) btnText.textContent = 'Installiere...';
                            try {
                                await CapacitorUpdater.set(version);
                            } catch (setErr) {
                                // Häufiger Fehler: ZIP-Struktur falsch -> Plugin löscht das Bundle sofort
                                if (setErr.message && setErr.message.includes('does not exist')) {
                                    throw new Error(`Update-Paket ungültig oder gelöscht. (Tipp: index.html muss direkt in der ZIP liegen, nicht im Unterordner). ID: ${version ? version.id : 'null'}`);
                                }
                                throw setErr;
                            }
                            
                            // Reload erzwingen, um Update anzuwenden
                            window.location.reload();
                            
                        } catch(err) {
                            console.error(err);
                            // Fallback anbieten
                            const errorDetails = (err.message || JSON.stringify(err)).substring(0, 150);
                            const msg = `Der automatische Download ist fehlgeschlagen.\n\nGrund: ${errorDetails}\n\nMöchtest du die Datei manuell herunterladen?`;
                            
                            if (window.showAppPopup) {
                                window.showAppPopup('Update fehlgeschlagen', msg, 'Im Browser öffnen', () => window.open(data.url, '_system'));
                            } else {
                                if(confirm(msg)) window.open(data.url, '_system');
                            }
                            
                            if(btnText) btnText.textContent = originalText;
                        }
                    } else {
                        // Fallback: Browser (z.B. für APK)
                        window.open(data.url, '_system');
                    }
                };

                if (window.showAppPopup) {
                    window.showAppPopup(
                        'Update verfügbar', 
                        `Version ${data.version} ist verfügbar.\n\nNeuerungen:\n${data.changelog}`,
                        'Jetzt aktualisieren',
                        performUpdate
                    );
                } else {
                    if(confirm(`Update verfügbar: ${data.version}\n\nInstallieren?`)) performUpdate();
                }
            } else {
                if (window.showAppPopup) {
                    window.showAppPopup('Auf dem neuesten Stand', `Du nutzt bereits die aktuelle Version ${CURRENT_VERSION}.`);
                }
            }
        } catch (e) {
            console.warn('OTA Check failed:', e);
            if (window.showAppPopup) {
                window.showAppPopup('Fehler', 'Konnte nicht nach Updates suchen. Bitte prüfe deine Internetverbindung.');
            }
        } finally {
            // Text nur zurücksetzen, wenn wir nicht gerade laden
            if(btnText && btnText.textContent === 'Prüfe...') btnText.textContent = originalText;
        }
    };

    // Init immediately
    applySettings();
    document.addEventListener('DOMContentLoaded', () => {
        applySettings();
        
        // WICHTIG: Dem Plugin mitteilen, dass die App erfolgreich gestartet ist.
        // Ohne dies werden Updates u.U. nicht verarbeitet oder zurückgerollt.
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.CapacitorUpdater) {
            window.Capacitor.Plugins.CapacitorUpdater.notifyAppReady()
                .then(() => console.log('CapacitorUpdater: App ready notified'))
                .catch(e => console.warn('CapacitorUpdater: notifyAppReady failed', e));
        }
    });

    // =========================================
    // PAGE TRANSITION LOGIC
    // =========================================
    document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            // Prüfen ob es ein interner Link ist, der eine Animation benötigt
            if (link && link.href && 
                link.href.startsWith(window.location.origin) && 
                !link.target && 
                !link.getAttribute('href').startsWith('#') &&
                !link.getAttribute('href').startsWith('javascript')) {
                
                e.preventDefault();
                const container = document.querySelector('.app') || document.getElementById('main-content');
                
                if (container) {
                    container.classList.add('page-exit');
                    // Warte auf Animation (200ms)
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 200);
                } else {
                    window.location.href = link.href;
                }
            }
        });
    });

    // Fix für Safari Back-Button Cache (bfcache)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            const container = document.querySelector('.app') || document.getElementById('main-content');
            if (container) container.classList.remove('page-exit');
        }
    });

    // Global Haptics (Taktiles Feedback)
    document.addEventListener('click', (e) => {
        // Prüfen, ob ein interaktives Element geklickt wurde
        if (e.target.closest('a, button, .btn, .switch, .theme-btn, .card, .ls-item, .ls-seg-opt, .ls-close-btn, .ls-action, .launcher-item')) {
            if (navigator.vibrate) navigator.vibrate(5); // Sehr kurzes Feedback
        }
    });

    // Statusbar auf OLED Schwarz zwingen (auch bei Overlay)
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.StatusBar) {
        window.Capacitor.Plugins.StatusBar.setBackgroundColor({ color: '#000000' });
        window.Capacitor.Plugins.StatusBar.setOverlaysWebView({ overlay: true });
    }

    // =========================================
    // DEV CONSOLE LOGIC
    // =========================================
    const logBuffer = [];
    const originalConsole = { log: console.log, warn: console.warn, error: console.error };
    
    function captureLog(type, args) {
        if (originalConsole[type]) originalConsole[type].apply(console, args);
        // Puffer füllen
        logBuffer.push({ type, ts: new Date(), args });
        if (logBuffer.length > 200) logBuffer.shift(); // Max 200 Einträge
        // UI Update falls offen
        const content = document.getElementById('rx-dev-console-content');
        if (content) renderLogEntry(content, logBuffer[logBuffer.length - 1]);
    }

    // Console überschreiben
    console.log = (...args) => captureLog('log', args);
    console.warn = (...args) => captureLog('warn', args);
    console.error = (...args) => captureLog('error', args);

    function renderLogEntry(container, entry) {
        const color = entry.type === 'error' ? '#ff5555' : (entry.type === 'warn' ? '#ffcc00' : '#cccccc');
        const msg = entry.args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ');
        const div = document.createElement('div');
        div.style.cssText = `color:${color}; border-bottom:1px solid rgba(255,255,255,0.1); padding:4px 0; white-space:pre-wrap; font-family:monospace; font-size:11px;`;
        div.innerHTML = `<span style="opacity:0.5">[${entry.ts.toLocaleTimeString()}]</span> ${msg}`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    window.showDevConsole = function() {
        if (document.getElementById('rx-dev-console')) return;
        
        const consoleEl = document.createElement('div');
        consoleEl.id = 'rx-dev-console';
        consoleEl.style.cssText = `position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); color: #0f0; z-index: 99999; padding: 10px; display: flex; flex-direction: column; backdrop-filter: blur(5px);`;
        
        const header = document.createElement('div');
        header.style.cssText = 'display:flex; justify-content:space-between; border-bottom:1px solid #333; padding-bottom:10px; margin-bottom:10px; align-items:center;';
        header.innerHTML = '<strong style="font-size:16px;">Dev Console</strong><button onclick="document.getElementById(\'rx-dev-console\').remove()" style="background:#333; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold;">Schließen</button>';
        consoleEl.appendChild(header);
        
        const content = document.createElement('div');
        content.id = 'rx-dev-console-content';
        content.style.cssText = 'flex:1; overflow-y:auto;';
        consoleEl.appendChild(content);
        
        document.body.appendChild(consoleEl);
        
        // Initiale Logs rendern
        logBuffer.forEach(entry => renderLogEntry(content, entry));
    };

    function updateDevTrigger(show) {
        let btn = document.getElementById('rx-dev-trigger');
        if (show && !btn) {
            btn = document.createElement('div');
            btn.id = 'rx-dev-trigger';
            btn.innerHTML = '🐞';
            btn.style.cssText = 'position:fixed; bottom:20px; left:20px; width:45px; height:45px; background:rgba(255,0,0,0.6); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:99998; font-size:22px; backdrop-filter:blur(5px); box-shadow:0 4px 12px rgba(0,0,0,0.3); transition: transform 0.2s;';
            btn.onclick = window.showDevConsole;
            btn.onmousedown = () => btn.style.transform = 'scale(0.9)';
            btn.onmouseup = () => btn.style.transform = 'scale(1)';
            document.body.appendChild(btn);
        } else if (!show && btn) {
            btn.remove();
        }
    }
})();