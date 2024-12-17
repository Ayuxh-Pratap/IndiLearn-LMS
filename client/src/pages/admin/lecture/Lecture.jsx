import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, EditIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Lecture({ lecture, index, courseId, duration }) {

    const navigate = useNavigate()


    const goToUpdateLecture = () => {
        navigate(`${lecture._id}`)
        console.log(`Go to update lecture with ID: ${lecture._id}`);
    }


    return (
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-white">Lecture - {index + 1 } : {lecture.lectureTitle}</CardTitle>
                <EditIcon onClick={goToUpdateLecture} className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </CardHeader>
            {/* <CardContent>
                <p className="text-xs text-gray-400">{duration}</p>
            </CardContent> */}
        </Card>
    )
}
