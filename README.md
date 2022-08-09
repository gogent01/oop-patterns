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
  - 3.3 Interpreter
  - 3.4 Iterator
  - 3.5 Mediator
  - 3.6 Memento
  - 3.7 Observer
  - 3.8 State
  - 3.9 Strategy
  - 3.10 Template Method
  - 3.11 Visitor
  
  
## 1. Creational patterns


## 2. Structural patterns


## 3. Behavioral patterns

### 3.5 Mediator

**Purpose**

An object to incapsulate the way of interaction between objects. Decreases component coupling, thus easing component interchangeability.

**When to use**

A Mediator should be used whenever:
- there are multiple object with complex unstructured relations;
- this high coupling makes the objects difficult to reuse;
- and it is impractical to create loads of subclasses to handle the situation.

**Participants and interrelations**
- Mediator — keeps the information about components and determines intercomponent behavior.
- Colleagues — various objects knowing their Mediator and interacting only with it. 

All Colleagues send update requests to Mediator and answer on Mediator's requests (get or set) to them. Mediator determines which information and where to get and to set on any update request.

**Structure**

**Example**



[Full example](/examples/3.%20Behavioral%20patterns/3.5%20Mediator.ts)
