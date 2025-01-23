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
  // 예: "2025-01-24 10:00:00" -> slice(0, 10) = "2025-01-24"
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
 * 매각 상태를 시간까지 고려해 결정하는 함수
 * @param {string} saleDateString - 매각기일 (YYYY-MM-DD HH:MM:SS 등)
 * @returns {string|null} - '마감후', '마감전', 혹은 null(판별 불가)
 */
export function getSaleStatus(saleDateString) {
  const now = new Date();
  const saleDate = new Date(saleDateString); // 시간까지 포함
  // saleDate가 유효하지 않으면 상태 표시 불가
  if (isNaN(saleDate.getTime())) return null;

  // 두 날짜 간 ms 단위 차이
  const diffMs = saleDate - now;

  // 이미 지났으면 '마감후'
  if (diffMs < 0) {
    return '마감후';
  } else {
    return '마감전';
  }
}
