'use client'
import React, { useState } from 'react'

export default function AdminLayout({ children }) {
  return <main className="flex-1 overflow-x-hidden overflow-y-auto px-16 p-6 bg-gray-50">{children}</main>
}
