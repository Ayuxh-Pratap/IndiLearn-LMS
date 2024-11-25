'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Gradient() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <div className='pt-24 bg-black'>
            <section className="relative w-full overflow-hidden rounded-xl">
                {/* Base gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-900 to-pink-500" />

                {/* Moving gradient overlay */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.5) 0%, transparent 50%, rgba(236, 72, 153, 0.5) 100%)',
                        backgroundSize: '200% 200%',
                    }}
                    animate={{
                        backgroundPosition: [
                            '0% 0%',
                            '100% 100%',
                            '0% 100%',
                            '100% 0%',
                            '0% 0%',
                        ],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                    }}
                />

                {/* Interactive gradient effect */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                        mixBlendMode: 'overlay',
                    }}
                    animate={{
                        x: mousePosition.x - window.innerWidth / 2,
                        y: mousePosition.y - window.innerHeight / 2,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-24 h-full flex items-center justify-center">
                    <motion.div
                        className="max-w-4xl mx-auto text-center space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-white mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Ayush Pratap Singh
                        </motion.h2>

                        <motion.p
                            className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-semibold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <br />
                            <br />
                            When I first started learning to code, it felt like diving into an overwhelming sea of tutorials.
                            That’s when I realized:{" "}
                            <span className="text-yellow-400">learning deserves better.</span>
                            <br />
                            <br />
                            With hands-on guidance from mentors like Tian, I experienced how impactful learning could be with
                            interactive lessons and real-world projects.
                            <br />
                            <br />
                            <span className="text-green-400">🚀 Fast-forward to now:</span> I created an LMS designed for YOU.
                            It’s not just about coding—it’s about making learning intuitive, accessible, and fun.
                            <br />
                            <br />
                            If you’re ready to ditch dull tutorials and build something amazing from day one, my LMS is here
                            to help you flex your skills. <span className="italic text-pink-400">Let’s grow together!</span>
                        </motion.p>

                    </motion.div>
                </div>

                {/* Animated particles */}
                {[...Array(20)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </section>
        </div>
    )
}