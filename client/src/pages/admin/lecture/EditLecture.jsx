import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

export default function () {

    const navigate = useNavigate()

    const params = useParams()
    const courseId = params.courseId

    return (
        <div>
            <div className='flex gap-12 justify-between'>
                <div>
                    <Link to={`/admin/course/${courseId}/lecture`}>
                        <Button size="icon" variant="outline" className="rounded-full">
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                </div>
                <LectureTab />
            </div>
        </div>
    )
}
