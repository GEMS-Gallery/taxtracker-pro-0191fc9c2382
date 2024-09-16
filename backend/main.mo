import Hash "mo:base/Hash";

import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Nat "mo:base/Nat";
import Result "mo:base/Result";

actor {
  type TaxPayer = {
    tid: Nat;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  stable var taxPayersEntries : [(Nat, TaxPayer)] = [];
  var taxPayers = HashMap.HashMap<Nat, TaxPayer>(0, Nat.equal, Nat.hash);

  system func preupgrade() {
    taxPayersEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    taxPayers := HashMap.fromIter<Nat, TaxPayer>(taxPayersEntries.vals(), 0, Nat.equal, Nat.hash);
    taxPayersEntries := [];
  };

  public func addTaxPayer(tid: Nat, firstName: Text, lastName: Text, address: Text) : async Result.Result<(), Text> {
    if (taxPayers.get(tid) != null) {
      return #err("TaxPayer with TID " # Nat.toText(tid) # " already exists");
    };
    let newTaxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(tid, newTaxPayer);
    #ok(())
  };

  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  public query func searchTaxPayerByTID(tid: Nat) : async ?TaxPayer {
    taxPayers.get(tid)
  };
}
