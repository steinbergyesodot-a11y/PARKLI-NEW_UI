import Button from "../../../components/primitives/Button";
import { IoArrowForward, IoHomeOutline } from "react-icons/io5";

export function PromoBanner() {
    return(
        <aside className="border-b border-brand-700 bg-primary text-white" aria-label="Become a Parkli host">
            <div className="mx-auto flex min-h-14 w-full max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <IoHomeOutline aria-hidden="true" className="hidden shrink-0 text-xl sm:block" />
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">Your driveway. Their game day.</span>
                  <span className="hidden text-blue-100 sm:inline"> Earn money with Parkli.</span>
                </p>
              </div>
              <Button className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-semibold text-primary shadow-none hover:bg-brand-50 sm:text-sm">
                Get Started <IoArrowForward aria-hidden="true" className="text-base" />
              </Button>
            </div>
        </aside>
    )
}