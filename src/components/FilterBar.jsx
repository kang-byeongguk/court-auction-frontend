// src/components/FilterBar.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

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
      onlyNotExpired,
    });
  };

  return (
    <Form className="p-3" style={{ border: '1px solid #ccc', marginBottom: '1rem' }} onSubmit={handleSubmit}>
      <Row className="align-items-end">
        {/* 담당법원 */}
        <Col md={3}>
          <Form.Group controlId="jwnLstSelect">
            <Form.Label>담당법원</Form.Label>
            <Form.Select value={selectedJwnLst} onChange={handleJwnLstChange}>
              <option value="">전체</option>
              <option value="서울중앙지방법원">서울중앙지방법원</option>
              <option value="서울동부지방법원">서울동부지방법원</option>
              <option value="서울남부지방법원">서울남부지방법원</option>
              {/* 필요에 맞춰 추가 */}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* 물건종류 */}
        <Col md={3}>
          <Form.Group controlId="propertyTypeSelect">
            <Form.Label>물건종류</Form.Label>
            <Form.Select value={selectedPropertyType} onChange={handlePropertyTypeChange}>
              <option value="">전체</option>
              <option value="다세대">다세대</option>
              <option value="오피스텔">오피스텔</option>
              <option value="주택">주택</option>
              <option value="공장">공장</option>
              {/* 필요에 맞춰 추가 */}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* 체크박스: 마감 전만 보기 */}
        <Col md={3}>
          <Form.Check
            type="checkbox"
            id="onlyNotExpired"
            label="매각기일 마감 전만 보기"
            checked={onlyNotExpired}
            onChange={handleOnlyNotExpiredChange}
          />
        </Col>

        {/* 정렬 버튼 (흑백톤) */}
        <Col md={3}>
          {/* Bootstrap variant="dark" 또는 "secondary" 사용 */}
          <Button variant="dark" type="submit">
            정렬
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterBar;
