class HandsomeTimelineComponent {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            apiBase: '/apis/api.timeline.lik.cc/v1alpha1',
            type: '',
            theme: localStorage.getItem('handsome-timeline-theme') || 'light',
            ...options
        };
        
        this.init();
    }

    init() {
        this.container.classList.add('handsome-timeline-component');
        this.setTheme(this.options.theme);
        this.setupThemeToggle();
        this.loadData();
    }

    setTheme(theme) {
        this.container.dataset.theme = theme;
        localStorage.setItem('handsome-timeline-theme', theme);
    }

    setupThemeToggle() {
        const toggleHtml = `
            <label class="handsome-timeline-switch">
                <span class="handsome-timeline-sun">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g fill="#ffd43b">
                            <circle r="5" cy="12" cx="12"></circle>
                            <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                        </g>
                    </svg>
                </span>
                <span class="handsome-timeline-moon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                    </svg>
                </span>   
                <input type="checkbox" class="handsome-timeline-input" ${this.options.theme === 'dark' ? 'checked' : ''}>
                <span class="handsome-timeline-slider"></span>
            </label>
        `;
        
        const toggleWrapper = document.createElement('div');
        toggleWrapper.innerHTML = toggleHtml;
        this.container.appendChild(toggleWrapper);

        const themeToggle = this.container.querySelector('.handsome-timeline-input');
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    }

    async loadData() {
        try {
            this.showLoading();
            const url = this.options.type 
                ? `${this.options.apiBase}/findByType/${this.options.type}`
                : `${this.options.apiBase}/timelines`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('网络请求失败');
            
            const data = await response.json();
            const items = this.options.type ? data : data.items;
            
            this.render(items);
        } catch (error) {
            this.showError(error.message);
        }
    }

    showLoading() {
        this.container.innerHTML = '<div class="timeline-loading">加载中...</div>';
    }

    showError(message) {
        this.container.innerHTML = `<div class="timeline-error">加载失败: ${message}</div>`;
    }

    formatDate(timestamp) {
        return new Date(timestamp).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    render(items) {
        if (!items || items.length === 0) {
            this.container.innerHTML = '<div class="timeline-loading">暂无数据</div>';
            return;
        }

        const html = items.map(item => `
            <div class="timeline-item">
                <div class="timeline-title">${item.spec.title}</div>
                <div class="timeline-description">${item.spec.description || ''}</div>
                <div class="timeline-timestamp">${this.formatDate(item.spec.timestamp)}</div>
            </div>
        `).join('');

        this.container.innerHTML = html;
        this.setupThemeToggle(); // 重新添加主题切换按钮
    }
}

// 导出组件
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HandsomeTimelineComponent;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return HandsomeTimelineComponent; });
} else {
    window.HandsomeTimelineComponent = HandsomeTimelineComponent;
} 