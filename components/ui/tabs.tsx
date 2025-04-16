import { ReactNode, useState } from "react";

interface TabsProps {
  children: ReactNode[];
  defaultValue: string;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
    children: ReactNode;
    className?: string;
   
  }

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  

  return (
    <div>
      <div className="flex space-x-4 border-b pb-2">
        {children.map((child: any) =>
          child.props.value ? (
            <button
              key={child.props.value}
              className={`px-4 py-2 ${
                activeTab === child.props.value ? "border-b-2 border-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(child.props.value)}
            >
              {child.props.children}
            </button>
          ) : null
        )}
      </div>
      <div className="mt-4">
        {children.find((child: any) => child.props.value === activeTab)}
      </div>
    </div>
  );
}

export function TabsList({ children, className }: TabsListProps) {
    return <div className={className}>{children}</div>;
  }

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  return <>{children}</>;
}

export function TabsContent({ value, children }: TabsContentProps) {
  return <div data-value={value}>{children}</div>;
}


