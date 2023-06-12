# OOP Design Patterns Workbook

This workbook contains all patterns described in "Design Patterns. Elements of Reusable Object-Oriented Software". My aim is to understand, remember and to use each of them in situations composed by myself. The workbook is going to have small code examples in text, written in TypeScript. Larger examples will be placed as code files in the "examples" folder.

## Table of contents

1. Creational patterns
  - [1.1 Abstract Factory](#11-abstract-factory)
  - [1.2 Builder](#12-builder)
  - 1.3 Factory Method
  - [1.4 Prototype](#14-prototype)
  - [1.5 Singleton](#15-singleton)
  
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

### 1.1 Abstract Factory

**Purpose**

An Abstract Factory pattern is used for creation of components belonging to one of component families. Which component family to use is decided at the moment of Abstract Factory creation or can be changed later with a setter method.

**When to use**

The Abstract Factory pattern is handy when an application has sets of similar components with a same general behavior (e.g. GUI components for different operating systems). Using this pattern decouples work with these components from concrete implementations by using interfaces of similar components rather than their implementations.

**Participants and interrelations**

- `AbstractFactory` — defines an interface of a factory (either separate methods for creation of each type of components or a single method with an argument specifying which component to create).

- `ConcreteFactory` — implementation of a factory for a family of components.

- `AbstractProduct` — defines an interface of a component type.

- `ConcreteProduct` — an implementation of component type for a particular family of components.

All `ConcreteFactories`' methods should use `AbstractProducts` return types for their methods. This way a client does not know about particular `ConcreteProduct` implementation and uses `AbstractProduct` interface for any actions. For a same purpose a client should rely on an `AbstractFactory` interface rather than on any of `ConcreteFactories`.

A `ConcreteFactory` is usually the only one in an application and thus may be implemented as a `Singleton`.

Using an Abstract Factory provides following benefits:
- A Client is isolated from concrete class implementations and relies only on an abstract interface of an Abstract Factory.
- It is ensured that all components created belong to a single family.
- It is easy to add new families of components (by extending abstract interfaces of a factory and all components).

**Structure**

**Example**: [Disease guidelines](/examples/1.%20Creational%20patterns/1.1%20Abstract%20Factory)


### 1.2 Builder

**Purpose**

A Builder pattern defines a process of building a complex object step-by-step, leaving steps implementation to various Builder classes.

**When to use**

The Builder pattern is useful when a logic of creating a complex object stays the same across all of them, but details of their creation vary. Great for adding in variability.

**Participants and interrelations**

- `Builder` — defines an interface of an object's parts creation.

- `ConcreteBuilder` — implements creation logic, keeps the built object and returns it on demand.

- `Director` — defines building steps and executes them using a specified `ConcreteBuilder`.

- `Product` — a built complex product. Usually consists of multiple classes corresponding to its parts.

A `Builder` usually defines its methods not as abstract, but as empty. Thus `ConcreteBuilders` get a possibility of implementing only some of `Builder`'s methods, which are required for the process of building its `Product`. In this case other steps, issued by a `Director`, are skipped.

The Builder pattern is very similar to a class constructor, but has some scenarios where it proves useful:
- when an object is constructed in a complex way, including `async` steps;
- *when creating pipelines;*
- *when creating object graphs;*
- when an object has lots of arguments to be passed to a constructor — then using the Builder pattern may improve readability;
- when a client wants to select parameters for creation of a complex object instance — this allows to avoid making multiple constructors for each scenario.

**Structure**

**Example**: [Breakfast builder](/examples/1.%20Creational%20patterns/1.2%20Builder.ts)


### 1.4 Prototype

**Purpose**

A Prototype pattern allows a convenient reuse of complex objects while hiding their implementations from clients. Additionally, may come with a library of Prototypes to choose from.

**When to use**

The Prototype pattern is useful when invoking default-initialized heterogeneous objects, e.g. shapes and texts in a graphic redactor. It also enables a quick addition of other objects when needed.

**Participants and interrelations**

- `Client` — picks a `ConcretePrototype` from a library and invokes a `clone()` operation on it for further use.

- `Prototype` — defines an interface with a `clone()` function.

- `ConcretePrototype` — implements all steps requiring to `clone()` itself: create an empty self and initialize it with default values.

- `PrototypeLibrary` — an object defining methods to add, remove and retrieve `ConcretePrototypes` by a `Client`. Allows dynamics in `Prototype` assortment!

The Prototype pattern may decrease the amount of required classes dramatically — by making several differently initialized objects based on one class (e.g. full, half and quarter notes with corresponding vector images of each base on one Note class). The only problem comes with complex objects when deep cloning and circular references are an issue. It can be solved in `ConcretePrototype` class code, but requires time and skill to work it out.

**Structure**

**Example**: [Letter composer](/examples/1.%20Creational%20patterns/1.4%20Prototype.ts)


### 1.5 Singleton

**Purpose**

A Singleton design pattern guarantees that a class has only one instance and grants an access point to it.

**When to use**

The Singleton pattern is useful when it is highly crucial that a class should have only one instance.

**Participants and interrelations**

- `Singleton` — hides public constructor of a class and defines a static `Instance` method that handles instance creation and passing.

The Singleton is frequently considered an **antipattern** as it violates the SRP: any Singleton controls its life-cycle and functionality. Additionally, it:
- hinders unit testing (one cannot inject other than defined Singleton, e.g. a testing Singleton with mocks);
- interferes with concurrency when used with asynchronous resources;
- often is used as just a storage for global variables being a complex global object itself — and globals are bad in any form.

Usually one can ensure singleness of a class instance by creating it early in code and injecting it into other classes OR by using an `Abstract Factory`, managing this class life-cycle (thus not violating SRP).

The benefits of Singleton design pattern are in that it hides all the details of its implementation and can be called from anywhere for its functionality. Some experienced programmers on the Internet suggest _using Singletons on resources that do not affect an application's logic_, e.g. log files handling.

**Structure**

**Example**: [Application logger](/examples/1.%20Creational%20patterns/1.5%20Singleton.ts)


## 2. Structural Patterns


## 3. Behavioral Patterns

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
