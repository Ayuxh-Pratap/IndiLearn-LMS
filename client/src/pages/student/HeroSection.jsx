'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Brain, Play, Search, StarIcon, Stars, Sparkle, BookAIcon, Book } from 'lucide-react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <div className="min-h-screen py-16 bg-black text-white relative overflow-hidden">

      {/* Circular background pattern */}
      <div className="absolute inset-0 flex aspect-square items-center justify-center opacity-20">
        {[1, 2, 3, 4].map((circle, index) => (
          <motion.div
            key={circle}
            className="absolute border border-white/30 rounded-full"
            style={{
              width: `${index * 25 + 30}%`,
              height: `${index * 25 + 30}%`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Where the joy of learn meets the power of community
          </motion.h1>
          <motion.p 
            className="text-lg max-w-3xl mx-auto md:text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dive deep in immersive, interactive small groups. Expand horizons, engage in discussions, and elevate your learning journey with us.
          </motion.p>
          
          {/* Search tab */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search for topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white border-gray-700 rounded-full pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded-full">
              Start your travel
            </Button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Play className="w-4 h-4" />
              Watch video
            </button>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mt-32"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              title: "Explore topics",
              description: "Explore our selection of courses in development",
              icon: "🎯"
            },
            {
              title: "Meet new friends",
              description: "Join the network with million of students and learn",
              icon: "👥"
            },
            {
              title: "Learn code",
              description: "Learn all about code and become in a developer",
              icon: "💻"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
            >
              <div className="text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}