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
                "linear-gradient(90deg, rgba(8, 19, 25, 0.68), rgba(8, 19, 25, 0.18)), url('/assets/wrigley.jpg')",
              backgroundPosition: "center top",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}