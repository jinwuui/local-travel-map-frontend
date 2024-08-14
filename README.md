### 바로가기

[Service Structure](#Service-Structure)

[프로젝트 설명](#로컬xyz)

[사이트 UI](#사이트-UI)

---

# Service Structure

<img alt="looocal-architecture" src="https://github.com/user-attachments/assets/fd0477d0-e47a-466a-a460-00626f02f3ca">

---

# 로컬xyz

[사이트 링크](https://looocal.xyz)

## 개요

전 세계 곳곳의 숨겨진 로컬 여행지를 공유하고 검색할 수 있는 사이트

## 주요 성과

- 검색어 자동 완성, 태그 검색, 즐겨찾기, 건의 기능 등의 사용자 편의 기능
- Nginx를 이용하여 로컬 컴퓨터에서 웹 서버와 백엔드 서버 운영중
- GitHub 웹훅과 Jenkins를 활용한 CI/CD 구축

## 기술 스택

Vue.js / Express.js / SQLite3

Google Map API / Nginx / Jenkins

## 기술적 도전과 해결 방법

### 검색어 자동 완성
- **기존 방식**: 여행지의 제목 또는 내용과 일치하는 초성 및 한/영 철자를 기반으로 검색
- **개선 방식 1**: 기존의 '일치 방식'에 더해, 임베딩(embedding)으로 유사도를 계산하여 검색어를 자동 완성하도록 구현 변경
  - **해결 방법**
    1. 임베딩 값 저장: 여행지를 생성할 때, OpenAI의 텍스트 임베딩 모델로 제목/나라 등의 여행지 정보에 대한 임베딩 값을 계산
    2. 유사도 계산: 사용자가 검색을 수행할 때, 입력된 검색어의 임베딩 값과 저장된 여행지들의 유사도를 계산 (벡터 연산)
    3. 결과 통합: 기존 '일치 방식'의 결과와 유사도 계산 방식의 결과를 합하여 사용자에게 반환

  - **전후 비교**
    - **전 (완전 일치 검색)**
    
      <img width="300" alt="Screenshot 2024-07-11 at 12 46 31 PM" src="https://github.com/jinwuui/local-travel-map-frontend/assets/97392729/6331d094-c421-4803-a31a-6996d1081630">

    - **후 (유사도 검색)**
    
      <img width="300" alt="Screenshot 2024-07-11 at 12 46 31 PM" src="https://github.com/jinwuui/local-travel-map-frontend/assets/97392729/67bf6d98-6bc7-4d93-8d47-33150dbd4924">

- **개선 방식 2**: Cache API와 Service Worker로 프론트엔드 성능 최적화
  - 동일 키워드로 재검색 시, 네트워크 요청을 최소화하고 로드 시간을 단축
  - 540ms -> 2ms / 1010ms -> 2ms
    
    <img width="521" alt="Screenshot 2024-07-12 at 3 18 17 PM" src="https://github.com/user-attachments/assets/cd397ad4-b05f-4949-a39f-d76354d03c4e">

- **개선 방식 3**: 동일 키워드에 대한 결과값을 Redis에 캐싱하여 백엔드 성능 최적화
  - 불필요한 외부 API 요청과 DB 연산을 줄임
  - 600ms -> 2ms / 540 -> 2ms
  
    <img width="770" alt="스크린샷 2024-07-14 오전 10 29 34" src="https://github.com/user-attachments/assets/231007f3-116d-4489-b7a5-3962fc0f1cf4">


### 이미지 최적화
- **기존 방식**: 상세 이미지와 썸네일에 2가지 종류를 사용 (원본 / 썸네일)
- **개선 방식**: 상세 이미지와 썸네일에 4가지 종류를 사용 (small, medium, large / 썸네일)
- **세부 설명**:
  1. 사용자가 여행지를 등록할 때, 비동기적으로 4가지 종류의 이미지를 생성
  2. 이미지 생성 시, 더 효율적인 이미지 포맷인 WebP로 생성
  3. `<img>` 태그의 `srcset`과 `sizes` 속성을 사용하여 사용자의 화면 크기에 맞춰 이미지를 제공
  4. 정적 파일(이미지, 폰트)에 캐시 설정을 추가
  5. 서브셋 폰트 적용으로 로딩 시간 단축

- **전후 비교**:
  - **전**: 원본 전체 24MB, 썸네일 전체 3.3MB
  - **후**: medium 사이즈 전체 2.2MB, 썸네일 전체 483KB
  - **개선 효과**: 상세 이미지 크기 약 11배 감소, 썸네일 크기 약 7배 감소

---

# 사이트 UI

<img width="500" alt="Screenshot 2024-07-29 at 2 18 03 PM" src="https://github.com/user-attachments/assets/c29c80a1-8bd7-4787-9883-e18d8c5e6f72">
<img width="500" alt="Screenshot 2024-07-29 at 2 17 36 PM" src="https://github.com/user-attachments/assets/3deccbfa-610b-4e0e-bbae-468c4d5d3811">
<img width="500" alt="Screenshot 2024-07-29 at 2 16 57 PM" src="https://github.com/user-attachments/assets/24399ff4-f95b-4a5b-92d3-21e0218fb898">
<img width="500" alt="Screenshot 2024-07-29 at 2 16 37 PM" src="https://github.com/user-attachments/assets/aee17791-411a-4dac-8bd8-6ecdaa7ae8b0">
<img width="500" alt="Screenshot 2024-07-29 at 2 15 50 PM" src="https://github.com/user-attachments/assets/702f4602-f793-4232-8501-52f5d24bbb92">
<img width="500" alt="Screenshot 2024-07-29 at 2 15 50 PM" src="https://github.com/user-attachments/assets/192f0d64-a251-4f62-a43b-5b8f8de6a926">


