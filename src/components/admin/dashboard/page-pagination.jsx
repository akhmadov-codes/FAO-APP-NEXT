'use client'
import { Button } from '@/components/ui/button'

export default function Pagination({ pagination, onChangePage, isLoading }) {
  const { currentPage, totalPages, previousPage, nextPage, totalCount } = pagination
  if (totalPages <= 1) return null

  // Sahifa raqamlari massivini yaratish (masalan: [1, 2, 3])
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 px-2">
      <div className="text-md text-muted-foreground">
        Jami: <span className="font-medium text-foreground">{totalCount}</span> ta ma'lumot. Sahifa: <span className="font-medium text-foreground">{currentPage}</span> / {totalPages}
      </div>
      <div className="flex items-center gap-1">
        <Button disabled={!previousPage || isLoading} onClick={() => onChangePage(currentPage - 1)}>
          Oldingi
        </Button>
        {pageNumbers.map((page) => (
          <Button size="icon" key={page} variant={page === currentPage ? 'default' : 'outline'} disabled={isLoading} onClick={() => onChangePage(page)}>
            {page}
          </Button>
        ))}
        <Button disabled={!nextPage || isLoading} onClick={() => onChangePage(currentPage + 1)}>
          Keyingi
        </Button>
      </div>
    </div>
  )
}
