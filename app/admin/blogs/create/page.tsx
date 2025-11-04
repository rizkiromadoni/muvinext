import { SiteHeader } from '@/components/site-header'
import React from 'react'
import CreateBlogForm from './form'

const CreateBlogPage = () => {
  return (
    <>
    <SiteHeader title="Create Blog" />
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full">
        <CreateBlogForm />
      </div>
    </div>
    </>
  )
}

export default CreateBlogPage