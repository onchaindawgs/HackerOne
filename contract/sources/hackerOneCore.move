module hackerOne::HackerOneCore {
   use std::signer;
   use std::string::{String};
   use aptos_framework::table::{Self, Table};
   use std::vector;

   struct Hacker has store, copy, drop{
    addr : address,
    dataHash: String,
    pastHackathons : vector<u64>,
    remark: String,
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
      hackathonTeams : Table<u64, u64>
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
         hackathonTeams : table::new<u64, u64>()
      })
   }

   public entry fun createHackerProfile(account: &signer, dataHash : String, remark : String, devScore : u64) acquires Hackers{
      let addr = signer::address_of(account);
      let hacker = Hacker{
         addr,
         dataHash,
         pastHackathons : vector::empty<u64>(),
         remark: remark,
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

}
