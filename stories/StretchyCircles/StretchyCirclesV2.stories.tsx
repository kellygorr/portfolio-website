import type { Meta, StoryObj } from '@storybook/react-vite'
import { StretchyCircles } from './v2/StretchyCirclesV2'

const meta: Meta<typeof StretchyCircles> = {
  title: 'Circle Latency/StretchyCircles V2 (CSS)',
  component: StretchyCircles,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '## CSS Gooey Effect - Fully Optimized\n\n' +
          'Based on the RedStapler tutorial: https://redstapler.co/create-gooey-effect-css-filter/\n\n' +
          'CSS-based implementation with full GPU acceleration:\n' +
          '- Two circles with animated bridge element spanning between them\n' +
          '- Bridge scales during animation to enhance gooey effect\n' +
          '- Rotation animation (0° → -90° → 0°)\n' +
          '- Custom cubic-bezier easing for smooth motion\n' +
          '- **100% GPU-accelerated animations** - zero main thread work\n\n' +
          '## Performance Characteristics\n\n' +
          '### Fully GPU-Accelerated Animations\n' +
          'All animations use `transform: translate3d()` or `transform: rotate()` for **zero-repaint** performance:\n\n' +
          '- ✅ **Container rotation**: `rotate()` - Runs on GPU compositor thread\n' +
          '- ✅ **Circle movement**: `translate3d()` - Runs on GPU compositor thread\n' +
          '- ✅ **Bridge scaling**: `translate3d() scale()` - Runs on GPU compositor thread\n' +
          '- ✅ **Synchronized under stress**: No jank or desync even with heavy CPU load\n' +
          '- ✅ **`will-change: transform`** - Pre-creates GPU layers for instant animation start\n\n' +
          '### CSS Filter Property\n' +
          'The `filter: blur() contrast()` property creates the gooey effect:\n\n' +
          '- ✅ **Initial paint only** - Filter values are static, browser paints once and caches\n' +
          '- ✅ **GPU compositing** - Modern browsers handle the filter on GPU\n' +
          "- ✅ **No layout/reflow** - Filter doesn't trigger layout recalculations\n" +
          '- ⚠️ **Blur limit: ~2px** - Higher blur values (>2.5px) cause visual artifacts regardless of resolution scaling\n' +
          '- ✅ **Much better than V1** - SVG `feGaussianBlur` is CPU-bound and causes repaints on every frame\n\n' +
          '### Additional Optimizations\n' +
          '- **`contain: layout style paint`** - Isolates paint operations for better performance\n' +
          '- **Pre-calculated values** - All scale and position values computed at runtime, no CSS `calc()` overhead\n' +
          '- **Pixel-based offsets** - Circle movement uses precise pixel values instead of percentages\n\n' +
          '### Overall\n' +
          'This is the **maximally optimized** CSS-only implementation. All animation work runs on the GPU compositor thread ' +
          'with zero main thread involvement. Performance is limited only by the blur filter, not the animation system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      name: 'Size (px)',
      control: { type: 'range', min: 20, max: 200, step: 5 },
      table: {
        defaultValue: { summary: '50' },
      },
    },
    blur: {
      name: 'Blur (px)',
      control: { type: 'range', min: 0, max: 20, step: 0.5 },
      table: {
        defaultValue: { summary: '2' },
      },
    },
    contrast: {
      name: 'Contrast',
      control: { type: 'range', min: 1, max: 50, step: 1 },
      table: {
        defaultValue: { summary: '13' },
      },
    },
    circleDiameter: {
      name: 'Circle Diameter (%)',
      control: { type: 'range', min: 10, max: 100, step: 1 },
      table: {
        defaultValue: { summary: '41' },
      },
    },
    distance: {
      name: 'Distance (%)',
      control: { type: 'range', min: 0, max: 50, step: 1 },
      table: {
        defaultValue: { summary: '25' },
      },
    },
    bridgeHeight: {
      name: 'Bridge Height (%)',
      control: { type: 'range', min: 5, max: 50, step: 1 },
      table: {
        defaultValue: { summary: '13' },
      },
    },
    scaleBridgeHeight: {
      name: 'Scale Bridge Height (%)',
      control: { type: 'range', min: 100, max: 500, step: 5 },
      table: {
        defaultValue: { summary: '300' },
      },
    },
    duration: {
      name: 'Duration (ms)',
      control: { type: 'range', min: 500, max: 5000, step: 100 },
      table: {
        defaultValue: { summary: '1200' },
      },
    },
    backgroundColor: {
      name: 'Background Color',
      control: 'color',
      table: {
        defaultValue: { summary: '#fff' },
      },
    },
    circleColor: {
      name: 'Circle Color',
      control: 'color',
      table: {
        defaultValue: { summary: '#000' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof StretchyCircles>

export const Default: Story = {
  args: {},
}
