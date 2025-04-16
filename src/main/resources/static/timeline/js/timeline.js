
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.handsome-timeline-input');
    const themeTarget = document.querySelector('.handsome-timeline-container');

    if (!themeSwitch || !themeTarget) {
        console.error('[HandsomeTimeline] Required elements not found for theme switching.');
        return; 
    }
    const storageKey = 'handsome-timeline-theme';
    const applyTheme = (isDark) => {
        if (isDark) {
            themeTarget.setAttribute('data-theme', 'dark');
        } else {
            themeTarget.removeAttribute('data-theme');
        }
    };
    const updateTheme = () => {
        const isDark = themeSwitch.checked;
        applyTheme(isDark);
        try {
            localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        } catch (e) {
            console.warn('[HandsomeTimeline] Could not save theme preference to localStorage:', e);
        }
    };

    // ---- Initialization ----
    let currentTheme = 'light'; // Default
    try {
        const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme === 'dark' || savedTheme === 'light') {
            currentTheme = savedTheme;
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                currentTheme = 'dark';
            }
        }
    } catch (e) {
        console.warn('[HandsomeTimeline] Could not read theme preference from localStorage:', e);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
    }

    themeSwitch.checked = (currentTheme === 'dark');
    applyTheme(currentTheme === 'dark');
    themeSwitch.addEventListener('change', updateTheme);

});
