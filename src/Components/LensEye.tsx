import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'

// The animation is a loop of phases. Each phase lasts `ms` milliseconds.
const phases = [
  { name: 'on', ms: 3400 }, // glasses worn on the face
  { name: 'reach', ms: 900 }, // hand comes in
  { name: 'lift', ms: 1100 }, // hand takes the glasses off
  { name: 'off', ms: 2800 }, // glasses held up, vision blurry
  { name: 'place', ms: 1100 }, // hand puts the glasses back on
  { name: 'leave', ms: 800 }, // hand leaves
] as const

type Phase = (typeof phases)[number]['name']

const glassesVariants: Variants = {
  on: { x: 0, y: 0, rotate: 0, scale: 1, transition: { duration: 0.01 } },
  reach: { x: 0, y: 0, rotate: 0, scale: 1, transition: { duration: 0.01 } },
  lift: {
    x: [0, 30],
    y: [0, -115],
    rotate: [0, 6],
    scale: [1, 1.1],
    transition: { duration: 1.1, ease: 'easeInOut' },
  },
  off: {
    x: 30,
    y: [-115, -123, -115],
    rotate: 6,
    scale: 1.1,
    transition: { duration: 2.8, ease: 'easeInOut' },
  },
  place: {
    x: [30, 0],
    y: [-115, 0],
    rotate: [6, 0],
    scale: [1.1, 1],
    transition: { duration: 1.1, ease: 'easeInOut' },
  },
  leave: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: [1, 0.98, 1],
    transition: { duration: 0.4 },
  },
}

// The hand's origin is the pinch point on the glasses bridge
const handVariants: Variants = {
  on: { x: 310, y: -220, opacity: 0, transition: { duration: 0.01 } },
  reach: {
    x: [310, 0],
    y: [-220, 0],
    opacity: [0, 1],
    transition: { duration: 0.9, ease: 'easeOut' },
  },
  lift: {
    x: [0, 30],
    y: [0, -115],
    opacity: 1,
    transition: { duration: 1.1, ease: 'easeInOut' },
  },
  off: {
    x: 30,
    y: [-115, -123, -115],
    opacity: 1,
    transition: { duration: 2.8, ease: 'easeInOut' },
  },
  place: {
    x: [30, 0],
    y: [-115, 0],
    opacity: 1,
    transition: { duration: 1.1, ease: 'easeInOut' },
  },
  leave: {
    x: [0, 310],
    y: [0, -220],
    opacity: [1, 1, 0],
    transition: { duration: 0.8, ease: 'easeIn' },
  },
}

// The portrait uses softly layered SVG forms so its face stays crisp at any size.
const EYE_SHAPE = 'M-28 0 Q0 -18 28 0 Q0 17 -28 0 Z'
const eyeLashes = [
  [-22, -4, -25, -8], [-12, -10, -14, -14], [0, -12, 0, -16],
  [12, -10, 14, -14], [22, -4, 25, -8],
] as const

function PortraitEye({ cx, blink }: { cx: number; blink: boolean }) {
  return (
    <g transform={`translate(${cx} 265)`}>
      <path d="M-31 -3 Q0 -26 31 -3" fill="none" stroke="#29140d" strokeWidth="2" opacity=".4" />
      <path d={EYE_SHAPE} fill="url(#scleraGrad)" />
      <g clipPath="url(#eyeClip)">
        <ellipse cx="0" cy="1" rx="11" ry="12" fill="url(#irisGrad)" />
        <circle cy="1" r="8.3" fill="none" stroke="#d19a5b" strokeWidth="1" opacity=".65" />
        <circle cy="1" r="4.1" fill="#100905" />
        <circle cx="-3" cy="-3" r="1.7" fill="#fff" opacity=".9" />
        <path d="M-28 -1 Q0 -19 28 -1 L28 -9 Q0 -27 -28 -9Z" fill="#20100b" opacity=".22" />
        <motion.path
          d="M-30 -23 Q0 -27 30 -23 L30 0 Q0 8 -30 0Z"
          fill="url(#skinLid)"
          initial={false}
          animate={{ scaleY: blink ? 1 : 0, opacity: blink ? 1 : 0 }}
          transition={{ duration: .1, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center top' }}
        />
      </g>
      <path d="M-28 0 Q0 -18 28 0" fill="none" stroke="#21100a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-27 2 Q0 17 27 2" fill="none" stroke="#6c4531" strokeWidth="1" opacity=".8" />
      <g stroke="#21100a" strokeWidth="1.2" strokeLinecap="round">
        {eyeLashes.map(([x1, y1, x2, y2]) => <path key={`${x1}-${y1}`} d={`M${x1} ${y1}L${x2} ${y2}`} />)}
      </g>
    </g>
  )
}

// One glasses lens, centred at (cx, 0) in the glasses' local space
function GlassLens({ cx }: { cx: number }) {
  return (
    <g transform={`translate(${cx} 0)`}>
      <rect x="-50" y="-39" width="100" height="78" rx="28" fill="url(#glassFill)" />
      {/* Glass reflections */}
      <polygon points="-32,-28 -20,-28 -40,8 -46,8" fill="#fff" opacity="0.3" />
      <polygon points="-14,-30 -8,-30 -28,8 -34,8" fill="#fff" opacity="0.18" />
      {/* Frame */}
      <rect x="-50" y="-39" width="100" height="78" rx="28" fill="none" stroke="#2563eb" strokeWidth="6" />
      <rect x="-47" y="-36" width="94" height="72" rx="25" fill="none" stroke="#bfdbfe" strokeOpacity="0.55" strokeWidth="1" />
    </g>
  )
}

export default function LensEye() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [blink, setBlink] = useState(false)
  const phase: Phase = reduce ? 'on' : phases[index].name

  // Move through the phases
  useEffect(() => {
    if (reduce) return
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % phases.length),
      phases[index].ms,
    )
    return () => clearTimeout(id)
  }, [index, reduce])

  // Blink once as the glasses come off, then reopen naturally.
  useEffect(() => {
    if (reduce || phase !== 'off') return
    const close = setTimeout(() => setBlink(true), 0)
    const reopen = setTimeout(() => setBlink(false), 180)
    return () => {
      clearTimeout(close)
      clearTimeout(reopen)
    }
  }, [phase, reduce])

  const glassesOn = phase === 'on' || phase === 'reach' || phase === 'leave'

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative aspect-[25/28] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-900/25 ring-1 ring-brand-900/10">
        <svg
          viewBox="0 0 500 560"
          preserveAspectRatio="xMidYMid slice"
          className="size-full"
          role="img"
          aria-label="Animated portrait of a person wearing glasses; a hand takes them off and puts them back on"
        >
          <defs>
            <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#edf4ff" />
              <stop offset="1" stopColor="#c7dcf7" />
            </linearGradient>
            <radialGradient id="skinGrad" cx=".43" cy=".3" r=".78">
              <stop offset="0" stopColor="#b77d59" />
              <stop offset=".55" stopColor="#986344" />
              <stop offset="1" stopColor="#66402f" />
            </radialGradient>
            <linearGradient id="noseGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#704731" stopOpacity=".15" />
              <stop offset=".52" stopColor="#c48b64" stopOpacity=".75" />
              <stop offset="1" stopColor="#68422f" stopOpacity=".2" />
            </linearGradient>
            <linearGradient id="skinLid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#754a35" />
              <stop offset="1" stopColor="#a87454" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#100c0a" />
              <stop offset=".5" stopColor="#24170f" />
              <stop offset="1" stopColor="#090706" />
            </linearGradient>
            <linearGradient id="lipGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#713c32" />
              <stop offset="1" stopColor="#542820" />
            </linearGradient>
            <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#613a29" />
              <stop offset="1" stopColor="#8b5b40" />
            </linearGradient>
            <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#326dc4" />
              <stop offset="1" stopColor="#1e4386" />
            </linearGradient>
            <radialGradient id="scleraGrad" cx=".5" cy=".4" r=".7">
              <stop offset="0" stopColor="#fffaf3" />
              <stop offset="1" stopColor="#d9c5b1" />
            </radialGradient>
            <radialGradient id="irisGrad" cx=".38" cy=".35" r=".7">
              <stop offset="0" stopColor="#a8723e" />
              <stop offset=".65" stopColor="#56351e" />
              <stop offset="1" stopColor="#21130c" />
            </radialGradient>
            <clipPath id="eyeClip"><path d={EYE_SHAPE} /></clipPath>
            <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#eef5ff" />
              <stop offset="1" stopColor="#c7dcff" />
            </linearGradient>
            <linearGradient id="glassFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#bfdbfe" stopOpacity="0.3" />
              <stop offset="1" stopColor="#60a5fa" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id="fingerFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8a5a38" />
              <stop offset="0.5" stopColor="#6b4026" />
              <stop offset="1" stopColor="#4a2917" />
            </linearGradient>
            <linearGradient id="sleeveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#dbe4f0" />
            </linearGradient>

            {/* Safe SVG drop shadow (works in every browser) */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="170%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dy="6" result="shadow" />
              <feFlood floodColor="#0f1f4d" floodOpacity="0.4" />
              <feComposite in2="shadow" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Soft background and shoulder silhouette */}
          <rect width="500" height="560" fill="url(#bgGrad)" />
          <circle cx="66" cy="100" r="130" fill="#fff" opacity=".28" />
          <circle cx="450" cy="470" r="150" fill="#8ab5f4" opacity=".18" />
          <path d="M25 560 Q45 480 142 462 Q190 480 205 501 L250 545 295 501 Q310 480 358 462 Q455 480 475 560Z" fill="url(#shirtGrad)" />
          <path d="M207 418 Q207 461 187 484 Q250 516 313 484 Q293 461 293 418Z" fill="url(#neckGrad)" />
          <path d="M198 482L250 540 302 482 284 474 250 512 216 474Z" fill="#f7f6f2" />

          {/* Ears */}
          <path d="M137 260 Q116 251 120 285 Q123 311 143 308 L150 278Z M363 260 Q384 251 380 285 Q377 311 357 308 L350 278Z" fill="url(#skinGrad)" />
          <path d="M135 272 Q126 270 130 290 Q132 298 140 296 M365 272 Q374 270 370 290 Q368 298 360 296" fill="none" stroke="#693f2c" strokeWidth="3" opacity=".65" />

          {/* Face, jaw and natural cheek lighting */}
          <path d="M250 108 C177 108 136 157 135 245 C132 334 169 408 220 434 Q250 448 280 434 C331 408 368 334 365 245 C364 157 323 108 250 108Z" fill="url(#skinGrad)" />
          <ellipse cx="191" cy="324" rx="38" ry="24" fill="#d99570" opacity=".17" filter="url(#softBlur)" />
          <ellipse cx="309" cy="324" rx="38" ry="24" fill="#d99570" opacity=".17" filter="url(#softBlur)" />
          <path d="M150 259 Q157 339 188 383" fill="none" stroke="#44291e" strokeWidth="12" opacity=".12" filter="url(#softBlur)" />
          <path d="M350 259 Q343 339 312 383" fill="none" stroke="#44291e" strokeWidth="12" opacity=".12" filter="url(#softBlur)" />

          {/* Textured short hair and hairline */}
          <path d="M124 257 C111 180 119 122 175 91 Q211 71 252 78 Q307 75 344 105 C382 136 387 196 376 257 Q366 206 343 170 Q322 149 295 146 Q266 142 244 153 Q208 137 177 158 Q145 180 124 257Z" fill="url(#hairGrad)" />
          <path d="M143 208 Q153 147 198 119 M163 180 Q180 126 224 102 M200 151 Q224 111 258 97 M239 146 Q272 107 303 108 M280 147 Q314 120 334 134 M318 163 Q346 145 356 177" fill="none" stroke="#64402c" strokeWidth="2" opacity=".5" />
          <path d="M153 211 Q190 187 235 203 M265 203 Q310 187 347 211" fill="none" stroke="#21120d" strokeWidth="8" strokeLinecap="round" />
          <path d="M157 207 Q192 193 229 205 M271 205 Q308 193 343 207" fill="none" stroke="#79543e" strokeWidth="1.5" opacity=".55" />

          {/* Eyes */}
          <PortraitEye cx={193} blink={blink} />
          <PortraitEye cx={307} blink={blink} />

          {/* Nose with bridge, tip and nostril shadows */}
          <path d="M250 264 Q246 297 233 321 Q229 330 239 334 Q250 338 261 334 Q271 331 266 322 Q254 295 250 264Z" fill="url(#noseGrad)" opacity=".9" />
          <path d="M232 328 Q236 338 250 339 Q264 338 268 328" fill="none" stroke="#563427" strokeWidth="2" opacity=".65" />
          <ellipse cx="239" cy="336" rx="5" ry="2.5" fill="#321c15" opacity=".75" />
          <ellipse cx="261" cy="336" rx="5" ry="2.5" fill="#321c15" opacity=".75" />
          <path d="M250 282 Q249 309 244 320" fill="none" stroke="#f1bd91" strokeWidth="2" opacity=".55" />

          {/* Subtle smile, lips and philtrum */}
          <path d="M243 347 Q250 351 257 347 M250 348L250 367" fill="none" stroke="#704735" strokeWidth="1.5" opacity=".52" />
          <motion.path
            d="M214 384 Q230 373 244 379 Q250 382 256 379 Q271 373 286 384 Q270 397 250 395 Q230 397 214 384Z"
            animate={{ d: glassesOn
              ? 'M210 380 Q229 366 244 374 Q250 377 256 374 Q271 366 290 380 Q273 404 250 403 Q227 404 210 380Z'
              : 'M214 384 Q230 373 244 379 Q250 382 256 379 Q271 373 286 384 Q270 397 250 395 Q230 397 214 384Z' }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            fill="url(#lipGrad)"
          />
          <motion.path
            d="M219 384 Q250 390 281 384"
            animate={{ d: glassesOn ? 'M214 380 Q250 391 286 380' : 'M219 384 Q250 390 281 384' }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            fill="none" stroke="#54251f" strokeWidth="2"
          />
          <motion.path
            d="M225 387 Q250 401 275 387 Q250 394 225 387Z"
            animate={{ d: glassesOn
              ? 'M220 384 Q250 411 280 384 Q250 399 220 384Z'
              : 'M225 387 Q250 401 275 387 Q250 394 225 387Z' }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            fill="#8c4940" opacity=".65"
          />
          <motion.path
            d="M222 401 Q250 408 278 401"
            animate={{ d: glassesOn ? 'M218 406 Q250 415 282 406' : 'M222 401 Q250 408 278 401' }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            fill="none" stroke="#6e4435" strokeWidth="1" opacity=".3"
          />
          <ellipse cx="250" cy="421" rx="31" ry="8" fill="#e2a27c" opacity=".17" filter="url(#softBlur)" />

          {/* Glasses (worn on the face, then lifted off by the hand) */}
          <g transform="translate(250 265)">
            <motion.g variants={glassesVariants} initial={false} animate={phase}>
              <g filter="url(#softShadow)">
                {/* Arms going back to the ears */}
                <path d="M-107 -6 Q-118 -8 -126 6" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M107 -6 Q118 -8 126 6" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" fill="none" />
                {/* Bridge */}
                <path d="M-6 -14 Q0 -24 6 -14" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" fill="none" />
                <GlassLens cx={-57} />
                <GlassLens cx={57} />
                {/* Red hinge accents */}
                <circle cx="-107" cy="-6" r="3.6" fill="#dc2626" />
                <circle cx="107" cy="-6" r="3.6" fill="#dc2626" />
              </g>
            </motion.g>
          </g>

          {/* Doctor's hand: pinches the bridge from the top right */}
          <g transform="translate(250 252)">
            <motion.g variants={handVariants} initial={false} animate={phase}>
              {/* White coat sleeve */}
              <g transform="rotate(-40)">
                <rect x="215" y="-42" width="420" height="84" rx="16" fill="url(#sleeveGrad)" />
                <rect x="215" y="-42" width="26" height="84" rx="8" fill="#1d4ed8" />
              </g>
              {/* Palm */}
              <ellipse cx="172" cy="-126" rx="58" ry="46" fill="url(#fingerFill)" />
              {/* Index finger */}
              <g transform="rotate(-35)">
                <rect x="0" y="-11" width="232" height="22" rx="11" fill="url(#fingerFill)" />
                <rect x="6" y="-8" width="60" height="4" rx="2" fill="#fff" opacity="0.14" />
                <rect x="4" y="-7" width="22" height="11" rx="5.5" fill="#d9a98c" opacity="0.5" />
                <path d="M85 -11 q3 11 0 22" stroke="#2a150a" strokeOpacity="0.28" strokeWidth="1.2" fill="none" />
                <path d="M140 -11 q3 11 0 22" stroke="#2a150a" strokeOpacity="0.28" strokeWidth="1.2" fill="none" />
              </g>
              {/* Thumb */}
              <g transform="rotate(-45)">
                <rect x="0" y="-12" width="190" height="24" rx="12" fill="url(#fingerFill)" />
                <rect x="6" y="-9" width="50" height="4" rx="2" fill="#fff" opacity="0.14" />
                <rect x="4" y="-8" width="24" height="13" rx="6" fill="#d9a98c" opacity="0.5" />
                <path d="M75 -12 q3 12 0 24" stroke="#2a150a" strokeOpacity="0.28" strokeWidth="1.2" fill="none" />
              </g>
            </motion.g>
          </g>
        </svg>
      </div>

      {/* What the person sees: an eye chart that blurs without glasses */}
      <div className="absolute -bottom-8 -left-3 w-48 rounded-2xl border border-brand-100 bg-white/95 p-3 shadow-xl shadow-brand-900/15 backdrop-blur sm:-left-10 sm:w-56">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={glassesOn ? 'on' : 'off'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mb-2 flex items-center justify-between text-xs font-bold"
          >
            <span className="flex items-center gap-1.5 text-brand-900">
              {glassesOn ? (
                <Eye className="size-4 text-brand-600" />
              ) : (
                <EyeOff className="size-4 text-accent-500" />
              )}
              {glassesOn ? t('hero.lensOn') : t('hero.lensOff')}
            </span>
            <span
              className={`flex items-center gap-1.5 ${
                glassesOn ? 'text-brand-600' : 'text-accent-500'
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  glassesOn ? 'bg-brand-500' : 'bg-accent-500'
                }`}
              />
              {glassesOn ? t('hero.sharp') : t('hero.blurred')}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.div
          animate={{ filter: glassesOn ? 'blur(0px)' : 'blur(9px)' }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
          className="space-y-1 rounded-xl bg-brand-50 py-2 text-center font-extrabold leading-none tracking-[0.3em] text-brand-900"
        >
          <div className="text-4xl">E</div>
          <div className="text-3xl">F P</div>
          <div className="text-2xl">T O Z</div>
          <div className="text-xl">L P E D</div>
          <div className="text-base">P E C F D</div>
        </motion.div>
      </div>
    </div>
  )
}
