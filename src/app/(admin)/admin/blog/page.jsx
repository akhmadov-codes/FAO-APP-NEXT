'use client'
import { useEffect, useState } from 'react'
import { useBlogStore } from '@/store/blogStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, Image as ImageIcon, ArrowUpFromLine } from 'lucide-react'
import Pagination from '@/components/admin/dashboard/page-pagination'

export default function BlogsPage() {
  const blogs = useBlogStore((state) => state.blogs)
  const isLoading = useBlogStore((state) => state.isLoading)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)
  const pagination = useBlogStore((state) => state.pagination)

  const [currentPage, setCurrentPage] = useState(1)
  console.log('Blog compoenetda', pagination)

  useEffect(() => {
    fetchBlogs(currentPage)
  }, [currentPage])
  if (isLoading) return <div>Yuklanmoqda...</div>
  return (
    <div className="space-y-6">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl uppercase font-bold text-[#1b1e21] tracking-tight">Bloglar</h1>
          <p className="text-sm text-slate-500 mt-0.5">Tizimdagi barcha maqolalar ro'yxati</p>
        </div>
        <Button onClick={() => openModal(BlogCreateModal, { title: "Blog qo'shish", onSuccess: () => fetchBlogs(currentPage) })}>
          <Plus strokeWidth={4} /> Qo'shish
        </Button>
      </div>

      {/* 2. FILTER */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative bg-white flex-1 max-w-md">
          <Input type="text" placeholder="Sarlavha bo'yicha qidirish..." />
        </div>
      </div>

      {/* 3. ROW CARDS */}
      <div className="space-y-4">
        {blogs?.map((blog) => (
          <div key={blog.id} className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* 1-Blok: Rasm va Sarlavha (Uzbek tilida asosiy) */}
            <div className="flex items-center gap-4 min-w-[320px] flex-1">
              {/* Blog Muqova Rasmi */}
              {/* <div className="w-20 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">{blog.image ? <img src={blog.image} alt={blog.title_uz} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-slate-400" />}</div> */}
              <div className="space-y-0.5 truncate">
                <span className="font-medium text-center">Blog sarlavhasi (UZ):</span>
                <h3 className="font-bold text-slate-800 tracking-tight text-base truncate">{blog.title_uz}</h3>
              </div>
            </div>

            {/* 2-Blok: Kategoriya */}
            <div className="flex flex-col min-w-[150px] space-y-0.5">
              <span className="font-medium">Kategoriya:</span>
              <span className="font-semibold text-slate-700 truncate">{blog.category_detail?.name_uz || '—'}</span>
            </div>

            {/* 3-Blok: Status (Draf, Published va h.k.) */}
            <div className="flex flex-col min-w-[120px] space-y-1">
              <span className="font-medium">Holati:</span>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${blog.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${blog.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {blog.status === 'draf' ? 'Qoralama' : blog.status}
                </span>
              </div>
            </div>

            {/* 4-Blok: Yaratilgan sana */}
            <div className="flex flex-col min-w-[140px] space-y-0.5">
              <span className="font-medium">Yaratilgan sana:</span>
              <span className="font-medium text-slate-600 text-sm">{new Date(blog.created_at).toLocaleDateString('uz-UZ')}</span>
            </div>

            {/* 5-Blok: Amallar */}
            <div className="flex items-center justify-end gap-2 border-t pt-3 md:border-t-0 md:pt-0 border-slate-100">
              <Button variant="secondary" size="sm" className="text-white bg-blue-400 hover:bg-blue-500 rounded-xl h-9 px-4 transition flex items-center gap-1.5">
                <ArrowUpFromLine className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Nashir qilish</span>
              </Button>
              <Button onClick={() => openModal(BlogEditModal, { blog, onSuccess: () => fetchBlogs(currentPage) })} variant="secondary" size="sm" className="text-white bg-blue-400 hover:bg-blue-500 rounded-xl h-9 px-4 transition flex items-center gap-1.5">
                <Edit2 className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Tahrirlash</span>
              </Button>
              <Button onClick={() => openModal(BlogDeleteModal, { blog, onSuccess: () => fetchBlogs(currentPage) })} variant="destructive" size="icon" className="text-rose-400 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl h-9 w-9 transition shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. PAGINATION */}
      <Pagination pagination={pagination} onChangePage={(targetPage) => setCurrentPage(targetPage)} isLoading={isLoading} />
    </div>
  )
}
