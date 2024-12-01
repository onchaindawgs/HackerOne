module hackerOne::HackerOneCore {
   use std::signer;
   use std::string::{String};
   use aptos_framework::table::{Self, Table};
   use std::vector;

   struct Hacker has store, copy, drop {
    addr: address,
    dataHash: String,
    pastHackathons: vector<u64>,
    teamInvites: vector<u64>,  
    teamsJoined: vector<u64>,  
    devScore: u64,
}

   struct Hackers has key{
      hackers : Table<address,Hacker>,
      count: u64,
   }

   struct Hackathon has store, copy, drop{
    id: u64,
    creator : address,
    name: String,
    description : String,
    prizePool : u64,
    teams : vector<u64>,
    winningTeamId : u64,
    approvedParticipants: vector<address>,
    pendingRequests: vector<address>
   }

   struct Hackathons has key{
    allHackathons : Table<u64,Hackathon>,
    curr_id : u64
   }

   struct Team has store, copy, drop{
      id: u64,
      leader: address,
      name: String,
      members : vector<address>
   }

   struct Teams has key {
      teams: Table<u64,Team>,
      curr_id: u64,
   }

   struct HackathoTeamsMap has key {
      hackathonTeams : Table<u64, vector<u64>>
   }

   fun init_module(account: &signer) {
      move_to(account, Hackathons {
         allHackathons: table::new<u64, Hackathon>(),
         curr_id: 0
      });
      move_to(account, Hackers {
         hackers: table::new<address, Hacker>(),
         count: 0
      });
      move_to(account, HackathoTeamsMap{
         hackathonTeams : table::new<u64, vector<u64>>()
      })
   }

   public entry fun createHackerProfile(account: &signer, dataHash : String, devScore : u64) acquires Hackers{
      let addr = signer::address_of(account);
      let hacker = Hacker{
         addr,
         dataHash,
         pastHackathons : vector::empty<u64>(),
         teamInvites :  vector::empty<u64>(),
         teamsJoined: vector::empty<u64>(),
         devScore,
      };
      table::add<address, Hacker>(&mut borrow_global_mut<Hackers>(@hackerOne).hackers, addr, hacker);
      }

      #[view]
      public fun getHackers(addrs: vector<address>) : vector<Hacker> acquires Hackers {
      let result = vector::empty<Hacker>();
      let len = vector::length(&addrs);
      let i = 0;

      while (i < len) {
         let addr = *vector::borrow(&addrs, i);
         
         // Check if the hacker profile exists
         if (table::contains<address, Hacker>(&borrow_global<Hackers>(@hackerOne).hackers, addr)) {
               let hacker = table::borrow<address, Hacker>(&borrow_global<Hackers>(@hackerOne).hackers, addr);
               vector::push_back(&mut result, *hacker);
         };

         i = i + 1;
      };

      result
   }

   public entry fun CreateHackathon(account : &signer,  name: String, description : String, prizePool : u64 ) acquires Hackathons{
      let hackathons_mut = borrow_global_mut<Hackathons>(@hackerOne);

      hackathons_mut.curr_id = hackathons_mut.curr_id + 1;
      let id = hackathons_mut.curr_id;

      let creator  = signer::address_of(account);

      let hackathon = Hackathon{
         id,
         creator,
         name,
         description,
         winningTeamId: 0,
         prizePool,
         teams : vector::empty<u64>(),
         approvedParticipants : vector::empty<address>(),
         pendingRequests : vector::empty<address>()
      };
      table::add<u64, Hackathon>(&mut hackathons_mut.allHackathons, id, hackathon)
   }

   #[view]
   public fun getHackathon(id: u64): Hackathon acquires Hackathons{
      *table::borrow<u64, Hackathon>(&borrow_global<Hackathons>(@hackerOne).allHackathons, id)
   }

   public entry fun requestToJoinHackathon(account: &signer, hackathon_id: u64) acquires Hackathons {
    let addr = signer::address_of(account);
    let hackathons_mut = borrow_global_mut<Hackathons>(@hackerOne);
    
    let hackathon_ref = table::borrow_mut<u64, Hackathon>(&mut hackathons_mut.allHackathons, hackathon_id);
    
    assert!(!vector::contains(&hackathon_ref.pendingRequests, &addr), 101);
    assert!(!vector::contains(&hackathon_ref.approvedParticipants, &addr), 102);
    
    vector::push_back(&mut hackathon_ref.pendingRequests, addr);
   }

   public entry fun approveHackathonRequest(account: &signer, hackathon_id: u64, participant: address) acquires Hackathons {
      let hackathons_mut = borrow_global_mut<Hackathons>(@hackerOne);
      let hackathon_ref = table::borrow_mut<u64, Hackathon>(&mut hackathons_mut.allHackathons, hackathon_id);
      
      let creator = hackathon_ref.creator;
      assert!(signer::address_of(account) == creator, 103); 
      
      let (exists, index) = vector::index_of(&hackathon_ref.pendingRequests, &participant);
      assert!(exists == true, 104);
      vector::remove(&mut hackathon_ref.pendingRequests, index);
      
      vector::push_back(&mut hackathon_ref.approvedParticipants, participant);
   }
   
   public entry fun createTeam(account: &signer, name: String, hackathon_id : u64) acquires HackathoTeamsMap, Teams {
      let leader = signer::address_of(account);
      let teams_mut = borrow_global_mut<Teams>(@hackerOne);
      teams_mut.curr_id = teams_mut.curr_id + 1;
      let team_id = teams_mut.curr_id;
      let team = Team{
         id : team_id,
         leader,
         name,
         members : vector::empty<address>()
      };
      table::add<u64, Team>(&mut teams_mut.teams, team_id, team);
      vector::push_back(table::borrow_mut<u64, vector<u64>>(&mut borrow_global_mut<HackathoTeamsMap>(@hackerOne).hackathonTeams, hackathon_id), team_id)
   }

   public entry fun InviteHackerToTeam(
      account: &signer, 
      team_id: u64, 
      invited_hacker: address
   ) acquires Teams, Hackers {
      // Verify the inviter is the team leader
      let teams_mut = borrow_global_mut<Teams>(@hackerOne);
      let team_ref = table::borrow_mut<u64, Team>(&mut teams_mut.teams, team_id);
      
      let inviter = signer::address_of(account);
      assert!(team_ref.leader == inviter, 201); // Only team leader can invite
      
      // Check if the invited hacker already exists
      let hackers_mut = borrow_global_mut<Hackers>(@hackerOne);
      assert!(table::contains<address, Hacker>(&hackers_mut.hackers, invited_hacker), 202);
      
      // Check if the hacker is not already in the team
      assert!(!vector::contains(&team_ref.members, &invited_hacker), 203);
      
      // Retrieve the invited hacker's profile
      let hacker_ref = table::borrow_mut<address, Hacker>(&mut hackers_mut.hackers, invited_hacker);
      
      // Add team invitation to the hacker's invites
      vector::push_back(&mut hacker_ref.teamInvites, team_id);
   }

   public entry fun acceptTeamInvite(
    account: &signer, 
    team_id: u64
) acquires Teams, Hackers {
    let addr = signer::address_of(account);
    
    // Verify the hacker exists
    let hackers_mut = borrow_global_mut<Hackers>(@hackerOne);
    assert!(table::contains<address, Hacker>(&hackers_mut.hackers, addr), 301);
    
    // Get the hacker's profile
    let hacker_ref = table::borrow_mut<address, Hacker>(&mut hackers_mut.hackers, addr);
    
    // Check if the team invite exists
    let (exists, index) = vector::index_of(&hacker_ref.teamInvites, &team_id);
    assert!(exists, 302); // Team invite not found
    
    // Remove the invite from the list
    vector::remove(&mut hacker_ref.teamInvites, index);
    
    // Add the hacker to the team
    let teams_mut = borrow_global_mut<Teams>(@hackerOne);
    let team_ref = table::borrow_mut<u64, Team>(&mut teams_mut.teams, team_id);
    
    // Add hacker to team members
    vector::push_back(&mut team_ref.members, addr);
    
    // Add team to hacker's joined teams
    vector::push_back(&mut hacker_ref.teamsJoined, team_id);
}

}
