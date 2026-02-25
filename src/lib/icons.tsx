import * as Icons from 'lucide-react';

export const getIcon = (name: string) => {
  // Capitalize first letter just in case, though Lucide uses PascalCase
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const IconComponent = (Icons as any)[formattedName] || (Icons as any)[name];
  return IconComponent || Icons.HelpCircle;
};
