export const HACKER_ONE_ABI = {
  address: "0x4d15336c03d3032fec478c78f1dad91c43f2de86d65dc93111036a0419840e2b",
  name: "HackerOneCore",
  friends: [],
  exposed_functions: [
    {
      name: "CreateHackathon",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String", "0x1::string::String", "u64"],
      return: [],
    },
    {
      name: "InviteHackerToTeam",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "u64", "address"],
      return: [],
    },
    {
      name: "acceptTeamInvite",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "u64"],
      return: [],
    },
    {
      name: "approveHackathonRequest",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "u64", "address"],
      return: [],
    },
    {
      name: "createHackerProfile",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String", "u64"],
      return: [],
    },
    {
      name: "createTeam",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String", "u64"],
      return: [],
    },
    {
      name: "getHackathon",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["u64"],
      return: ["0x4d15336c03d3032fec478c78f1dad91c43f2de86d65dc93111036a0419840e2b::HackerOneCore::Hackathon"],
    },
    {
      name: "getHackers",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["vector<address>"],
      return: ["vector<0x4d15336c03d3032fec478c78f1dad91c43f2de86d65dc93111036a0419840e2b::HackerOneCore::Hacker>"],
    },
    {
      name: "requestToJoinHackathon",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "u64"],
      return: [],
    },
  ],
  structs: [
    {
      name: "HackathoTeamsMap",
      is_native: false,
      is_event: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        {
          name: "hackathonTeams",
          type: "0x1::table::Table<u64, vector<u64>>",
        },
      ],
    },
    {
      name: "Hackathon",
      is_native: false,
      is_event: false,
      abilities: ["copy", "drop", "store"],
      generic_type_params: [],
      fields: [
        {
          name: "id",
          type: "u64",
        },
        {
          name: "creator",
          type: "address",
        },
        {
          name: "name",
          type: "0x1::string::String",
        },
        {
          name: "description",
          type: "0x1::string::String",
        },
        {
          name: "prizePool",
          type: "u64",
        },
        {
          name: "teams",
          type: "vector<u64>",
        },
        {
          name: "winningTeamId",
          type: "u64",
        },
        {
          name: "approvedParticipants",
          type: "vector<address>",
        },
        {
          name: "pendingRequests",
          type: "vector<address>",
        },
      ],
    },
    {
      name: "Hackathons",
      is_native: false,
      is_event: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        {
          name: "allHackathons",
          type: "0x1::table::Table<u64, 0x4d15336c03d3032fec478c78f1dad91c43f2de86d65dc93111036a0419840e2b::HackerOneCore::Hackathon>",
        },
        {
          name: "curr_id",
          type: "u64",
        },
      ],
    },
    {
      name: "Hacker",
      is_native: false,
      is_event: false,
      abilities: ["copy", "drop", "store"],
      generic_type_params: [],
      fields: [
        {
          name: "addr",
          type: "address",
        },
        {
          name: "dataHash",
          type: "0x1::string::String",
        },
        {
          name: "pastHackathons",
          type: "vector<u64>",
        },
        {
          name: "teamInvites",
          type: "vector<u64>",
        },
        {
          name: "teamsJoined",
          type: "vector<u64>",
        },
        {
          name: "devScore",
          type: "u64",
        },
      ],
    },
    {
      name: "Hackers",
      is_native: false,
      is_event: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        {
          name: "hackers",
          type: "0x1::table::Table<address, 0x4d15336c03d3032fec478c78f1dad91c43f2de86d65dc93111036a0419840e2b::HackerOneCore::Hacker>",
        },
        {
          name: "count",
          type: "u64",
        },
      ],
    },
    {
      name: "Team",
      is_native: false,
      is_event: false,
      abilities: ["copy", "drop", "store"],
      generic_type_params: [],
      fields: [
        {
          name: "id",
          type: "u64",
        },
        {
          name: "leader",
          type: "address",
        },
        {
          name: "name",
          type: "0x1::string::String",
        },
        {
          name: "members",
          type: "vector<address>",
        },
      ],
    },
    {
      name: "Teams",
      is_native: false,
      is_event: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        {
          name: "teams",
          type: "0x1::table::Table<u64, 0x4d15336c03d3032fec478c78f1dad91c43f2de86d65dc93111036a0419840e2b::HackerOneCore::Team>",
        },
        {
          name: "curr_id",
          type: "u64",
        },
      ],
    },
  ],
};