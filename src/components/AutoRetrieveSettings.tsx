import React, { useState } from 'react';
import { cn } from '../lib/utils';

export function AutoRetrieveSettings() {
  const [isUsed, setIsUsed] = useState(true);
  const [hours, setHours] = useState('30');

  const handleSave = () => {
    // Save logic
    console.log('Saved:', { isUsed, hours });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center shrink-0">
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight mr-4">자동 회수 설정</h1>
        <span className="text-sm text-gray-500">배정 후, 상담 미 시도시 DB를 자동으로 회수할 수 있습니다.</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-[30px] py-8">
        <div className="w-full flex flex-col h-full min-h-[calc(100vh-12rem)]">
          
          <div className="border border-gray-300 bg-white p-10">
            <div className="mb-10">
              <p className="text-sm font-bold text-gray-900">
                설계사에게 배정한 DB를 설정한 시간 내 상담을 시작하지 않으면 자동으로 DB를 미배정으로 회수할 수 있어요.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                (변경된 설정 값은 익일 00:00시 부터 적용)
              </p>
            </div>

            <div className="flex items-center gap-12">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="autoRetrieve" 
                  className="w-4 h-4 text-black focus:ring-black border-gray-300"
                  checked={!isUsed}
                  onChange={() => setIsUsed(false)}
                />
                <span className="text-sm font-bold text-gray-900">사용안함</span>
              </label>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="autoRetrieve" 
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                    checked={isUsed}
                    onChange={() => setIsUsed(true)}
                  />
                  <span className="text-sm font-bold text-gray-900">사용함</span>
                </label>
                
                <div className="flex items-center text-sm text-gray-700 ml-2">
                  (
                  <input 
                    type="text" 
                    className={cn(
                      "w-16 px-3 py-1.5 mx-2 border rounded-sm text-center focus:outline-none focus:border-gray-900",
                      isUsed ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50 text-gray-400"
                    )}
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    disabled={!isUsed}
                  />
                  시간 이내, 상담 미 시도시 미배정으로 회수됩니다. )
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end pt-6 mt-auto">
            <button 
              className="bg-black text-white px-12 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors"
              onClick={handleSave}
            >
              확인
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
