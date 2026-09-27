import type { Meta, StoryObj } from '@storybook/react-vite'
import { StretchyCircles } from './v1/StretchyCirclesV1'

const meta: Meta<typeof StretchyCircles> = {
  title: 'Circle Latency/StretchyCircles',
  component: StretchyCircles,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**[View on CodeSandbox](https://codesandbox.io/p/devbox/testtest-forked-lxv7f3?workspaceId=ws_6gtG1MdukzcT36BXM3vyLQ)**\n\n' +
          '## Changes from Original Spec\n' +
          '- **Duration**: Rounded from `1183.33ms` to `1200ms`\n\n' +
          '- **Viewport**: Changed from `512×512` to `100×100` and repositioned the animation elements to better utilize the viewport space, reducing unused margins around the animation.\n\n' +
          '## Animation Notes\n' +
          '- **Duration** includes full animation (animation+pause). CSS animation does not have a prop to pause between iterations.\n\n' +
          '## Percentages for Shapes vs Pixels\n' +
          'This component uses **percentage-based sizing** for circle diameter and bridge height instead of pixel values. ' +
          'This approach ensures the animation maintains consistent proportions across different viewport sizes.\n\n' +
          'Since the SVG uses a fixed `viewBox="0 0 100 100"`, the coordinate system is always 100×100 units regardless of the actual rendered size. ' +
          'When you specify `circleDiameter: 40`, it means 40% of the viewBox (40 out of 100 units). This scales proportionally:\n\n' +
          '- At `size: 100px` → 40% = 40px diameter\n' +
          '- At `size: 200px` → 40% = 80px diameter\n\n' +
          'If we used fixed pixel values instead, the shapes would appear too large or too small when changing the container size, ' +
          'breaking the visual balance of the animation.\n\n' +
          '## SVG Filter vs CSS Blur\n' +
          'This decision was primarily driven by **Safari compatibility** and **cross-browser consistency**. ' +
          'It basically came down to CSS-only not working on Safari. ' +
          "The css-only blur is rasterized, it doesn't work on Safari and could have unpredictable rendering on other browsers, as CSS-only approaches aren't as consistent.\n\n" +
          'This component uses **SVG filters** (`feGaussianBlur` + `feColorMatrix`) to achieve the stretchy blob effect rather than CSS `filter: blur()`.\n\n' +
          '### Why Not CSS Blur?\n' +
          '**Safari CSS blur problems:**\n' +
          '- **Rendering artifacts** - Jagged edges, inconsistent blur quality\n' +
          "- **Poor compositing** - Doesn't blend well with other effects\n" +
          '- **Performance inconsistencies** - Sometimes worse than SVG filters\n' +
          '- **Color fringing** - Especially noticeable on high-contrast elements\n' +
          '- **Transform conflicts** - Blur + transform can cause visual glitches\n\n' +
          '### Why SVG Filters Work Better\n' +
          "- Safari's **SVG rendering engine is mature and well-optimized**\n" +
          '- `feGaussianBlur` produces **higher quality, more consistent results** across browsers\n' +
          '- Better integration with other SVG primitives\n' +
          '- Apple prioritized SVG filter performance for their own UI work\n\n' +
          '### Benefits of This Approach\n' +
          '- ✅ **Consistent visual quality** across all browsers\n' +
          "- ✅ **Reliable stretchy blob effect** that CSS-only approaches can't achieve\n" +
          '- ✅ **Professional appearance** without rendering artifacts\n' +
          '- ✅ **Vector-based quality** - predictable rendering at any scale\n\n' +
          '### Performance Considerations\n' +
          'While SVG filters have a performance cost, this implementation is optimized:\n' +
          '- Only **3 simple shapes** (2 circles + 1 rectangle)\n' +
          '- Small **100×100 viewBox**\n' +
          '- **Transform-only animations** (hardware accelerated)\n' +
          '- No complex path morphing or dynamic calculations\n\n' +
          'This results in acceptable performance on modern devices. If better performance is needed in the future, ' +
          'a hybrid approach could use CSS-only everywhere except Safari, or Safari could receive a simplified animation. ' +
          'However, the current vector-based approach prioritizes quality and consistency across all browsers.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'transparent' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      name: 'Size (px)',
      control: { type: 'range', min: 20, max: 100, step: 1 },
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' },
      },
    },
    duration: {
      name: 'Duration (ms)',
      control: { type: 'range', min: 500, max: 5000, step: 50 },
      table: {
        defaultValue: { summary: '1200' },
        type: { summary: 'number' },
      },
    },
    circleDiameter: {
      name: 'Circle Diameter (%)',
      control: { type: 'range', min: 10, max: 100, step: 1 },
      table: {
        defaultValue: { summary: '48' },
        type: { summary: 'number' },
      },
    },
    distance: {
      name: 'Distance',
      control: { type: 'range', min: 10, max: 60, step: 1 },
      table: {
        defaultValue: { summary: '30' },
        type: { summary: 'number' },
      },
    },
    bridgeHeight: {
      name: 'Bridge Height (%)',
      control: { type: 'range', min: 5, max: 50, step: 1 },
      table: {
        defaultValue: { summary: '14' },
        type: { summary: 'number' },
      },
    },
    scaleBridgeHeight: {
      name: 'Scale Bridge Height (%)',
      control: { type: 'range', min: 100, max: 500, step: 5 },
      table: {
        defaultValue: { summary: '300' },
        type: { summary: 'number' },
      },
    },
    blur: {
      name: 'Filter Blur',
      control: { type: 'range', min: 1, max: 20, step: 0.5 },
      table: {
        defaultValue: { summary: '6' },
        type: { summary: 'number' },
      },
    },
    intensity: {
      name: 'Filter Intensity',
      control: { type: 'range', min: 10, max: 40, step: 1 },
      table: {
        defaultValue: { summary: '24' },
        type: { summary: 'number' },
      },
    },
    crispness: {
      name: 'Filter Crispness',
      control: { type: 'range', min: 5, max: 30, step: 1 },
      table: {
        defaultValue: { summary: '15' },
        type: { summary: 'number' },
      },
    },
    color: {
      name: 'Color',
      control: 'color',
      table: {
        defaultValue: { summary: '#ff4081' },
        type: { summary: 'string' },
      },
    },
    gradient: {
      name: 'Gradient',
      control: 'text',
      table: {
        defaultValue: { summary: '-' },
        type: { summary: 'string' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof StretchyCircles>

export const Default: Story = {
  args: {
    size: 50,
    duration: 1200,
    circleDiameter: 48,
    distance: 28,
    bridgeHeight: 14,
    scaleBridgeHeight: 300,
    blur: 6,
    intensity: 24,
    crispness: 15,
    color: '#000000',
  },
}

export const Large: Story = {
  args: {
    size: 50,
    duration: 1200,
    circleDiameter: 48,
    distance: 28,
    bridgeHeight: 14,
    scaleBridgeHeight: 300,
    blur: 6,
    intensity: 24,
    crispness: 15,
    color: '#ff4081',
    gradient: 'linear-gradient(45deg, #ff4081 40%, #5940ff 90%)',
  },
}

export const Small: Story = {
  args: {
    size: 40,
    duration: 1200,
    circleDiameter: 48,
    distance: 28,
    bridgeHeight: 14,
    scaleBridgeHeight: 300,
    blur: 6,
    intensity: 24,
    crispness: 15,
    color: '#ff4081',
  },
}

export const Fast: Story = {
  args: {
    size: 50,
    duration: 1000,
    circleDiameter: 48,
    distance: 28,
    bridgeHeight: 14,
    scaleBridgeHeight: 300,
    blur: 6,
    intensity: 24,
    crispness: 15,
    color: '#00bcd4',
  },
}

export const Slow: Story = {
  args: {
    size: 50,
    duration: 3000,
    circleDiameter: 48,
    distance: 28,
    bridgeHeight: 14,
    scaleBridgeHeight: 300,
    blur: 6,
    intensity: 24,
    crispness: 15,
    color: '#4caf50',
  },
}
