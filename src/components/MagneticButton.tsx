'use client'

import React, { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.5,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const springOptions = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springOptions)
  const y = useSpring(0, springOptions)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    
    const centerX = left + width / 2
    const centerY = top + height / 2
    
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY
    
    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
