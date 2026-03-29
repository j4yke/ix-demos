import PriceComparisonGraph from '@/components/PriceComparisonGraph'
import PriceComparisonGraphV2 from '@/components/PriceComparisonGraphV2'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-[80px] py-[80px] bg-[#f5f5f4]">
      
      {/* ─── VERSION 1: Centered Active Stage ─── */}
      <h2 className="text-2xl font-bold -mb-12">Version 1: Centered Loop (Original)</h2>
      <div className="w-[1152px] h-[652px] px-[24px] py-[80px]">
        <div className="w-full h-full p-px bg-[#e7e5e4]">
          <div className="w-full h-full flex gap-px">
            <div className="flex flex-col items-start justify-between p-[24px] bg-[#fafaf9] w-[550.5px] shrink-0">
              <div
                className="text-[14px] text-[#ff2056] uppercase tracking-[0.56px] leading-[16px]"
                style={{ fontFamily: 'var(--font-geist-mono)', fontWeight: 500, fontFeatureSettings: "'zero'" }}
              >
                volume based pricing
              </div>
              <div className="flex flex-col gap-[16px] items-start w-full" style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400, color: '#292524' }}>
                <div className="text-[40px] leading-[1.2] tracking-[-0.8px] w-[316.48px]">
                  Save thousands as you scale.
                </div>
                <div
                  className="text-[16px] w-full"
                  style={{ lineHeight: '22px', fontFeatureSettings: "'cv01','cv02','cv03','cv04','cv06','cv07','cv08','cv09','cv10','zero'" }}
                >
                  <p className="mb-[16px]">Most email platforms charge you for your contacts, not your activity. So the moment your users start growing, which is the whole point, your bill grows with it, whether you send any emails or not.</p>
                  <p>AutoSend charges for what you actually send. Your contact list is yours to grow freely. The bill only moves when you do.</p>
                </div>
              </div>
            </div>
            <div
              className="flex-1 bg-cover bg-center bg-[#f5f5f4] flex items-center justify-center p-[24px]"
              style={{ backgroundImage: "url('/snowy-tops.png')" }}
            >
              <div className="w-full h-full bg-white rounded-[8px] overflow-hidden flex flex-col shadow-sm">
                <div className="h-[32px] shrink-0 bg-[#f5f5f4] flex items-center px-[12px] border-b border-[#e7e5e4]">
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#e7e5e4]" />
                    <div className="w-[12px] h-[12px] rounded-full bg-[#e7e5e4]" />
                    <div className="w-[12px] h-[12px] rounded-full bg-[#e7e5e4]" />
                  </div>
                </div>
                <PriceComparisonGraph />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── VERSION 2: Bounded Panning + Animated Labels ─── */}
      <h2 className="text-2xl font-bold -mb-12 mt-12">Version 2: Viewport Scroll & Target Animate</h2>
      <div className="w-[1152px] h-[652px] px-[24px] py-[80px]">
        <div className="w-full h-full p-px bg-[#e7e5e4]">
          <div className="w-full h-full flex gap-px">
            <div className="flex flex-col items-start justify-between p-[24px] bg-[#fafaf9] w-[550.5px] shrink-0">
              <div
                className="text-[14px] text-[#ff2056] uppercase tracking-[0.56px] leading-[16px]"
                style={{ fontFamily: 'var(--font-geist-mono)', fontWeight: 500, fontFeatureSettings: "'zero'" }}
              >
                volume based pricing
              </div>
              <div className="flex flex-col gap-[16px] items-start w-full" style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400, color: '#292524' }}>
                <div className="text-[40px] leading-[1.2] tracking-[-0.8px] w-[316.48px]">
                  Animate across the graph freely.
                </div>
                <div
                  className="text-[16px] w-full"
                  style={{ lineHeight: '22px', fontFeatureSettings: "'cv01','cv02','cv03','cv04','cv06','cv07','cv08','cv09','cv10','zero'" }}
                >
                  <p className="mb-[16px]">Here, the viewport clamps to the actual grid width. The left edge stays on the left edge, and the right edge stays on the right edge.</p>
                  <p>The price badges animate physically across the columns to track the active dot, rather than centering horizontally while the SVG track moves below.</p>
                </div>
              </div>
            </div>
            <div
              className="flex-1 bg-cover bg-center bg-[#f5f5f4] flex items-center justify-center p-[24px]"
              style={{ backgroundImage: "url('/snowy-tops.png')" }}
            >
              <div className="w-full h-full bg-white rounded-[8px] overflow-hidden flex flex-col shadow-sm">
                <div className="h-[32px] shrink-0 bg-[#f5f5f4] flex items-center px-[12px] border-b border-[#e7e5e4]">
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[#e7e5e4]" />
                    <div className="w-[12px] h-[12px] rounded-full bg-[#e7e5e4]" />
                    <div className="w-[12px] h-[12px] rounded-full bg-[#e7e5e4]" />
                  </div>
                </div>
                <PriceComparisonGraphV2 />
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
