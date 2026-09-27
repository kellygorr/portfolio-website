import { makeStyles } from '@fluentui/react-components'

/*
  Progress Bar — Blocks Latency progress indicator
  https://motion-specs.azurewebsites.net/dev/ce8a420f-3508-4e54-9306-8537454c38f3

  Baked from Lottie trim-path data: frames 73-253 @ 60fps = 3000ms
  One forward sweep (left→right) + one reverse sweep (right→left) per cycle.
  Uses scaleX + translateX to simulate AE trim-path with independent start/end.
*/

const DURATION = 'var(--progress-bar-duration, 3000ms)'

export const useProgressBarStyles = makeStyles({
  container: {
    position: 'relative',
    width: '100%',
    height: '2px',
    overflow: 'hidden',
  },

  bar: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'currentColor',
    transformOrigin: '0% 50%',
    willChange: 'transform',
    animationDuration: DURATION,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationName: {
      '0%': { transform: 'translateX(0%) scaleX(0.0235)' },
      '2%': { transform: 'translateX(0%) scaleX(0.0334)' },
      '4%': { transform: 'translateX(0%) scaleX(0.0601)' },
      '6%': { transform: 'translateX(0%) scaleX(0.1002)' },
      '8%': { transform: 'translateX(0%) scaleX(0.151)' },
      '10%': { transform: 'translateX(0%) scaleX(0.2105)' },
      '12%': { transform: 'translateX(0%) scaleX(0.277)' },
      '14%': { transform: 'translateX(0%) scaleX(0.349)' },
      '16%': { transform: 'translateX(0%) scaleX(0.4251)' },
      '18%': { transform: 'translateX(0.54%) scaleX(0.4987)' },
      '20%': { transform: 'translateX(4.11%) scaleX(0.5435)' },
      '22%': { transform: 'translateX(13.23%) scaleX(0.5331)' },
      '24%': { transform: 'translateX(29.58%) scaleX(0.449)' },
      '26%': { transform: 'translateX(47.14%) scaleX(0.3491)' },
      '28%': { transform: 'translateX(60.58%) scaleX(0.2842)' },
      '30%': { transform: 'translateX(70.33%) scaleX(0.2457)' },
      '32%': { transform: 'translateX(77.56%) scaleX(0.2143)' },
      '34%': { transform: 'translateX(83.04%) scaleX(0.1696)' },
      '36%': { transform: 'translateX(87.23%) scaleX(0.1277)' },
      '38%': { transform: 'translateX(90.45%) scaleX(0.0955)' },
      '40%': { transform: 'translateX(92.9%) scaleX(0.071)' },
      '42%': { transform: 'translateX(94.71%) scaleX(0.0529)' },
      '44%': { transform: 'translateX(96.01%) scaleX(0.0399)' },
      '46%': { transform: 'translateX(96.87%) scaleX(0.0313)' },
      '48%': { transform: 'translateX(97.35%) scaleX(0.0265)' },
      '50%': { transform: 'translateX(97.5%) scaleX(0.025)' },
      '52%': { transform: 'translateX(95.04%) scaleX(0.0496)' },
      '54%': { transform: 'translateX(90.32%) scaleX(0.0968)' },
      '56%': { transform: 'translateX(84.63%) scaleX(0.1537)' },
      '58%': { transform: 'translateX(78.39%) scaleX(0.2161)' },
      '60%': { transform: 'translateX(71.82%) scaleX(0.2818)' },
      '62%': { transform: 'translateX(65.02%) scaleX(0.3498)' },
      '64%': { transform: 'translateX(58.09%) scaleX(0.4191)' },
      '66%': { transform: 'translateX(51.09%) scaleX(0.4891)' },
      '68%': { transform: 'translateX(44.07%) scaleX(0.5502)' },
      '70%': { transform: 'translateX(37.09%) scaleX(0.5576)' },
      '72%': { transform: 'translateX(30.19%) scaleX(0.4836)' },
      '74%': { transform: 'translateX(23.46%) scaleX(0.3746)' },
      '76%': { transform: 'translateX(16.98%) scaleX(0.2947)' },
      '78%': { transform: 'translateX(10.9%) scaleX(0.247)' },
      '80%': { transform: 'translateX(5.47%) scaleX(0.2192)' },
      '82%': { transform: 'translateX(1.26%) scaleX(0.1979)' },
      '84%': { transform: 'translateX(0%) scaleX(0.161)' },
      '86%': { transform: 'translateX(0%) scaleX(0.1222)' },
      '88%': { transform: 'translateX(0%) scaleX(0.0919)' },
      '90%': { transform: 'translateX(0%) scaleX(0.0685)' },
      '92%': { transform: 'translateX(0%) scaleX(0.0509)' },
      '94%': { transform: 'translateX(0%) scaleX(0.0382)' },
      '96%': { transform: 'translateX(0%) scaleX(0.0298)' },
      '98%': { transform: 'translateX(0%) scaleX(0.025)' },
      '100%': { transform: 'translateX(0%) scaleX(0.0235)' },
    },
  },
})
