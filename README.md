### 바로가기

[Service Structure](#Service-Structure)

[한국어](#로컬xyz)

[日本語](#ローーカルxyz)

---

# Service Structure

<img alt="looocal-architecture" src="https://github.com/jinwuui/local-travel-map-frontend/assets/97392729/ed2eb9ac-8525-42fd-96ba-ee6d8d28ab0f">

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

- 검색어 자동 완성
  - 기존 방식: 여행지의 제목 또는 내용과 일치하는 초성 및 한/영 철자를 기반으로 검색
  - 개선 방식: 기존의 '일치 방식'에 더해, 임베딩(embedding)을 계산하여 유사도를 기반으로 검색어를 자동 완성하도록 구현 변경
  - 해결 방법
    1. 임베딩 값 저장: 여행지를 생성할 때, 제목/내용/나라/카테고리 정보를 OpenAI의 텍스트 임베딩 모델을 사용하여 임베딩 값을 계산하고 별도로 저장
    2. 유사도 계산: 사용자가 검색을 수행할 때, 입력된 검색어의 임베딩 값을 구하고, 벡터 연산을 통해 저장된 여행지들과의 유사도를 계산
    3. 결과 통합: 기존 '일치 방식'에서 나온 결과와 임베딩 방식에서 나온 결과를 병합하고 중복을 제거하여 사용자에게 반환

  - 전후 비교
    - 전 (완전 일치 검색)
      
      <img width="300" alt="Screenshot 2024-07-11 at 12 46 31 PM" src="https://github.com/jinwuui/local-travel-map-frontend/assets/97392729/6331d094-c421-4803-a31a-6996d1081630">

    - 후 (유사도 검색)
      
      <img width="300" alt="Screenshot 2024-07-11 at 12 46 31 PM" src="https://github.com/jinwuui/local-travel-map-frontend/assets/97392729/67bf6d98-6bc7-4d93-8d47-33150dbd4924">

  - 추후 개선 사항
    1. 한국어 최적화: 한국어 텍스트의 임베딩 정확도를 향상시키기 위해 KoBERT, KoSentenceBERT와 같은 한국어에 특화된 임베딩 모델을 테스트
    2. 캐싱: 동일한 검색어에 대한 임베딩값과 검색어 목록을 캐싱

- 성능 개선 (검색어 자동 완성)
  - Cache API와 Service Worker로 프론트엔드 성능 최적화
  - 동일 키워드로 재검색 시 네트워크 요청을 최소화하고 로드 시간을 단축
    - 540ms -> 2ms / 1010ms -> 2ms
    
    <img width="521" alt="Screenshot 2024-07-12 at 3 18 17 PM" src="https://github.com/user-attachments/assets/cd397ad4-b05f-4949-a39f-d76354d03c4e">


---

# ローーカルxyz

[サイトリンク](https://looocal.xyz)

## 概要

世界各地の隠れたローカル旅行先を共有し、検索できるサイト

## 主な成果

- 検索語の自動補完、タグ検索、お気に入り、フィードバック機能などのユーザー便宜機能
- Nginxを利用してローカルコンピューターでウェブサーバーとバックエンドサーバーを運営中
- GitHubウェブフックとJenkinsを活用したCI/CDの構築

## 技術スタック

Vue.js / Express.js / SQLite3

Google Map API / Nginx / Jenkins

## 技術的な挑戦と解決方法

- 検索語の自動補完
  - 従来の方式: 旅行先のタイトルまたは内容と一致する初声および韓/英のスペルに基づいて検索
  - 改善方式: 従来の「一致方式」に加え、埋め込み(embedding)を計算して類似度に基づいて検索語を自動補完するように実装変更
  - 解決方法
    1. 埋め込み値の保存: 旅行先を生成する際、タイトル/内容/国/カテゴリ情報をOpenAIのテキスト埋め込みモデルを使用して埋め込み値を計算し、別途保存
    2. 類似度計算: ユーザーが検索を行う際、入力された検索語の埋め込み値を求め、ベクトル演算を通じて保存された旅行先との類似度を計算
    3. 結果の統合: 既存の「一致方式」から出た結果と埋め込み方式から出た結果を統合し、重複を除去してユーザーに返還

  - 前後比較
    - 以前（完全一致検索）

      <img width="300" alt="Screenshot 2024-07-11 at 12 46 31 PM" src="https://github.com/jinwuui/local-travel-map-frontend/assets/97392729/6331d094-c421-4803-a31a-6996d1081630">

    - 以後（類似度検索）

      <img width="300" alt="Screenshot 2024-07-11 at 12 46 31 PM" src="https://github.com/jinwuui/local-travel-map-frontend/assets/97392729/67bf6d98-6bc7-4d93-8d47-33150dbd4924">

  - 今後の改善事項
    1. 韓国語最適化: 韓国語テキストの埋め込み精度を向上させるためにKoBERT、KoSentenceBERTのような韓国語に特化した埋め込みモデルをテスト
    2. キャッシング: 同じ検索語の埋め込み値と検索語リストをキャッシング

- 性能改善(検索語自動完成)
  - Cache APIとService Workerでフロントエンドの性能を最適化
  - 同一キーワードで再検索時のネットワーク要請を最小化し、ロード時間を短縮
    - 540ms -> 2ms / 1010ms -> 2ms
   
    <img width="521" alt="Screenshot 2024-07-12 at 3 18 17 PM" src="https://github.com/user-attachments/assets/cd397ad4-b05f-4949-a39f-d76354d03c4e">

