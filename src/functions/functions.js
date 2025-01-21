/**
 * 가격을 3자리 단위로 끊어서 표시하고 '원'을 붙이는 함수
 * 예: 10000 -> 10,000원
 */
export function formatPrice(value) {
    const num = Number(value);
    if (isNaN(num)) return value;  // 숫자가 아닌 경우 그대로 반환
    return num.toLocaleString('ko-KR') + '원';
  }
  
  /**
   * 날짜 문자열에서 YYYY-MM-DD만 추출하는 함수
   * 예: 2025-01-24 12:00:00 -> 2025-01-24
   */
  export function formatDate(dateString) {
    if (!dateString) return '';
    return dateString.slice(0, 10);
  }
  
  /**
   * 주소 문자열이 특정 길이를 초과하면 잘라주고, '...' 붙이기
   * 예: 최대 20글자로 설정
   */
  export function truncateAddress(address, maxLength = 20) {
    if (!address) return '';
    if (address.length <= maxLength) return address;
    return address.slice(0, maxLength) + '...';
  }
  
  /**
   * 매각 상태를 결정하는 함수
   * @param {string} saleDateString - 매각기일 (YYYY-MM-DD)
   * @param {number} days - 마감임박 기준일 (기본 7일)
   * @returns {string|null} - '매각완료', '마감임박', 그 외는 null
   */
  export function getSaleStatus(saleDateString, days = 7) {
    const today = new Date();
    const saleDate = new Date(saleDateString);
    // saleDate가 유효하지 않으면 상태 표시 불가
    if (isNaN(saleDate.getTime())) return null;
  
    // 두 날짜의 일(day) 차이
    const diffInDays = (saleDate - today) / (1000 * 60 * 60 * 24);
  
    // 1) 매각기일이 이미 지났으면 '매각완료'
    if (diffInDays < 0) {
      return '매각기일지남';
    }
    // 2) 매각기일까지 7일 미만이면 '마감임박'
    else if (diffInDays < days) {
      return '마감임박';
    }
    // 3) 그 외에는 표시 없음
    return null;
  }