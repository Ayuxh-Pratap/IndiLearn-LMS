'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Book, Lightbulb, Rocket, Code } from 'lucide-react'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 10
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  const icons = [Book, Lightbulb, Rocket, Code]

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center">
      <motion.div
        className="text-4xl font-bold text-purple-500 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        IndiLearn
      </motion.div>

      <div className="relative w-64 h-4 bg-gray-700 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex space-x-4 mb-8">
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Icon className="w-8 h-8 text-purple-400" />
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-gray-400 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Preparing your learning journey...
      </motion.p>
    </div>
  )
}