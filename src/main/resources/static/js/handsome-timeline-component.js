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
            // 如果提供了data，直接使用data
            if (this.options.data) {
                this.render(this.options.data);
                return;
            }

            // 否则从API获取数据
            const url = this.options.type 
                ? `${this.options.apiBase}/findByType/${encodeURIComponent(this.options.type)}`
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
            this.container.innerHTML = `
                <div class="handsome-timeline-list-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path>
                    </svg>
                    暂无数据
                </div>`;
            return;
        }

        const html = items.map((item, index) => `
            <div class="handsome-timeline-list-item" 
                 style="--item-index: ${index}"
                 ${item.spec.pinned ? 'data-pinned="true"' : ''}>
                <div class="handsome-timeline-list-content">
                    <div class="handsome-timeline-list-time">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                        </svg>
                        ${this.formatDate(item.spec.timestamp)}
                    </div>
                    
                    <h3 class="handsome-timeline-list-title">
                        ${item.spec.title || '无标题'}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </h3>
                    
                    ${item.spec.category ? `
                        <div class="handsome-timeline-list-meta">
                            <span class="handsome-timeline-list-category">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <path d="M22 6l-10 7L2 6"/>
                                </svg>
                                ${item.spec.category}
                            </span>
                        </div>
                    ` : ''}
                    
                    ${item.spec.description ? `
                        <div class="handsome-timeline-list-desc">${item.spec.description}</div>
                    ` : ''}
                    
                    ${item.spec.illustrated ? `
                        <div class="handsome-timeline-list-image">
                            <img src="${item.spec.illustrated}" 
                                 alt="${item.spec.title}" 
                                 loading="lazy"
                                 onerror="this.style.display='none'">
                        </div>
                    ` : ''}
                    
                    ${item.spec.tags && item.spec.tags.length ? `
                        <div class="handsome-timeline-list-tags">
                            ${item.spec.tags.map(tag => `
                                <span class="handsome-timeline-list-tag">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                                        <line x1="7" y1="7" x2="7.01" y2="7"/>
                                    </svg>
                                    ${tag}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${item.spec.relatedArticle ? `
                        <a href="${item.spec.relatedArticle}" 
                           target="_blank" 
                           class="handsome-timeline-list-article"
                           rel="noopener">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            查看相关文章
                        </a>
                    ` : ''}
                </div>
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