// src/components/FilterBar.jsx
import React, { useState } from 'react';
import './FilterBar.scss';
function FilterBar({ onFilter }) {
  const [selectedJwnLst, setSelectedJwnLst] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [onlyNotExpired, setOnlyNotExpired] = useState(false);

  /** 담당법원 드롭다운 변경 */
  const handleJwnLstChange = (e) => {
    setSelectedJwnLst(e.target.value);
  };

  /** 물건종류 드롭다운 변경 */
  const handlePropertyTypeChange = (e) => {
    setSelectedPropertyType(e.target.value);
  };

  /** 체크박스 (마감 전만 보기) 변경 */
  const handleOnlyNotExpiredChange = (e) => {
    setOnlyNotExpired(e.target.checked);
  };

  /** "정렬" 버튼 클릭 시 호출 */
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    onFilter({
      jwn_lst: selectedJwnLst,
      property_type: selectedPropertyType,
      only_not_expired:onlyNotExpired
    });
  };

  return (
    <form className="filter-container" onSubmit={handleSubmit}>
      <div className="filter-item">
        <label htmlFor="jwnLstSelect">담당법원</label>
        <select id="jwnLstSelect" value={selectedJwnLst} onChange={handleJwnLstChange}>
        <option value="">전체</option>
              <option value="서울중앙지방법원">서울중앙지방법원</option>
               <option value="서울동부지방법원">서울동부지방법원</option>
               <option value="서울남부지방법원">서울남부지방법원</option>
        </select>
      </div>
      
      <div className="filter-item">
        <label htmlFor="propertyType">물건종류</label>
        <select id="propertyType" value={selectedPropertyType} onChange={handlePropertyTypeChange}>
        <option value="">전체</option>
               <option value="아파트">아파트</option>
               <option value="근린시설">근린시설</option>
               <option value="다세대">다세대</option>
               <option value="기타">기타</option>
               <option value="오피스텔">오피스텔</option>
               <option value="단독주택">단독주택</option>
               <option value="상가">상가</option>
               <option value="다가구주택">다가구주택</option>
               <option value="빌라">빌라</option>
               <option value="상가,오피스텔,근린시설">상가,오피스텔,근린시설</option>
               <option value="연립주택">연립주택</option>
               <option value="단독주택,다가구주택">단독주택,다가구주택</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="onlyNotExpired">매각기일 마감 전만 보기</label>
        <input type="checkbox" id="onlyNotExpired" checked={onlyNotExpired} onChange={handleOnlyNotExpiredChange}/>
      </div>
      <div className="filter-item">
        <button type="submit" className="filter-button">
          정렬
        </button>
      </div>
  </form>
  );
}

export default FilterBar;
