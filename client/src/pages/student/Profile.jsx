'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, Mail, Briefcase, Book, ChevronRight, GraduationCap, Loader, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'

export default function Profile() {

  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const { data, isLoading, error , refetch } = useLoadUserQuery();

  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, error: updateUserError, isSuccess }] = useUpdateUserMutation()

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const updateUserHandler = async () => {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('profilePhoto', profilePhoto);

    await updateUser(formData);
  };

  useEffect(() => {
    if (updateUserData) {
      refetch();
      toast.success('Profile updated successfully')
    }
    if (updateUserError) {
      toast.error('Something went wrong')
    }
  }, [updateUserError, updateUserData])

  /* const Courses = [
    {
      id: '1',
      title: 'Advanced JavaScript Concepts',
      progress: 65,
      image: '/placeholder.svg?height=80&width=120',
    },
    {
      id: '2',
      title: 'React and Redux Masterclass',
      progress: 30,
      image: '/placeholder.svg?height=80&width=120',
    },
  ] */

  const user = data?.user || {};

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="py-32 bg-black text-gray-100 p-8">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          className="bg-gray-900 rounded-lg p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8"
          {...fadeInUp}
        >
          <Avatar className="w-32 h-32 border-4 border-purple-500">
            <AvatarImage src={user.photoUrl} alt={user.name} />
            <AvatarFallback className="text-2xl font-bold text-black/50">{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name || "loading..."}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 text-gray-400">
              <div className="flex items-center justify-center md:justify-start">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{user.role || "loading..."}</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2" />
                <span>{user.email || "loading..."}</span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-0">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Profile Photo</Label>
                    <Input
                      onChange={onChangeHandler}
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button disabled={updateUserIsLoading} onClick={updateUserHandler} type="submit">
                    {updateUserIsLoading ? <div>
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Loading...</span>
                      </div>
                    </div> : 'Save changes'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {<motion.div
          className="bg-gray-900 rounded-lg p-8"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Book className="w-6 h-6 mr-2 text-purple-500" />
            Enrolled Courses
          </h2>

          {user.enrolledCourses > 0 ? (
            <div className="space-y-6">
              {user.enrolledCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="flex items-center gap-4 bg-gray-800 rounded-lg p-4"
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <img src={course.image} alt={course.title} className="w-20 h-14 object-cover rounded" />
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-purple-400">{course.progress}%</span>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Continue
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                View All Courses
              </Button>
            </div>
          ) : (
            <motion.div
              className="text-center py-12"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-purple-500 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Courses Enrolled Yet</h3>
              <p className="text-gray-400 mb-6">Embark on your learning journey today! Explore our wide range of courses and start building your skills.</p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Explore Courses
              </Button>
            </motion.div>
          )}
        </motion.div>}
      </div>
    </div>
  )
}