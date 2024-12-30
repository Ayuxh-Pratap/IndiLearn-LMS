"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Clock, Users, BookOpen, TrendingUp, Play, Star, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

const CourseDetail = () => {
    // Mock data (replace with actual data fetching in production)
    const course = {
        _id: "67430433d1de22ab54715280",
        courseTitle: "Advanced DevOps: From Zero to Hero",
        category: "DevOps",
        courseLevel: "Intermediate",
        coursePrice: 90,
        description: "Master the art of DevOps with hands-on projects and real-world scenarios. This course covers everything from CI/CD pipelines to advanced containerization techniques.",
        lectures: [
            { _id: "67601faf4cd8cac2c1737581", title: "Introduction to Modern DevOps", duration: "00:15:30", videoUrl: "#" },
            { _id: "6763a0c7e857a6cd0e1a7002", title: "Setting Up CI/CD Pipelines", duration: "00:20:45", videoUrl: "#" },
            { _id: "6763a0dfe857a6cd0e1a7008", title: "Advanced Docker Techniques", duration: "00:25:15", videoUrl: "#" },
            { _id: "6763a0dfe857a6cd0e1a7009", title: "Kubernetes Orchestration", duration: "00:30:00", videoUrl: "#" },
            { _id: "6763a0dfe857a6cd0e1a7010", title: "Monitoring and Logging at Scale", duration: "00:22:30", videoUrl: "#" },
        ],
        enrolledStudents: new Array(1234),
        createdAt: "2024-11-24T10:47:15.039+00:00",
        updatedAt: "2024-12-27T11:38:11.303+00:00",
        isPublished: true,
        creator: {
            _id: "673d6c34415f9dc8ca4edf6e",
            name: "Ayush Pratap Singh",
            photoUrl: "https://res.cloudinary.com/dm4c8y93h/image/upload/v1734350065/muggcoxd4wsftdsj98rf.png"
        },
        rating: 4.8,
        totalReviews: 256,
    }

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <div className="min-h-screen text-white py-24">
            <div className="container mx-auto px-4 py-8">
                
                
                <motion.div {...fadeIn} className="mb-8">
                    <Button variant="ghost" className="mb-12 text-gray-400 hover:text-white">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Courses
                    </Button>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{course.courseTitle}</h1>
                                <p className="text-lg text-gray-400 mb-4">{course.description}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 py-4">
                                <Badge className="bg-purple-600 text-white px-3 py-1">{course.category}</Badge>
                                <div className="flex items-center text-gray-400">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    <span>{course.courseLevel}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <Users className="w-4 h-4 mr-1" />
                                    <span>{course.enrolledStudents.length} students</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-yellow-400">
                                    <Star className="w-4 h-4 mr-1 fill-current" />
                                    <span>{course.rating} ({course.totalReviews} reviews)</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Avatar className="h-12 w-12 border-2 border-purple-500">
                                    <AvatarImage src={course.creator.photoUrl} alt={course.creator.name} />
                                    <AvatarFallback>{course.creator.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{course.creator.name}</p>
                                    <p className="text-sm text-gray-400">Course Creator</p>
                                </div>
                            </div>

                            <Separator className="bg-gray-800" />

                            <div>
                                <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                                <Card className="bg-gray-800 text-gray-100 border-gray-700">
                                    <CardContent className="p-0">
                                        <ScrollArea className="h-[400px] pr-4">
                                            {course.lectures.map((lecture, index) => (
                                                <div key={lecture._id} className="p-4 hover:bg-gray-700/50 transition-colors">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{lecture.title}</p>
                                                                <p className="text-sm text-gray-400">{lecture.duration}</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon">
                                                            <Play className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <motion.div {...fadeIn} className="md:col-span-1">
                            <Card className="bg-gray-800 text-gray-100 border-gray-700 sticky top-20">
                                <CardContent className="p-6 space-y-6">
                                    <div className="text-4xl font-bold">₹{course.coursePrice} INR</div>
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6">
                                        Enroll Now
                                    </Button>
                                    <div className="space-y-4">
                                        {[
                                            { icon: BookOpen, text: `${course.lectures.length} comprehensive lectures` },
                                            { icon: Clock, text: "Lifetime access" },
                                            { icon: CheckCircle, text: "Certificate of completion" },
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center space-x-3 text-gray-300">
                                                <item.icon className="w-5 h-5 text-purple-400" />
                                                <span>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CourseDetail

