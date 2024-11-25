import { BookOpen, KeyRound, Library, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = () => {

    const { user } = useSelector(store => store.auth)

    const navigate = useNavigate()

    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()

    const logoutHandler = async () => {
        await logoutUser()
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
            toast.success('Logout Successfully')
        }

    }, [isSuccess])

    return (
        <div className=' h-16 mx-auto bg-transparent backdrop-blur-2xl fixed top-0 left-0 right-0 duration-300 z-50'>
            <div className='container max-w-7xl mx-auto flex items-center justify-between h-full'>
                <a href='/ ' className='flex text-white items-center gap-2'>
                    <Library size={30} />
                    <h1 className='font-bold text-white/60 text-xl'>IndiLearn LMS</h1>
                </a>
                <div>
                    <ul className='flex items-center gap-6 font-medium text-white/40 cursor-pointer'>
                        <a href='/teachers'>Teachers</a>
                        <a>Courses</a>
                        <a>Events</a>
                        <a>Community</a>

                    </ul>
                </div>
                <div className='flex items-center gap-4'>
                    <Button variant='outline'>
                        <BookOpen size={20} />
                        <span className='ml-2'>Docs</span>
                    </Button>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={user?.photoUrl} alt="@shadcn" />
                                        <AvatarFallback className="text-[1rem] font-bold text-black/50">{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <a href="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></a>
                                        <a href="/My-Learning"><DropdownMenuItem>My Learnings</DropdownMenuItem></a>
                                        <DropdownMenuItem>Go Premium</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {user.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>DashBoard</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem><a onClick={logoutHandler}>Logout</a></DropdownMenuItem>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>

                        ) : (
                            <a href="/login">
                                <Button>
                                    <KeyRound size={20} />
                                    <span className='ml-2'>Login</span>
                                </Button>
                            </a>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar