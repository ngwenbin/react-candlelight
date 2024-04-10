interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <>
      <div className="-z-10 opacity-60 absolute bg-gradient-to-b from-[#481D0A] to-transparent h-[250px] top-0 left-0 w-full" />
      <div className={className}>{children}</div>
    </>
  )
}
