"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, PlusIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useCreateLectureMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'
import { data } from 'autoprefixer'
import { useNavigate, useParams } from 'react-router-dom'

export default function CreateLecture() {
    const [lectureTitle, setLectureTitle] = useState('');
    const navigate = useNavigate();
    const params = useParams()
    const courseId = params.courseId

    const [
        createLecture,
        {
            isLoading: isCreateLectureLoading,
            isError: isCreateLectureError,
            error: createLectureError,
            isSuccess: isCreateLectureSuccess,
            data: createLectureData,
        },
    ] = useCreateLectureMutation();

    const handleCreateLecture = async () => {
        console.log('Button clicked: Creating lecture...');
        await createLecture({ lectureTitle, courseId });
    };

    useEffect(() => {
        if (isCreateLectureSuccess && createLectureData?.message) {
            toast.success(createLectureData.message);
        }
        if (isCreateLectureError && createLectureError?.data?.message) {
            toast.error(createLectureError.data.message);
        }
    }, [isCreateLectureSuccess, isCreateLectureError, createLectureError, createLectureData]);

    return (
        <div className="container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto"
            >
                <Button
                    variant="ghost"
                    className="mb-6 text-gray-400"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                </Button>

                <h1 className="text-3xl font-bold text-white mb-6">Add New Lecture</h1>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">Course Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter course title"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(`/admin/course/${courseId}`)}
                        >
                            Back to course
                        </Button>
                        <Button disabled={isCreateLectureLoading} onClick={handleCreateLecture}>
                            {isCreateLectureLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Create lecture'
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

