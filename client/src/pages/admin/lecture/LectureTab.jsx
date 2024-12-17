"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Upload, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import axios from "axios"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

const MEDIA_API = "http://localhost:8080/api/v1/media"

export default function LectureCard() {

  const [title, setTitle] = useState("")
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
  const [isFree, setIsFree] = useState(false)
  const [mediaProgress, setMediaProgress] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [fileName, setFileName] = useState("")



  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onUpdate?.(formData)
  }

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0]
    setFileName(file.name)
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      setMediaProgress(true)
      try {
        const res = await axios.post(`${MEDIA_API}/upload-Video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            const progress = Math.round((loaded * 100) / total)
            setUploadProgress(progress)
          }
        })

        console.log(res.data)

        if (res.data.success) {
          setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id })
          setMediaProgress(false)
          setUploadProgress(0)
          setBtnDisabled(false)
          toast.success("Video uploaded successfully")
        }

      } catch (error) {
        console.error("Upload Error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  }

  return (
    <TooltipProvider>
      <Card className="w-full bg-gray-900 text-white shadow-xl border border-gray-800">
        <CardHeader className="space-y-1">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <CardTitle className="text-2xl font-bold">Edit Lecture</CardTitle>
              <p className="text-sm text-gray-400">Make changes and click save when done.</p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="h-4 w-4" /> Remove Course
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove Lecture</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter lecture title"
                className="w-full bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Label htmlFor="video" className="text-gray-300">Video *</Label>
              <div
                className="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Input
                  id="video"
                  name="video"
                  type="file"
                  accept="video/*"
                  className="w-full z-40 cursor-pointer opacity-0 absolute inset-0"
                  onChange={fileChangeHandler}
                  required
                />
                <div className={`flex z-0 cursor-not-allowed items-center justify-center h-32 w-full border-2 border-dashed rounded-lg transition-colors duration-300 ${isHovering ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-600 bg-gray-800'}`}>
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-400">
                      {fileName ? fileName : "Click or drag video to upload"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-between space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Label htmlFor="free" className="text-gray-300">Is this video FREE?</Label>
              <Switch
                id="free"
                name="isFree"
                checked={isFree}
                onCheckedChange={setIsFree}
              />
            </motion.div>

            {
              mediaProgress &&
              <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4">
                <Progress value={uploadProgress} className="w-full" max={100} />
                <p className="mb-1 text-sm text-gray-400">{uploadProgress}% Uploaded</p>
              </div>

            }

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              >
                <Save className="mr-2 h-4 w-4" />
                Update Lecture
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
