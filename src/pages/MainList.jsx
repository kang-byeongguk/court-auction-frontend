// src/pages/MainList.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import { formatDate, formatPrice, getSaleStatus, truncateAddress } from '../functions/functions';
import './MainList.scss';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

function MainList() {
  const navigate = useNavigate();
  const url = useSelector((state) => state.url);

  // 필터와 페이지 번호는 로컬 상태로 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  
  // 페이지당 보여줄 데이터 개수
  const pageSize = 10;

  // react-query를 이용해 데이터 요청
  const { data, isLoading, error } = useQuery({
    queryKey: ['list', filters, currentPage, url],
    queryFn: async () => {
      const { jwn_lst, property_type, only_not_expired } = filters;
      const nowTime = new Date().toISOString();

      const params = {
        jwn_lst: jwn_lst || undefined,
        property_type: property_type || undefined,
        only_not_expired: only_not_expired || undefined,
        // only_not_expired가 true일 때 현재 시간을 전달
        now_time: only_not_expired ? nowTime : undefined,
        page: currentPage,
      };

      const response = await axios.get(url + 'list/', { params });
      return response.data;
    },
    enabled: !!url, // url이 유효할 때만 쿼리 실행
  });

  // 필터 적용 핸들러: 필터 변경 시 페이지 번호를 1로 초기화
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // 페이지 이동 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  // react-query의 data에서 results와 count를 추출
  const listData = data.results;
  const count = data.count;
  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="main-container">
      {/* 필터 컴포넌트 */}
      <FilterBar onFilter={handleFilter} />

      {/* 테이블 */}
      <table className="main-table">
        <thead>
          <tr>
            <th className="sample">사건번호</th>
            <th>물건종류</th>
            <th>주소</th>
            <th>최저매각가격</th>
            <th>감정평가액</th>
            <th>매각기일</th>
            <th>담당법원</th>
          </tr>
        </thead>
        <tbody>
          {listData && listData.length > 0 ? (
            listData.map((item, idx) => {
              const saleDateForDisplay = formatDate(item.sale_date);
              const saleStatus = getSaleStatus(item.sale_date);
              return (
                <tr
                  className="table-row"
                  key={idx}
                  onClick={() => navigate(`/detail/${item.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{item.case_num}</td>
                  <td>{item.property_type}</td>
                  <td>{truncateAddress(item.location)}</td>
                  <td>{formatPrice(item.minimum_sale_prc)}</td>
                  <td>{formatPrice(item.appraisal_val)}</td>
                  <td>
                    {saleDateForDisplay}
                    {saleStatus === '마감후' && (
                      <span className='text-blue' style={{  marginLeft: 8 }}>
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
      </table>

      {/* 페이지네이션 (순수 React/HTML) */}
      <div className="pagination-container" style={{ textAlign: 'center', marginTop: '1rem' }}>
        {/* 뒤로 3칸 이동 */}
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(Math.max(1, currentPage - 3))}
        >
          &laquo;3
        </button>
        {/* 뒤로 1칸 이동 */}
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          style={{ marginLeft: '5px' }}
        >
          이전
        </button>

        {/* 현재 페이지 / 전체 페이지 표시 */}
        <span style={{ margin: '0 8px' }}>
          {currentPage} / {totalPages}
        </span>

        {/* 앞으로 1칸 이동 */}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        >
          다음
        </button>

        {/* 앞으로 3칸 이동 */}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 3))}
          style={{ marginLeft: '5px' }}
        >
          3&raquo;
        </button>
      </div>
    </div>
  );
}

export default MainList;
