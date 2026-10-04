import Button from "../../../components/primitives/Button";
import { Card, CardDescription, CardTitle } from "../../../components/primitives/Card";

export function PromoBanner() {
    return(
        <>
             <Card className="mx-auto rounded-none border-0 bg-primary-start">
            <div className="mx-auto flex h-25 w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16">
              <div className="flex flex-col gap-2">
              <CardTitle className="text-white text-2xl font-black">Earn money from your driveway</CardTitle>
              <CardDescription className="text-white text-md">List your driveway and start earning with Parkli</CardDescription>
              </div>
            <Button className="h-10 w-32 bg-white text-primary-start">Get Started</Button>
            </div>
          </Card>
        </>
    )
}