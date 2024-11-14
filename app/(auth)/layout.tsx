import React from 'react'

function AuthLayout({children} : {
    children: React.ReactNode
}) {
    return (
        <div className='flex w-full bg-base-100 justify-center items-center'>
            {children}
        </div>
    )
}

export default AuthLayout