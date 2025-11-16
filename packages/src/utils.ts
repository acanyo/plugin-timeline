/**
 * 检测当前是否为深色主题
 */
export function detectDarkTheme(): boolean {
  const darkSelectors = [
    'html.dark:not([data-color-scheme=\'light\']):not(.light):not([class*=\'light\'])',
    'html[class~=\'dark\']:not([data-color-scheme=\'light\']):not(.light):not([class*=\'light\'])',
    'html[class*=\'dark\']:not([data-color-scheme=\'light\']):not(.light):not([class*=\'light\'])',
    'html[data-color-scheme=\'dark\']:not([data-color-scheme=\'light\'])',
    'html[data-theme=\'dark\']:not([data-theme=\'light\'])',
    'html[theme=\'dark\']:not([theme=\'light\'])',
    '[data-color-scheme=\'dark\']:not([data-color-scheme=\'light\'])',
    '[data-theme=\'dark\']:not([data-theme=\'light\'])',
    '[theme=\'dark\']:not([theme=\'light\'])'
  ];

  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  const matchesSelector = darkSelectors.some(selector => {
    try {
      return htmlElement.matches(selector) || bodyElement.matches(selector);
    } catch {
      return false;
    }
  });

  return matchesSelector || 
         htmlElement.classList.contains('dark') || 
         htmlElement.getAttribute('data-theme') === 'dark' ||
         htmlElement.getAttribute('data-color-scheme') === 'dark' ||
         htmlElement.getAttribute('theme') === 'dark';
}

/**
 * 创建主题观察器
 */
export function createThemeObserver(callback: () => void): MutationObserver {
  const observer = new MutationObserver(callback);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme', 'data-color-scheme', 'theme']
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class', 'data-theme', 'data-color-scheme', 'theme']
  });

  return observer;
}

/**
 * 获取 API 基础路径
 */
export function getApiBase(): string {
  return (window as any).__TIMELINE_API_BASE__ || '/apis/api.timeline.xhhao.com/v1alpha1/timelines';
}

