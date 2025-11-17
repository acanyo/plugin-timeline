# 时间轴

## 简介

为 Halo2 提供时间轴组件、横向/竖向布局，可在编辑器中灵活插入，自动适配深色主题

## 🌐 演示与交流

- **演示站点1**：[https://www.xhhao.com/](https://www.xhhao.com/)
- **文档**：[https://docs.lik.cc/](https://docs.lik.cc/)
- **QQ 交流群**：[![QQ群](https://www.xhhao.com/upload/iShot_2025-03-03_16.03.00.png)](https://www.xhhao.com/upload/iShot_2025-03-03_16.03.00.png)

## 开发环境

- Java 21+
- Node.js 18+
- pnpm

## 开发

```bash
# 启用插件
./gradlew haloServer
# 开发前端
cd ui
pnpm install
pnpm dev
```

## 构建

```bash
./gradlew build
```

构建完成后，可以在 `build/libs` 目录找到插件 jar 文件。

## 许可证

[GPL-3.0](./LICENSE) © Handsome 