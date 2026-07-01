'use client'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useModalStore } from '@/store/dialogStore'

export default function GlobalModalProvider() {
  const { isOpen, Component, props, closeModal } = useModalStore()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      {Component && (
        <DialogContent onInteractOutside={(e) => e.preventDefault()} className={`rounded-[16px]`}>
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="font-semibold flex gap-2 items-center text-xl">
              <span className={`w-1.5 h-6 rounded-lg block shrink-0 ${props.color || 'bg-[#3286FB]'}`} /> {props.title}
            </DialogTitle>
          </DialogHeader>
          <Component {...props} close={closeModal} />
        </DialogContent>
      )}
    </Dialog>
  )
}
