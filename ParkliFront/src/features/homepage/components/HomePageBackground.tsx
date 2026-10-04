import type { ReactNode } from "react";

type HomePageBackgroundProps = {
  isHomePage: boolean;
  children: ReactNode;
};

export function HomePageBackground({
  isHomePage,
  children,
}: HomePageBackgroundProps) {
  return (
    <div
      className={isHomePage ? "min-h-screen bg-cover bg-center bg-no-repeat" : undefined}
      style={
        isHomePage
          ? {
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('/assets/wrigley.jpg')",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}