import { css } from 'lit';

export const timelineStyles = css`
  :host {
    display: block;
    --timeline-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --timeline-text-color: #111827;
    --timeline-text-color-dark: #f9fafb;
    --timeline-line-color: #d1d5db;
    --timeline-line-color-dark: #4b5563;
    --timeline-bg-color: #fafafa;
    --timeline-bg-color-hover: #fff;
    --timeline-bg-color-dark: #1a1f2e;
    --timeline-bg-color-hover-dark: #1f2937;
    --timeline-marker-bg: #fff;
    --timeline-marker-bg-dark: #1f2937;
    --timeline-marker-border: #3b82f6;
    --timeline-marker-border-dark: #60a5fa;
    --timeline-marker-active-bg: #3b82f6;
    --timeline-marker-active-bg-dark: #60a5fa;
    --timeline-title-color: #111827;
    --timeline-title-color-dark: #f9fafb;
    --timeline-title-hover-color: #3b82f6;
    --timeline-title-hover-color-dark: #60a5fa;
    --timeline-date-color: #3b82f6;
    --timeline-date-color-dark: #60a5fa;
    --timeline-link-color: #3b82f6;
    --timeline-link-color-dark: #60a5fa;
    --timeline-link-hover-color: #2563eb;
    --timeline-link-hover-color-dark: #93c5fd;
    --timeline-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --timeline-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.4);
    --timeline-marker-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    --timeline-marker-shadow-dark: 0 0 0 4px rgba(96, 165, 250, 0.2);
    --timeline-marker-shadow-hover: 0 0 0 6px rgba(59, 130, 246, 0.2);
    --timeline-marker-shadow-hover-dark: 0 0 0 6px rgba(96, 165, 250, 0.3);
    --timeline-empty-color: #6b7280;
    --timeline-empty-color-dark: #9ca3af;
    
    font-family: var(--timeline-font-family);
    color: var(--timeline-text-color);
  }

  .timeline-header {
    margin-bottom: 24px;
    padding-left: 36px;
  }

  .timeline-header-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--timeline-text-color);
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
    background: var(--timeline-line-color);
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
    background: var(--timeline-marker-bg);
    border: 2px solid var(--timeline-marker-border);
    z-index: 2;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .timeline-marker.active {
    background: var(--timeline-marker-active-bg);
    border-color: var(--timeline-marker-active-bg);
    transform: scale(1.2);
    box-shadow: var(--timeline-marker-shadow);
  }

  .timeline-item:hover .timeline-marker {
    transform: scale(1.15);
    border-color: var(--timeline-title-hover-color);
  }

  .timeline-item:hover .timeline-marker.active {
    transform: scale(1.25);
    box-shadow: var(--timeline-marker-shadow-hover);
  }

  .timeline-content {
    background: var(--timeline-bg-color);
    border-radius: 8px;
    padding: 14px 16px;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .timeline-item:hover .timeline-content {
    background: var(--timeline-bg-color-hover);
    box-shadow: var(--timeline-shadow);
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
    color: var(--timeline-date-color);
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
    color: var(--timeline-title-color);
    margin-bottom: 8px;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .timeline-item:hover .timeline-title {
    color: var(--timeline-title-hover-color);
  }

  .timeline-description {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
    transition: color 0.3s ease;
  }

  .timeline-loading,
  .timeline-empty {
    padding: 24px;
    text-align: center;
    color: var(--timeline-empty-color);
  }

  .timeline-link {
    margin-top: 8px;
  }

  .timeline-link a {
    font-size: 13px;
    color: var(--timeline-link-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .timeline-link a:hover {
    color: var(--timeline-link-hover-color);
    text-decoration: underline;
  }

  /* 暗色主题 - 通过类名控制 */
  :host .timeline.dark {
    color: var(--timeline-text-color-dark);
  }

  :host .timeline.dark .timeline::before {
    background: var(--timeline-line-color-dark);
  }

  :host .timeline.dark .timeline-content {
    background: var(--timeline-bg-color-dark);
  }

  :host .timeline.dark .timeline-item:hover .timeline-content {
    background: var(--timeline-bg-color-hover-dark);
    box-shadow: var(--timeline-shadow-dark);
  }

  :host .timeline.dark .timeline-title {
    color: var(--timeline-title-color-dark);
  }

  :host .timeline.dark .timeline-item:hover .timeline-title {
    color: var(--timeline-title-hover-color-dark);
  }

  :host .timeline.dark .timeline-date {
    color: var(--timeline-date-color-dark);
  }

  :host .timeline.dark .timeline-link a {
    color: var(--timeline-link-color-dark);
  }

  :host .timeline.dark .timeline-link a:hover {
    color: var(--timeline-link-hover-color-dark);
  }

  :host .timeline.dark .timeline-marker {
    background: var(--timeline-marker-bg-dark);
    border-color: var(--timeline-marker-border-dark);
  }

  :host .timeline.dark .timeline-marker.active {
    background: var(--timeline-marker-active-bg-dark);
    border-color: var(--timeline-marker-active-bg-dark);
    box-shadow: var(--timeline-marker-shadow-dark);
  }

  :host .timeline.dark .timeline-item:hover .timeline-marker.active {
    box-shadow: var(--timeline-marker-shadow-hover-dark);
  }

  :host .timeline.dark .timeline-loading,
  :host .timeline.dark .timeline-empty {
    color: var(--timeline-empty-color-dark);
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

