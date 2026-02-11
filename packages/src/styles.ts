import { css } from 'lit';

export const timelineStyles = css`
  :host {
    display: block;
    --timeline-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

    --timeline-text-color: #374151;
    --timeline-text-color-dark: #e5e7eb;
    --timeline-line-color: #e5e7eb;
    --timeline-line-color-dark: #4b5563;
    --timeline-bg-color: transparent;
    --timeline-bg-color-hover: #f9fafb;
    --timeline-bg-color-dark: transparent;
    --timeline-bg-color-hover-dark: #1f2937;
    --timeline-marker-bg: #fff;
    --timeline-marker-bg-dark: #374151;
    --timeline-marker-border: #9ca3af;
    --timeline-marker-border-dark: #6b7280;
    --timeline-marker-active-bg: #6366f1;
    --timeline-marker-active-bg-dark: #818cf8;
    --timeline-title-color: #111827;
    --timeline-title-color-dark: #f3f4f6;
    --timeline-title-hover-color: #6366f1;
    --timeline-title-hover-color-dark: #818cf8;
    --timeline-date-color: #6b7280;
    --timeline-date-color-dark: #9ca3af;
    --timeline-link-color: #6366f1;
    --timeline-link-color-dark: #818cf8;
    --timeline-link-hover-color: #4f46e5;
    --timeline-link-hover-color-dark: #a5b4fc;
    --timeline-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    --timeline-shadow-dark: 0 1px 2px rgba(0, 0, 0, 0.2);
    --timeline-marker-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    --timeline-marker-shadow-dark: 0 0 0 3px rgba(129, 140, 248, 0.15);
    --timeline-empty-color: #9ca3af;
    --timeline-empty-color-dark: #6b7280;

    font-family: var(--timeline-font-family);
    color: var(--timeline-text-color);
    font-size: 14px;
    line-height: 1.6;
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
    padding: 4px 0;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--timeline-line-color);
  }

  .timeline-item {
    position: relative;
    padding-left: 28px;
    padding-bottom: 20px;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: 6.5px;
    top: 3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--timeline-marker-bg);
    border: 2px solid var(--timeline-marker-border);
    z-index: 2;
    transition: all 0.2s ease;
    box-sizing: border-box;
    transform: translateX(-50%);
  }

  .timeline-marker.active {
    background: var(--timeline-marker-active-bg);
    border-color: var(--timeline-marker-active-bg);
    box-shadow: var(--timeline-marker-shadow);
  }

  .timeline-item:hover .timeline-marker {
    border-color: var(--timeline-title-hover-color);
  }

  .timeline-item:hover .timeline-marker.active {
    box-shadow: var(--timeline-marker-shadow);
  }

  .timeline-content {
    background: transparent;
    border: none;
    border-radius: 4px;
    padding: 0 14px 12px 14px;
    transition: background 0.2s ease;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    box-shadow: none;
  }

  .timeline-item.has-image .timeline-content {
    padding: 0 12px 12px 12px;
  }

  .timeline-item:hover .timeline-content {
    background: var(--timeline-bg-color-hover);
  }

  .timeline-image-wrapper {
    flex-shrink: 0;
    width: 120px;
    min-width: 120px;
    overflow: hidden;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .timeline-image-wrapper:hover {
    opacity: 0.85;
  }

  .timeline-image {
    width: 100%;
    height: 100%;
    min-height: 80px;
    max-height: 120px;
    object-fit: cover;
    display: block;
    border-radius: 4px;
    background: transparent;
    border: none;
    outline: none;
  }

  .timeline-content-inner {
    flex: 1;
    min-width: 0;
  }

  .timeline-date {
    font-size: 12px;
    color: var(--timeline-date-color);
    font-weight: 400;
    margin-bottom: 6px;
    margin-top: 0;
    letter-spacing: 0.01em;
    line-height: 1.5;
  }

  .timeline-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--timeline-title-color);
    margin: 0 0 6px 0;
    line-height: 1.5;
    transition: color 0.2s ease;
  }

  .timeline-item:hover .timeline-title {
    color: var(--timeline-title-hover-color);
  }

  /* Markdown 内容样式 */
  .markdown-content {
    line-height: 1.6;
  }

  .markdown-content p {
    margin: 0 0 8px 0;
  }

  .markdown-content p:last-child {
    margin-bottom: 0;
  }

  .markdown-content strong {
    font-weight: 600;
    color: var(--timeline-title-color);
  }

  .markdown-content em {
    font-style: italic;
  }

  .markdown-content code {
    background: rgba(99, 102, 241, 0.1);
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  }

  .markdown-content pre {
    background: rgba(99, 102, 241, 0.05);
    padding: 8px 12px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 8px 0;
  }

  .markdown-content pre code {
    background: none;
    padding: 0;
  }

  .markdown-content a {
    color: var(--timeline-link-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .markdown-content a:hover {
    color: var(--timeline-link-hover-color);
    text-decoration: underline;
  }

  .markdown-content ul,
  .markdown-content ol {
    margin: 8px 0;
    padding-left: 20px;
  }

  .markdown-content li {
    margin: 4px 0;
  }

  .markdown-content blockquote {
    border-left: 3px solid var(--timeline-link-color);
    padding-left: 12px;
    margin: 8px 0;
    color: var(--timeline-date-color);
  }

  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3,
  .markdown-content h4,
  .markdown-content h5,
  .markdown-content h6 {
    margin: 12px 0 6px 0;
    font-weight: 600;
    line-height: 1.3;
  }

  .markdown-content h1 {
    font-size: 1.5em;
  }

  .markdown-content h2 {
    font-size: 1.3em;
  }

  .markdown-content h3 {
    font-size: 1.15em;
  }

  .markdown-content h4,
  .markdown-content h5,
  .markdown-content h6 {
    font-size: 1em;
  }

  .markdown-content hr {
    border: none;
    border-top: 1px solid var(--timeline-line-color);
    margin: 12px 0;
  }

  .markdown-content img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 8px 0;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .markdown-content img:hover {
    opacity: 0.85;
  }

  .markdown-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 8px 0;
  }

  .markdown-content th,
  .markdown-content td {
    border: 1px solid var(--timeline-line-color);
    padding: 6px 12px;
    text-align: left;
  }

  .markdown-content th {
    background: rgba(99, 102, 241, 0.05);
    font-weight: 600;
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
    transition: color 0.2s ease;
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
    background: transparent;
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

  /* 暗色主题下的 Markdown 样式 */
  :host .timeline.dark .markdown-content strong {
    color: var(--timeline-title-color-dark);
  }

  :host .timeline.dark .markdown-content code {
    background: rgba(129, 140, 248, 0.15);
  }

  :host .timeline.dark .markdown-content pre {
    background: rgba(129, 140, 248, 0.08);
  }

  :host .timeline.dark .markdown-content a {
    color: var(--timeline-link-color-dark);
  }

  :host .timeline.dark .markdown-content a:hover {
    color: var(--timeline-link-hover-color-dark);
  }

  :host .timeline.dark .markdown-content blockquote {
    border-left-color: var(--timeline-link-color-dark);
    color: var(--timeline-date-color-dark);
  }

  :host .timeline.dark .markdown-content hr {
    border-top-color: var(--timeline-line-color-dark);
  }

  :host .timeline.dark .markdown-content th,
  :host .timeline.dark .markdown-content td {
    border-color: var(--timeline-line-color-dark);
  }

  :host .timeline.dark .markdown-content th {
    background: rgba(129, 140, 248, 0.08);
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
    padding: 0 4px;
  }

  :host([orientation="horizontal"]) .timeline::before {
    left: 0;
    right: 0;
    top: 6px;
    bottom: auto;
    width: auto;
    height: 1px;
  }

  :host([orientation="horizontal"]) .timeline-item {
    flex: 1;
    padding-left: 0;
    padding-top: 16px;
    padding-bottom: 0;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :host([orientation="horizontal"]) .timeline-item:last-child {
    margin-right: 0;
  }

  :host([orientation="horizontal"]) .timeline-marker {
    left: 50%;
    top: 3px;
    transform: translateX(-50%);
  }

  :host([orientation="horizontal"]) .timeline-item:hover .timeline-marker {
    transform: translateX(-50%);
  }

  :host([orientation="horizontal"]) .timeline-content {
    padding: 0;
    margin-top: 0;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  :host([orientation="horizontal"]) .timeline-content-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* 交替布局 */
  :host([orientation="alternating"]) .timeline {
    position: relative;
    padding: 4px 0;
  }

  :host([orientation="alternating"]) .timeline::before {
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--timeline-line-color);
  }

  :host([orientation="alternating"]) .timeline-item {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
    display: flex;
    align-items: flex-start;
  }

  :host([orientation="alternating"]) .timeline-item:last-child {
    padding-bottom: 0;
  }

  :host([orientation="alternating"]) .timeline-marker {
    position: absolute;
    left: 50%;
    top: 3px;
    transform: translateX(-50%);
    z-index: 2;
  }

  :host([orientation="alternating"]) .timeline-item:hover .timeline-marker {
    transform: translateX(-50%);
  }

  :host([orientation="alternating"]) .timeline-item-right {
    flex-direction: row;
  }

  :host([orientation="alternating"]) .timeline-item-right .timeline-content {
    margin-left: calc(50% + 20px);
    margin-right: 0;
    width: calc(50% - 20px);
    max-width: 400px;
    padding: 0 14px 12px 14px;
    text-align: left;
  }

  :host([orientation="alternating"]) .timeline-item-right.has-image .timeline-content {
    padding: 0 12px 12px 12px;
  }

  /* 左侧内容（奇数索引，1, 3, 5...） */
  :host([orientation="alternating"]) .timeline-item-left {
    flex-direction: row-reverse;
  }

  :host([orientation="alternating"]) .timeline-item-left .timeline-content {
    margin-right: calc(50% + 20px);
    margin-left: 0;
    width: calc(50% - 20px);
    max-width: 400px;
    padding: 0 14px 12px 14px;
    text-align: right;
  }

  :host([orientation="alternating"]) .timeline-item-left.has-image .timeline-content {
    padding: 0 12px 12px 12px;
  }

  /* 交替布局下的图片和内容对齐 */
  :host([orientation="alternating"]) .timeline-item-right .timeline-content {
    justify-content: flex-start;
  }

  :host([orientation="alternating"]) .timeline-item-left .timeline-content {
    justify-content: flex-end;
  }

  :host([orientation="alternating"]) .timeline-item-left .timeline-content-inner {
    text-align: right;
  }

  /* 暗色主题下的交替布局 */
  :host([orientation="alternating"]) .timeline.dark .timeline::before {
    background: var(--timeline-line-color-dark);
  }

  /* 图片预览遮罩层 */
  .image-preview-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: zoom-out;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .image-preview-container {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-preview {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    animation: zoomIn 0.3s ease;
  }

  @keyframes zoomIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .image-preview-close {
    position: absolute;
    top: -50px;
    right: 0;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
    backdrop-filter: blur(10px);
  }

  .image-preview-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .image-preview-close svg {
    width: 24px;
    height: 24px;
  }
`;
