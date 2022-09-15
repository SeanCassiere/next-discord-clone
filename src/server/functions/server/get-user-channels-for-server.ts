const CHANNELS = {
  parents: [
    { id: "e4e4b30c7295fe9df855dfe2c7e244a9", name: "Announcements" },
    { id: "cdb95d265ea18a51867fe2de434eb123", name: "Rainbow HQ" },
  ],
  channels: [
    {
      id: "4ecadd736573009db3bef6ce4b232d86",
      parent: "e4e4b30c7295fe9df855dfe2c7e244a9",
      name: "r6-siege-news",
    },
    {
      id: "97a3ea7dd516bae81b9a43393f24e364",
      parent: "e4e4b30c7295fe9df855dfe2c7e244a9",
      name: "r6-extraction-news",
    },
    {
      id: "439d7cdaad9282848ef8f9030f8c5810",
      parent: "e4e4b30c7295fe9df855dfe2c7e244a9",
      name: "e-sports news",
    },
    {
      id: "e3d7ba65ae5078e568fd896b41d4ee0d",
      parent: "cdb95d265ea18a51867fe2de434eb123",
      name: "siege-lounge",
    },
  ],
};

export async function getUserChannelsForServer(serverId: string) {
  return CHANNELS;
}
