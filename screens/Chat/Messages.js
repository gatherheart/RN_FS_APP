const messages = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: "#awesome",
    createdAt: new Date(new Date().setMinutes(new Date().getMinutes() - 1)),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "응 안뇽",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 2,
      name: "김현우",
    },
    image: undefined,
    sent: true,
    received: true,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 2,
      name: "김현우",
    },
    image:
      "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
    sent: true,
    received: true,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "안뇽",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 2,
      name: "김현우",
    },
    image: undefined,
    sent: true,
    received: true,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Send me a picture!",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 1,
      name: "Developer",
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    text: "Where are you?",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Yes, and I use Gifted Chat!",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 2,
      name: "김현우",
    },
    sent: true,
    received: true,
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Are you building a chat app?",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "뭐지?",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 3,
      name: "감나무",
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    emoji: "../../assets/lottieFiles/like-fountain.json",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    user: {
      _id: 3,
      name: "감나무",
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "대화가 시작되었습니다",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    system: true,
  },
];

export default messages;
