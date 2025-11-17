import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timelineStyles } from './styles';
import type { TimelineItem } from './types';
import { detectDarkTheme, createThemeObserver } from './utils';
import { fetchTimelines } from './api';

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
  }

  private detectTheme() {
    this.isDark = detectDarkTheme();
  }

  private observeTheme() {
    this.themeObserver = createThemeObserver(() => {
      this.detectTheme();
    });
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
            return html`
            <div class="timeline-item ${item.image ? 'has-image' : ''} ${sideClass}">
              <div class="timeline-marker ${item.active ? 'active' : ''}"></div>
              <div class="timeline-content">
                ${item.image ? html`
                  <div class="timeline-image-wrapper">
                    <img src="${item.image}" alt="${item.displayName || ''}" class="timeline-image" />
                  </div>
                ` : ''}
                <div class="timeline-content-inner">
                  ${item.date ? html`<div class="timeline-date">${item.date}</div>` : ''}
                  ${item.displayName ? html`<div class="timeline-title">${item.displayName}</div>` : ''}
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
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'timeline-view': Timeline;
  }
}
