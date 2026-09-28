import Button from "./components/Button"

function App() {
  return (
    <>
    <div className="flex justify-between items-center bg-primary-start w-full h-25 px-12">
      <div>
      <p className="text-lg font-bold text-white">Earn money from your driveway</p>
      <p className="text-sm text-white">List your driveway and start earning with Parkli</p>
      </div>
    <Button>Click me</Button>
    </div>
    </>
  )
}

export default App