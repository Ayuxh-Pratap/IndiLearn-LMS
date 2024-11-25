'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Clock, BarChart, ChevronRight, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function MyLearning() {
    const Courses = [
        {
            id: '1',
            title: 'Advanced JavaScript Concepts',
            instructor: 'John Doe',
            progress: 65,
            totalLessons: 20,
            completedLessons: 13,
            image: '/placeholder.svg?height=100&width=200',
        },
        {
            id: '2',
            title: 'React and Redux Masterclass',
            instructor: 'Jane Smith',
            progress: 30,
            totalLessons: 25,
            completedLessons: 7,
            image: '/placeholder.svg?height=100&width=200',
        },
    ]

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <div className=' bg-black text-gray-100 py-24'>
            <div className="container mx-auto min-h-screen p-8">
                <motion.h1
                    className="text-3xl font-bold mb-8"
                    {...fadeInUp}
                >
                    My Learning
                </motion.h1>

                {Courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                            >
                                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                                    <p className="text-gray-400 mb-4">Instructor: {course.instructor}</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-sm font-medium">{course.progress}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-400 mb-6">
                                        <div className="flex items-center">
                                            <Book className="w-4 h-4 mr-2" />
                                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span>4h 30m left</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                        Continue Learning
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="bg-gray-900 rounded-lg p-8 text-center"
                        {...fadeInUp}
                    >
                        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                        <h2 className="text-2xl font-semibold mb-2">No Courses Enrolled</h2>
                        <p className="text-gray-400 mb-6">You haven't enrolled in any courses yet. Start your learning journey today!</p>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Explore Courses
                        </Button>
                    </motion.div>
                )}

                {Courses.length > 0 && (
                    <motion.div
                        className="mt-12"
                        {...fadeInUp}
                    >
                        <h2 className="text-2xl font-semibold mb-6">Your Learning Stats</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'Courses in Progress', value: Courses.length, icon: Book },
                                { title: 'Total Learning Time', value: '45h 30m', icon: Clock },
                                { title: 'Average Completion', value: '68%', icon: BarChart },
                                { title: 'Certificates Earned', value: '2', icon: AlertCircle },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-900 rounded-lg p-6 flex items-center"
                                    {...fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <stat.icon className="w-12 h-12 text-purple-500 mr-4" />
                                    <div>
                                        <h3 className="text-lg font-medium">{stat.title}</h3>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}