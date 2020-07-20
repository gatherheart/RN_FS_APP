export const IconType = {
  material: "material",
  fontAwesome: "fontAwesome",
};

export const customEmojis = [
  {
    img:
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/237/father-christmas_1f385.png",
    name: "santa",
    category: "Smileys & Emotion",
    sort_order: 1,
    skins: [
      {
        img: "https://github.githubassets.com/images/icons/emoji/octocat.png",
        name: "octocat",
      },
    ],
  },
];

export const defaultProps = {
  categories: [
    {
      name: "Smileys & Emotion",
      iconType: IconType.material,
      icon: "sticker-emoji",
    },
    {
      name: "People & Body",
      iconType: IconType.material,
      icon: "hail",
    },
    {
      name: "Animals & Nature",
      iconType: IconType.material,
      icon: "dog",
    },
    {
      name: "Food & Drink",
      iconType: IconType.material,
      icon: "food",
    },
    {
      name: "Activities",
      iconType: IconType.material,
      icon: "soccer",
    },
    {
      name: "Travel & Places",
      iconType: IconType.material,
      icon: "train-car",
    },
    {
      name: "Objects",
      iconType: IconType.material,
      icon: "lightbulb-outline",
    },
    {
      name: "Symbols",
      iconType: IconType.material,
      icon: "music-note",
    },
    {
      name: "Flags",
      iconType: IconType.material,
      icon: "flag-variant-outline",
    },
  ],
  blackList: ["white_frowning_face"],
};
