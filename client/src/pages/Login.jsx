"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {

    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [loginInput, setLoginInput] = useState({
        email: "",
        password: "",
    })

    const [registerUser, { data: registerData, error: registerError, isLoading: registerLoading, isSuccess: registerSuccess }] = useRegisterUserMutation()
    const [loginUser, { data: loginData, error: loginError, isLoading: loginLoading, isSuccess: loginSuccess }] = useLoginUserMutation()

    const navigate = useNavigate()

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target

        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value })
        } else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);
        console.log(inputData)
    }

    useEffect(() => {
        if (registerSuccess && registerData) {
            toast.success(registerData.message || "Signup successful.")
        }
        if (registerError) {
            toast.error(registerError.data.message || "Signup Failed");
        }
        if (loginSuccess && loginData) {
            toast.success(loginData.message || "Login successful.");
            navigate("/")
        }
        if (loginError) {
            toast.error(loginError.data.message || "login Failed");
        }
    }, [loginLoading, registerLoading, loginData, registerData, loginError, registerError])

    return (
        <div className="flex items-center w-full justify-center h-screen">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={signupInput.name}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Ayush Pratap Singh"
                                    required="true" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={signupInput.email}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="ayushpratap@gmail.me"
                                    required="true" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={signupInput.password}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Password"
                                    required="true" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerLoading} onClick={() => handleRegistration("signup")}>
                                {registerLoading ?
                                    (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <span>Loading...</span>
                                        </div>
                                    ) : "signup"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={loginInput.email}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="ayushpratap@gmail.me"
                                    required="true" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Password"
                                    required="true" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginLoading} onClick={() => handleRegistration("login")}>
                                {loginLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent">
                                        </div>
                                    </>
                                ) : "Login"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
