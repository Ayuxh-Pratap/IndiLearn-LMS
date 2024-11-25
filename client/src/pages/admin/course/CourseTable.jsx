'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { useGetCreatorCoursesQuery } from '@/features/api/courseApi'

export default function CourseTable() {
    const { data } = useGetCreatorCoursesQuery()
    const [searchTerm, setSearchTerm] = useState('')

    const navigate = useNavigate()

    const handleCreateCourse = () => {
        navigate('/admin/course/create')
    }

    const handleEditCourse = (id) => {
        console.log(`Edit course with ID: ${id}`)
    }

    const handleDeleteCourse = (id) => {
        console.log(`Delete course with ID: ${id}`)
    }

    // Filter courses based on the search term
    const filteredCourses = data?.courses.filter((course) => {
        return (
            course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    return (
        <div className="container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Courses</h1>
                    <Button onClick={handleCreateCourse} className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="mr-2 h-4 w-4" /> Create Course
                    </Button>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm border-gray-800"
                        prefix={<Search className="mr-2 h-4 w-4 text-gray-800" />}
                    />
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden p-5">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-0">
                                <TableHead className="text-gray-500">Title</TableHead>
                                <TableHead className="text-gray-500">Category</TableHead>
                                <TableHead className="text-gray-500 text-left">Enrolled Students</TableHead>
                                <TableHead className="text-gray-500 text-right">Status</TableHead>
                                <TableHead className="text-gray-500 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses && filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <TableRow key={course._id} className="border-b hover:bg-gray-800 border-gray-800">
                                        <TableCell className="font-medium text-white">{course.courseTitle}</TableCell>
                                        <TableCell className="text-gray-300">{course.category}</TableCell>
                                        <TableCell className="text-left text-gray-300">{course.enrolledStudents.length}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={course.isPublished ? 'secondary' : 'destructive'}>
                                                {course.isPublished ? 'Published' : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button className="h-8 w-8 p-0 bg-transparent shadow-none hover:bg-transparent">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
                                                    <DropdownMenuItem onClick={() => handleEditCourse(course._id)} className="hover:bg-gray-700">
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteCourse(course._id)} className="text-red-500 hover:bg-gray-700">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="5" className="text-center text-gray-300">
                                        No courses found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        </div>
    )
}
