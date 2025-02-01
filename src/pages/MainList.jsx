// src/pages/MainList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import FilterBar from '../components/FilterBar';
import { formatDate, formatPrice, getSaleStatus, truncateAddress } from '../functions/functions';
import './MainList.scss';
function MainList() {
  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [count, setCount] = useState(0);          // 전체 아이템 개수
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
  const [filters, setFilters] = useState({});     // 필터 상태(법원, 물건종류 등)

  // 페이지당 보여줄 데이터 개수 (서버에서도 동일하게 맞추는 것이 일반적)
  const pageSize = 10;

  // 컴포넌트가 마운트되거나 currentPage, filters 변경 시 호출
  useEffect(() => {
    fetchFilteredData(filters, currentPage);
  }, [filters, currentPage]);

  // 서버에 데이터 요청
  const fetchFilteredData = async (filterParams, page) => {
    try {
      const { jwn_lst, property_type, only_not_expired } = filterParams;
      const nowTime = new Date().toISOString();

      const params = {
        jwn_lst: jwn_lst || undefined,
        property_type: property_type || undefined,
        only_not_expired: only_not_expired || undefined,
        now_time: only_not_expired ? nowTime : undefined,
        page, // 페이지 번호
      };

      const response = await axios.get('http://127.0.0.1:8000/list/', { params });
      setListData(response.data.results); 
      setCount(response.data.count);  // 전체 아이템 개수
    } catch (error) {
      console.error(error);
    }
  };

  // FilterBar에서 필터 적용하면 필터 상태 저장 & 페이지를 1로 초기화
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // 페이지 이동
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="main-container">
      {/* 필터 컴포넌트 */}
      <FilterBar onFilter={handleFilter} />

      <table className='main-table'>
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
                <tr className="table-row" key={idx} onClick={() => navigate(`/detail/${item.id}`)}>
                  <td>{item.case_num}</td>
                  <td>{item.property_type}</td>
                  <td>{truncateAddress(item.location)}</td>
                  <td>{formatPrice(item.minimum_sale_prc)}</td>
                  <td>{formatPrice(item.appraisal_val)}</td>
                  <td>
                    {saleDateForDisplay}
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
        </table>
      {/* </Table> */}

      {/* 페이지네이션 */}
      <Pagination className="justify-content-center">
        {/* 뒤로 3칸 이동 */}
        <Pagination.Item
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(Math.max(1, currentPage - 3))}
        >
          &laquo;3
        </Pagination.Item>

        {/* 뒤로 1칸 이동 */}
        <Pagination.Prev
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
        />

        {/* 현재 페이지 / 전체 페이지 표시 (버튼 대신 단순 표시) */}
        <Pagination.Item active>
          {currentPage} / {totalPages}
        </Pagination.Item>

        {/* 앞으로 1칸 이동 */}
        <Pagination.Next
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
        />

        {/* 앞으로 3칸 이동 */}
        <Pagination.Item
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 3))}
        >
          3&raquo;
        </Pagination.Item>
      </Pagination>
    </div>
  );
}

export default MainList;
