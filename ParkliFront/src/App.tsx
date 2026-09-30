import Button from "./components/Button"

function App() {
  return (
    <>
    <div className="w-full bg-primary-start">
      <div className="mx-auto flex h-25 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold text-white">Earn money from your driveway</p>
        <p className="text-md text-white">List your driveway and start earning with Parkli</p>
      </div>
    <Button className="w-32 h-10 bg-white text-primary-start">Get Started</Button>
      </div>
    </div>
    </>
  )
}

export default App