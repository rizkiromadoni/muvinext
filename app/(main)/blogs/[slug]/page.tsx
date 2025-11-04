import { notFound } from 'next/navigation'
import React from 'react'

import { prisma } from '@/lib/prisma'
import BlogSection from './blog-section'

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
   const { slug } = await params

   const blog = await prisma.blog.findUnique({
      where: { slug },
   })

   if (!blog) {
      notFound()
   }

  return (
    <BlogSection title={blog.title} date={blog.createdAt} imageUrl={blog.imageUrl} content={blog.content} />
  )
}

export default BlogPage