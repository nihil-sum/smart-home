---
name: 智慧房屋租赁系统
description: 面向租客、房东和管理员的一站式房屋租赁管理平台
colors:
  primary: "#0d7a7a"
  primary-hover: "#0b6b6b"
  primary-light: "#e8f5f5"
  accent: "#d4943a"
  accent-light: "#fef5e7"
  neutral-bg: "#ffffff"
  neutral-surface: "#f7f9f9"
  neutral-ink: "#1a1d1d"
  neutral-muted: "#6b7272"
  neutral-border: "#e2e6e6"
  success: "#4caf7d"
  warning: "#e8a838"
  danger: "#d9605a"
  info: "#5a8f9f"
typography:
  display:
    fontFamily: "'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-default:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  card-default:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.neutral-border}"
  input-default:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    border: "1px solid {colors.neutral-border}"
  tag:
    rounded: "{rounded.sm}"
---

# Design System: 智慧房屋租赁系统

## 1. Overview

**Creative North Star: "The Trusted Steward"**

智慧房屋租赁系统的设计语言围绕"专业管家"这一核心隐喻展开。它不是冷冰冰的管理工具，而是一位值得信赖的房产管家——专业、高效、透明，让租客安心找房，让房东轻松管房，让管理员有效控盘。

设计上追求 **专业清晰、可信可靠、高效有序** 的气质。信息层级分明，操作路径流畅，状态反馈即时。每个界面都让用户清楚"我在哪里、能做什么、发生了什么"。

**Key Characteristics:**
- 蓝绿色主调传递专业与信任，暖金色点缀增加温度和人文感
- 克制的信息密度，呼吸感留白，降低认知负担
- 卡片式内容组织，轻量阴影营造层次
- 一致的状态标识体系（颜色、图标、文字），让状态一目了然
- 角色导向的导航和布局，每个角色只看到与自己相关的功能

## 2. Colors

蓝绿（Teal）与暖金（Amber）的搭配。蓝绿传递专业、稳定与可信赖，暖金注入温度与人文关怀。背景采用纯白，让品牌色在关键交互点上发挥作用。

### Primary
- **Professional Teal** (`#0d7a7a` / `oklch(0.48 0.11 195)`): 主色。用于主要按钮、导航激活态、关键链接和品牌标识。
- **Teal Hover** (`#0b6b6b` / `oklch(0.42 0.11 195)`): Primary 悬停态，稍深以提供交互反馈。
- **Teal Light** (`#e8f5f5` / `oklch(0.94 0.02 195)`): 浅色背景态，用于表格行悬停、选中状态、轻量高亮。

### Accent
- **Warm Amber** (`#d4943a` / `oklch(0.62 0.13 70)`): 强调色。用于星级评分、特别提醒、重要标签和付费相关元素。
- **Amber Light** (`#fef5e7` / `oklch(0.95 0.03 70)`): 强调色浅色背景。

### Neutral
- **Pure White** (`#ffffff` / `oklch(1 0 0)`): 背景色。纯白，无色彩偏移。
- **Off White** (`#f7f9f9` / `oklch(0.975 0.005 195)`): 表面色。用于卡片、面板、侧栏的次一级背景。
- **Border Light** (`#e2e6e6` / `oklch(0.92 0.005 195)`): 分割线和边框。
- **Muted Text** (`#6b7272` / `oklch(0.52 0.01 195)`): 次要文字、占位符、辅助信息。
- **Body Text** (`#1a1d1d` / `oklch(0.15 0.02 195)`): 正文颜色。近黑带极轻微蓝绿调。

### Semantic
- **Success Green** (`#4caf7d` / `oklch(0.62 0.14 155)`): 成功状态、已通过、已确认。
- **Warning Amber** (`#e8a838` / `oklch(0.68 0.14 75)`): 警告、待审核、待确认。
- **Danger Red** (`#d9605a` / `oklch(0.56 0.16 30)`): 危险、拒绝、删除、错误。
- **Info Blue** (`#5a8f9f` / `oklch(0.58 0.06 210)`): 信息提示、系统消息。

### Named Rules
**The Restrained Accent Rule.** Warm Amber 的使用面积不超过界面的 10%。它的稀缺性即是力量——仅在评分、付费、特别提醒等需要情感温度的场景出现。

## 3. Typography

**Display Font:** PingFang SC, Microsoft YaHei, -apple-system, sans-serif
**Body Font:** PingFang SC, Microsoft YaHei, -apple-system, sans-serif

系统采用单一无衬线字体家族。利用字重和字号建立清晰的层级，而非依赖多种字体。

### Hierarchy
- **Display** (Semibold 600, `clamp(1.5rem, 4vw, 2rem)`, 1.3): 页面大标题、欢迎语。极少使用，每个页面不超过一个。
- **Title** (Semibold 600, 1.125rem, 1.4): 区块标题、卡片标题、弹窗标题。
- **Body** (Regular 400, 0.875rem, 1.6): 正文、表格内容、详情描述。行宽控制在 65–75ch 以内。
- **Label** (Regular 400, 0.8125rem, 1.5): 表单标签、辅助说明、时间戳、状态标签。

### Named Rules
**The One Weight Rule.** 不使用 300 (Light) 和 700+ (Bold) 字重。层级清晰只需 Regular 和 Semibold 两档，保持界面简洁专业。

## 4. Elevation

系统采用轻量阴影方案，与 Element Plus 默认风格一致。阴影只在需要区分层级的地方使用，不追求拟物化深度。

### Shadow Vocabulary
- **Card Shadow** (`0 1px 4px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)`): 卡片、面板、表单区域的默认阴影。极轻，几乎不可察觉。
- **Hover Lift** (`0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)`): 可交互卡片悬停态、下拉菜单。
- **Modal Shadow** (`0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)`): 弹窗、对话框。

### Named Rules
**The Flat-By-Default Rule.** 界面在静态状态下保持扁平。阴影仅作为交互反馈（悬停、聚焦）或层级区分（弹窗）出现。

## 5. Components

### Buttons
- **Shape:** 圆角矩形，8px 圆角。
- **Primary:** 主色填充 (`#0d7a7a`) + 白色文字 + 10px/20px 内边距。悬停态加深至 `#0b6b6b`，200ms 过渡。
- **Default:** 白色填充 + 边框 (`#e2e6e6`) + 正文色文字。悬停态边框加深。
- **Text:** 无边框无背景，仅文字。用于次要或导航性操作。
- **State:** 加载态显示 loading spinner；禁用态降低不透明度至 0.5。

### Cards / Containers
- **Corner Style:** 8px 圆角 (`rounded.md`)。
- **Background:** 纯白 (`#ffffff`)。
- **Border:** 1px solid `#e2e6e6` —— 极浅边框，定义卡片边界但不制造视觉噪音。
- **Shadow:** 默认 `card shadow`，可交互卡片悬停升级为 `hover lift`。
- **Internal Padding:** 16–20px。

### Inputs / Fields
- **Style:** 白底 + 1px 边框 (`#e2e6e6`) + 4px 圆角。
- **Focus:** 边框切换为主色 (`#0d7a7a`)，配合 2px 主色半透明内发光 (`box-shadow: 0 0 0 2px rgba(13,122,122,0.2)`)。
- **Error:** 边框切换为危险色 (`#d9605a`)，提示文字辅助显示。
- **Placeholder:** 次要文字色 (`#6b7272`)。

### Tags / Status Badges
- **Shape:** 4px 圆角，紧凑内边距 (4px 8px)。
- **Color Mapping:** 待审核 → Warning Amber, 已通过 → Success Green, 已拒绝 → Danger Red, 已下架 → Info Blue, 已签署 → Success Green。
- **Font:** Label 规格 (0.8125rem)，Semibold。

### Navigation
- **Style:** 顶部水平导航栏，白色背景 + 底部边框。
- **Active State:** 主色底部指示条 (2px solid `#0d7a7a`) + 主色文字。
- **Hover State:** 背景轻微变灰。
- **Side Menu:** 在管理端（房东/管理员）用于二级导航，同样白色背景 + 悬停高亮。

### Tables
- **Style:** 极简表格——无纵向边框，仅有底部浅色分割线 (`#e2e6e6`)。
- **Header:** 浅灰背景 (`#f7f9f9`)，Semibold 文字。
- **Hover:** 行悬停时浅蓝绿背景 (`#e8f5f5`)。
- **Pagination:** Element Plus 默认风格，居中对齐。

## 6. Do's and Don'ts

### Do:
- **Do** 使用蓝绿主色 (`#0d7a7a`) 作为主要交互颜色，保持品牌一致性。
- **Do** 在表单提交、数据加载等操作中提供明确的加载态和结果反馈（成功/失败提示）。
- **Do** 使用纯白背景 (`#ffffff`) 承载内容，让品牌色在关键交互点上发挥作用。
- **Do** 为每个关键状态（房源审核、预约、合同签署）使用颜色 + 文字 + 图标的组合标识。
- **Do** 保持页面间距的一致性（使用 spacing 体系中的 md/lg 值）。
- **Do** 使用 `text-wrap: balance` 在标题上获得均匀的行长。

### Don't:
- **Don't** 使用除 Warm Amber (`#d4943a`) 之外的第二种强调色。一种强调色足够。
- **Don't** 在彩色背景上使用灰色文字。要么加深背景色同色相，要么使用半透明白色文字。
- **Don't** 卡片嵌套卡片。一个卡片内使用分割线或背景色区分区域，而非再套一层卡片。
- **Don't** 使用玻璃拟态、渐变色文字、或装饰性的大面积插画。
- **Don't** 使用 999 或 9999 这样的任意 z-index 值。使用语义化的 z-index 体系。
- **Don't** 使用 bounce/elastic 缓动函数。所有过渡使用 ease-out 曲线。
- **Don't** 在浅色背景上使用过浅的灰色文字。正文必须 ≥4.5:1 对比度。
