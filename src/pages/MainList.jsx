// src/pages/MainList.jsx
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import axios from 'axios';

import {
  formatDate,
  formatPrice,
  getSaleStatus,
  truncateAddress,
} from '../functions/functions';
import FilterBar from '../components/FilterBar';

function MainList() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  // 초기 로드: 전체 데이터 (필터 없이)
  useEffect(() => {
    fetchFilteredData({
      jwn_lst: '',
      property_type: '',
      onlyNotExpired: false,
    });
  }, []);

  const fetchFilteredData = async (filterParams) => {
    try {
      const { jwn_lst, property_type, onlyNotExpired } = filterParams;
      const nowTime = new Date().toISOString(); // 시간까지 포함

      const params = {
        jwn_lst: jwn_lst || undefined,
        property_type: property_type || undefined,
        onlyNotExpired: onlyNotExpired || undefined,
        nowTime: onlyNotExpired ? nowTime : undefined,
      };

      const response = await axios.get('http://127.0.0.1:8000/list/', { params });
      setFilteredData(response.data);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  const handleFilter = (filterParams) => {
    fetchFilteredData(filterParams);
  };

  return (
    <>
      {/* 필터 컴포넌트 */}
      <FilterBar onFilter={handleFilter} />

      {/* 테이블 표시 */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>사건번호</th>
            <th>물건종류</th>
            <th>주소</th>
            <th>최저매각가격</th>
            <th>감정평가액</th>
            <th>매각기일</th>
            <th>담당법원</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              // UI에는 'YYYY-MM-DD'만
              const saleDateForDisplay = formatDate(item.sale_date);
              // 실제 비교는 시간까지 포함
              const saleStatus = getSaleStatus(item.sale_date);

              return (
                <tr key={index} onClick={() => navigate(`/detail/${item.id}`)}>
                  <td>{item.case_num}</td>
                  <td>{item.property_type}</td>
                  <td>{truncateAddress(item.location)}</td>
                  <td>{formatPrice(item.minimum_sale_prc)}</td>
                  <td>{formatPrice(item.appraisal_val)}</td>
                  <td>
                    {saleDateForDisplay /* YYYY-MM-DD만 표시 */}
                    {saleStatus === '마감후' && (
                      <span style={{ color: 'blue', marginLeft: 8 }}>
                        마감후
                      </span>
                    )}
                    {saleStatus === '마감전' && (
                      <span style={{ color: 'red', marginLeft: 8 }}>
                        마감전
                      </span>
                    )}
                  </td>
                  <td>{item.jwn_lst}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default MainList;
