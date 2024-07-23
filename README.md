# A18 Nulflix

## Requirements:

- Home Page (/): Display a list of popular movies.
- Coming Soon Page (/coming-soon): Display a list of upcoming movies.
- Now Playing Page (/now-playing): Display a list of movies that are currently playing in theaters.
- When a movie is clicked, create a modal that displays the movie's details.
- Use React Query to fetch the data.
- Use Framer Motion to recreate the animations seen in the video (navigation, movies list, modal)

## 추가 구현

- 테마 변경 : 예에전부터 계속 하고 싶었는데 드디어 했습니다. 사실 테마 색상이 많이 드러나는 프로젝트가 아니라서 드라마틱한 효과는 없지만 ~~디자인 요소를 추가하지 못해~~ 추가해보았습니다. 테마 변경을 위해 Recoil을 사용했습니다.
- 검색 : 이 또한 저번 기수 때부터 하고 싶었는데 구현하지 못한 한(?)을 해소했습니다. themoviedb의 API가 잘 되어 있어서 구현 가능했다고 생각했습니다.

## 아쉬운 점

- 코드 정리 : 특히 header 컴포넌트. 막판에 테마 변경 및 검색 기능을 급하게 추가하다 보니 컴포넌트 코드가 길어졌습니다. 유지 보수를 위해서 분리해주는 것도 좋아보입니다. 이외에도 코드가 전반적으로 지저분하다는 느낌이 들어서 어떻게 해야 깔끔한 코드를 작성할 수 있을까 늘 고민합니다.
- 재검색 불가 문제 : 이건 해결! react-hook-form에서 submit 후 field reset이 되지 않았던 문제를 해결
- 반응형 미비 : 직업 특성상 반응형에 예민하게 대응하려고 하는 편인데 이번에는 기능 구현에 힘쓰다 PC와 모바일 중간 화면에서의 반응형 처리가 미비했습니다. 물론 모바일도 잘 구현한 편은 아니지만 중간 화면에 비하면 양반... 그렇지만 PC 화면에서 봐주세요.

## 사용 이미지 및 스크린 샷

### ~~귀여운~~ 눌플릭스 로고

- Dark mode
  ![logo_dark_nulflix_0](https://github.com/user-attachments/assets/59adb45d-351b-4f11-b988-a27edacc293b)

- Light mode
  ![logo_light_nulflix_0](https://github.com/user-attachments/assets/75c283af-bef7-4eb9-bf39-5814111364e0)

- Default Image : 검색 시, 이미지가 없는 영화 컴포넌트의 이미지에 사용
  ![default_card_nulflix_0](https://github.com/user-attachments/assets/c54d2af6-879f-45ae-ab3e-2a96d5391265)

### 스크린샷

- Home (dark mode)
  ![Screenshot 2024-07-23 at 2 51 40 PM](https://github.com/user-attachments/assets/bff9f4e7-c638-47e0-90d7-fb7e78d93c75)

- Home (light mode)
  ![Screenshot 2024-07-23 at 2 51 32 PM](https://github.com/user-attachments/assets/d3121331-af05-4696-a426-0df458972124)

- Movie modal
  ![Screenshot 2024-07-23 at 2 51 23 PM](https://github.com/user-attachments/assets/c3fb2876-fc33-49f9-b880-2e2ab5642758)

- Search
  ![Screenshot 2024-07-23 at 4 02 05 PM](https://github.com/user-attachments/assets/799ee9d0-cd3a-4597-b091-6f717d9e1d63)

- Search with default image
  ![Screenshot 2024-07-23 at 2 50 51 PM](https://github.com/user-attachments/assets/49c4e07e-8ce5-4dd9-a67e-1193b92a6e35)
