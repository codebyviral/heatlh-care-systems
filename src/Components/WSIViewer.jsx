import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Move,
  ChevronLeft,
  Download,
  Share2,
  Printer,
  Menu,
  X,
  Settings,
  RotateCcw,
} from "lucide-react";
import wsi from "../assets/wsi.png";

const WSIViewer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const rbcData = [
    { name: "Angled Cells", count: 222, percentage: "67%" },
    { name: "Borderline Ovalocytes", count: 50, percentage: "20%" },
    { name: "Burr Cells", count: 87, percentage: "34%" },
    { name: "Fragmented Cells", count: 2, percentage: "0.12%" },
    { name: "Ovalocytes", count: 0, percentage: "0%" },
    { name: "Rounded RBC", count: 0, percentage: "0%" },
    { name: "Teardrops", count: 0, percentage: "0%" },
  ];

  const wbcData = [
    { name: "Basophil", count: 222, percentage: "67%" },
    { name: "Eosinophil", count: 50, percentage: "20%" },
    { name: "Lymphocyte", count: 87, percentage: "34%" },
    { name: "Monocyte", count: 2, percentage: "0.12%" },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const DataTable = ({ title, data }) => (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
        {title}
      </h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count
              </th>
              <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                %
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-3 text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="py-2 px-3 text-sm text-gray-500 text-right">
                  {item.count}
                </td>
                <td className="py-2 px-3 text-sm text-gray-500 text-right">
                  {item.percentage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Left Panel - Findings */}
      <div
        className={`fixed md:static w-72 bg-white h-full shadow-lg overflow-y-auto transition-transform duration-300 z-20 
        ${
          isLeftPanelOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4">
          <button
            className="md:hidden absolute right-4 top-4"
            onClick={() => setIsLeftPanelOpen(false)}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          <DataTable title="RBC Analysis" data={rbcData} />
          <DataTable title="WBC Analysis" data={wbcData} />

          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Platelets
            </h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="bg-white">
                    <td className="py-2 px-3 text-sm font-medium text-gray-900">
                      Count
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-500 text-right">
                      222
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-3 text-sm font-medium text-gray-900">
                      Percentage
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-500 text-right">
                      222%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 bg-white shadow-sm flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button
              className="p-1.5 hover:bg-gray-100 rounded-lg md:hidden"
              onClick={() => setIsLeftPanelOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-gray-600 font-medium text-sm md:text-base">
              Mon Oct 07 2024 16:39:07
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
              <Printer className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
              onClick={() => setIsRightPanelOpen(true)}
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 flex p-4 gap-4 relative">
          {/* Main WSI View */}
          <div className="flex-1 relative">
            <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div
                className="h-full relative overflow-hidden cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className="absolute"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                    transition: isDragging ? "none" : "transform 0.3s ease-out",
                  }}
                >
                  <img
                    draggable="false"
                    src={wsi}
                    alt="WSI View"
                    className="max-w-none"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={handleResetZoom}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-200"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-200"
                >
                  <ZoomIn className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-200"
                >
                  <ZoomOut className="w-5 h-5 text-gray-600" />
                </button>
                {/* <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 border border-gray-200">
                  <Move className="w-5 h-5 text-gray-600" />
                </button> */}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div
            className={`fixed lg:static right-0 top-0 w-72 h-full bg-white lg:bg-transparent lg:w-72 space-y-4 p-4 shadow-lg lg:shadow-none transition-transform duration-300 z-20
            ${
              isRightPanelOpen
                ? "translate-x-0"
                : "translate-x-full lg:translate-x-0"
            }`}
          >
            <button
              className="lg:hidden absolute left-4 top-4"
              onClick={() => setIsRightPanelOpen(false)}
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Hub View */}
            <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-200 mt-12 lg:mt-0">
              <div className="text-center mb-3 text-sm font-medium text-gray-700 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                WSI Zoomed Out View (Hub)
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={wsi}
                  alt="Hub View"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Patient Info */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Patient ID
                </span>
                <span className="text-sm text-gray-500">Blood</span>
              </div>
              <button className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WSIViewer;
