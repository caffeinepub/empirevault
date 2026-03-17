import Text "mo:core/Text";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";

actor {
  type SiteConfig = {
    productName : Text;
    price : Float;
    contactEmail : Text;
  };

  var siteConfig : ?SiteConfig = null;

  public shared ({ caller }) func setConfig(productName : Text, price : Float, contactEmail : Text) : async () {
    siteConfig := ?{
      productName;
      price;
      contactEmail;
    };
  };

  public query ({ caller }) func getConfig() : async SiteConfig {
    switch (siteConfig) {
      case (null) { Runtime.trap("Site configuration not set.") };
      case (?config) { config };
    };
  };
};
