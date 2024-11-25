import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const ModernSidebar = () => {
    return (
        <div className="flex py-24 ">
            <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-white/10 dark:border-gray-700  p-5 sticky top-0  h-screen">
                <div className="space-y-4 ">
                    <Link to="dashboard" className="flex text-white items-center gap-2">
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link to="course" className="flex text-white items-center gap-2">
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>
            <div className="flex-1 p-5 px-10 ">
                <Outlet />
            </div>
        </div>
    );
};

export default ModernSidebar;