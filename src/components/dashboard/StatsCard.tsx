import React from "react";
import { Card, CardContent } from "../ui/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  className = "",
}) => {
  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>

            {change && (
              <div className="mt-2 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    change.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {change.positive ? "↑" : "↓"} {change.value}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  vs mes anterior
                </span>
              </div>
            )}
          </div>

          <div className="p-3 rounded-lg bg-blue-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
