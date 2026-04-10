import React from 'react';

export function Footer() {
  return (
    <footer className="h-14 border-t border-gray-200 px-6 text-xs text-gray-500 flex items-center shrink-0 bg-white mt-auto">
      <span>Copyright@ Aijinet. All right reserved</span>
      <div className="flex items-center gap-4 ml-8">
        <a href="#" className="hover:text-gray-800">서비스 이용약관</a>
        <span>|</span>
        <a href="#" className="hover:text-gray-800">개인정보처리방침</a>
      </div>
    </footer>
  );
}
