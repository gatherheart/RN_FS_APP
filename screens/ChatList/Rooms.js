import messages from "../Chat/Messages";

const image =
  "https://images.unsplash.com/photo-1595257841899-b8d7ca01174b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=365&q=80";
export const roomsData = [
  {
    id: "12312asd4",
    type: "GROUP_CHAT",
    name: "무비 씨어터 단체방",
    participants: membersData,
    unreadCount: 3,
    image:
      "https://images.unsplash.com/photo-1595271676220-1def7a278460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=365&q=80",
    group: { groupName: "PIXEL", id: "125sad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: [
      {
        _id: Math.round(Math.random() * 1000000),
        text:
          "안녕하세요, 무비씨어터 회장 ㅇㅇㅇ 입니다. 다름이 아니라 회장님께 몇가지 여쭤볼 것이 있어 이렇게 말씀드립니다. 안녕하세요 감사합니다. 이제 나가보겠습니다. 네 안녕하세요 네 네네네네네",
        createdAt: new Date(new Date().setMinutes(new Date().getMinutes() - 1)),
        user: {
          _id: 1,
          name: "Developer",
        },
      },
      ...messages,
    ],
  },

  {
    id: "123123542asd4",
    type: "GROUP_CHAT",
    name: "무비 씨어터 단체방",
    image: undefined,
    unreadCount: 100,
    participants: membersData,
    group: { groupName: "PIXEL", id: "125sad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: messages,
  },
  {
    id: "12316642asd4",
    type: "GROUP_CHAT",
    name: "무비 씨어터 단체방",
    unreadCount: 200,
    participants: membersData,
    group: { groupName: "PIXEASAL3", id: "12544sad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: messages,
  },
  {
    id: "12241312asd4",
    type: "ANSWER_CHAT",
    name: "무비 씨어터 단체방",
    image: undefined,
    unreadCount: 0,
    participants: membersData,
    group: { groupName: "PIXEL3", id: "12544sad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: messages,
  },
  {
    id: "12312as343d4",
    type: "QUESTION_CHAT",
    name: "무비 씨어터 단체방",
    image: undefined,
    unreadCount: 0,

    participants: membersData,
    group: { groupName: "PIXEL2", id: "125sasdad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: messages,
  },
  {
    id: "12312as343d4",
    type: "QUESTION_CHAT",
    name: "무비 씨어터 단체방",
    image:
      "https://images.unsplash.com/photo-1595271676220-1def7a278460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=365&q=80",
    unreadCount: 0,

    participants: membersData,
    group: { groupName: "PIXEL4", id: "125s55asdad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: messages,
  },
  {
    id: "12312as343d4",
    type: "QUESTION_CHAT",
    name: "무비 씨어터 단체방",
    image:
      "https://images.unsplash.com/photo-1595271676220-1def7a278460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=365&q=80",
    unreadCount: 0,

    participants: membersData,
    group: { groupName: "PIXEL5", id: "12335sasdad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: messages,
  },
  {
    id: "12313522asd4",
    type: "GROUP_CHAT",
    name: "무비 씨어터 단체방",
    image: undefined,
    unreadCount: 5,
    participants: membersData,
    group: { groupName: "MY", id: "125sad", poster: image },
    createdAt: "2020-07-20T09:49:50.919Z",
    messages: messages,
  },
];

const avatarUrl =
  "https://images.unsplash.com/photo-1588869715773-c6641407939b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80";

const membersData = [
  {
    name: "김영모",
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 0,
    major: "소프트웨어학과",
  },
  {
    name: "이진우",
    id: "2",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
  },
  {
    name: "상미이",
    id: "3",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
  },
  {
    name: "김자운",
    id: "4",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "5",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  { name: "이지훈", id: "6", avatar: avatarUrl, type: 2, major: "장어학과" },
  {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "8",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "9",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "10",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "11",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
  { name: "장안구", id: "12", avatar: "", type: 2, major: "소프트웨어학과" },
  {
    name: "장안구",
    id: "13",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
  },
  {
    name: "장안구",
    id: "14",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
  },
];
