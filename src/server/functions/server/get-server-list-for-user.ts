const SERVER_LIST = [
  {
    id: "a9f9401f9a5c999e3fa716129f8b9398",
    image: null,
    name: "test",
    position: 1,
  },
  {
    id: "d26b37fba19944f6a18c8b5fbc833a87",
    image: "https://cdn.discordapp.com/embed/avatars/0.png",
    name: "My Server 2",
    position: 2,
  },
  {
    id: "ed0416b3ff30643dd593cb6a1d204349",
    image: null,
    name: "My Server 3",
    position: 3,
  },
  {
    id: "7a4b2e2dd77d9fa805caf8438ef0821d",
    image: null,
    name: "DarkCry",
    position: 4,
  },
  {
    id: "1f45ca7976b1af9481cd516c17e3dfff",
    image: "https://cdn.discordapp.com/icons/531166470579814420/a_04e82454e8b3db04b42ad09d6a161ca3.webp?size=96",
    name: "Formula 1",
    position: 5,
  },
];

export function serverGetServerListForUser(userId: string) {
  return SERVER_LIST;
}
