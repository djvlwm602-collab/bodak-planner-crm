/**
 * Role: 재배정 타입 설정 페이지 — 커스텀 재배정 타입 CRUD
 * Key Features: 테이블 헤더 고정, 수정 모드 전환, 타입 추가(점선 행)/삭제
 * Dependencies: 공용 UI 컴포넌트(Button, PageHeader)
 */
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Footer } from './Footer';

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

export function ReassignTypeSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [types, setTypes]         = useState<ReassignType[]>(initialTypes);
  const [editTypes, setEditTypes] = useState<ReassignType[]>([]);

  const handleEditStart = () => {
    setEditTypes(JSON.parse(JSON.stringify(types)));
    setIsEditing(true);
  };
  const handleSave   = () => { setTypes(editTypes); setIsEditing(false); };
  const handleCancel = () => setIsEditing(false);

  const handleAddType = () => {
    setEditTypes([...editTypes, { id: `new-${Date.now()}`, name: '', description: '', isUsed: true }]);
  };
  const handleDeleteType = (id: string) => {
    setEditTypes(editTypes.filter(t => t.id !== id));
  };
  const handleTypeChange = (id: string, field: keyof ReassignType, value: string | boolean) => {
    setEditTypes(editTypes.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const rows = isEditing ? editTypes : types;

  return (
    <div className="flex-1 flex flex-col h-full bg-bg overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col pb-5">
          <div className="px-[30px] pt-8">
            <div className="w-full flex flex-col gap-6">

              {/* 테이블 */}
              <div className="border border-border-primary rounded-lg bg-white overflow-hidden">

                {/* 헤더 */}
                <div className="flex items-center bg-white border-b border-bg-faint text-[13px] font-semibold text-text-secondary">
                  <div className="w-[18%] py-3.5 pl-8 pr-5">타입 이름</div>
                  <div className="flex-1 py-3.5 px-5">설명</div>
                  <div className="w-[200px] py-3.5 px-5">노출 여부</div>
                  {isEditing
                    ? <div className="w-[100px] py-3.5 px-4 text-center">관리</div>
                    : <div className="w-[100px]" />}
                </div>

                {/* 빈 상태 — 타입이 하나도 없을 때만 표시 */}
                {rows.length === 0 && (
                  <div className="flex items-center min-h-[52px] bg-bg-primary/60 border-b border-dashed border-border-primary">
                    <div className="w-[18%] py-3.5 pl-8 pr-5">
                      <span className="text-[13px] text-gray-300">타입 이름</span>
                    </div>
                    <div className="flex-1 py-3.5 px-5 flex items-center gap-2">
                      <span className="text-[13px] text-gray-300">입력한 설명이 노출됩니다.</span>
                      <span className="text-[10px] text-gray-300 border border-border-primary rounded px-1.5 py-0.5 leading-none">예시</span>
                    </div>
                    <div className="w-[200px] py-3.5 px-5">
                      <span className="text-[13px] text-gray-300">노출 여부</span>
                    </div>
                    <div className="w-[100px]" />
                  </div>
                )}

                {/* 데이터 행 — 구분선 없음, 홀수행 zebra */}
                {rows.map((type, idx) => (
                  <div
                    key={type.id}
                    className="flex items-center min-h-[52px] bg-white"
                  >
                    {/* 타입 이름 */}
                    <div className="w-[18%] py-3.5 pl-8 pr-5">
                      {isEditing ? (
                        <input
                          type="text"
                          className="w-full px-3 py-1.5 border border-border rounded-md text-[14px] text-text-primary bg-bg focus:outline-none focus:border-text-primary"
                          value={type.name}
                          onChange={e => handleTypeChange(type.id, 'name', e.target.value)}
                          placeholder="타입 이름"
                        />
                      ) : (
                        <span className="text-[14px] text-text-primary font-medium">{type.name}</span>
                      )}
                    </div>

                    {/* 설명 */}
                    <div className="flex-1 py-3.5 px-5">
                      {isEditing ? (
                        <input
                          type="text"
                          className="w-full px-3 py-1.5 border border-border rounded-md text-[14px] text-text-primary bg-bg focus:outline-none focus:border-text-primary"
                          value={type.description}
                          onChange={e => handleTypeChange(type.id, 'description', e.target.value)}
                          placeholder="입력한 설명이 노출됩니다."
                        />
                      ) : (
                        <span className="text-[14px] text-text-secondary">{type.description}</span>
                      )}
                    </div>

                    {/* 노출 여부 */}
                    <div className="w-[200px] py-3.5 px-5">
                      {isEditing ? (
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`isUsed-${type.id}`}
                              className="w-4 h-4 accent-primary"
                              checked={type.isUsed === true}
                              onChange={() => handleTypeChange(type.id, 'isUsed', true)}
                            />
                            <span className="text-[13px] text-text-primary whitespace-nowrap">노출함</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`isUsed-${type.id}`}
                              className="w-4 h-4 accent-primary"
                              checked={type.isUsed === false}
                              onChange={() => handleTypeChange(type.id, 'isUsed', false)}
                            />
                            <span className="text-[13px] text-text-primary whitespace-nowrap">노출안함</span>
                          </label>
                        </div>
                      ) : (
                        <span className="text-[14px] text-text-secondary">{type.isUsed ? '노출함' : '노출안함'}</span>
                      )}
                    </div>

                    {/* 관리 — 항상 자리 확보, 수정 모드에서만 버튼 표시 */}
                    <div className="w-[100px] px-4 flex items-center justify-center">
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleDeleteType(type.id)}
                          className="px-3 py-1 text-xs font-medium rounded-md bg-danger-subtle text-danger hover:bg-danger/10 transition-colors"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* 타입 추가 — 점선 행 (수정 모드만) */}
                {isEditing && (
                  <button
                    onClick={handleAddType}
                    className="w-full flex items-center justify-center h-[48px] pb-4 text-[13px] text-text-secondary hover:text-primary hover:font-medium transition-colors"
                  >
                    + 새 타입 추가
                  </button>
                )}
              </div>

              {/* 하단 액션 */}
              <div className="flex justify-end mt-auto">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="md" onClick={handleCancel}>취소</Button>
                    <Button variant="primary" size="md" onClick={handleSave}>확인</Button>
                  </div>
                ) : (
                  <Button variant="primary" size="lg" onClick={handleEditStart}>수정</Button>
                )}
              </div>

            </div>
          </div>
          <div className="flex-1 min-h-[50px]" />
          <Footer />
        </div>
      </div>
    </div>
  );
}
