import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Refrigerator, Shapes, Fan, Lightbulb } from "lucide-react";

const menuItems = [
  { icon: Home, path: "/" },
  { icon: Refrigerator, path: "/refrigerador" },
  { icon: Shapes, path: "/shapes" },
  { icon: Fan, path: "/dashboardumidade" },
  { icon: Lightbulb, path: "/smartlight" },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="w-20 min-h-screen bg-[#00C4CC] flex flex-col items-center py-6 space-y-8 rounded-r-3xl relative">
      {menuItems.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className="relative flex justify-center items-center w-full cursor-pointer"
            onClick={() => {
              setActiveIndex(index);
              navigate(item.path);
            }}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full z-10 transition-all duration-300 ${
                isActive ? "bg-white" : ""
              }`}
            >
              <item.icon color={isActive ? "black" : "white"} size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
