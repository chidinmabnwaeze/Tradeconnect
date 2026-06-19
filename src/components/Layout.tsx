
export default function Layout({children}:{children: React.ReactNode}) {
  return (
    <div className="bg-global-bg min-h-screen w-full flex justify-center items-center px-4 py-8">
      {children}
    </div>
  )
}

