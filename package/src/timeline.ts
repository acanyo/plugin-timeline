import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface TimelineItem {
  date?: string;
  title: string;
  description?: string;
  image?: string;
  active?: boolean;
}

/**
 * Timeline 时间轴组件
 * 使用 Shadow DOM 确保样式完全隔离，防止样式冲突
 * 
 * @example
 * ```html
 * <lit-timeline 
 *   theme="light" 
 *   orientation="vertical"
 *   .items=${[
 *     { date: '2024-01-01', title: '事件1', description: '描述1', image: 'url.jpg', active: true },
 *     { date: '2024-02-01', title: '事件2', description: '描述2' }
 *   ]}
 * ></lit-timeline>
 * ```
 */
@customElement('lit-timeline')
export class Timeline extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #111827;
    }

    .timeline-header {
      margin-bottom: 24px;
      padding-left: 36px;
    }

    .timeline-header-title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .timeline {
      position: relative;
      padding: 8px 0;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 0;
      bottom: 0;
      width: 1.5px;
      background: #d1d5db;
    }

    .timeline-item {
      position: relative;
      padding-left: 36px;
      padding-bottom: 24px;
      animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    }

    .timeline-item:nth-child(1) { animation-delay: 0.05s; }
    .timeline-item:nth-child(2) { animation-delay: 0.1s; }
    .timeline-item:nth-child(3) { animation-delay: 0.15s; }
    .timeline-item:nth-child(4) { animation-delay: 0.2s; }
    .timeline-item:nth-child(5) { animation-delay: 0.25s; }
    .timeline-item:nth-child(6) { animation-delay: 0.3s; }

    .timeline-item:last-child {
      padding-bottom: 0;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .timeline-marker {
      position: absolute;
      left: 0;
      top: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid #3b82f6;
      z-index: 2;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .timeline-marker.active {
      background: #3b82f6;
      border-color: #3b82f6;
      transform: scale(1.2);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    }

    .timeline-item:hover .timeline-marker {
      transform: scale(1.15);
      border-color: #2563eb;
    }

    .timeline-item:hover .timeline-marker.active {
      transform: scale(1.25);
      box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.2);
    }

    .timeline-content {
      background: #fafafa;
      border-radius: 8px;
      padding: 14px 16px;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .timeline-item:hover .timeline-content {
      background: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateX(4px);
    }

    .timeline-image {
      width: 100%;
      max-height: 180px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 12px;
      display: block;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .timeline-item:hover .timeline-image {
      transform: scale(1.02);
    }

    .timeline-date {
      font-size: 11px;
      color: #3b82f6;
      font-weight: 500;
      margin-bottom: 8px;
      opacity: 0;
      animation: fadeIn 0.6s ease-out forwards;
      animation-delay: 0.3s;
    }

    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }

    .timeline-title {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 8px;
      line-height: 1.4;
      transition: color 0.3s ease;
    }

    .timeline-item:hover .timeline-title {
      color: #3b82f6;
    }

    .timeline-description {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.6;
      transition: color 0.3s ease;
    }

    :host([theme="dark"]) .timeline-header-title {
      color: #f9fafb;
    }

    /* 暗色主题 */
    :host([theme="dark"]) {
      color: #f9fafb;
    }

    :host([theme="dark"]) .timeline::before {
      background: #4b5563;
    }

    :host([theme="dark"]) .timeline-content {
      background: #1a1f2e;
    }

    :host([theme="dark"]) .timeline-item:hover .timeline-content {
      background: #1f2937;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    :host([theme="dark"]) .timeline-title {
      color: #f9fafb;
    }

    :host([theme="dark"]) .timeline-item:hover .timeline-title {
      color: #60a5fa;
    }

    :host([theme="dark"]) .timeline-date {
      color: #60a5fa;
    }

    :host([theme="dark"]) .timeline-description {
      color: #d1d5db;
    }

    :host([theme="dark"]) .timeline-marker {
      background: #1f2937;
      border-color: #60a5fa;
    }

    :host([theme="dark"]) .timeline-marker.active {
      background: #60a5fa;
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.2);
    }

    :host([theme="dark"]) .timeline-item:hover .timeline-marker.active {
      box-shadow: 0 0 0 6px rgba(96, 165, 250, 0.3);
    }

    /* 水平布局 */
    :host([orientation="horizontal"]) .timeline {
      display: flex;
      padding: 0 8px;
    }

    :host([orientation="horizontal"]) .timeline::before {
      left: 0;
      right: 0;
      top: 7px;
      bottom: auto;
      width: auto;
      height: 1.5px;
    }

    :host([orientation="horizontal"]) .timeline-item {
      flex: 1;
      padding-left: 0;
      padding-top: 36px;
      padding-bottom: 0;
      margin-right: 12px;
    }

    :host([orientation="horizontal"]) .timeline-item:last-child {
      margin-right: 0;
    }

    :host([orientation="horizontal"]) .timeline-marker {
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }

    :host([orientation="horizontal"]) .timeline-item:hover .timeline-marker {
      transform: translateX(-50%) scale(1.15);
    }

    :host([orientation="horizontal"]) .timeline-item:hover .timeline-content {
      transform: translateY(-4px);
    }
  `;

  @property({ type: Array })
  items: TimelineItem[] = [];

  @property({ type: String })
  theme: 'light' | 'dark' = 'light';

  @property({ type: String })
  orientation: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: String })
  title: string = '';

  render() {
    return html`
      ${this.title ? html`
        <div class="timeline-header">
          <h3 class="timeline-header-title">${this.title}</h3>
        </div>
      ` : ''}
      <div class="timeline">
        ${this.items.map(
          (item) => html`
            <div class="timeline-item">
              <div class="timeline-marker ${item.active ? 'active' : ''}"></div>
              <div class="timeline-content">
                ${item.image ? html`<img src="${item.image}" alt="${item.title}" class="timeline-image" />` : ''}
                ${item.date ? html`<div class="timeline-date">${item.date}</div>` : ''}
                ${item.title ? html`<div class="timeline-title">${item.title}</div>` : ''}
                ${item.description
                  ? html`<div class="timeline-description">${item.description}</div>`
                  : ''}
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-timeline': Timeline;
  }
}

