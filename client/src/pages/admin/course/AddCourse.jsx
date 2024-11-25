'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Plus, PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'
import { useCreateCourseMutation } from '@/features/api/courseApi'

const categories = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Machine Learning",
    "DevOps",
    "Design",
    "Business",
]

export default function AddCourse() {
    const [courseTitle, setCourseTitle] = useState('')
    const [category, setCategory] = useState('')

    const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation()

    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/admin/course')
    }

    
    
    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created.");
            navigate('/admin/course')
        }
        if (error) {
            toast.error(error?.data?.message || "An error occurred.");
        }
    }, [isSuccess, error])

    return (
        <div className="container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" mx-auto"
            >
                <Button
                    variant="ghost"
                    className="mb-6 text-gray-400"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                </Button>

                <h1 className="text-3xl font-bold text-white mb-6">Add New Course</h1>

                <p className="text-gray-300 mb-8">
                    Create a new course by filling out the information below. Provide a compelling title
                    and select the most appropriate category to help students find your course easily.
                </p>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">Course Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter course title"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-white">Category</Label>
                        <Select value={category} onValueChange={getSelectedCategory}>
                            <SelectTrigger id="category" className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700">
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" className="border-gray-700 text-gray-600 hover:bg-gray-700 hover:text-white">
                            Cancel
                        </Button>
                        <Button disapled={isLoading} onClick={createCourseHandler} className="bg-purple-600 hover:bg-purple-700">
                            {
                                isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center'>
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Create Course
                                    </div>
                                )
                            }
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}