import { create } from 'zustand'

export const useModalStore = create((set) => ({
  isOpen: false,
  Component: null,
  props: {},

  openModal: (Component, props = {}) => {
    set({
      isOpen: true,
      Component,
      props
    })
  },

  closeModal: () => {
    set({
      isOpen: false
    })
  }
}))
