import React from 'react';
import { cn } from '../../lib/utils';

interface VerticalCardListProps {
  children: React.ReactNode;
  maxHeight?: string;
  /** Spacing between cards (Tailwind space-y class) */
  spacing?: string;
  /** Custom extra classes */
  className?: string;
  /** Message or UI component to display when no items exist */
  emptyState?: React.ReactNode;
  /** Shows subtle shadow gradients at top and bottom to indicate more content is scrollable */
  showScrollFades?: boolean;
}

export default function VerticalCardList({
  children,
  maxHeight = 'max-h-[600px]',
  spacing = 'space-y-4',
  className = '',
  emptyState,
  showScrollFades = true
}: VerticalCardListProps) {
  const count = React.Children.count(children);

  if (count === 0 && emptyState) {
    return (
      <div className={cn('py-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200', className)}>
        {emptyState}
      </div>
    );
  }

  return (
    <div className="relative group">
      
      {/* Top Scroll Fade (Visual cue that content scrolls) */}
      {showScrollFades && (
        <div className="absolute top-0 left-0 right-2 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none opacity-80" />
      )}

      {/* Scrollable Container */}
      <div
        className={cn(
          'overflow-y-auto pr-2 scroll-smooth [ -webkit-overflow-scrolling:touch ] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400',
          maxHeight,
          spacing,
          className
        )}
      >
        {children}
      </div>

      {/* Bottom Scroll Fade */}
      {showScrollFades && (
        <div className="absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none opacity-80" />
      )}

    </div>
  );
}