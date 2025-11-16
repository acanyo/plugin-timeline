# Lit Timeline 时间轴组件

一个基于 **Lit 3.0** 开发的时间轴组件，使用 **Shadow DOM** 确保样式完全隔离，不会与页面其他样式冲突。

## ✨ 特性

- 🎨 **样式隔离**：使用 Shadow DOM，完全防止样式冲突
- 🌓 **主题支持**：支持亮色和暗色主题
- 📐 **布局方向**：支持垂直和水平两种布局
- 🎯 **轻量级**：基于 Lit 3.0，体积小，性能好
- 🔧 **易用性**：简单的 API，易于集成

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
# 或
npm install
```

### 开发模式

```bash
pnpm dev
# 或
npm run dev
```

启动后会自动打开浏览器，访问 `http://localhost:3000/demo-simple.html` 查看简单示例。

或者访问 `http://localhost:3000/demo.html` 查看完整演示，包含：
- 基础使用示例
- 自定义样式示例（绿色主题、紫色主题）
- 内联样式自定义
- 深色模式切换

### 构建

```bash
pnpm build
# 或
npm run build
```

## 📖 使用方法

### 1. 构建项目

首先需要构建项目生成编译后的文件：

```bash
pnpm build
# 或
npm run build
```

构建完成后，会在 `dist` 目录生成以下文件：
- `timeline.es.js` - ES 模块格式（推荐）
- `timeline.umd.js` - UMD 格式

### 2. 在 HTML 中引入编译后的组件

#### 方法一：使用 ES 模块格式（推荐）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>时间轴示例</title>
  <!-- 引入编译后的时间轴组件 -->
  <script type="module" src="./dist/timeline.es.js"></script>
</head>
<body>
  <!-- 使用组件 -->
  <lit-timeline 
    id="my-timeline"
    theme="light" 
    orientation="vertical"
  ></lit-timeline>

  <script type="module">
    // 等待组件注册完成
    await customElements.whenDefined('lit-timeline');
    
    // 设置时间轴数据
    const timeline = document.getElementById('my-timeline');
    timeline.items = [
      {
        date: '2024-01-15',
        title: '项目启动',
        description: '项目正式启动，团队开始规划开发路线图',
        active: true
      },
      {
        date: '2024-02-20',
        title: '核心功能开发',
        description: '完成核心功能的开发和测试'
      }
    ];
  </script>
</body>
</html>
```

#### 方法二：使用 UMD 格式

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>时间轴示例</title>
  <!-- 引入编译后的时间轴组件 -->
  <script src="./dist/timeline.umd.js"></script>
</head>
<body>
  <!-- 使用组件 -->
  <lit-timeline 
    id="my-timeline"
    theme="light" 
    orientation="vertical"
  ></lit-timeline>

  <script>
    // 设置时间轴数据
    const timeline = document.getElementById('my-timeline');
    timeline.items = [
      {
        date: '2024-01-15',
        title: '项目启动',
        description: '项目正式启动，团队开始规划开发路线图',
        active: true
      },
      {
        date: '2024-02-20',
        title: '核心功能开发',
        description: '完成核心功能的开发和测试'
      }
    ];
  </script>
</body>
</html>
```

### 3. 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `Array<TimelineItem>` | `[]` | 时间轴数据数组 |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题样式 |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | 布局方向 |

### 4. TimelineItem 接口

```typescript
interface TimelineItem {
  date?: string;        // 日期（可选）
  title: string;        // 标题（必需）
  description?: string; // 描述（可选）
  active?: boolean;     // 是否激活（可选）
}
```

## 🎨 示例

查看 `example.html` 文件获取完整的使用示例，包括：

- 垂直时间轴
- 暗色主题
- 水平时间轴

## 🛠️ 技术栈

- [Lit 3.0](https://lit.dev/) - Web Components 框架
- [Vite](https://vitejs.dev/) - 构建工具
- TypeScript - 类型支持

## 📝 许可证

MIT

