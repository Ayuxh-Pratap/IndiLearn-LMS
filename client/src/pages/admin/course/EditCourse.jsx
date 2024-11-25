'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const categories = ["Web Development", "Data Science", "Mobile Development", "Machine Learning", "DevOps", "Design", "Business"]
const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]

const mockCourse = {
  id: '1',
  title: 'Advanced React Patterns',
  subtitle: 'Master modern React development techniques',
  description: 'Learn advanced React patterns including hooks, context, and performance optimization techniques.',
  category: 'Web Development',
  level: 'Intermediate',
  price: 49.99,
  thumbnail: '/placeholder.svg?height=200&width=300',
  isPublished: true,
}

export default function EditCourse() {
  const [course, setCourse] = useState(mockCourse)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    // Simulating API call to fetch course data
    setIsLoading(true)
    setTimeout(() => {
      setCourse(mockCourse)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourse(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setCourse(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked) => {
    setCourse(prev => ({ ...prev, isPublished: checked }))
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real application, you would upload the file to a server and get a URL back
      const reader = new FileReader()
      reader.onloadend = () => {
        setCourse(prev => ({ ...prev, thumbnail: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setIsLoading(true)
    // Simulating API call to save course data
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Course Updated",
        description: "Your course has been successfully updated.",
      })
    }, 1500)
  }

  const handleDelete = () => {
    setIsLoading(true)
    // Simulating API call to delete course
    setTimeout(() => {
      setIsLoading(false)
      setShowDeleteDialog(false)
      toast({
        title: "Course Deleted",
        description: "Your course has been permanently deleted.",
        variant: "destructive",
      })
      // In a real application, you would redirect to the courses list page here
    }, 1500)
  }

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

        <h1 className="text-3xl font-bold text-white mb-6">Edit Course</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={course.isPublished}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="published" className="text-white">
              {course.isPublished ? 'Published' : 'Draft'}
            </Label>
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
                <Button variant="destructive" onClick={handleDelete}>Delete Course</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Course Title</Label>
            <Input
              id="title"
              name="title"
              value={course.title}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-white">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={course.subtitle}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Category</Label>
              <Select value={course.category} onValueChange={(value) => handleSelectChange('category', value)}>
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
              <Select value={course.level} onValueChange={(value) => handleSelectChange('level', value)}>
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
            <Label htmlFor="price" className="text-white">Price (USD)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={course.price}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700 text-white"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Thumbnail</Label>
            <div className="flex items-center space-x-4">
              <img src={course.thumbnail} alt="Course thumbnail" className="w-32 h-24 object-cover rounded" />
              <Label htmlFor="thumbnail" className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
                <Upload className="inline mr-2" size={16} />
                Upload New Image
              </Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>
          </div>


          <div className="flex justify-end space-x-2 pt-6">
            <Button variant="outline" className="border-gray-700 text-gray-300 bg-gray-700 hover:text-gray-700" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}