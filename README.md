# 실시간 질의응답 서비스
[![Build Status](https://travis-ci.org/leeshinyook/RealTime_QnA.svg?branch=develop)](https://travis-ci.org/leeshinyook/RealTime_QnA)
[![Coverage Status](https://coveralls.io/repos/github/leeshinyook/RealTime_QnA/badge.svg?branch=develop)](https://coveralls.io/github/leeshinyook/RealTime_QnA?branch=develop)

실시간 질의응답 투표를 제공하는 웹 서비스

## 배경

정통적인 오프라인 발표방식은 단방향적이고 많은 변수속에 진행된다. 하지만, 웹 기반 실시간 질의응답서비스를 제공하면서 발표자 중심, 청중의 질문여건의 불공평, 음성정보전달의 한계등을 극복하고자 이 프로젝트를 진행하게 되었다.

## 기능

- 호스트와 게스트모드 2가지 사용자 모드를 제공
- 게스트모드에서 모바일 뷰 제공
- GoogleOAuth를 활용한 로그인
- 게스트의 실시간 질의 기능 제공
- 게스트 익명을 고려한 자유닉네임제공
- 질문에 대한 추천기능
- Scale-in, Scale-out 에 대비한 메시징환경 구축
- 실시간으로 청중의 의사반영을 위한 투표기능 제공
- Redis pub/sub

## 개발인원

- 이신육

## 기술스택

- Front-end : Vue, Vuex, Bootstrap
- Back-end: Node, Socket.io, Oauth

## Test

- Back-End : Mocha.js + chai

## DataFlow

![스크린샷 2020-06-15 오전 12 09 21](https://user-images.githubusercontent.com/55838461/84597235-96b89880-ae9d-11ea-82c0-d5442df37a8b.png)

## Reverse Proxy

![Nginx-Reverse-Proxy-with-Node](https://user-images.githubusercontent.com/55838461/84597229-8accd680-ae9d-11ea-855a-9696f71d709f.png)



## DevOps

![스크린샷 2020-06-15 오전 12 36 13](https://user-images.githubusercontent.com/55838461/84597625-3bd47080-aea0-11ea-8a74-aab4399eac1d.png)

[Docker Hub Front](https://hub.docker.com/repository/docker/updown2011/realtime_front)

[Docker Hub Back](https://hub.docker.com/repository/docker/updown2011/realtime_back)

## Structures

![스크린샷 2020-06-15 오전 12.19.39](/Users/leeshinyook/Desktop/스크린샷 2020-06-15 오전 12.19.39.png)

