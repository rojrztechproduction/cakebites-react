import React from 'react';
import CategoryArchivePage from './CategoryArchivePage';
import './archive.css';

export default function CustomCakesArchivePage({
  onNavigate,
  onAdd,
  onViewProduct,
  sectionsData,
  defaultSections,
  onOpenStudio
}) {
  return (
    <CategoryArchivePage
      categoryId="custom"
      sectionsData={sectionsData}
      defaultSections={defaultSections}
      onNavigate={onNavigate}
      onAdd={onAdd}
      onViewProduct={onViewProduct}
      onOpenStudio={onOpenStudio}
    />
  );
}
