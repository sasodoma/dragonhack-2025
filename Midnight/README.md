## Why we tried Midnight
Since we are handling private data from vulnerable individuals we decided to try using Midnight instead of MongoDB. Additionally, we use Bluetooth to connect to a device. This can pose a risk of exposing user habits and locations. With Midnight, we do not have to have a centralised server to store that information. Midnight also gives us 
* Stronger privacy guarantees, since we can store progress, identity info, or accessibility needs on-chain without revealing it to the public or even to other app components and
* Selective disclosure, where users can prove they’ve completed certain learning modules (e.g., Braille level 1) without sharing all their data.
* Supports proof-based syncing, making it work much better offline.

## Our work
We have created a DApp that would run on the on the Midnight block-chain. To move data from MongoDB to Midnight, we have created transfer scripts, included in this repo.
Unforunately, we have not been able to iron out all the bugs. This is why our project still uses MongoDB.

*It may fly to Mars some day, maybe.*