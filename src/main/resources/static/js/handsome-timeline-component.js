class HandsomeTimelineList {
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
        this.container.classList.add('handsome-timeline-list');
        this.setTheme(this.options.theme);
        this.loadData();
    }

    setTheme(theme) {
        this.container.dataset.theme = theme;
        localStorage.setItem('handsome-timeline-theme', theme);
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
        this.container.innerHTML = '<div class="handsome-timeline-list-loading">加载中...</div>';
    }

    showError(message) {
        this.container.innerHTML = `<div class="handsome-timeline-list-error">加载失败: ${message}</div>`;
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
            this.container.innerHTML = '<div class="handsome-timeline-list-empty">暂无数据</div>';
            return;
        }

        const html = items.map(item => `
            <div class="handsome-timeline-list-item">
                <div class="handsome-timeline-list-title">${item.spec.title}</div>
                <div class="handsome-timeline-list-desc">${item.spec.description || ''}</div>
                <div class="handsome-timeline-list-time">${this.formatDate(item.spec.timestamp)}</div>
            </div>
        `).join('');

        this.container.innerHTML = html;
    }
}

// 导出组件
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HandsomeTimelineList;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return HandsomeTimelineList; });
} else {
    window.HandsomeTimelineList = HandsomeTimelineList;
} 