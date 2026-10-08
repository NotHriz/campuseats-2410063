# Week 1 reflection
 
1. What is the difference between building a UI imperatively (plain DOM code) and 
declaratively (React)?

Building a UI imperatively has the disadvantage of refreshing and repainting the whole page when things changes which is a quite expensive operation. Comperatively, React uses vdom to render the next state,compares to current dom, and does granular updates based on the diff
 
2. Why must a component name start with a capital letter?

Compiler treats lowercase name as literal string for example < myComponents \>, the compiler will try to look for the html tage 'myComponents' which obviosly does not exists.
 
3. What does a fragment <>...</> do, and why not just use a <div>?

Fragment lets us group elements without using wrapper node. Fragments can also accept refs, which enable interacting with underlying DOM nodes without adding wrapper elements. Using <div></div> results in actual HTML difference.
 
4. Name one benefit of splitting the UI into small components.

Scalability, enabling re-use without affecting any other components.