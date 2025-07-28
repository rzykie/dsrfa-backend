import React from 'react';

interface HorizontalLineProps {
  className?: string;
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'default' | 'primary' | 'accent' | 'muted';
}

export function HorizontalLine({ 
  className = '', 
  thickness = 'thin',
  color = 'default'
}: HorizontalLineProps) {
  const thicknessClasses = {
    thin: 'h-px',
    medium: 'h-0.5',
    thick: 'h-1'
  };

  const colorClasses = {
    default: 'bg-border',
    primary: 'bg-primary',
    accent: 'bg-accent',
    muted: 'bg-muted-foreground/20'
  };

  return (
    <div 
      className={`w-full ${thicknessClasses[thickness]} ${colorClasses[color]} ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}