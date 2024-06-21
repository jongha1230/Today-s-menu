# <img src="https://github.com/jongha1230/Today-s-menu/assets/127167163/429c2419-29b4-410b-9858-160dae31b837" width='50'/> Today's Menu 오늘 뭐먹지? <img src="https://github.com/jongha1230/Today-s-menu/assets/127167163/429c2419-29b4-410b-9858-160dae31b837" width='50'/>

> **식사메뉴 추천하기 (아웃소싱 프로젝트)** <br/> **개발 기간 : 2024.06.17~2024.06.21**

## 프로젝트 소개

**오늘 뭐먹지?** 는 설문조사 알고리즘을 이용해서 식사 메뉴를 추천하고 사용자만의 요리 레시피를 공개할 수 있습니다.
1인 가구 증가로 인해 혼자 식사 메뉴를 고민하는 사람들을 위해서 메뉴 선택 고민을 덜어줄 수 있는 설문조사 폼을 제공하고, 레시피를 공유하고 소통할 수 있는 공간을 형성하기 위해 기획하게 되었습니다.

## Installation

```
$ git clone https://github.com/jongha1230/Today-s-menu.git
$ cd Today-s-menu

# development
$ npm i
$ npm run dev
```

## 개발팀 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/jongha1230"><img src="https://avatars.githubusercontent.com/u/122885302?v=4" width="100px;" alt=""/><br /><sub><b> 임종하 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/YISYISYISYIS"><img src="https://avatars.githubusercontent.com/u/155742658?v=4" width="100px;" alt=""/><br /><sub><b> 유인수 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/Chasyuss"><img src="https://avatars.githubusercontent.com/u/127167163?v=4" width="100px;" alt=""/><br /><sub><b> 박채수 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/ZiiYOU"><img src="https://avatars.githubusercontent.com/u/112477905?v=4" width="100px;" alt=""/><br /><sub><b> 방지영 </b></sub></a><br /></td>
        <td align="center"><a href="https://github.com/hoondolla"><img src="https://avatars.githubusercontent.com/u/162412793?v=4" width="100px;" alt=""/><br /><sub><b> 김재훈 </b></sub></a><br /></td>     
    </tr>
  </tbody>
</table>

## 팀원 역할

#### **임종하**

- **설문조사 및 전체 프로젝트 관리**
  - 설문조사 기능 설계 및 구현
  - 백엔드 데이터베이스 설계 및 최적화
  - 팀 내 코드 리뷰 및 전체적인 리팩토링 작업

#### **방지영**

- **회원관리 및 사용자 인터페이스**
  - 회원가입 및 로그인 기능 구현, 사용자 인증 시스템 구축
  - 마이페이지 개발: 사용자 프로필 정보 수정, 자기가 작성한 글 목록 조회 기능
  - 사용자 경험(UX) 개선을 위한 인터페이스 최적화

#### **박채수**

- **메인 페이지 및 검색 기능**
  - 메인 페이지 UI/UX 디자인 및 구현
  - 레시피 리스트 및 검색 기능 개발
  - 사용자 친화적인 인터페이스 제공을 위한 지속적인 개선 작업

#### **유인수**

- **코멘트 기능 및 상세 페이지 UI**
  - 코멘트 CRUD(생성, 읽기, 업데이트, 삭제) 기능 구현
  - 레시피 상세 페이지의 코멘트 UI 개발 및 사용자 인터랙션 개선
  - 코드의 효율성과 가독성을 높이기 위한 최적화 작업

#### **김재훈**

- **레시피 관리 및 상세 페이지 개발**
  - 레시피 CRUD 기능 구현: 레시피 작성, 수정, 삭제, 조회 기능
  - 레시피 상세 페이지 개발 및 UI/UX 최적화
  - 상태 관리와 데이터 연동을 통한 실시간 업데이트 기능 구현

## Stacks

### Environment

<img src="https://img.shields.io/badge/git-F05033.svg?style=for-the-badge&logo=git&logoColor=white" /> <img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logo=github&logoColor=white" /> <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Development

<img src="https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=FFFFFF" /> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" /> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

## 주요기능

| ⭐️메인페이지                                | ⭐️레시피                                                                        | ⭐️ 로그인 / 회원가입                | ⭐️ 마이페이지                       |
| -------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------ |
| - 설문조사 <br/> - 게시글 검색 / 게시글 post | - 작성 <br/> - 추가 / 수정 / 삭제 <br/> - 코멘트 작성 <br/> - 코멘트 수정 / 삭제 | - 로그인 (AUTH 포함) <br/> -회원가입 | -프로필 사진 변경 <br/> -닉네임 변경 |

## 폴더구조

```bash
├─ 📁 src
│  ├─ 📁 api
│  ├─ 📄 App.jsx
│  ├─ 📁 assets
│  │  ├─ 📁 favicon
│  │  ├─ 📁 images
│  ├─ 📁 components
│  │  ├─ 📁 auth
│  │  ├─ 📁 common
│  │  ├─ 📁 modals
│  │  ├─ 📁 recipe
│  │  └─ 📁 shared
│  │     ├─ 📁 hooks
│  │     └─ 📁 utils
│  ├─ 📁 data
│  ├─ 📁 pages
│  ├─ 📁 AuthPage
│  ├─ 📁 CommitRecipePage
│  ├─ 📁 MainPage
│  ├─ 📁 MyPage
│  └─ 📁 RecipeDetail
├─ 📁 queries
├─ 📁 routers
├─ 📁 store
└─ 📁 styles


```

