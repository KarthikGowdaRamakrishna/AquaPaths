
Topic: Oceans and the Law of the Sea
--------------------------------------

Project Name: Aqua Paths(Google Maps for sea Routes)
-------------------------

Video Walkthrough Link: https://drive.google.com/file/d/1Tn5eccLXaq8uGyB_ra0NsIYahStX0QIR/view?usp=sharing
-------------------------



Project Description 
-------------------

The Application is designed to identify the most efficient routes between sea ports, allowing users to customize various parameters. It also delivers up to seven days of weather forecasts for fishermen at their chosen coordinates. Furthermore, users can easily track their cargo shipments. The dashboard provides the latest news on marine life and offers valuable insights into NGOs dedicated to ocean cleanup efforts.


# Object model


```mermaid
---
Object Model for PortData, Users, savedForecast, and preferedPorts
---

classDiagram
    class PortData {
        +int portId
        +String portName
        +String coordinates
    }
    class Users {
        +int userId
        +String firstName
        +String lastName
        +String email
        +String photo
        +bool isGoogle
        +String password
    }
    class savedForecast {
        +int id
        +int userId
        +String coordinates
    }
    class preferedRoutes {
        +int id
        +int userId
        +int srcPortId
        +int destPortId
        +boolean allowPanama
        +boolean allowSuezCanal
        +boolean allowIceCaps
    }

    class cargoConfigration {
        +int id
        +int userId
        +int drift
        +int count
    }

    class savedTracking {
        +int id
        +int userId
        +string trackingId
    }

    Users <|-- savedForecast : has
    Users <|-- cargoConfigration : has
    Users <|-- savedTracking : has
    Users <|-- preferedRoutes : has
    PortData <|-- preferedRoutes : has

```
