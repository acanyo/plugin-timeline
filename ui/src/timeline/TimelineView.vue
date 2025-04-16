<template>
  <node-view-wrapper class="timeline-wrapper">
    <node-view-content class="timeline-container">
      <div class="timeline-item">
        <div class="timeline-content">
          <h3 class="timeline-title">{{ node.attrs.title || '新建时间轴' }}</h3>
          <p class="timeline-description">{{ node.attrs.description || '请点击编辑时间轴内容' }}</p>
        </div>
      </div>
    </node-view-content>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
interface TimelineViewProps {
  node: any;
  updateAttributes: (attrs: Record<string, any>) => void;
  selected: boolean;
}

const props = defineProps<TimelineViewProps>();
</script>

<style>
.timeline-wrapper {
  margin: 1rem 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.timeline-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.timeline-item {
  transition: all 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--bg-color, #fff);
}

.timeline-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color, #000);
  margin-bottom: 0.5rem;
}

.timeline-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color, #000);
  opacity: 0.85;
}

@media (max-width: 768px) {
  .timeline-title {
    font-size: 1.1rem;
  }
  
  .timeline-description {
    font-size: 0.9rem;
  }
}
</style> 