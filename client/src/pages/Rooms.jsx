import React from "react";
import { useNavigate } from "react-router";

function Rooms() {
  // สร้าง array [1, 2, ..., 10] เพื่อเอาไปวนลูปสร้างปุ่ม
  const rooms = Array.from({ length: 10 }, (_, i) => i + 1);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header ส่วนหัวข้อ */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Select a Room
          </h1>
          <p className="text-base-content/70">
            กรุณาเลือกห้องที่คุณต้องการเข้าใช้งาน
          </p>
        </header>

        {/* Grid Container สำหรับปุ่ม */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {rooms.map((roomNumber) => (
            <button
              key={roomNumber}
              className="btn btn-outline btn-primary hover:scale-105 transition-transform duration-200 h-24 text-lg"
              onClick={() => {
                alert(`Entering Room ${roomNumber}`);
                navigate(`/chat/room${roomNumber}`);
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs opacity-60">Door</span>
                <span>Room {roomNumber}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer ตกแต่งเพิ่มเติม */}
        <div className="mt-12 text-center">
          <div className="badge badge-secondary badge-outline">
            Available: 10 Rooms
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
