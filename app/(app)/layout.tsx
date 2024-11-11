"use client"
import { useClerk, useUser } from '@clerk/nextjs';
import { ImageIcon, LayoutDashboardIcon, LogOutIcon, MenuIcon, Share2Icon, UploadIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface SidebarItem {
    href: string;
    icon: React.ComponentType;
    label: string;
}

const sidebarItems: SidebarItem[] = [
    { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
    { href: "/social-share", icon: Share2Icon, label: "Social Share" },
    { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

function AppLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const {signOut } = useClerk();
    const {user, isSignedIn} = useUser();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleLogoClick = () => {
        router.push('/');
    } 
    const handleSignOut = async () => {
        await signOut();
    }
    return (
        <div className="drawer lg:drawer-open">
            <input 
                id="drawer-sidebar" 
                type="checkbox" 
                className="drawer-toggle" 
                checked={sidebarOpen}
                onChange={(e) => setSidebarOpen(!sidebarOpen)}
            />
            {/* Content */}
            <div className="drawer-content flex flex-col">
                <header className='w-full bg-base-200'>
                    <div className='navbar justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex-none lg:hidden'>
                            <label
                                htmlFor="drawer-sidebar"
                                className="btn btn-square  btn-ghost drawer-button"
                            >
                                <MenuIcon />
                            </label>
                        </div>

                        <div>
                            <Link href="/" onClick={handleLogoClick}>
                                <div className="btn text-gray-300 btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer">
                                    Cloudinary Showcase
                                </div>
                            </Link>
                        </div>

                        <div className='flex-none flex items-center ml-14  space-x-4'>
                            {user && (
                                <>
                                    <div className="avatar">
                                        <div className="w-8 h-8 rounded-full">
                                            <img
                                                src={user.imageUrl}
                                                alt={
                                                user.username || user.emailAddresses[0].emailAddress
                                                }
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-300 truncate max-w-xs lg:max-w-md">
                                        {user.username || user.emailAddresses[0].emailAddress}
                                    </span>
                                    <button
                                        onClick={handleSignOut}
                                        className="btn btn-ghost btn-circle"
                                    >
                                        <LogOutIcon className="h-6 w-6 text-gray-300" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                {/* Page Content */}
                <main className="flex-grow bg-base-300">
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
                        {children}
                    </div>
                </main>
            </div>
            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="drawer-sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className='bg-base-200 w-64 h-full flex flex-col'>
                    <div className="flex items-center justify-center py-4">
                        <ImageIcon className="w-10 h-10 text-primary" />
                    </div>
                    <ul className='menu p-4 w-full text-base-content flex-grow'>
                        {sidebarItems?.map((item: SidebarItem, index: number) => (
                            <li className='mb-2' key={index}>
                                <Link href={item?.href}
                                    className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                                        pathname === item.href
                                            ? "bg-primary text-white"
                                            : "hover:bg-base-300"
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-6 h-6 mr-2" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {user && (
                    <div className="p-4">
                        <button
                            onClick={handleSignOut}
                            className="btn btn-outline btn-info w-full"
                        >
                            <LogOutIcon className="mr-2 h-5 w-5" />
                            Sign Out
                        </button>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default AppLayout