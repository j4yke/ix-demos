'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'motion/react'

// ─── Data ────────────────────────────────────────────────────────────────────

const STAGES = [
  { label: '2K contacts or 10K emails/mo',   autosend: 5,    others: 49,   save: 575,  othersYPct: 0.40, autosendYPct: 0.88 },
  { label: '10K contacts or 50K emails/mo',  autosend: 12,   others: 99,   save: 1044, othersYPct: 0.36, autosendYPct: 0.82 },
  { label: '50K contacts or 200K emails/mo', autosend: 50,   others: 399,  save: 2388, othersYPct: 0.31, autosendYPct: 0.76 },
  { label: '100K contacts or 400K emails/mo',autosend: 380,  others: 599,  save: 2628, othersYPct: 0.25, autosendYPct: 0.68 },
  { label: '200K contacts or 400K emails/mo',autosend: 700,  others: 1199, save: 5988, othersYPct: 0.18, autosendYPct: 0.58 },
  { label: '500K contacts or 1.5M emails/mo',autosend: 1290, others: 1999, save: 8508, othersYPct: 0.12, autosendYPct: 0.48 },
]

const STAGE_SPACING = 160
const SVG_PAD_X = 110
const SVG_WIDTH = SVG_PAD_X * 2 + (STAGES.length - 1) * STAGE_SPACING

// ─── Geometry helpers ─────────────────────────────────────────────────────────

function stageX(i: number) {
  return SVG_PAD_X + i * STAGE_SPACING
}

function buildPath(ypcts: number[], h: number): string {
  if (h === 0) return ''
  // ypcts array expects 2 extra items: index 0 maps to stage -1, index 1 maps to stage 0...
  const pts = ypcts.map((pct, idx) => ({ x: stageX(idx - 1), y: pct * h }))
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x},${pts[i].y}`
  }
  return d
}

// ─── Spring config ────────────────────────────────────────────────────────────

const PAN_SPRING   = { stiffness: 220, damping: 30, mass: 1 }
const LABEL_SPRING = { stiffness: 200, damping: 28, mass: 1 }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n >= 1000 ? `~$${(n / 1000).toFixed(1).replace('.0', '')}K` : `~$${n}`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PriceComparisonGraphV2() {
  const [stage, setStage]   = useState(0)
  const containerRef        = useRef<HTMLDivElement>(null)
  const [size, setSize]     = useState({ width: 503, height: 358 })

  // Measure the content area so SVG matches it exactly
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      if (width && height) setSize({ width, height })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const h = size.height
  
  // Extend arrays outward flatly for visual padding at the extreme edges
  const extendY = (arr: number[]) => [arr[0], ...arr, arr[arr.length - 1]]
  
  const graph = {
    othersPath:   buildPath(extendY(STAGES.map(s => s.othersYPct)),   h),
    autosendPath: buildPath(extendY(STAGES.map(s => s.autosendYPct)), h),
    othersYs:     STAGES.map(s => s.othersYPct * h),
    autosendYs:   STAGES.map(s => s.autosendYPct * h),
  }

  const centerX = size.width / 2

  // Determine bounded panning
  const physicalX = stageX(stage)
  let targetPanX = centerX - physicalX
  const maxPanX = 0
  const minPanX = size.width - SVG_WIDTH
  
  // Clamp so we never reveal blank padding outside SVG bounding box
  targetPanX = Math.max(minPanX, Math.min(maxPanX, targetPanX))

  // The local animated X position for labels relative to the active column
  const labelXAnim = useSpring(physicalX, LABEL_SPRING)

  const panX = useSpring(targetPanX, PAN_SPRING)
  const othersY   = useSpring(graph.othersYs[0],   LABEL_SPRING)
  const autosendY = useSpring(graph.autosendYs[0], LABEL_SPRING)

  useEffect(() => {
    panX.set(targetPanX)
    labelXAnim.set(physicalX)
    othersY.set(graph.othersYs[stage])
    autosendY.set(graph.autosendYs[stage])
  }, [stage, targetPanX, physicalX, graph.othersYs, graph.autosendYs, panX, labelXAnim, othersY, autosendY])

  function goTo(next: number) {
    if (next < 0 || next >= STAGES.length) return // disable looping for V2
    setStage(next)
  }

  const s = STAGES[stage]
  
  return (
    <div className="price-graph-root">

      {/* ── Graph content area ──────────────────────────────────────────── */}
      <div ref={containerRef} className="price-graph-content">

        {/* Panning layer holds BOTH the svg and the labels now */}
        <motion.div
          className="price-graph-svg-track"
          style={{ x: panX, width: SVG_WIDTH, height: size.height }}
        >
          <svg
            width={SVG_WIDTH}
            height={size.height}
            viewBox={`0 0 ${SVG_WIDTH} ${size.height}`}
            overflow="visible"
          >
            {/* Vertical grid lines */}
            {STAGES.map((_, i) => (
              <line
                key={`grid-${i}`}
                x1={stageX(i)} y1={0}
                x2={stageX(i)} y2={Math.max(0, size.height)}
                stroke={i === stage ? '#a8a29e' : '#d6d3d1'}
                strokeWidth={1}
              />
            ))}

            {/* Other ESPs curve — rose */}
            <path
              d={graph.othersPath}
              fill="none"
              stroke="#fda4af"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* AutoSend curve — indigo */}
            <path
              d={graph.autosendPath}
              fill="none"
              stroke="#a5b4fc"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data point dots */}
            {STAGES.map((_, i) => (
              <g key={i}>
                <circle
                  cx={stageX(i)} cy={graph.othersYs[i]}
                  r={3}
                  fill={i === stage ? '#f43f5e' : '#fda4af'}
                  stroke="white" strokeWidth={1.5}
                />
                <circle
                  cx={stageX(i)} cy={graph.autosendYs[i]}
                  r={3}
                  fill={i === stage ? '#6366f1' : '#a5b4fc'}
                  stroke="white" strokeWidth={1.5}
                />
              </g>
            ))}
          </svg>

          {/* ── Price labels now physically animate their X on the track ─── */}

          {/* Other ESPs label */}
          <motion.div
            className="absolute z-10 flex flex-col items-center gap-1 p-1 bg-white rounded-[7px] w-[80px] pointer-events-none whitespace-nowrap border border-[#ffa1ad]"
            style={{ left: labelXAnim, top: othersY, x: '-50%', y: '-50%' }}
          >
            <div className="w-full flex items-center justify-center p-1 rounded bg-[#ffe4e6] text-[#c70036] font-medium text-[10px]" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
              {fmt(s.others)}/mo
            </div>
            <div className="text-[10px] text-[#292524] font-medium" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>Other ESPs</div>
          </motion.div>

          {/* AutoSend label */}
          <motion.div
            className="absolute z-10 flex flex-col items-center gap-1 p-1 bg-white rounded-[7px] w-[80px] pointer-events-none whitespace-nowrap border border-[#615fff]"
            style={{ left: labelXAnim, top: autosendY, x: '-50%', y: '-50%' }}
          >
            <div className="w-full flex items-center justify-center p-1 rounded bg-[#e0e7ff] text-[#432dd7] font-medium text-[10px]" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
              {fmt(s.autosend)}/mo
            </div>
            <div className="text-[10px] text-[#292524] font-medium" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>AutoSend</div>
          </motion.div>

        </motion.div>

        {/* Edge fade overlays */}
        <div className="price-graph-fade price-graph-fade--left"  />
        <div className="price-graph-fade price-graph-fade--right" />

      </div>

      {/* ── Footer: nav + stage info ─────────────────────────────────────── */}
      <div className="h-[56px] shrink-0 flex items-center bg-[#e7e5e4] w-full border-t border-[#e7e5e4]">

        <button
          className="w-[84px] h-full flex items-center justify-center bg-[#fafaf9] hover:bg-[#f5f5f4] transition-colors shrink-0 border-r border-[#e7e5e4] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goTo(stage - 1)}
          disabled={stage === 0}
          aria-label="Previous stage"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M5 1L1 5l4 4" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex-1 h-full bg-white relative overflow-hidden flex items-center justify-center">
          <motion.div
            key={`info-${stage}`}
            className="absolute flex items-center gap-3"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            <span className="text-[12px] text-[#292524]" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
              {s.label}
            </span>
            <span className="bg-[#d8f999] text-[#292524] px-[6px] py-[1px] rounded text-[10px] font-medium" style={{ fontFamily: 'var(--font-geist-mono), monospace' }}>
              SAVE ~{s.save.toLocaleString()}/yr
            </span>
          </motion.div>
        </div>

        <button
          className="w-[84px] h-full flex items-center justify-center bg-[#fafaf9] hover:bg-[#f5f5f4] transition-colors shrink-0 border-l border-[#e7e5e4] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goTo(stage + 1)}
          disabled={stage === STAGES.length - 1}
          aria-label="Next stage"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1l4 4-4 4" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  )
}
