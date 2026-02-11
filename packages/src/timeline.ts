import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { timelineStyles } from './styles';
import type { TimelineItem } from './types';
import { detectDarkTheme, createThemeObserver } from './utils';
import { fetchTimelines } from './api';
import { marked } from 'marked';

// 配置 marked 为同步模式
marked.use({
  async: false,
  breaks: true,
  gfm: true,
});

@customElement('timeline-view')
export class Timeline extends LitElement {
  static styles = timelineStyles;

  @property({ type: String, attribute: 'group-name' })
  groupName: string = '';

  @property({ type: String })
  orientation: 'vertical' | 'horizontal' | 'alternating' = 'vertical';

  @state()
  private items: TimelineItem[] = [];

  @state()
  private isLoading: boolean = false;

  @state()
  private isDark: boolean = false;

  @state()
  private previewImage: string | null = null;

  private themeObserver?: MutationObserver;

  connectedCallback() {
    super.connectedCallback();
    this.detectTheme();
    this.observeTheme();
    if (this.groupName) {
      this.fetchTimelines();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('groupName') && this.groupName) {
      this.fetchTimelines();
    }
    // 在每次更新后添加 Markdown 图片的点击事件
    this.addMarkdownImageListeners();
  }

  private detectTheme() {
    this.isDark = detectDarkTheme();
  }

  private observeTheme() {
    this.themeObserver = createThemeObserver(() => {
      this.detectTheme();
    });
  }

  private parseMarkdown(text: string): string {
    if (!text) return '';
    try {
      const result = marked.parse(text, { async: false });
      return typeof result === 'string' ? result : text;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return text;
    }
  }

  private handleImageClick(imageUrl: string) {
    this.previewImage = imageUrl;
  }

  private addMarkdownImageListeners() {
    // 为 Markdown 内容中的所有图片添加点击事件
    const markdownImages = this.shadowRoot?.querySelectorAll('.markdown-content img');
    markdownImages?.forEach((img) => {
      (img as HTMLImageElement).onclick = (e) => {
        e.preventDefault();
        const target = e.target as HTMLImageElement;
        this.handleImageClick(target.src);
      };
    });
  }

  private handleClosePreview(e?: Event) {
    if (e) {
      e.stopPropagation();
    }
    this.previewImage = null;
  }

  private async fetchTimelines() {
    if (!this.groupName) {
      return;
    }

    this.isLoading = true;
    try {
      this.items = await fetchTimelines(this.groupName);
    } catch (error) {
      console.error('Error fetching timelines:', error);
      this.items = [];
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="timeline-loading">加载中...</div>
      `;
    }

    if (this.items.length === 0) {
      return html`
        <div class="timeline-empty">暂无时间轴数据</div>
      `;
    }

    if (this.orientation) {
      this.setAttribute('orientation', this.orientation);
    }

    return html`
      <div class="timeline ${this.isDark ? 'dark' : ''}">
        ${this.items.map(
          (item, index) => {
            const isAlternating = this.orientation === 'alternating';
            const isEven = index % 2 === 0;
            const sideClass = isAlternating ? (isEven ? 'timeline-item-right' : 'timeline-item-left') : '';
            
            const parsedContent = item.displayName ? this.parseMarkdown(item.displayName) : '';
            
            return html`
            <div class="timeline-item ${item.image ? 'has-image' : ''} ${sideClass}">
              <div class="timeline-marker ${item.active ? 'active' : ''}"></div>
              <div class="timeline-content">
                ${item.image ? html`
                  <div class="timeline-image-wrapper" @click="${() => this.handleImageClick(item.image!)}">
                    <img src="${item.image}" alt="${item.displayName || ''}" class="timeline-image" />
                  </div>
                ` : ''}
                <div class="timeline-content-inner">
                  ${item.date ? html`<div class="timeline-date">${item.date}</div>` : ''}
                  ${parsedContent ? html`<div class="timeline-title markdown-content">${unsafeHTML(parsedContent)}</div>` : ''}
                  ${item.relatedLinks ? html`
                    <div class="timeline-link">
                      <a href="${item.relatedLinks}" target="_blank" rel="noopener noreferrer">查看关联</a>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
          }
        )}
      </div>
      
      ${this.previewImage ? html`
        <div class="image-preview-overlay" @click="${this.handleClosePreview}">
          <div class="image-preview-container" @click="${(e: Event) => e.stopPropagation()}">
            <img src="${this.previewImage}" alt="预览" class="image-preview" />
            <button class="image-preview-close" @click="${this.handleClosePreview}" aria-label="关闭">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      ` : ''}
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'timeline-view': Timeline;
  }
}
