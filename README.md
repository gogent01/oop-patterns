# OOP Design Patterns Workbook

This workbook contains all patterns described in "Design Patterns. Elements of Reusable Object-Oriented Software". My aim is to understand, remember and to use each of them in situations composed by myself. The workbook is going to have small code examples in text, written in TypeScript. Larger examples will be placed as code files in the "examples" folder.

## Table of contents

1. Creational patterns
  - 1.1 Abstract Factory
  - 1.2 Builder
  - 1.3 Factory Method
  - 1.4 Prototype
  - 1.5 Singleton
  
2. Structural patterns
  - 2.1 Adapter
  - 2.2 Bridge
  - 2.3 Composite
  - 2.4 Decorator
  - 2.5 Facade
  - 2.6 Flyweight
  - 2.7 Proxy
  
3. Behavioral patterns
  - 3.1 Chain of Responsibility
  - 3.2 Command
  - [3.3 Interpreter](#33-interpreter)
  - 3.4 Iterator
  - [3.5 Mediator](#35-mediator)
  - 3.6 Memento
  - [3.7 Observer](#37-observer)
  - 3.8 State
  - [3.9 Strategy](#39-strategy)
  - [3.10 Template Method](#310-template-method)
  - [3.11 Visitor](#311-visitor)
  
  
## 1. Creational patterns


## 2. Structural patterns


## 3. Behavioral patterns

### 3.3 Interpreter

**Purpose**

Interpreter is a series of objects, defining the rules of a language with formal grammar. These objects are then used to transform expressions, written in a formal grammar language, into some final result. Examples are regular expressions or boolean expressions.

**When to use**

An Interpreter should be used when:
- there is a frequent routine task;
- which uses a language with a formal, but not too complex tree grammar to describe itself;
- and code efficiency is not a keystone (complex grammar languages are translated into some form other than tree prior to interpretation).

**Participants and interrelations**

- `AbstractExpression` — declares an `interpret()` method.
- `TerminalExpression` — defines `interpret()` for each terminal symbol.
- `NonterminalExpression` — defines `interpret()` for each nonterminal symbol, which recursively calls `interpret()` for all symbols included in this expression.
- `Context` — contains global information (e.g. values of expression variables or all transformed states of an expression that fit the rules of language grammar).
- `Client` — gets or creates a tree of terminal and nonterminal expressions from a sentence in a language with formal grammar.
 Then calls an `interpret()` operation on the tree's root.

*Prior to making an Interpreter one should construct a [Backus-Naur form](https://en.wikipedia.org/wiki/Backus–Naur_form) of a language, which makes it easier to understand.*

**Structure**

**Example**: [A Simple SQL Interpreter](/examples/3.%20Behavioral%20patterns/3.3%20Interpreter.ts)

***

### 3.5 Mediator

**Purpose**

An object to incapsulate the way of interaction between objects. Decreases component coupling, thus easing component interchangeability.

**When to use**

A Mediator should be used whenever:
- there are multiple objects with complex unstructured relations;
- this high coupling makes the objects difficult to reuse;
- and it is impractical to create loads of subclasses to handle the situation.

**Participants and interrelations**

- `Mediator` — keeps the information about components and determines intercomponent behavior.
- `Colleagues` — various objects knowing their `Mediator` and interacting only with it. 

All `Colleagues` send update requests to `Mediator` and answer on `Mediator`'s requests (get or set) to them. `Mediator` determines which information and where to get and to set on any update request.

**Structure**

**Example**: [An "Edit Font" Dialog Window](/examples/3.%20Behavioral%20patterns/3.5%20Mediator.ts)

***

### 3.7 Observer

**Purpose**

An object to instantly or periodically send updated information to *any* components, subscribed to the updates.

**When to use**

An Observer should be used whenever:
- there are multiple objects sharing same information;
- a change in any of them should be reflected in all others;
- it is not defined which and how many components should be updated.

**Participants and interrelations**

- `Subject` — keeps the information about state and subscribed components. Adds and removes subscribers. Notifies the subscribers with updates.
- `Observers` — various components keeping the state to be synchronized. Update their state on notifications from `Subject`.

`Subject` may notify `Observers` in two ways. The first way is a "push model" — sending an updated state to all subscribers, even if some do not need it. The second way is a "pull model" — sending just minimal information about update; `Observers` request details later.

Subject's Observer registration interface may be extended to allow `Observers` to get only updates on selected topics.

If `Observers` depend on multiple `Subjects`, update interface may be extended to include a reference to `Subject` that sent a notification.

If `Observers` depend on multiple `Subjects`, `Mediator` may be required to periodically collect updates and send combined result to `Observers`. In this case `Mediator` defines the strategy of combining state updates and grouping them according to Observers' needs.

**Structure**

**Example**: [Clock Widgets](/examples/3.%20Behavioral%20patterns/3.7%20Observer.ts)

***

### 3.9 Strategy

**Purpose**

Strategy allows defining multiple algorithms of object handling by a client (class). The algorithms are incapsulated in separate classes and are passed to an instance of the client class during its initialization. Strategies may also be interchanged during code execution.

**When to use**

Strategy is used when:
- there are multiple algorithms of object processing;
- making subclasses of a client with different algorithm implementation changes only algorithm implementation;
- some algorithms use data the client should know nothing about;
- *the client class contains conditional operators, defining object processing behavior.*

**Participants and interrelations**

- `Strategy` — defines a common interface for all `ConcreteStrategies`. The point is that not all `ConcreteStrategies` are going to need all the data passed to them — but the common interface is required for a client to be separated from strategies' implementations.

- `ConcreteStrategy` — implements an algorithm, using an interface, declared by `Strategy`.

- `Context` — instantiated with `ConcreteStrategy` and may declare an interface to be used by any `Strategy`.

A `Context` may pass all parameters to `Strategy` calls or send data on requests from `Strategies`.

*A common sign of using a Strategy pattern is use of conditional operators to select data processing algorithm. Instead, one should instantiate the client with a suitable `Strategy` and call processing with it when needed.*

**Structure**

**Example**: [Text to Figures Formatter](/examples/3.%20Behavioral%20patterns/3.9%20Strategy.ts)

***

### 3.10 Template Method

**Purpose**

Template Method defines the outline of an algorithm, allowing its subclasses to specify the steps of the algorithm.

**When to use**

Template Method is useful when a basic structure of an algorithm is used multiple times, but its specific steps — only single time in different variations.

**Participants and interrelations**

- `AbstractClass` — defines an algorithm of `TemplateMethod`, methods to specify in `Concrete classes` and methods which may be redefined in `Concrete classes`.

- `ConcreteClass` — sets methods of steps of a `TemplateMethod`.

One problem to keep in scope — a necessity to specifically name `TemplateMethod`'s steps, obligatory and optionally for a redefinition (e.g.: `doOpenDocument()`, `mayDrawFigure()`).

**Structure**

**Example**: [Living Patterns of Animals](/examples/3.%20Behavioral%20patterns/3.10%20Template%20Method.ts)

***

### 3.11 Visitor

**Purpose**

To decrease repeating code from tree-node subtypes. Useful when node list is pretty consistent, but the required methods to use over them grow in numbers.

**When to use**

Visitor is used when there is a need to traverse a tree structure, consisting of nodes of different types, with a method, which realization differs slightly, depending on node type.

**Participants and interrelations**

- `Visitor` — declares a `visit` operation for each `ConcreteElement` type.

- `ConcreteVisitor` — defines all declared `visit` operations. May store accumulative information about visited elements.

- `Element` (Node) — declares an `accept` operation, which takes a `Visitor` as an argument.

- `ConcreteElement` (ConcreteNode) — defines an `accept` operation. Complex `Elements` make all their children to `accept` a `Visitor` and `accept` it themselves.

- `ObjectStructure` — keeps a tree of `Elements` and provides an entry point for `Visitors`.

`Visitors` usually keep a cumulative state of visited `Elements` — which is beneficial. On the other side, the use of `Visitor` pattern comes with a problem of incapsulation violation, as `Elements` must have an extensive interface in order for `Visitors` to act on them.

**Structure**

**Example**: [A Simple HTML Code Constructor](/examples/3.%20Behavioral%20patterns/3.11%20Visitor)
