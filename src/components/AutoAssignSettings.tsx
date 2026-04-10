import React, { useState } from 'react';

import { Footer } from './Footer';

export function AutoAssignSettings() {
  const [isUsed, setIsUsed] = useState(false);

  const handleSave = () => {
    // Save logic
    console.log('Saved:', { isUsed });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center shrink-0">
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight mr-4">자동 배정 설정</h1>
        <span className="text-sm text-gray-500">설계사에게 자동 배정 여부를 설정할 수 있습니다.</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-[30px] py-8">
        <div className="w-full flex flex-col h-full min-h-[calc(100vh-12rem)]">
          
          <div className="border border-gray-300 bg-white p-10">
            <div className="mb-10">
              <p className="text-sm font-bold text-gray-900">
                사용함을 선택하시면, 보닥에서 제공하는 DB를 설계사에게 까지 자동 배정해 드립니다.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                (변경된 설정 값은 익일 00:00시 부터 적용)
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="autoAssign" 
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                    checked={!isUsed}
                    onChange={() => setIsUsed(false)}
                  />
                  <span className="text-sm font-bold text-gray-900 w-20">사용안함</span>
                </label>
                <span className="text-sm text-gray-700">
                  ( 해당 조직의 “DB 배정 관리 &gt; 미배정 DB” 메뉴로 이관되며, 직접 설계사에게 배정하셔야 해요. )
                </span>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="autoAssign" 
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                    checked={isUsed}
                    onChange={() => setIsUsed(true)}
                  />
                  <span className="text-sm font-bold text-gray-900 w-20">사용함</span>
                </label>
                <span className="text-sm text-gray-700">
                  ( 해당 조직의 소속 된 설계사에게 1/N으로 자동 배정 되며, 퇴사한 설계사가 있다면 해촉 처리해 주세요. )
                </span>
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

          <div className="mt-8"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
