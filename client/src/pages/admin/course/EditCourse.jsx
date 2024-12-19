'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Trash2, Loader2, Loader, Save, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import RichTextEditor from '@/components/RichTextEditor'
import { useEditCourseMutation, useGetCourseByIdQuery , usePublishCourseMutation } from '@/features/api/courseApi'
import { useNavigate, useParams } from 'react-router-dom'

const categories = ["Web Development", "Data Science", "Mobile Development", "Machine Learning", "DevOps", "Design", "Business"]
const levels = ["Beginner", "Medium", "Advanced"]



export default function EditCourse() {
    const [input, setInput] = useState({
        courseTitle: '',
        subTitle: '',
        description: '',
        category: '',
        courseLevel: '',
        coursePrice: '',
        courseThumbnail: '',
    })

    const params = useParams()
    const courseId = params.courseId
    const navigate = useNavigate()

    const { data: courseIdData, isLoading: courseIdIsLoading, isSuccess: courseIdIsSuccess, error: courseIdError } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true })
    const [publishCourse, { data: publishCourseData, isLoading: publishCourseIsLoading, isSuccess: publishCourseIsSuccess, error: publishCourseError }] = usePublishCourseMutation()
    
    const isPublished = courseIdData?.course?.isPublished

    useEffect(() => {
        if (courseIdData?.course) {
            const course = courseIdData.course;
            setInput({
                courseTitle: course.courseTitle || '',
                subTitle: course.subTitle || '',
                description: course.description || '',
                category: course.category || 'error loading',
                courseLevel: course.courseLevel || '',
                coursePrice: course.coursePrice || '',
                courseThumbnail: '',
            });
        }
    }, [courseIdData?.course]);

    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation()

    console.log(data)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [previewThumbnail, setPreviewThumbnail] = useState('')

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }

    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateCourseHandler = async () => {
        if (!courseId) {
            toast.error("Invalid Course ID.");
            return;
        }

        if (!input.courseTitle || !input.category || !input.courseLevel || !input.coursePrice) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append('courseTitle', input.courseTitle);
        formData.append('subTitle', input.subTitle);
        formData.append('description', input.description);
        formData.append('category', input.category);
        formData.append('courseLevel', input.courseLevel);
        formData.append('coursePrice', input.coursePrice);
        formData.append('courseThumbnail', input.courseThumbnail);

        try {
            await editCourse({ courseId, formData });
        } catch (err) {
            console.error("Error updating course:", err);
        }
    };

    const publishStatusHandler = async (action) => {
        if (!courseId) {
            toast.error("Invalid Course ID.");
            return;
        }

        try {
            const response = await publishCourse({ courseId, query:action });
            if (response.data) {
                toast.success(response.data.message);
            } else {
                toast.error("Failed to update course.");
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    }


    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course updated successfully!");
        }
        if (error) {
            console.error('Error response:', error);
            toast.error(error?.data?.message || "Failed to update course.");
        }
    }, [isSuccess, error]);


    return (
        <div className="container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto"
            >
                <div className='flex justify-between items-center mb-6'>
                    <Button
                        variant="ghost"
                        className="mb-6 text-gray-400"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate(lecture)}
                        className="mb-6 text-gray-400">
                        Manage Lectures
                        <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                </div>

                <h1 className="text-3xl font-bold text-white mb-6">Edit Course</h1>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <Button variat="ghost" onClick={() => publishStatusHandler(courseIdData?.course?.isPublished ? false : true)} className="mb-6 text-gray-400">
                            {isPublished ? "Published" : "Draft"}
                        </Button>
                    </div>
                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <DialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Remove Course
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-0 text-white">
                            <DialogHeader>
                                <DialogTitle>Are you sure you want to delete this course?</DialogTitle>
                            </DialogHeader>
                            <p className="text-gray-300">This action cannot be undone. All course content and student data will be permanently removed.</p>
                            <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" className="border-gray-700 text-white bg-gray-700" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                                <Button variant="destructive">Delete Course</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">Course Title</Label>
                        <Input
                            id="title"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            placeholder="Enter course title"
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subtitle" className="text-white">Subtitle</Label>
                        <Input
                            id="subtitle"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Enter course subtitle"
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">Description</Label>
                        {/* <Textarea
              id="description"
              name="description"
              value={course.description}
              onChange={}
              className="bg-gray-800 border-gray-700 text-white h-32"
            /> */}
                        <RichTextEditor className="border-gray-700 rounded-sm" input={input} setInput={setInput} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-white">Category</Label>
                            <Select onValueChange={selectCategory}>
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

                        <div className="space-y-2">
                            <Label htmlFor="level" className="text-white">Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger id="level" className="bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Select a level" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    {levels.map((level) => (
                                        <SelectItem key={level} value={level} className="text-white hover:bg-gray-700">
                                            {level}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price" className="text-white">Price (IND)</Label>
                        <Input
                            id="price"
                            name="coursePrice"
                            type="number"
                            value={input.coursePrice}
                            onChange={changeEventHandler}
                            className="bg-gray-800 border-gray-700 text-white"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white">Thumbnail</Label>
                        <div className="flex items-center space-x-4">
                            <img alt="Course thumbnail" src={previewThumbnail} className="w-32 h-24 object-cover rounded" />
                            <Label htmlFor="thumbnail" className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
                                <Upload className="inline mr-2" size={16} />
                                Upload New Image
                            </Label>
                            <Input
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={selectThumbnail}
                                className="hidden"
                            />
                        </div>
                    </div>


                    <div className="flex justify-end space-x-2 pt-6">
                        <Button variant="outline" className="border-gray-700 text-gray-300 bg-gray-700 hover:text-gray-700" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler} className="bg-purple-600 hover:bg-purple-700">
                            {
                                isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Loader className="mr-2 h-6 w-6 animate-spin" />
                                        <span>Saving Changes</span>
                                    </div>

                                ) : (
                                    <span>Save Changes</span>
                                )
                            }
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}