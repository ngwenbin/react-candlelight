interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="-z-10 opacity-60 absolute bg-gradient-to-b from-[#481D0A] to-transparent h-[250px] top-0 left-0 w-full" />
      {children}
    </div>
  )
}
