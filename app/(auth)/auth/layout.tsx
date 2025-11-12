export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen w-full">
      <div className="max-w-[1440px] w-full px-4 mx-auto h-full">
        {children}
      </div>
    </div>
  )
}
