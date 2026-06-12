import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  alignment = 'left',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`${alignmentClasses[alignment]} max-w-2xl`}>
      {subtitle && (
        <h4 className="text-accent font-montserrat font-medium mb-2">
          {subtitle}
        </h4>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-primary">
        {title}
      </h2>
      <div className={`mt-3 h-1 w-20 bg-accent rounded ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;