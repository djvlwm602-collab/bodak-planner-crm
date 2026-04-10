import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReassignType {
  id: string;
  name: string;
  description: string;
  isUsed: boolean;
}

const initialTypes: ReassignType[] = [
  { id: '1', name: '반환', description: '입력한 설명이 노출됩니다.', isUsed: true },
  { id: '2', name: '무상', description: '입력한 설명이 노출됩니다.', isUsed: true },
  { id: '3', name: '양도', description: '입력한 설명이 노출됩니다.', isUsed: true },
  { id: '4', name: '패널티', description: '입력한 설명이 노출됩니다.', isUsed: false },
];

import { Footer } from './Footer';

export function ReassignTypeSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [types, setTypes] = useState<ReassignType[]>(initialTypes);
  const [editTypes, setEditTypes] = useState<ReassignType[]>([]);

  const handleEditStart = () => {
    setEditTypes(JSON.parse(JSON.stringify(types)));
    setIsEditing(true);
  };

  const handleSave = () => {
    setTypes(editTypes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddType = () => {
    const newType: ReassignType = {
      id: `new-${Date.now()}`,
      name: '',
      description: '',
      isUsed: true,
    };
    setEditTypes([...editTypes, newType]);
  };

  const handleDeleteType = (id: string) => {
    setEditTypes(editTypes.filter(t => t.id !== id));
  };

  const handleTypeChange = (id: string, field: keyof ReassignType, value: string | boolean) => {
    setEditTypes(editTypes.map(t => {
      if (t.id === id) {
        return { ...t, [field]: value };
      }
      return t;
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center shrink-0">
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight mr-4">재배정 타입 설정</h1>
        <span className="text-sm text-gray-500">다른 설계사에게 고객 재배정 시, 사유를 설정할 수 있습니다.</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-[30px] py-8">
        <div className="w-full flex flex-col gap-6">
          
          {/* 기본 타입 */}
          <div className="border border-gray-300 bg-gray-50/30 flex h-[64px]">
            <div className="w-[120px] px-6 text-sm font-bold text-gray-900 flex items-center">
              타입 이름
            </div>
            <div className="flex-1 px-6 text-sm text-gray-700 flex items-center">
              기본
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 my-2"></div>

          {/* 커스텀 타입 목록 */}
          <div className="border border-gray-300 bg-white">
            {(isEditing ? editTypes : types).map((type, index) => (
              <div 
                key={type.id} 
                className={cn(
                  "flex items-center h-[64px]",
                  index !== (isEditing ? editTypes : types).length - 1 && "border-b border-gray-200"
                )}
              >
                <div className="w-[120px] px-6 text-sm font-bold text-gray-900 flex items-center">
                  타입 이름
                </div>
                <div className="w-[200px] px-4 flex items-center">
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-900 bg-white"
                      value={type.name}
                      onChange={(e) => handleTypeChange(type.id, 'name', e.target.value)}
                      placeholder="타입 이름"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{type.name}</span>
                  )}
                </div>

                <div className="w-[80px] px-4 text-sm font-bold text-gray-900 flex items-center justify-center">
                  설명
                </div>
                <div className="flex-1 px-4 flex items-center">
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-900 bg-white"
                      value={type.description}
                      onChange={(e) => handleTypeChange(type.id, 'description', e.target.value)}
                      placeholder="입력한 설명이 노출됩니다."
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{type.description}</span>
                  )}
                </div>

                <div className="w-[260px] px-6 flex items-center justify-between">
                  {isEditing ? (
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name={`isUsed-${type.id}`} 
                          className="w-4 h-4 text-black focus:ring-black border-gray-300"
                          checked={type.isUsed === true}
                          onChange={() => handleTypeChange(type.id, 'isUsed', true)}
                        />
                        <span className="text-sm text-gray-900 whitespace-nowrap">노출함</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name={`isUsed-${type.id}`} 
                          className="w-4 h-4 text-black focus:ring-black border-gray-300"
                          checked={type.isUsed === false}
                          onChange={() => handleTypeChange(type.id, 'isUsed', false)}
                        />
                        <span className="text-sm text-gray-900 whitespace-nowrap">노출안함</span>
                      </label>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700">{type.isUsed ? '노출함' : '노출안함'}</span>
                  )}
                  
                  {isEditing && (
                    <button 
                      className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                      onClick={() => handleDeleteType(type.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 타입 추가 버튼 (수정 모드일 때만 표시) */}
          {isEditing && (
            <div className="flex justify-center mt-2">
              <button 
                className="border border-gray-900 bg-white text-gray-900 px-16 py-2.5 rounded-sm text-sm font-bold hover:bg-gray-50 transition-colors flex items-center gap-1"
                onClick={handleAddType}
              >
                + 타입 추가
              </button>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end pt-6 mt-auto">
            {isEditing ? (
              <div className="flex gap-2">
                <button 
                  className="bg-white text-gray-900 border border-gray-300 px-10 py-2 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors"
                  onClick={handleCancel}
                >
                  취소
                </button>
                <button 
                  className="bg-black text-white px-10 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors"
                  onClick={handleSave}
                >
                  확인
                </button>
              </div>
            ) : (
              <button 
                className="bg-black text-white px-10 py-2 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors"
                onClick={handleEditStart}
              >
                수정
              </button>
            )}
          </div>

          <div className="mt-8"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
