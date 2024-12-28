'use client'

import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight, Clock, TrendingUp, Users, Verified } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'

import { useGetPublishedCoursesQuery } from '@/features/api/courseApi'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Courses() {
    const [courses, setCourses] = useState([])
    // const courses = [
    //     {
    //         id: 1,
    //         title: "Frontend Development with JavaScript",
    //         author: "Cristian Muñoz",
    //         duration: "7 weeks",
    //         originalPrice: 90.00,
    //         discountedPrice: 14.00,
    //         discount: 80,
    //         image: "/placeholder.svg?height=400&width=600",
    //     },
    //     {
    //         id: 2,
    //         title: "Frontend Development with JavaScript",
    //         author: "Cristian Muñoz",
    //         duration: "7 weeks",
    //         originalPrice: 85.00,
    //         discountedPrice: 14.00,
    //         discount: 80,
    //         image: "/placeholder.svg?height=400&width=600",
    //     },
    //     {
    //         id: 3,
    //         title: "Frontend Development with JavaScript",
    //         author: "Cristian Muñoz",
    //         duration: "7 weeks",
    //         originalPrice: 80.00,
    //         discountedPrice: 14.00,
    //         discount: 80,
    //         image: "/placeholder.svg?height=400&width=600",
    //     },
    //     {
    //         id: 4,
    //         title: "Frontend Development with JavaScript",
    //         author: "Cristian Muñoz",
    //         duration: "7 weeks",
    //         originalPrice: 80.00,
    //         discountedPrice: 14.00,
    //         discount: 80,
    //         image: "/placeholder.svg?height=400&width=600",
    //     },
    // ]

    const router = useNavigate()

    const { data, isLoading, isError, isSuccess } = useGetPublishedCoursesQuery()

    console.log(data)

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Error fetching courses</p>
                <button onClick={() => router('/')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Go to Home</button>
            </div>
        )
    }
    const discountPercentage = 20



    return (
        <TooltipProvider>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.courses && data.courses.map((course, index) => (
                                    // <motion.div
                                    //     key={course.id}
                                    //     initial={{ opacity: 0, y: 20 }}
                                    //     animate={{ opacity: 1, y: 0 }}
                                    //     transition={{ duration: 0.6, delay: index * 0.1 }}
                                    //     whileHover={{ y: -5 }}
                                    //     className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
                                    // >
                                    //     {/* Course Image */}
                                    //     <div className="relative h-48 overflow-hidden">
                                    //         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                    //         <motion.img
                                    //             src={course.image}
                                    //             alt={course.title}
                                    //             className="w-full h-full object-cover"
                                    //             whileHover={{ scale: 1.05 }}
                                    //             transition={{ duration: 0.4 }}
                                    //         />
                                    //         <Badge
                                    //             className="absolute top-4 left-4 z-20 bg-purple-500/80 hover:bg-purple-500"
                                    //         >
                                    //             Development
                                    //         </Badge>
                                    //     </div>

                                    //     {/* Course Content */}
                                    //     <div className="p-6">
                                    //         <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                    //             {course.title}
                                    //         </h3>
                                    //         <p className="text-sm text-gray-400 mb-4">
                                    //             By {course.author}
                                    //         </p>

                                    //         <div className="flex items-center text-sm text-gray-400 mb-4">
                                    //             <Clock className="w-4 h-4 mr-2" />
                                    //             Duration: {course.duration}
                                    //         </div>

                                    //         <div className="flex items-center justify-between mb-4">
                                    //             <div className="flex flex-col">
                                    //                 <span className="text-sm text-gray-400 line-through">
                                    //                     Rs.{course.coursePrice} INR
                                    //                 </span>
                                    //                 <span className="text-lg font-bold text-white">
                                    //                     Rs.{course.coursePrice} INR
                                    //                 </span>
                                    //             </div>
                                    //             <Badge variant="outline" className="text-purple-400 border-purple-400">
                                    //                 {course.discount}% discount
                                    //             </Badge>
                                    //         </div>

                                    //         <Button
                                    //             className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                                    //             variant="default"
                                    //         >
                                    //             Buy now Rs.{course.coursePrice} INR
                                    //         </Button>
                                    //     </div>

                                    //     {/* Hover Effect Overlay */}
                                    //     <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    // </motion.div>

                                    <motion.div
                                        key={course._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="group relative"
                                    >
                                        <Card className="overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-colors duration-300">
                                            {/* Course Image & Category Badge */}
                                            <div className="relative h-48 overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                                                <motion.img
                                                    src="tech.jpg"
                                                    alt={course.courseTitle}
                                                    className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.4 }}
                                                />
                                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                                    <Badge className="bg-purple-500/80 hover:bg-purple-500">
                                                        {course.category}
                                                    </Badge>
                                                    {course.isPublished && (
                                                        <Badge variant="secondary" className="bg-green-500/80 hover:bg-green-500">
                                                            Active
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Course Content */}
                                            <div className="p-6 space-y-4">
                                                {/* Creator Info */}
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8 border-2 border-purple-500">
                                                        <AvatarImage src={course.creator.photoUrl} alt={course.creator.name} />
                                                        <AvatarFallback>{course.creator.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-sm font-medium text-white">{course.creator.name}</span>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Verified className="h-4 w-4 text-blue-500" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Verified Instructor</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                        <span className="text-xs text-gray-400">Course Creator</span>
                                                    </div>
                                                </div>
                                                {/* Title & Level */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                                        {course.courseTitle}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4 text-purple-400" />
                                                        <span className="text-sm text-gray-400">{course.courseLevel} Level</span>
                                                    </div>
                                                </div>

                                                {/* Course Stats */}
                                                <div className="grid grid-cols-2 gap-4 py-2">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center text-sm text-gray-400">
                                                                <BookOpen className="w-4 h-4 mr-2 text-purple-400" />
                                                                {course.lectures.length} lectures
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Total number of lectures</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center text-sm text-gray-400">
                                                                <Users className="w-4 h-4 mr-2 text-purple-400" />
                                                                {course.enrolledStudents.length} students
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Enrolled students</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>

                                                {/* Price & Discount */}
                                                <div className="flex items-center justify-between pt-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ₹{course.coursePrice} INR
                                                        </span>
                                                        <span className="text-xl font-bold text-white">
                                                            ₹{course.coursePrice - (course.coursePrice * discountPercentage) / 100} INR
                                                        </span>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-purple-400 border-purple-400"
                                                    >
                                                        {discountPercentage}% OFF
                                                    </Badge>
                                                </div>

                                                {/* Action Button */}
                                                <Button
                                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-colors group"
                                                    variant="default"
                                                >
                                                    <span>Enroll Now</span>
                                                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                    }
                </div>
            </section>
        </TooltipProvider>
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