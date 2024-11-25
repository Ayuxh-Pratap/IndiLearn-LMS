'use client'

import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Courses() {

    const isLoading = false

    const courses = [
        {
            id: 1,
            title: "Frontend Development with JavaScript",
            author: "Cristian Muñoz",
            duration: "7 weeks",
            originalPrice: 90.00,
            discountedPrice: 14.00,
            discount: 80,
            image: "/placeholder.svg?height=400&width=600",
        },
        {
            id: 2,
            title: "Frontend Development with JavaScript",
            author: "Cristian Muñoz",
            duration: "7 weeks",
            originalPrice: 85.00,
            discountedPrice: 14.00,
            discount: 80,
            image: "/placeholder.svg?height=400&width=600",
        },
        {
            id: 3,
            title: "Frontend Development with JavaScript",
            author: "Cristian Muñoz",
            duration: "7 weeks",
            originalPrice: 80.00,
            discountedPrice: 14.00,
            discount: 80,
            image: "/placeholder.svg?height=400&width=600",
        },
        {
            id: 4,
            title: "Frontend Development with JavaScript",
            author: "Cristian Muñoz",
            duration: "7 weeks",
            originalPrice: 80.00,
            discountedPrice: 14.00,
            discount: 80,
            image: "/placeholder.svg?height=400&width=600",
        },
    ]

    return (
        <section className="w-full bg-black py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className='text-center mb-20'>
                    <motion.h2
                        className="text-3xl font-bold text-white text-center mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Popular courses
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Explore our top-rated courses and start your learning journey today
                    </motion.p>
                </div>
                {
                    isLoading ? (
                        <CourseSkeleton />) :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {courses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
                                >
                                    {/* Course Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <motion.img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                        <Badge
                                            className="absolute top-4 left-4 z-20 bg-purple-500/80 hover:bg-purple-500"
                                        >
                                            Development
                                        </Badge>
                                    </div>

                                    {/* Course Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4">
                                            By {course.author}
                                        </p>

                                        <div className="flex items-center text-sm text-gray-400 mb-4">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Duration: {course.duration}
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-400 line-through">
                                                    Rs.{course.originalPrice.toFixed(2)} INR
                                                </span>
                                                <span className="text-lg font-bold text-white">
                                                    Rs.{course.discountedPrice.toFixed(2)} INR
                                                </span>
                                            </div>
                                            <Badge variant="outline" className="text-purple-400 border-purple-400">
                                                {course.discount}% discount
                                            </Badge>
                                        </div>

                                        <Button
                                            className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                                            variant="default"
                                        >
                                            Buy now Rs.{course.discountedPrice.toFixed(2)} INR
                                        </Button>
                                    </div>

                                    {/* Hover Effect Overlay */}
                                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            ))}
                        </div>
                }
            </div>
        </section>
    )
}

const CourseSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
                .fill(0)
                .map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-800"
                    >
                        {/* Skeleton for Course Image */}
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <Skeleton className="w-full h-full" />
                            <div className="absolute top-4 left-4 z-20">
                                <Skeleton className="h-6 w-24 rounded" />
                            </div>
                        </div>

                        {/* Skeleton for Course Content */}
                        <div className="p-6">
                            {/* Title */}
                            <Skeleton className="h-6 w-3/4 mb-2" />

                            {/* Author */}
                            <Skeleton className="h-4 w-1/2 mb-4" />

                            {/* Duration */}
                            <div className="flex items-center mb-4">
                                <Skeleton className="w-4 h-4 mr-2" />
                                <Skeleton className="h-4 w-24" />
                            </div>

                            {/* Pricing */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <Skeleton className="h-4 w-24 mb-1" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                                <Skeleton className="h-6 w-16 rounded" />
                            </div>

                            {/* Button */}
                            <Skeleton className="h-10 w-full rounded" />
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
        </div>
    )
}