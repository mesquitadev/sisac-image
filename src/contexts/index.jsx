import { createContext, useContext } from "react"
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react"

const SidebarDrawerContext = createContext()

export function SidebarDrawerProvider({ children }) {
  const disclosure = useDisclosure()
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
